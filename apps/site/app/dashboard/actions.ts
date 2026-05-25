"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerClient } from "@dojo-fs/supabase/server";

/**
 * Server Action — desloga user atual + redireciona pra /login.
 *
 * Usado via `<form action={signOut}>` em Server Components (sem JS extra).
 */
export async function signOut() {
  const cookieStore = await cookies();
  const supabase = createServerClient({
    getAll: () => cookieStore.getAll(),
    setAll: (toSet) =>
      toSet.forEach((c) => cookieStore.set(c.name, c.value, c.options)),
  });

  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
