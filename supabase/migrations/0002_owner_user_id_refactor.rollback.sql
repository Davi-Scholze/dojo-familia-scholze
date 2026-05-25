-- ============================================================================
-- ROLLBACK de 0002_owner_user_id_refactor.sql
-- ============================================================================
-- Aplicar apenas em emergência (banco com auth.users vazio ou em dev).
-- Em ambiente com dados reais → NÃO rodar — criar migration 0003 corretiva.
--
-- Reverte schema pro estado pós-migration 0001.
-- ============================================================================

BEGIN;

-- 1. DROP policies novas (com owner_user_id)
DROP POLICY IF EXISTS profiles_update_self      ON public.profiles;
DROP POLICY IF EXISTS profiles_insert_self      ON public.profiles;
DROP POLICY IF EXISTS profiles_select_same_dojo ON public.profiles;

-- 2. DROP function nova
DROP FUNCTION IF EXISTS public.current_user_dojo_id();

-- 3. DROP index novo
DROP INDEX IF EXISTS public.idx_profiles_owner_user_id;

-- 4. DROP coluna owner_user_id
ALTER TABLE public.profiles
    DROP COLUMN IF EXISTS owner_user_id;

-- 5. Restaura DEFAULT inicial de profiles.id (sem default, pq antes era FK auth.users)
ALTER TABLE public.profiles
    ALTER COLUMN id DROP DEFAULT;

-- 6. Re-adiciona FK profiles.id → auth.users(id) CASCADE
ALTER TABLE public.profiles
    ADD CONSTRAINT profiles_id_fkey
    FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- 7. Recria function original (com WHERE id = auth.uid())
CREATE OR REPLACE FUNCTION public.current_user_dojo_id()
RETURNS uuid
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
    SELECT dojo_id FROM public.profiles WHERE id = auth.uid()
$$;

-- 8. Recria 3 policies originais (com id = auth.uid())
CREATE POLICY profiles_select_same_dojo
    ON public.profiles FOR SELECT TO authenticated
    USING (id = auth.uid() OR dojo_id = public.current_user_dojo_id());

CREATE POLICY profiles_insert_self
    ON public.profiles FOR INSERT TO authenticated
    WITH CHECK (id = auth.uid());

CREATE POLICY profiles_update_self
    ON public.profiles FOR UPDATE TO authenticated
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- 9. Singleton dojo: opcional remover (deixar quieto pra não perder ref)
-- DELETE FROM public.dojos WHERE slug = 'dojo-familia-scholze';

COMMIT;
