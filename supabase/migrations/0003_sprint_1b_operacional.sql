-- ============================================================================
-- 0003_sprint_1b_operacional.sql
-- ============================================================================
-- Schema operacional Sprint 1b — Dojô Família Scholze
-- Spec: docs/decisoes/2026-05-28_sprint-1b-app-operacional-professor.md (a criar)
--
-- Objetivos:
--   1. Expandir dojos (12 colunas: branding + endereço + redes + plano + trial)
--   2. Expandir profiles (4 colunas: foto + telefone + modalidade + experiência)
--   3. Criar tabela alunos (separada de profiles — suporta menor sem login)
--   4. Criar tabela turmas (com horário recorrente em jsonb)
--   5. Criar tabela aluno_turma (N:N matrícula)
--   6. Criar tabela aulas (instâncias de turmas — geradas lazy)
--   7. Criar tabela presencas (RSVP + presença real em 1 row, UNIQUE por aula+aluno)
--   8. Trigger set_updated_at em todas as 6 tabelas tenant-scoped
--   9. 15 RLS policies (tenant isolation via current_user_dojo_id())
--
-- Pré-condições:
--   - Migrations 0001 + 0002 aplicadas (dojos + profiles + current_user_dojo_id())
--   - 1 row singleton em dojos ('Dojô Família Scholze')
--   - Banco vazio em auth.users + profiles
--
-- Rollback: 0003_sprint_1b_operacional.rollback.sql adjacente
-- ============================================================================

BEGIN;

-- ============================================================================
-- 1. EXPANDIR dojos (branding + endereço + redes + plano + trial)
-- ============================================================================
ALTER TABLE public.dojos
    ADD COLUMN logo_url        text,
    ADD COLUMN banner_url      text,
    ADD COLUMN descricao       text,
    ADD COLUMN modalidades     text[]      NOT NULL DEFAULT '{}',
    ADD COLUMN endereco        text,
    ADD COLUMN whatsapp        text,
    ADD COLUMN instagram_url   text,
    ADD COLUMN youtube_url     text,
    ADD COLUMN plano           text        NOT NULL DEFAULT 'trial'
                                CHECK (plano IN ('trial','basico','intermediario','premium')),
    ADD COLUMN trial_inicio    date        NOT NULL DEFAULT CURRENT_DATE,
    ADD COLUMN trial_fim       date        NOT NULL DEFAULT (CURRENT_DATE + interval '30 days'),
    ADD COLUMN updated_at      timestamptz NOT NULL DEFAULT now();

COMMENT ON COLUMN public.dojos.modalidades IS
    'Array de modalidades praticadas: judo, jiu-jitsu. Pode crescer Fase 4.';
COMMENT ON COLUMN public.dojos.plano IS
    'Plano SaaS atual. Trial = 30d grátis sem cartão (decisão MVP 2026-05-13).';

-- ============================================================================
-- 2. EXPANDIR profiles (metadata adicional usuário — foto + contato + profissional)
-- ============================================================================
ALTER TABLE public.profiles
    ADD COLUMN foto_url             text,
    ADD COLUMN telefone             text,
    ADD COLUMN modalidade_principal text
                                CHECK (modalidade_principal IS NULL
                                       OR modalidade_principal IN ('judo','jiu-jitsu','ambos')),
    ADD COLUMN anos_experiencia     integer
                                CHECK (anos_experiencia IS NULL OR anos_experiencia >= 0),
    ADD COLUMN updated_at           timestamptz NOT NULL DEFAULT now();

COMMENT ON COLUMN public.profiles.modalidade_principal IS
    'Aplica-se a profiles role=professor. NULL pra aluno/responsavel.';
COMMENT ON COLUMN public.profiles.anos_experiencia IS
    'Aplica-se a profiles role=professor. Anos de prática/docência.';

