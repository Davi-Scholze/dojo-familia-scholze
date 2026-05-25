import { runQuery } from "./db-query.mjs";

const checks = [
  {
    label: "TABLES (public schema)",
    sql: "SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name",
    expect: (rows) => rows.length === 2 && rows.map(r => r.table_name).sort().join(",") === "dojos,profiles",
  },
  {
    label: "RLS habilitado",
    sql: "SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname='public' ORDER BY tablename",
    expect: (rows) => rows.length === 2 && rows.every(r => r.rowsecurity === true),
  },
  {
    label: "POLICIES",
    sql: "SELECT tablename, policyname, cmd FROM pg_policies WHERE schemaname='public' ORDER BY tablename, policyname",
    expect: (rows) => rows.length === 6,
  },
  {
    label: "FUNCTION current_user_dojo_id (DEFINER)",
    sql: "SELECT routine_name, security_type FROM information_schema.routines WHERE routine_schema='public' AND routine_type='FUNCTION' AND routine_name='current_user_dojo_id'",
    expect: (rows) => rows.length === 1 && rows[0].security_type === "DEFINER",
    // Nota: Supabase também cria rls_auto_enable() automaticamente pelo setting "Enable automatic RLS" — não é meu, esperado.
  },
  {
    label: "ENUM user_role",
    sql: "SELECT enumlabel FROM pg_enum WHERE enumtypid = (SELECT oid FROM pg_type WHERE typname='user_role') ORDER BY enumsortorder",
    expect: (rows) => rows.length === 4,
  },
  {
    label: "INDEX idx_profiles_dojo_id",
    sql: "SELECT indexname FROM pg_indexes WHERE schemaname='public' AND indexname='idx_profiles_dojo_id'",
    expect: (rows) => rows.length === 1,
  },
  // ============ NOVOS CHECKS pós-migration 0002 ============
  {
    label: "SINGLETON dojo (Sprint 1a)",
    sql: "SELECT count(*)::int as count FROM public.dojos WHERE slug='dojo-familia-scholze'",
    expect: (rows) => rows.length === 1 && rows[0].count === 1,
  },
  {
    label: "COLUMN profiles.owner_user_id (NOT NULL, FK auth.users CASCADE)",
    sql: "SELECT column_name, is_nullable, data_type FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='owner_user_id'",
    expect: (rows) => rows.length === 1 && rows[0].is_nullable === "NO" && rows[0].data_type === "uuid",
  },
  {
    label: "FK profiles_owner_user_id_fkey ON DELETE CASCADE",
    sql: "SELECT confdeltype FROM pg_constraint WHERE conname='profiles_owner_user_id_fkey'",
    expect: (rows) => rows.length === 1 && rows[0].confdeltype === "c",
  },
  {
    label: "INDEX idx_profiles_owner_user_id",
    sql: "SELECT indexname FROM pg_indexes WHERE schemaname='public' AND indexname='idx_profiles_owner_user_id'",
    expect: (rows) => rows.length === 1,
  },
];

let pass = 0, fail = 0;
for (const c of checks) {
  const { status, data } = await runQuery(c.sql);
  const ok = status === 201 && Array.isArray(data) && c.expect(data);
  console.log((ok ? "PASS" : "FAIL") + "  " + c.label);
  console.log("       " + JSON.stringify(data));
  if (ok) pass++; else fail++;
}

console.log("");
console.log("=".repeat(60));
console.log("TOTAL: " + pass + " pass / " + fail + " fail");
process.exit(fail === 0 ? 0 : 1);
