import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@dojo-fs/supabase/server";
import {
  ORG_NAME,
  KANJI,
  MODALIDADES,
  LOCALIDADE,
  SENSEI,
  SLOGAN,
  Button,
} from "@dojo-fs/ui";

const ROLE_LABEL: Record<string, string> = {
  admin: "Administrador",
  professor: "Professor",
  aluno: "Aluno",
  responsavel: "Responsável",
};

/**
 * Dashboard logado (Server Component) — Sprint 1a.
 *
 * Re-busca user + profile (layout já fez, mas Next.js cache dedupe a query).
 * Renderiza welcome com nome + role + identidade visual do dojo.
 *
 * Sprint 1c expande com links pra alunos / turmas / presença / financeiro.
 */
export default async function DashboardPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient({
    getAll: () => cookieStore.getAll(),
    setAll: (toSet) =>
      toSet.forEach((c) => cookieStore.set(c.name, c.value, c.options)),
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  type ProfileBrief = {
    full_name: string | null;
    role: "admin" | "professor" | "aluno" | "responsavel";
  };

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("owner_user_id", user.id)
    .maybeSingle<ProfileBrief>();

  const displayName = profile?.full_name ?? user.email ?? "Sensei";
  const role = profile?.role ?? "sem perfil";
  const roleLabel = ROLE_LABEL[role] ?? role;

  return (
    <main className="flex min-h-[calc(100vh-65px)] flex-col items-center justify-center px-6 py-12">
      <section className="flex w-full max-w-2xl flex-col items-center gap-8 text-center">
        <img
          src="/logo-retangular-preto.png"
          alt={`Logo oficial ${ORG_NAME}`}
          width={400}
          height={200}
          className="h-auto w-full max-w-sm"
        />

        <div className="space-y-2">
          <h1 className="font-display text-3xl font-bold tracking-wider text-dojo-red sm:text-4xl">
            Bem-vindo, {displayName}
          </h1>
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            {roleLabel}
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-base text-muted-foreground">
            <span className="font-display text-xl">{KANJI.judo}</span>
            <span className="mx-3 text-dojo-red">•</span>
            <span className="font-display text-xl">{KANJI.jiujitsu}</span>
          </p>
          <p className="text-lg font-semibold">{ORG_NAME}</p>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {MODALIDADES.join(" · ")} — {LOCALIDADE}
          </p>
        </div>

        <p className="font-display text-2xl font-bold tracking-widest text-dojo-red">
          {SLOGAN}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button variant="default" size="lg" disabled>
            Gerir alunos (Sprint 1c)
          </Button>
          <Button variant="outline" size="lg" disabled>
            Gerir turmas (Sprint 1c)
          </Button>
        </div>

        <p className="mt-10 text-xs uppercase tracking-widest text-muted-foreground">
          Sensei {SENSEI}
        </p>
      </section>
    </main>
  );
}
