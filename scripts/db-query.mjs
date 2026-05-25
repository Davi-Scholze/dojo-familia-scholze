// Utility: roda SQL no Supabase via Management API.
// Uso: SUPABASE_ACCESS_TOKEN=sbp_... node scripts/db-query.mjs "<SQL>"
// OU:  importável de outros scripts.

const PAT = process.env.SUPABASE_ACCESS_TOKEN;
const REF = process.env.SUPABASE_PROJECT_REF || "mubcbbrwoeblvqaiebou";

if (!PAT) {
  console.error("[db-query] SUPABASE_ACCESS_TOKEN env var obrigatório");
  process.exit(1);
}

export async function runQuery(sql) {
  const url = "https://api.supabase.com/v1/projects/" + REF + "/database/query";
  const r = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + PAT,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql }),
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

// CLI mode — robusto contra paths Windows (URL-encoded spaces, backslashes)
const isCli =
  process.argv[1] &&
  import.meta.url.replace(/%20/g, " ").replace(/\\/g, "/").endsWith(
    process.argv[1].replace(/\\/g, "/")
  );

if (isCli) {
  const sql = process.argv[2];
  if (!sql) {
    console.error("Usage: node scripts/db-query.mjs '<SQL>'");
    process.exit(1);
  }
  runQuery(sql).then(({ status, data }) => {
    console.log("HTTP", status);
    console.log(JSON.stringify(data, null, 2));
  });
}
