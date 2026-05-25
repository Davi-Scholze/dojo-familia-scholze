-- ============================================================================
-- 0001_init_multi_tenant.sql
-- ============================================================================
-- Schema inicial multi-tenant — Dojô Família Scholze
-- Fase 0 do plano `docs/decisoes/2026-05-25_fase-0-setup-dojo-scaffold.md`
--
-- Escopo:
--   * 1 enum type: user_role
--   * 2 tables: dojos (tenant), profiles (extends auth.users)
--   * 1 index: idx_profiles_dojo_id
--   * 1 SECURITY DEFINER function: current_user_dojo_id() (evita recursão RLS)
--   * 6 policies RLS (3 em profiles, 3 em dojos)
--
-- Rollback disponível em: 0001_init_multi_tenant.rollback.sql
-- ============================================================================

-- =============== ENUM ROLE ===================================================
CREATE TYPE public.user_role AS ENUM (
    'professor',
    'aluno',
    'responsavel',
    'admin'
);

COMMENT ON TYPE public.user_role IS
    'Papel do profile dentro de um dojo. Sprint 1+ pode adicionar valores via ALTER TYPE.';

-- =============== TABLE: dojos ================================================
CREATE TABLE public.dojos (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    nome        text NOT NULL CHECK (char_length(nome) BETWEEN 2 AND 120),
    slug        text NOT NULL UNIQUE
                    CHECK (slug ~ '^[a-z0-9-]+$' AND char_length(slug) BETWEEN 2 AND 60),
    created_at  timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.dojos IS
    'Tenant raiz — academias/unidades. Cada profile pertence a no máximo 1 dojo.';
COMMENT ON COLUMN public.dojos.slug IS
    'Identificador URL-safe (lowercase + dígitos + hífens). Imutável após criação.';

-- =============== TABLE: profiles =============================================
CREATE TABLE public.profiles (
    id          uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    dojo_id     uuid REFERENCES public.dojos(id) ON DELETE RESTRICT,
    role        public.user_role NOT NULL DEFAULT 'aluno',
    full_name   text CHECK (full_name IS NULL OR char_length(full_name) BETWEEN 2 AND 150),
    created_at  timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.profiles IS
    'Extends auth.users com dojo_id (tenant) + role. RLS isola por dojo via current_user_dojo_id().';
COMMENT ON COLUMN public.profiles.dojo_id IS
    'NULL no signup inicial (antes do user escolher/criar dojo). Sprint 1 trata fluxo.';

CREATE INDEX idx_profiles_dojo_id ON public.profiles(dojo_id);

-- =============== RLS HABILITADO (explícito) ==================================
-- "Enable automatic RLS" do project já faz isso, mas redundância é defesa.
ALTER TABLE public.dojos    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- =============== FUNCTION: current_user_dojo_id() ============================
-- SECURITY DEFINER bypassa RLS pra evitar recursão infinita ao avaliar policies
-- que leem profiles a partir de policies que filtram profiles.
-- STABLE permite o planner cachear dentro da mesma query.
CREATE OR REPLACE FUNCTION public.current_user_dojo_id()
RETURNS uuid
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
    SELECT dojo_id FROM public.profiles WHERE id = auth.uid()
$$;

COMMENT ON FUNCTION public.current_user_dojo_id() IS
    'Retorna dojo_id do user autenticado. SECURITY DEFINER pra evitar recursão RLS.';

-- =============== POLICIES: profiles ==========================================

-- SELECT: user vê próprio profile + colegas do mesmo dojo
CREATE POLICY profiles_select_same_dojo
    ON public.profiles
    FOR SELECT
    TO authenticated
    USING (
        id = auth.uid()
        OR dojo_id = public.current_user_dojo_id()
    );

-- INSERT: user só cria próprio profile (no signup)
CREATE POLICY profiles_insert_self
    ON public.profiles
    FOR INSERT
    TO authenticated
    WITH CHECK (id = auth.uid());

-- UPDATE: user só edita próprio profile
CREATE POLICY profiles_update_self
    ON public.profiles
    FOR UPDATE
    TO authenticated
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- =============== POLICIES: dojos =============================================

-- SELECT: user vê apenas seu próprio dojo
CREATE POLICY dojos_select_own
    ON public.dojos
    FOR SELECT
    TO authenticated
    USING (id = public.current_user_dojo_id());

-- INSERT: qualquer authenticated cria dojo (Sprint 1+ restringe a 1 por user via trigger)
CREATE POLICY dojos_insert_authenticated
    ON public.dojos
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- UPDATE: só professor do próprio dojo edita
CREATE POLICY dojos_update_professor
    ON public.dojos
    FOR UPDATE
    TO authenticated
    USING (
        id = public.current_user_dojo_id()
        AND EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'professor'
        )
    )
    WITH CHECK (
        id = public.current_user_dojo_id()
        AND EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'professor'
        )
    );

-- ============================================================================
-- FIM da migration 0001_init_multi_tenant.sql
-- Próxima migration: 0002 (Sprint 1) — turmas + alunos detalhados + presença
-- ============================================================================
