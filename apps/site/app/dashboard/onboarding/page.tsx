import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@dojo-fs/supabase/server";
import { ORG_NAME, SLOGAN } from "@dojo-fs/ui";
import { OnboardingForm } from "./onboarding-form";

/**
 * Página de onboarding — primeira tela pós-Magic Link quando user
 * ainda não tem profile cadastrado.
 *
 * Fluxo:
 *   - Sem session → redirect /login (middleware já cobre, defense-in-depth)
 *   - Com session E profile completo (com dojo_id) → redirect /dashboard
 *   - Com session SEM profile → renderiza form OnboardingForm
 *
 * Após submit (Server Action em ./actions.ts):
 *   - INSERT profile (role=professor, dojo_id=singleton)
 *   - UPDATE dojo singleton com modalidades + descrição + endereço + whatsapp
 *   - Redirect /dashboard
 */
export default async function OnboardingPage() {
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

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, dojo_id")
    .eq("owner_user_id", user.id)
    .maybeSingle<{ id: string; dojo_id: string | null }>();

  if (profile?.dojo_id) {
    redirect("/dashboard");
  }

  return (
    <main
      className="min-h-[calc(100vh-57px)] bg-dojo-black px-6 pb-24 pt-12 sm:px-8 lg:px-12"
      aria-label="Onboarding"
    >
      <div className="mx-auto max-w-2xl space-y-10">
        <header className="space-y-3 text-center sm:text-left">
          <p className="text-xs uppercase tracking-widest text-dojo-white/40">
            {ORG_NAME}
          </p>
          <h1 className="font-display text-3xl font-bold text-dojo-white sm:text-4xl">
            Bem-vindo ao seu <span className="text-dojo-red">dojô</span>
          </h1>
          <p className="text-sm text-dojo-white/60">
            Preencha alguns dados pra começar. Você pode ajustar tudo depois nas
            configurações.
          </p>
          <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-dojo-red/60">
            {SLOGAN}
          </p>
        </header>

        <OnboardingForm defaultEmail={user.email ?? "seu-email@exemplo.com"} />
      </div>
    </main>
  );
}