-- ============================================================================
-- 3. CREATE TABLE alunos (separada de profiles — suporta menor sem login)
-- ============================================================================
CREATE TABLE public.alunos (
    id                              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    dojo_id                         uuid NOT NULL REFERENCES public.dojos(id) ON DELETE RESTRICT,

    -- Vínculo opcional com profile (quando aluno tem login próprio)
    profile_id                      uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
    -- Responsável (obrigatório se < 18 — validado no app, não DB, porque CURRENT_DATE não é IMMUTABLE)
    responsavel_profile_id          uuid REFERENCES public.profiles(id) ON DELETE SET NULL,

    -- Identificação
    nome_completo                   text NOT NULL CHECK (char_length(nome_completo) BETWEEN 2 AND 150),
    apelido                         text CHECK (apelido IS NULL OR char_length(apelido) BETWEEN 1 AND 60),
    foto_url                        text,
    data_nascimento                 date NOT NULL,
    genero                          text CHECK (genero IS NULL OR genero IN ('masculino','feminino','outro','prefiro-nao-dizer')),

    -- Contato (do aluno, pra notificações quando sem profile_id)
    telefone                        text,
    email                           text,

    -- Treino + graduação
    modalidade_principal            text NOT NULL DEFAULT 'ambos'
                                    CHECK (modalidade_principal IN ('judo','jiu-jitsu','ambos')),
    faixa_atual                     text NOT NULL DEFAULT 'branca',
    graus                           integer NOT NULL DEFAULT 0 CHECK (graus BETWEEN 0 AND 4),
    data_graduacao_atual            date,

    -- Dados sensíveis (LGPD — encapsulados em jsonb pra DSR/anonimização futura)
    dados_medicos                   jsonb NOT NULL DEFAULT '{}'::jsonb,
    contato_emergencia_nome         text,
    contato_emergencia_telefone     text,
    contato_emergencia_parentesco   text,

    -- Status na academia
    status                          text NOT NULL DEFAULT 'ativo'
                                    CHECK (status IN ('ativo','inativo','trancado')),
    data_matricula                  date NOT NULL DEFAULT CURRENT_DATE,
    observacoes                     text,

    -- LGPD compliance
    termo_lgpd_aceito_em            timestamptz,

    created_at                      timestamptz NOT NULL DEFAULT now(),
    updated_at                      timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.alunos IS
    'Aluno da academia. Separado de profiles — menor pode existir sem auth.users (responsavel administra).';
COMMENT ON COLUMN public.alunos.responsavel_profile_id IS
    'Obrigatório se aluno < 18 anos (validado em Zod + Server Action — CURRENT_DATE não é IMMUTABLE no CHECK).';
COMMENT ON COLUMN public.alunos.dados_medicos IS
    'Jsonb encapsulado: alergias, condicoes, medicacoes, observacoes. LGPD: dados sensíveis isolados pra DSR/anonimização.';

CREATE INDEX idx_alunos_dojo_id                ON public.alunos(dojo_id);
CREATE INDEX idx_alunos_profile_id             ON public.alunos(profile_id);
CREATE INDEX idx_alunos_responsavel_profile_id ON public.alunos(responsavel_profile_id);
CREATE INDEX idx_alunos_status_ativo           ON public.alunos(dojo_id) WHERE status = 'ativo';

-- ============================================================================
-- 4. CREATE TABLE turmas (horário recorrente em jsonb)
-- ============================================================================
CREATE TABLE public.turmas (
    id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    dojo_id             uuid NOT NULL REFERENCES public.dojos(id) ON DELETE RESTRICT,

    nome                text NOT NULL CHECK (char_length(nome) BETWEEN 2 AND 100),
    modalidade          text NOT NULL CHECK (modalidade IN ('judo','jiu-jitsu','ambos')),
    descricao           text,
    faixa_etaria        text NOT NULL DEFAULT 'livre'
                        CHECK (faixa_etaria IN ('infantil','adolescente','adulto','livre')),
    nivel               text NOT NULL DEFAULT 'livre'
                        CHECK (nivel IN ('iniciante','intermediario','avancado','livre')),

    -- Horário recorrente: array de {dia, inicio, fim}
    -- Ex: [{"dia":"ter","inicio":"17:00","fim":"18:30"},{"dia":"qui","inicio":"17:00","fim":"18:30"}]
    -- Dia: seg|ter|qua|qui|sex|sab|dom
    horario_recorrente  jsonb NOT NULL DEFAULT '[]'::jsonb,

    capacidade_max      integer CHECK (capacidade_max IS NULL OR capacidade_max > 0),
    cor                 text NOT NULL DEFAULT '#dc2626' CHECK (cor ~ '^#[0-9a-fA-F]{6}$'),

    status              text NOT NULL DEFAULT 'ativa'
                        CHECK (status IN ('ativa','pausada','encerrada')),

    created_at          timestamptz NOT NULL DEFAULT now(),
    updated_at          timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.turmas IS
    'Turma da academia (modalidade + horário recorrente). Aulas instanciadas lazy a partir de horario_recorrente.';
COMMENT ON COLUMN public.turmas.horario_recorrente IS
    'Jsonb array: [{"dia":"ter","inicio":"17:00","fim":"18:30"}]. Sprint 2 normaliza se queries complexas exigirem.';
COMMENT ON COLUMN public.turmas.cor IS
    'Cor hex pra UI timeline dashboard (default dojo-red). Validada via regex.';

CREATE INDEX idx_turmas_dojo_id      ON public.turmas(dojo_id);
CREATE INDEX idx_turmas_status_ativa ON public.turmas(dojo_id) WHERE status = 'ativa';

-- ============================================================================
-- 5. CREATE TABLE aluno_turma (N:N matrícula)
-- ============================================================================
CREATE TABLE public.aluno_turma (
    aluno_id        uuid NOT NULL REFERENCES public.alunos(id) ON DELETE CASCADE,
    turma_id        uuid NOT NULL REFERENCES public.turmas(id) ON DELETE CASCADE,
    matriculado_em  timestamptz NOT NULL DEFAULT now(),
    status          text NOT NULL DEFAULT 'ativo'
                    CHECK (status IN ('ativo','desligado','trancado')),
    PRIMARY KEY (aluno_id, turma_id)
);

COMMENT ON TABLE public.aluno_turma IS
    'Matrícula N:N aluno-turma. Aluno pode estar em N turmas; turma tem N alunos.';

CREATE INDEX idx_aluno_turma_turma_id ON public.aluno_turma(turma_id);

-- ============================================================================
-- 6. CREATE TABLE aulas (instâncias de turmas — geradas lazy via upsert)
-- ============================================================================
CREATE TABLE public.aulas (
    id                      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    dojo_id                 uuid NOT NULL REFERENCES public.dojos(id) ON DELETE RESTRICT,
    turma_id                uuid NOT NULL REFERENCES public.turmas(id) ON DELETE CASCADE,

    data                    date NOT NULL,
    horario_inicio          time NOT NULL,
    horario_fim             time NOT NULL CHECK (horario_fim > horario_inicio),

    -- Planejamento pré-aula
    foco_do_dia             text,
    objetivos               text,
    midia_anexa             jsonb NOT NULL DEFAULT '[]'::jsonb,

    -- Fechamento pós-aula
    planejamento_cumprido   boolean,
    observacoes_gerais      text,
    fechada_em              timestamptz,

    created_at              timestamptz NOT NULL DEFAULT now(),
    updated_at              timestamptz NOT NULL DEFAULT now(),

    -- 1 aula por turma + data + horário (idempotência do upsert lazy)
    UNIQUE (turma_id, data, horario_inicio)
);

COMMENT ON TABLE public.aulas IS
    'Instância concreta de uma turma em data + horário. Gerada lazy quando dashboard "hoje" acessa.';
COMMENT ON COLUMN public.aulas.midia_anexa IS
    'Jsonb array: [{"tipo":"video|link|texto","url":"...","descricao":"..."}]. Visível pros alunos no app deles.';
COMMENT ON COLUMN public.aulas.fechada_em IS
    'NULL = aula aberta. NOT NULL = professor encerrou e consolidou.';

CREATE INDEX idx_aulas_dojo_id_data  ON public.aulas(dojo_id, data);
CREATE INDEX idx_aulas_turma_id_data ON public.aulas(turma_id, data);

-- ============================================================================
-- 7. CREATE TABLE presencas (RSVP + presença real em 1 row)
-- ============================================================================
CREATE TABLE public.presencas (
    id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    aula_id             uuid NOT NULL REFERENCES public.aulas(id) ON DELETE CASCADE,
    aluno_id            uuid NOT NULL REFERENCES public.alunos(id) ON DELETE CASCADE,

    -- RSVP pré-aula (preenchido pelo aluno/responsavel no app)
    rsvp_status         text CHECK (rsvp_status IS NULL OR rsvp_status IN ('vou','nao_vou')),
    rsvp_em             timestamptz,
    rsvp_mensagem       text,

    -- Presença real (preenchida pelo professor durante/após aula)
    presenca_status     text CHECK (presenca_status IS NULL OR presenca_status IN ('presente','ausente','justificada')),
    presenca_em         timestamptz,
    marcada_por         uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
    justificativa       text,

    -- Feedback pós-aula individual
    feedback_professor  text,

    created_at          timestamptz NOT NULL DEFAULT now(),
    updated_at          timestamptz NOT NULL DEFAULT now(),

    -- 1 registro por aluno por aula
    UNIQUE (aula_id, aluno_id)
);

COMMENT ON TABLE public.presencas IS
    'RSVP + presença real + feedback individual. 1 row por (aula, aluno). Bruto fluxos-final 2026-05-21 §1.1.';
COMMENT ON COLUMN public.presencas.rsvp_mensagem IS
    'Aviso prévio do aluno (ex: "dedo machucado, vou treinar leve"). Mostra ícone alerta no card do professor.';
COMMENT ON COLUMN public.presencas.marcada_por IS
    'Profile que registrou a presença (geralmente professor). NULL se aluno auto-confirmou via RSVP "vou".';

CREATE INDEX idx_presencas_aula_id  ON public.presencas(aula_id);
CREATE INDEX idx_presencas_aluno_id ON public.presencas(aluno_id);

-- ============================================================================
-- 8. TRIGGER set_updated_at — auto-atualiza updated_at em UPDATE
-- ============================================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at := now();
    RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.set_updated_at() IS
    'Trigger genérico — atualiza updated_at em UPDATE. Aplicado em todas tabelas tenant-scoped.';

CREATE TRIGGER trg_dojos_updated_at      BEFORE UPDATE ON public.dojos      FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_profiles_updated_at   BEFORE UPDATE ON public.profiles   FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_alunos_updated_at     BEFORE UPDATE ON public.alunos     FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_turmas_updated_at     BEFORE UPDATE ON public.turmas     FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_aulas_updated_at      BEFORE UPDATE ON public.aulas      FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_presencas_updated_at  BEFORE UPDATE ON public.presencas  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- 9. RLS — habilitar nas 5 tables novas
-- ============================================================================
ALTER TABLE public.alunos      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.turmas      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aluno_turma ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aulas       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.presencas   ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 10. POLICIES — alunos (tenant isolation; professor escreve, todos do dojo leem)
-- ============================================================================

CREATE POLICY alunos_select_same_dojo
    ON public.alunos FOR SELECT TO authenticated
    USING (dojo_id = public.current_user_dojo_id());

CREATE POLICY alunos_insert_professor
    ON public.alunos FOR INSERT TO authenticated
    WITH CHECK (
        dojo_id = public.current_user_dojo_id()
        AND EXISTS (
            SELECT 1 FROM public.profiles
            WHERE owner_user_id = auth.uid() AND role = 'professor'
        )
    );

CREATE POLICY alunos_update_professor
    ON public.alunos FOR UPDATE TO authenticated
    USING (
        dojo_id = public.current_user_dojo_id()
        AND EXISTS (
            SELECT 1 FROM public.profiles
            WHERE owner_user_id = auth.uid() AND role = 'professor'
        )
    )
    WITH CHECK (dojo_id = public.current_user_dojo_id());

CREATE POLICY alunos_delete_professor
    ON public.alunos FOR DELETE TO authenticated
    USING (
        dojo_id = public.current_user_dojo_id()
        AND EXISTS (
            SELECT 1 FROM public.profiles
            WHERE owner_user_id = auth.uid() AND role = 'professor'
        )
    );

-- ============================================================================
-- 11. POLICIES — turmas (tenant isolation; professor escreve)
-- ============================================================================

CREATE POLICY turmas_select_same_dojo
    ON public.turmas FOR SELECT TO authenticated
    USING (dojo_id = public.current_user_dojo_id());

CREATE POLICY turmas_insert_professor
    ON public.turmas FOR INSERT TO authenticated
    WITH CHECK (
        dojo_id = public.current_user_dojo_id()
        AND EXISTS (
            SELECT 1 FROM public.profiles
            WHERE owner_user_id = auth.uid() AND role = 'professor'
        )
    );

CREATE POLICY turmas_update_professor
    ON public.turmas FOR UPDATE TO authenticated
    USING (
        dojo_id = public.current_user_dojo_id()
        AND EXISTS (
            SELECT 1 FROM public.profiles
            WHERE owner_user_id = auth.uid() AND role = 'professor'
        )
    )
    WITH CHECK (dojo_id = public.current_user_dojo_id());

CREATE POLICY turmas_delete_professor
    ON public.turmas FOR DELETE TO authenticated
    USING (
        dojo_id = public.current_user_dojo_id()
        AND EXISTS (
            SELECT 1 FROM public.profiles
            WHERE owner_user_id = auth.uid() AND role = 'professor'
        )
    );

-- ============================================================================
-- 12. POLICIES — aluno_turma (derivada via alunos.dojo_id)
-- ============================================================================

CREATE POLICY aluno_turma_select_same_dojo
    ON public.aluno_turma FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.alunos a
            WHERE a.id = aluno_turma.aluno_id
              AND a.dojo_id = public.current_user_dojo_id()
        )
    );

