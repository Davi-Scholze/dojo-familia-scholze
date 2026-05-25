-- ============================================================================
-- ROLLBACK de 0001_init_multi_tenant.sql
-- ============================================================================
-- Aplicar apenas em emergência (banco vazio Fase 0, sem dados em produção).
-- Em ambiente com dados reais → NUNCA rodar. Em vez disso, criar migration
-- corretiva 0002_fix_xxx.sql que ajusta o estado.
--
-- Ordem reversa do CREATE: policies → function → indexes → tables → type.
-- ============================================================================

-- Policies dojos
DROP POLICY IF EXISTS dojos_update_professor       ON public.dojos;
DROP POLICY IF EXISTS dojos_insert_authenticated   ON public.dojos;
DROP POLICY IF EXISTS dojos_select_own             ON public.dojos;

-- Policies profiles
DROP POLICY IF EXISTS profiles_update_self         ON public.profiles;
DROP POLICY IF EXISTS profiles_insert_self         ON public.profiles;
DROP POLICY IF EXISTS profiles_select_same_dojo    ON public.profiles;

-- Function (precisa vir antes do DROP TABLE profiles)
DROP FUNCTION IF EXISTS public.current_user_dojo_id();

-- Tables (profiles depende de dojos via FK)
DROP TABLE IF EXISTS public.profiles;
DROP TABLE IF EXISTS public.dojos;

-- Enum type
DROP TYPE IF EXISTS public.user_role;
