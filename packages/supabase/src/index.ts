// Browser client (anon — usa RLS)
export { createDojoSupabase, type DojoSupabaseClient } from "./client";

// Server client (SSR — Server Components / Route Handlers / Server Actions)
export {
  createServerClient,
  type DojoSupabaseServerClient,
  type CookieMethodsServer,
} from "./server";

// Middleware helper (Next.js)
export { updateSession } from "./middleware";

// DB types (gerados via supabase gen types)
export type { Database } from "./types";