CREATE POLICY aluno_turma_insert_professor
    ON public.aluno_turma FOR INSERT TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.alunos a
            WHERE a.id = aluno_id
              AND a.dojo_id = public.current_user_dojo_id()
        )
        AND EXISTS (
            SELECT 1 FROM public.profiles
            WHERE owner_user_id = auth.uid() AND role = 'professor'
        )
    );

CREATE POLICY aluno_turma_delete_professor
    ON public.aluno_turma FOR DELETE TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.alunos a
            WHERE a.id = aluno_turma.aluno_id
              AND a.dojo_id = public.current_user_dojo_id()
        )
        AND EXISTS (
            SELECT 1 FROM public.profiles
            WHERE owner_user_id = auth.uid() AND role = 'professor'
        )
    );

-- ============================================================================
-- 13. POLICIES — aulas (tenant isolation; professor escreve)
-- ============================================================================

CREATE POLICY aulas_select_same_dojo
    ON public.aulas FOR SELECT TO authenticated
    USING (dojo_id = public.current_user_dojo_id());

CREATE POLICY aulas_insert_professor
    ON public.aulas FOR INSERT TO authenticated
    WITH CHECK (
        dojo_id = public.current_user_dojo_id()
        AND EXISTS (
            SELECT 1 FROM public.profiles
            WHERE owner_user_id = auth.uid() AND role = 'professor'
        )
    );

