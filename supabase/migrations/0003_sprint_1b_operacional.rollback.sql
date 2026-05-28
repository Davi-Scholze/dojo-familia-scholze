-- ============================================================================
-- ROLLBACK de 0003_sprint_1b_operacional.sql
-- ============================================================================
-- Aplicar apenas em emergência (sem dados em produção em alunos/turmas/aulas/presencas).
-- Em ambiente com dados reais → NUNCA rodar. Criar migration corretiva 0004_fix_xxx.sql.
--
-- Ordem reversa do CREATE: policies → triggers → indexes → tables → ALTER COLUMNS reverse.
-- ============================================================================

BEGIN;

-- ============================================================================
-- 1. DROP POLICIES (presencas → aulas → aluno_turma → turmas → alunos)
-- ============================================================================
DROP POLICY IF EXISTS presencas_update_professor       ON public.presencas;
DROP POLICY IF EXISTS presencas_insert_professor       ON public.presencas;
DROP POLICY IF EXISTS presencas_select_same_dojo       ON public.presencas;

DROP POLICY IF EXISTS aulas_update_professor           ON public.aulas;
DROP POLICY IF EXISTS aulas_insert_professor           ON public.aulas;
DROP POLICY IF EXISTS aulas_select_same_dojo           ON public.aulas;

DROP POLICY IF EXISTS aluno_turma_delete_professor     ON public.aluno_turma;
DROP POLICY IF EXISTS aluno_turma_insert_professor     ON public.aluno_turma;
DROP POLICY IF EXISTS aluno_turma_select_same_dojo     ON public.aluno_turma;

DROP POLICY IF EXISTS turmas_delete_professor          ON public.turmas;
DROP POLICY IF EXISTS turmas_update_professor          ON public.turmas;
DROP POLICY IF EXISTS turmas_insert_professor          ON public.turmas;
DROP POLICY IF EXISTS turmas_select_same_dojo          ON public.turmas;

DROP POLICY IF EXISTS alunos_delete_professor          ON public.alunos;
DROP POLICY IF EXISTS alunos_update_professor          ON public.alunos;
DROP POLICY IF EXISTS alunos_insert_professor          ON public.alunos;
DROP POLICY IF EXISTS alunos_select_same_dojo          ON public.alunos;

-- ============================================================================
-- 2. DROP TRIGGERS
-- ============================================================================
DROP TRIGGER IF EXISTS trg_presencas_updated_at  ON public.presencas;
DROP TRIGGER IF EXISTS trg_aulas_updated_at      ON public.aulas;
DROP TRIGGER IF EXISTS trg_turmas_updated_at     ON public.turmas;
DROP TRIGGER IF EXISTS trg_alunos_updated_at     ON public.alunos;
DROP TRIGGER IF EXISTS trg_profiles_updated_at   ON public.profiles;
DROP TRIGGER IF EXISTS trg_dojos_updated_at      ON public.dojos;

-- ============================================================================
-- 3. DROP TABLES (presencas → aulas → aluno_turma → turmas → alunos)
-- ============================================================================
DROP TABLE IF EXISTS public.presencas;
DROP TABLE IF EXISTS public.aulas;
DROP TABLE IF EXISTS public.aluno_turma;
DROP TABLE IF EXISTS public.turmas;
DROP TABLE IF EXISTS public.alunos;

-- ============================================================================
-- 4. DROP FUNCTION trigger
-- ============================================================================
DROP FUNCTION IF EXISTS public.set_updated_at();

-- ============================================================================
-- 5. REVERTER ALTER profiles (DROP COLUMN)
-- ============================================================================
ALTER TABLE public.profiles
    DROP COLUMN IF EXISTS updated_at,
    DROP COLUMN IF EXISTS anos_experiencia,
    DROP COLUMN IF EXISTS modalidade_principal,
    DROP COLUMN IF EXISTS telefone,
    DROP COLUMN IF EXISTS foto_url;

-- ============================================================================
-- 6. REVERTER ALTER dojos (DROP COLUMN)
-- ============================================================================
ALTER TABLE public.dojos
    DROP COLUMN IF EXISTS updated_at,
    DROP COLUMN IF EXISTS trial_fim,
    DROP COLUMN IF EXISTS trial_inicio,
    DROP COLUMN IF EXISTS plano,
    DROP COLUMN IF EXISTS youtube_url,
    DROP COLUMN IF EXISTS instagram_url,
    DROP COLUMN IF EXISTS whatsapp,
    DROP COLUMN IF EXISTS endereco,
    DROP COLUMN IF EXISTS modalidades,
    DROP COLUMN IF EXISTS descricao,
    DROP COLUMN IF EXISTS banner_url,
    DROP COLUMN IF EXISTS logo_url;

COMMIT;

-- ============================================================================
-- FIM do rollback. Estado pós-rollback = estado pós-0002.
-- ============================================================================
