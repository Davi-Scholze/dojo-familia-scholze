import type { User } from "@supabase/supabase-js";
import { Button, ORG_SHORT } from "@dojo-fs/ui";
import { signOut } from "./actions";

type Profile = {
  id: string;
  full_name: string | null;
  role: "admin" | "professor" | "aluno" | "responsavel";
};

export function DashboardHeader({
  user,
  profile,
}: {
  user: User;
  profile: Profile | null;
}) {
  const displayName = profile?.full_name ?? user.email ?? "Usuário";
  const role = profile?.role ?? "sem perfil";

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/95 px-6 py-3 backdrop-blur">
      <div className="flex items-center gap-3">
        <img
          src="/logo-redondo-branco.png"
          alt={`Logo ${ORG_SHORT}`}
          width={32}
          height={32}
          className="h-8 w-8 rounded-full"
        />
        <span className="font-display text-sm font-bold uppercase tracking-widest text-dojo-red">
          {ORG_SHORT}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium leading-tight">{displayName}</p>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {role}
          </p>
        </div>
        <form action={signOut}>
          <Button type="submit" variant="ghost" size="sm">
            Sair
          </Button>
        </form>
      </div>
    </header>
  );
}
