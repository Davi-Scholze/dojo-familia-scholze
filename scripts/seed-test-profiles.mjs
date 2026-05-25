// Cria 3 test profiles no banco de dev via Auth Admin API + Management API.
// Davi usa pra testar fluxos (login Magic Link, dashboard, RLS) sem virar admin real.
//
// Uso (com env vars do .env.local raiz):
//   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... SUPABASE_ACCESS_TOKEN=... \
//   SUPABASE_PROJECT_REF=... SUPABASE_REDIRECT_URL=... node scripts/seed-test-profiles.mjs
//
// Idempotente: rodar 2x não duplica (verifica existência antes).
// Output: 3 URLs Magic Link prontas pra colar no browser e fazer auto-login.

const URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const PAT = process.env.SUPABASE_ACCESS_TOKEN;
const REF = process.env.SUPABASE_PROJECT_REF;
const REDIRECT_TO =
  process.env.SUPABASE_REDIRECT_URL ?? "http://localhost:3000/auth/callback";

if (!URL || !SERVICE_KEY || !PAT || !REF) {
  console.error(
    "[seed-test-profiles] env vars obrigatórias: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_ACCESS_TOKEN, SUPABASE_PROJECT_REF"
  );
  process.exit(1);
}

const profiles = [
  {
    email: "admin@test.local",
    password: "AdminTeste123!",
    full_name: "Admin Teste",
    role: "admin",
  },
  {
    email: "professor1@test.local",
    password: "Prof1Teste123!",
    full_name: "Professor Um (Teste)",
    role: "professor",
  },
  {
    email: "professor2@test.local",
    password: "Prof2Teste123!",
    full_name: "Professor Dois (Teste)",
    role: "professor",
  },
];

// === Auth Admin API helpers ===

async function listUserByEmail(email) {
  const r = await fetch(`${URL}/auth/v1/admin/users?email=${encodeURIComponent(email)}`, {
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
    },
  });
  if (!r.ok) {
    throw new Error(`listUserByEmail ${email}: HTTP ${r.status} ${await r.text()}`);
  }
  const data = await r.json();
  // Supabase Admin retorna { users: [...] } OU array direto dependendo da versão
  const users = Array.isArray(data) ? data : data.users ?? [];
  return users.find((u) => u.email === email) ?? null;
}

async function createUser({ email, password, full_name }) {
  const r = await fetch(`${URL}/auth/v1/admin/users`, {
    method: "POST",
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name },
    }),
  });
  if (!r.ok) {
    throw new Error(`createUser ${email}: HTTP ${r.status} ${await r.text()}`);
  }
  return r.json();
}

async function generateMagicLink({ email }) {
  // Supabase Auth Admin API: redirect_to é TOP-LEVEL no body (não dentro de options)
  const r = await fetch(`${URL}/auth/v1/admin/generate_link`, {
    method: "POST",
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "magiclink",
      email,
      redirect_to: REDIRECT_TO,
    }),
  });
  if (!r.ok) {
    throw new Error(`generateMagicLink ${email}: HTTP ${r.status} ${await r.text()}`);
  }
  return r.json();
}

// === Management API SQL helper ===

async function runSql(sql, params = []) {
  const r = await fetch(`https://api.supabase.com/v1/projects/${REF}/database/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PAT}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql, params }),
  });
  if (!r.ok) {
    throw new Error(`runSql: HTTP ${r.status} ${await r.text()}`);
  }
  return r.json();
}

// === Main ===

(async () => {
  console.log("=".repeat(60));
  console.log("SEED TEST PROFILES — dojo-familia-scholze");
  console.log("=".repeat(60));

  // Singleton dojo_id
  const [dojo] = await runSql(
    "SELECT id FROM public.dojos WHERE slug='dojo-familia-scholze' LIMIT 1"
  );
  if (!dojo?.id) {
    console.error("[seed] singleton dojo não existe — rode migration 0002 antes");
    process.exit(1);
  }
  const dojoId = dojo.id;
  console.log(`singleton dojo_id: ${dojoId}\n`);

  const magicLinks = [];

  for (const p of profiles) {
    console.log(`--- ${p.email} (${p.role}) ---`);

    // 1. Check existence
    let user = await listUserByEmail(p.email);
    if (user) {
      console.log(`  user já existe (id=${user.id}) — SKIP create`);
    } else {
      user = await createUser(p);
      console.log(`  user CREATED id=${user.id}`);
    }

    // 2. Check profile existence
    const existingProfile = await runSql(
      `SELECT id FROM public.profiles WHERE owner_user_id = '${user.id}' LIMIT 1`
    );
    if (existingProfile.length > 0) {
      console.log(`  profile já existe (id=${existingProfile[0].id}) — SKIP create`);
    } else {
      const profileRows = await runSql(
        `INSERT INTO public.profiles (owner_user_id, dojo_id, role, full_name)
         VALUES ('${user.id}', '${dojoId}', '${p.role}', '${p.full_name}')
         RETURNING id`
      );
      console.log(`  profile CREATED id=${profileRows[0].id}`);
    }

    // 3. Generate Magic Link (dev — clicar/colar URL no browser)
    const link = await generateMagicLink({ email: p.email });
    magicLinks.push({ email: p.email, role: p.role, link: link.properties?.action_link ?? link.action_link });

    console.log("");
  }

  console.log("=".repeat(60));
  console.log("MAGIC LINKS DEV (cole no browser pra logar como cada role)");
  console.log("=".repeat(60));
  for (const ml of magicLinks) {
    console.log(`\n[${ml.role}] ${ml.email}`);
    console.log(`  ${ml.link}`);
  }
  console.log("\n=".repeat(60));
  console.log("Senhas (caso /login adicione password auth no futuro):");
  for (const p of profiles) {
    console.log(`  ${p.email} — ${p.password}`);
  }
  console.log("=".repeat(60));
})();
