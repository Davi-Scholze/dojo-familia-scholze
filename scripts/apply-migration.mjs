// Aplica arquivo SQL no Supabase via Management API.
// Uso: dotenv -e .env.local -- node scripts/apply-migration.mjs <path/to/migration.sql>

import { readFileSync } from "node:fs";
import { runQuery } from "./db-query.mjs";

const file = process.argv[2];
if (!file) {
  console.error("Usage: node scripts/apply-migration.mjs <path/to/migration.sql>");
  process.exit(1);
}

const sql = readFileSync(file, "utf-8");
console.log("[apply-migration] applying " + file + " (" + sql.length + " chars)");

const { status, data } = await runQuery(sql);
console.log("HTTP " + status);
console.log(typeof data === "string" ? data : JSON.stringify(data, null, 2));
process.exit(status >= 200 && status < 300 ? 0 : 1);
