/**
 * Database types — Dojô Família Scholze
 *
 * PLACEHOLDER (Fase 0). Substituído por output real de:
 *   supabase gen types typescript --linked > packages/supabase/src/types.ts
 *
 * executado em T8 após Supabase project + migration `0001_init_multi_tenant.sql` aplicada.
 */

export type Database = {
  public: {
    Tables: {
      dojos: {
        Row: {
          id: string;
          nome: string;
          slug: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          nome: string;
          slug: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          nome?: string;
          slug?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          dojo_id: string;
          role: "professor" | "aluno" | "responsavel" | "admin";
          full_name: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          dojo_id: string;
          role: "professor" | "aluno" | "responsavel" | "admin";
          full_name?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          dojo_id?: string;
          role?: "professor" | "aluno" | "responsavel" | "admin";
          full_name?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_dojo_id_fkey";
            columns: ["dojo_id"];
            isOneToOne: false;
            referencedRelation: "dojos";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};
