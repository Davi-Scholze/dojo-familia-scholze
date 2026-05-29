import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createServerClient } from "@dojo-fs/supabase/server";
import { TurmaForm } from "./turma-form";

export default async function NovaTurmaPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient({
    getAll: () => cookieStore.getAll(),
    setAll: (toSet) =>
      toSet.forEach((c) => cookieStore.set(c.name, c.value, c.options)),
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("dojo_id, role")
    .eq("owner_user_id", user.id)
    .maybeSingle<{ dojo_id: string | null; role: string }>();

  if (!profile?.dojo_id) redirect("/dashboard/onboarding");
  if (profile.role !== "professor") redirect("/dashboard");

  return (
    <main
      className="min-h-[calc(100vh-57px)] bg-dojo-black px-6 pb-24 pt-12 sm:px-8 lg:px-12"
      aria-label="Criar turma"
    >
      <div className="mx-auto max-w-2xl space-y-8">
        <header className="space-y-2">
          <Link
            href="/dashboard/turmas"
            className="text-xs uppercase tracking-widest text-dojo-white/40 hover:text-dojo-white/60"
          >
            ← Turmas
          </Link>
          <h1 className="font-display text-3xl font-bold text-dojo-white sm:text-4xl">
            Nova <span className="text-dojo-red">turma</span>
          </h1>
          <p className="text-sm text-dojo-white/60">
            Defina modalidade, horário recorrente e capacidade. A turma aparece
            na timeline do dashboard nos dias selecionados.
          </p>
        </header>

        <TurmaForm />
      </div>
    </main>
  );
}
