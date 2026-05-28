// Regenera packages/supabase/src/types.ts a partir do schema atual via Management API.
// Uso: dotenv -e .env.local -- node scripts/gen-supabase-types.mjs

import { writeFileSync } from "node:fs";

const PAT = process.env.SUPABASE_ACCESS_TOKEN;
const REF = process.env.SUPABASE_PROJECT_REF || "mubcbbrwoeblvqaiebou";

if (!PAT) {
  console.error("[gen-types] SUPABASE_ACCESS_TOKEN env var obrigatório");
  process.exit(1);
}

const url =
  "https://api.supabase.com/v1/projects/" + REF + "/types/typescript?included_schemas=public";

const r = await fetch(url, {
  headers: { Authorization: "Bearer " + PAT },
});

if (!r.ok) {
  console.error("[gen-types] HTTP " + r.status);
  console.error(await r.text());
  process.exit(1);
}

const body = await r.json();
const ts = body.types;

const out = "packages/supabase/src/types.ts";
writeFileSync(out, ts);
console.log("[gen-types] " + ts.length + " chars escritos em " + out);
