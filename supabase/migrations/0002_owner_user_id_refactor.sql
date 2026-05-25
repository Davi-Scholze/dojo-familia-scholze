-- ============================================================================
-- 0002_owner_user_id_refactor.sql
-- ============================================================================
-- Sprint 1a do plano docs/decisoes/2026-05-25_sprint-1a-auth-magic-link-dashboard.md
--
-- Objetivos:
--   1. Singleton seed: 1 row em dojos (Dojô Família Scholze) — idempotente
--   2. Refactor profiles.id: deixa de ser FK direta auth.users(id), vira UUID standalone
--   3. Adiciona profiles.owner_user_id FK auth.users(id) CASCADE NOT NULL
--      → prepara fluxo Sprint 4 "responsável adulto administra profile menor"
--   4. Atualiza function current_user_dojo_id() pra usar owner_user_id
--   5. Recria 3 policies em profiles usando owner_user_id em vez de id
--
-- Pré-condições:
--   - Migration 0001 aplicada (function + 6 policies existem)
--   - auth.users vazio (sem dados reais) — refactor zero-risk
--   - Tabela profiles vazia (nenhuma row a backfillar)
--
-- Rollback disponível em: 0002_owner_user_id_refactor.rollback.sql
-- ============================================================================

BEGIN;

-- =============== 1. SINGLETON DOJO (idempotente) ============================
INSERT INTO public.dojos (nome, slug)
VALUES ('Dojô Família Scholze', 'dojo-familia-scholze')
ON CONFLICT (slug) DO NOTHING;

COMMENT ON TABLE public.dojos IS
    'Tenant raiz (singleton por instância KOD.AI). Sprint 1a: 1 row pra Dojô Família Scholze.';

-- =============== 2. DROP POLICIES E FUNCTION (recriadas abaixo) =============
-- 2a. Policies em profiles
DROP POLICY IF EXISTS profiles_update_self      ON public.profiles;
DROP POLICY IF EXISTS profiles_insert_self      ON public.profiles;
DROP POLICY IF EXISTS profiles_select_same_dojo ON public.profiles;

-- 2b. Policies em dojos (também dependem da function — drop temporário pra recriar idênticas)
DROP POLICY IF EXISTS dojos_update_professor     ON public.dojos;
DROP POLICY IF EXISTS dojos_insert_authenticated ON public.dojos;
DROP POLICY IF EXISTS dojos_select_own           ON public.dojos;

-- 2c. function depende de profiles
DROP FUNCTION IF EXISTS public.current_user_dojo_id();

-- =============== 3. DROP FK profiles.id → auth.users ========================
-- Nome do constraint do schema 0001: profiles_id_fkey (criado por REFERENCES inline)
ALTER TABLE public.profiles
    DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- =============== 4. ALTER profiles.id → UUID standalone =====================
-- Adiciona DEFAULT gen_random_uuid() pra profiles.id (nova row gera UUID novo)
ALTER TABLE public.profiles
    ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- =============== 5. ADD profiles.owner_user_id (FK auth.users CASCADE) ======
ALTER TABLE public.profiles
    ADD COLUMN owner_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE;

COMMENT ON COLUMN public.profiles.owner_user_id IS
    'Adulto autenticado que administra este profile. Adulto-próprio: owner_user_id = profile criado pelo próprio user. Menor: owner_user_id aponta pro responsável (Sprint 4). NOT NULL — todo profile precisa de um administrador.';

CREATE INDEX idx_profiles_owner_user_id ON public.profiles(owner_user_id);

-- =============== 6. RECREATE function current_user_dojo_id() ================
-- Agora resolve via owner_user_id em vez de id
CREATE OR REPLACE FUNCTION public.current_user_dojo_id()
RETURNS uuid
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
    SELECT dojo_id FROM public.profiles WHERE owner_user_id = auth.uid() LIMIT 1
$$;

COMMENT ON FUNCTION public.current_user_dojo_id() IS
    'Retorna dojo_id do user autenticado (resolvido via owner_user_id). SECURITY DEFINER pra evitar recursão RLS. LIMIT 1 — Sprint 1a um user administra 1 profile próprio; Sprint 4 user-responsável pode administrar N (mas todos no mesmo dojo).';

-- =============== 7. RECREATE policies em dojos (idênticas ao 0001) ==========
-- Foram droppadas no step 2b pra liberar function. Recriam idênticas — não mudam lógica.

CREATE POLICY dojos_select_own
    ON public.dojos
    FOR SELECT
    TO authenticated
    USING (id = public.current_user_dojo_id());

CREATE POLICY dojos_insert_authenticated
    ON public.dojos
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY dojos_update_professor
    ON public.dojos
    FOR UPDATE
    TO authenticated
    USING (
        id = public.current_user_dojo_id()
        AND EXISTS (
            SELECT 1 FROM public.profiles
            WHERE owner_user_id = auth.uid() AND role = 'professor'
        )
    )
    WITH CHECK (
        id = public.current_user_dojo_id()
        AND EXISTS (
            SELECT 1 FROM public.profiles
            WHERE owner_user_id = auth.uid() AND role = 'professor'
        )
    );

-- =============== 8. RECREATE policies em profiles (usando owner_user_id) ====

-- SELECT: vê próprio profile + colegas mesmo dojo
CREATE POLICY profiles_select_same_dojo
    ON public.profiles
    FOR SELECT
    TO authenticated
    USING (
        owner_user_id = auth.uid()
        OR dojo_id = public.current_user_dojo_id()
    );

-- INSERT: user só cria profiles com owner_user_id = ele próprio
-- (Sprint 4: responsável pode INSERT com owner_user_id = self mas id ≠ auth.uid() — significa "criando profile pro menor")
CREATE POLICY profiles_insert_self
    ON public.profiles
    FOR INSERT
    TO authenticated
    WITH CHECK (owner_user_id = auth.uid());

-- UPDATE: user só edita profiles que ele administra
CREATE POLICY profiles_update_self
    ON public.profiles
    FOR UPDATE
    TO authenticated
    USING (owner_user_id = auth.uid())
    WITH CHECK (owner_user_id = auth.uid());

COMMIT;

-- ============================================================================
-- FIM da migration 0002_owner_user_id_refactor.sql
-- ============================================================================
