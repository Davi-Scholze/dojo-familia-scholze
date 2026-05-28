// Smoke test pós-migration 0003 — Sprint 1b operacional.
// Uso: dotenv -e .env.local -- node scripts/validate-migration-0003.mjs

import { runQuery } from "./db-query.mjs";

const checks = [
  // ============ Tabelas novas (5) ============
  {
    label: "TABLES Sprint 1b (alunos+turmas+aluno_turma+aulas+presencas)",
    sql: "SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name IN ('alunos','turmas','aluno_turma','aulas','presencas') ORDER BY table_name",
    expect: (rows) =>
      rows.length === 5 &&
      rows.map((r) => r.table_name).sort().join(",") ===
        "aluno_turma,alunos,aulas,presencas,turmas",
  },
  // ============ ALTER dojos (12 colunas novas) ============
  {
    label: "ALTER dojos +12 colunas",
    sql: "SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name='dojos' AND column_name IN ('logo_url','banner_url','descricao','modalidades','endereco','whatsapp','instagram_url','youtube_url','plano','trial_inicio','trial_fim','updated_at')",
    expect: (rows) => rows.length === 12,
  },
  // ============ ALTER profiles (5 colunas novas) ============
  {
    label: "ALTER profiles +5 colunas",
    sql: "SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name IN ('foto_url','telefone','modalidade_principal','anos_experiencia','updated_at')",
    expect: (rows) => rows.length === 5,
  },
  // ============ RLS habilitado nas 5 tables novas ============
  {
    label: "RLS habilitado em 5 tables novas",
    sql: "SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname='public' AND tablename IN ('alunos','turmas','aluno_turma','aulas','presencas') ORDER BY tablename",
    expect: (rows) => rows.length === 5 && rows.every((r) => r.rowsecurity === true),
  },
  // ============ POLICIES (17 novas: 4+4+3+3+3) ============
  {
    label: "POLICIES novas (17 = alunos 4 + turmas 4 + aluno_turma 3 + aulas 3 + presencas 3)",
    sql: "SELECT tablename, count(*)::int AS n FROM pg_policies WHERE schemaname='public' AND tablename IN ('alunos','turmas','aluno_turma','aulas','presencas') GROUP BY tablename ORDER BY tablename",
    expect: (rows) => {
      const m = Object.fromEntries(rows.map((r) => [r.tablename, r.n]));
      return (
        m.alunos === 4 &&
        m.turmas === 4 &&
        m.aluno_turma === 3 &&
        m.aulas === 3 &&
        m.presencas === 3
      );
    },
  },
  // ============ TRIGGERS updated_at (6 tables) ============
  {
    label: "TRIGGERS set_updated_at em 6 tables",
    sql: "SELECT trigger_name, event_object_table FROM information_schema.triggers WHERE trigger_schema='public' AND trigger_name LIKE 'trg_%_updated_at' ORDER BY event_object_table",
    expect: (rows) => rows.length === 6,
  },
  // ============ UNIQUE constraints ============
  {
    label: "UNIQUE aulas (turma_id, data, horario_inicio)",
    sql: "SELECT conname FROM pg_constraint WHERE conrelid='public.aulas'::regclass AND contype='u'",
    expect: (rows) => rows.length === 1,
  },
  {
    label: "UNIQUE presencas (aula_id, aluno_id)",
    sql: "SELECT conname FROM pg_constraint WHERE conrelid='public.presencas'::regclass AND contype='u'",
    expect: (rows) => rows.length === 1,
  },
  // ============ INDEXES (11 novos) ============
  {
    label: "INDEXES novos (>=11)",
    sql: "SELECT indexname FROM pg_indexes WHERE schemaname='public' AND tablename IN ('alunos','turmas','aluno_turma','aulas','presencas') AND indexname NOT LIKE '%pkey'",
    expect: (rows) => rows.length >= 11,
  },
  // ============ FUNCTION set_updated_at ============
  {
    label: "FUNCTION set_updated_at",
    sql: "SELECT routine_name FROM information_schema.routines WHERE routine_schema='public' AND routine_name='set_updated_at'",
    expect: (rows) => rows.length === 1,
  },
  // ============ Singleton dojo preservado ============
  {
    label: "SINGLETON dojo preservado (slug=dojo-familia-scholze)",
    sql: "SELECT count(*)::int AS count FROM public.dojos WHERE slug='dojo-familia-scholze'",
    expect: (rows) => rows.length === 1 && rows[0].count === 1,
  },
  // ============ Defaults aplicados ============
  {
    label: "DEFAULT trial em dojos.plano",
    sql: "SELECT column_default FROM information_schema.columns WHERE table_schema='public' AND table_name='dojos' AND column_name='plano'",
    expect: (rows) => rows.length === 1 && /trial/.test(rows[0].column_default || ""),
  },
];

let pass = 0,
  fail = 0;
for (const c of checks) {
  const { status, data } = await runQuery(c.sql);
  const ok = status === 201 && Array.isArray(data) && c.expect(data);
  console.log((ok ? "PASS" : "FAIL") + "  " + c.label);
  console.log("       " + JSON.stringify(data));
  if (ok) pass++;
  else fail++;
}

console.log("");
console.log("=".repeat(60));
console.log("TOTAL: " + pass + " pass / " + fail + " fail");
process.exit(fail === 0 ? 0 : 1);
