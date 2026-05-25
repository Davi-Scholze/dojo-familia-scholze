// Setup 2 Vercel projects (apps/site + apps/app) via Management API.
// Uso: VERCEL_TOKEN=... node scripts/setup-vercel.mjs
//
// Idempotente: se project já existe, faz UPDATE em vez de CREATE.
// Linka cada project ao repo Davi-Scholze/dojo-familia-scholze.
// Seta env vars Supabase (NEXT_PUBLIC_* + VITE_*).

const TOKEN = process.env.VERCEL_TOKEN;
const SUPABASE_URL = process.env.SUPABASE_URL_PUBLIC ?? "https://mubcbbrwoeblvqaiebou.supabase.co";
const SUPABASE_ANON = process.env.SUPABASE_ANON_PUBLIC;

if (!TOKEN) {
  console.error("[setup-vercel] VERCEL_TOKEN env var obrigatório");
  process.exit(1);
}
if (!SUPABASE_ANON) {
  console.error("[setup-vercel] SUPABASE_ANON_PUBLIC env var obrigatório");
  process.exit(1);
}

const GH_REPO = "Davi-Scholze/dojo-familia-scholze";
const GH_REPO_ID = process.env.GITHUB_REPO_ID; // numeric repo id (gh api repos/<owner>/<name> --jq .id)

const projects = [
  {
    name: "dojofs-site",
    framework: "nextjs",
    rootDirectory: "apps/site",
    buildCommand: "cd ../.. && npm run build --workspace=apps/site",
    installCommand: "cd ../.. && npm install --no-audit",
    outputDirectory: ".next",
    envs: [
      { key: "NEXT_PUBLIC_SUPABASE_URL", value: SUPABASE_URL },
      { key: "NEXT_PUBLIC_SUPABASE_ANON_KEY", value: SUPABASE_ANON },
    ],
  },
  {
    name: "dojofs-app",
    framework: "vite",
    rootDirectory: "apps/app",
    buildCommand: "cd ../.. && npm run build --workspace=apps/app",
    installCommand: "cd ../.. && npm install --no-audit",
    outputDirectory: "dist",
    envs: [
      { key: "VITE_SUPABASE_URL", value: SUPABASE_URL },
      { key: "VITE_SUPABASE_ANON_KEY", value: SUPABASE_ANON },
    ],
  },
];

async function api(method, path, body) {
  const r = await fetch("https://api.vercel.com" + path, {
    method,
    headers: {
      Authorization: "Bearer " + TOKEN,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await r.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }
  return { status: r.status, data };
}

async function ensureProject(p) {
  // Check existence
  const check = await api("GET", "/v9/projects/" + p.name);
  if (check.status === 200) {
    console.log(`[${p.name}] já existe (id ${check.data.id}) — atualizando config`);
    const upd = await api("PATCH", "/v9/projects/" + p.name, {
      framework: p.framework,
      rootDirectory: p.rootDirectory,
      buildCommand: p.buildCommand,
      installCommand: p.installCommand,
      outputDirectory: p.outputDirectory,
    });
    if (upd.status !== 200) {
      console.error(`[${p.name}] PATCH falhou`, upd);
      return null;
    }
    return check.data;
  }

  // Create
  console.log(`[${p.name}] criando...`);
  const created = await api("POST", "/v9/projects", {
    name: p.name,
    framework: p.framework,
    rootDirectory: p.rootDirectory,
    buildCommand: p.buildCommand,
    installCommand: p.installCommand,
    outputDirectory: p.outputDirectory,
    gitRepository: { type: "github", repo: GH_REPO },
  });

  if (created.status !== 200 && created.status !== 201) {
    console.error(`[${p.name}] CREATE falhou (HTTP ${created.status}):`, JSON.stringify(created.data));
    return null;
  }
  console.log(`[${p.name}] criado id=${created.data.id}`);
  return created.data;
}

async function setEnvs(projectId, envs) {
  for (const env of envs) {
    // List existentes
    const existing = await api("GET", "/v9/projects/" + projectId + "/env");
    const found = existing.status === 200
      ? existing.data.envs?.find((e) => e.key === env.key)
      : null;

    if (found) {
      // Update
      const upd = await api("PATCH", "/v9/projects/" + projectId + "/env/" + found.id, {
        value: env.value,
        target: ["production", "preview", "development"],
        type: "encrypted",
      });
      console.log(`  env ${env.key}: UPDATE (HTTP ${upd.status})`);
    } else {
      // Create
      const cre = await api("POST", "/v10/projects/" + projectId + "/env", {
        key: env.key,
        value: env.value,
        target: ["production", "preview", "development"],
        type: "encrypted",
      });
      console.log(`  env ${env.key}: CREATE (HTTP ${cre.status})`);
    }
  }
}

async function getLatestDeployment(projectId) {
  const r = await api("GET", "/v6/deployments?projectId=" + projectId + "&limit=1");
  if (r.status !== 200 || !r.data.deployments?.length) return null;
  return r.data.deployments[0];
}

async function triggerDeploy(projectId, projectName) {
  if (!GH_REPO_ID) {
    console.warn(`  [skip-deploy] GITHUB_REPO_ID env var ausente — set via: GITHUB_REPO_ID=$(gh api repos/${GH_REPO} --jq .id)`);
    return null;
  }
  // Vercel API exige repoId numérico (não só name) pra trigger via /v13/deployments
  const r = await api("POST", "/v13/deployments", {
    name: projectName,
    project: projectId,
    target: "production",
    gitSource: {
      type: "github",
      repoId: Number(GH_REPO_ID),
      ref: "master",
    },
  });
  if (r.status >= 400) {
    console.log(`  deploy trigger: HTTP ${r.status} ${JSON.stringify(r.data)}`);
  } else {
    console.log(`  deploy triggered: ${r.data?.url ?? "(no url yet)"} state=${r.data?.readyState ?? "?"}`);
  }
  return r.data;
}

(async () => {
  for (const p of projects) {
    console.log("=".repeat(60));
    const proj = await ensureProject(p);
    if (!proj) {
      console.error(`SKIP ${p.name} — setup falhou`);
      continue;
    }
    await setEnvs(proj.id, p.envs);

    // Check latest deployment OR trigger
    const latest = await getLatestDeployment(proj.id);
    if (!latest) {
      console.log(`  no deployments yet — triggering`);
      await triggerDeploy(proj.id, p.name);
    } else {
      console.log(`  latest deployment: ${latest.url} (state: ${latest.state})`);
    }
  }
  console.log("=".repeat(60));
  console.log("DONE. Verifique deployments em https://vercel.com/davi-scholzes-projects");
})();
