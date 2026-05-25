import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@dojo-fs/supabase/server";
import { DashboardHeader } from "./header";

/**
 * Layout das rotas autenticadas — Server Component que:
 *  1. Verifica session (defesa em profundidade — middleware já bloqueia)
 *  2. Carrega profile do user logado via owner_user_id
 *  3. Renderiza header com nome + role + logout
 *
 * Se sem session → redirect /login (middleware deve ter feito antes, mas
 * mantemos check defensivo caso request bypass middleware).
 *
 * Nota: I18nProvider + LanguageSwitch + InstallPrompt foram movidos pra rotas
 * que precisam (login). Dashboard renderiza pt-BR direto (tech debt Sprint 1c).
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    id: string;
    full_name: string | null;
    role: "admin" | "professor" | "aluno" | "responsavel";
  };

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .eq("owner_user_id", user.id)
    .maybeSingle<ProfileBrief>();

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} profile={profile} />
      {children}
    </div>
  );
}