CREATE POLICY aulas_update_professor
    ON public.aulas FOR UPDATE TO authenticated
    USING (
        dojo_id = public.current_user_dojo_id()
        AND EXISTS (
            SELECT 1 FROM public.profiles
            WHERE owner_user_id = auth.uid() AND role = 'professor'
        )
    )
    WITH CHECK (dojo_id = public.current_user_dojo_id());

-- ============================================================================
-- 14. POLICIES — presencas (derivada via alunos.dojo_id; professor escreve)
-- ============================================================================

CREATE POLICY presencas_select_same_dojo
    ON public.presencas FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.alunos a
            WHERE a.id = presencas.aluno_id
              AND a.dojo_id = public.current_user_dojo_id()
        )
    );

CREATE POLICY presencas_insert_professor
    ON public.presencas FOR INSERT TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.alunos a
            WHERE a.id = aluno_id
              AND a.dojo_id = public.current_user_dojo_id()
        )
        AND EXISTS (
            SELECT 1 FROM public.profiles
            WHERE owner_user_id = auth.uid() AND role = 'professor'
        )
    );

CREATE POLICY presencas_update_professor
    ON public.presencas FOR UPDATE TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.alunos a
            WHERE a.id = presencas.aluno_id
              AND a.dojo_id = public.current_user_dojo_id()
        )
        AND EXISTS (
            SELECT 1 FROM public.profiles
            WHERE owner_user_id = auth.uid() AND role = 'professor'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.alunos a
            WHERE a.id = aluno_id
              AND a.dojo_id = public.current_user_dojo_id()
        )
    );

COMMIT;

-- ============================================================================
-- FIM da migration 0003_sprint_1b_operacional.sql
-- Próxima migration: 0004 (Sprint 1c) — graduacoes + cerimonias + certificados
-- ============================================================================
