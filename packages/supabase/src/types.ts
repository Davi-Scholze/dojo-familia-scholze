export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      aluno_turma: {
        Row: {
          aluno_id: string
          matriculado_em: string
          status: string
          turma_id: string
        }
        Insert: {
          aluno_id: string
          matriculado_em?: string
          status?: string
          turma_id: string
        }
        Update: {
          aluno_id?: string
          matriculado_em?: string
          status?: string
          turma_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "aluno_turma_aluno_id_fkey"
            columns: ["aluno_id"]
            isOneToOne: false
            referencedRelation: "alunos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "aluno_turma_turma_id_fkey"
            columns: ["turma_id"]
            isOneToOne: false
            referencedRelation: "turmas"
            referencedColumns: ["id"]
          },
        ]
      }
      alunos: {
        Row: {
          apelido: string | null
          contato_emergencia_nome: string | null
          contato_emergencia_parentesco: string | null
          contato_emergencia_telefone: string | null
          created_at: string
          dados_medicos: Json
          data_graduacao_atual: string | null
          data_matricula: string
          data_nascimento: string
          dojo_id: string
          email: string | null
          faixa_atual: string
          foto_url: string | null
          genero: string | null
          graus: number
          id: string
          modalidade_principal: string
          nome_completo: string
          observacoes: string | null
          profile_id: string | null
          responsavel_profile_id: string | null
          status: string
          telefone: string | null
          termo_lgpd_aceito_em: string | null
          updated_at: string
        }
        Insert: {
          apelido?: string | null
          contato_emergencia_nome?: string | null
          contato_emergencia_parentesco?: string | null
          contato_emergencia_telefone?: string | null
          created_at?: string
          dados_medicos?: Json
          data_graduacao_atual?: string | null
          data_matricula?: string
          data_nascimento: string
          dojo_id: string
          email?: string | null
          faixa_atual?: string
          foto_url?: string | null
          genero?: string | null
          graus?: number
          id?: string
          modalidade_principal?: string
          nome_completo: string
          observacoes?: string | null
          profile_id?: string | null
          responsavel_profile_id?: string | null
          status?: string
          telefone?: string | null
          termo_lgpd_aceito_em?: string | null
          updated_at?: string
        }
        Update: {
          apelido?: string | null
          contato_emergencia_nome?: string | null
          contato_emergencia_parentesco?: string | null
          contato_emergencia_telefone?: string | null
          created_at?: string
          dados_medicos?: Json
          data_graduacao_atual?: string | null
          data_matricula?: string
          data_nascimento?: string
          dojo_id?: string
          email?: string | null
          faixa_atual?: string
          foto_url?: string | null
          genero?: string | null
          graus?: number
          id?: string
          modalidade_principal?: string
          nome_completo?: string
          observacoes?: string | null
          profile_id?: string | null
          responsavel_profile_id?: string | null
          status?: string
          telefone?: string | null
          termo_lgpd_aceito_em?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "alunos_dojo_id_fkey"
            columns: ["dojo_id"]
            isOneToOne: false
            referencedRelation: "dojos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alunos_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alunos_responsavel_profile_id_fkey"
            columns: ["responsavel_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      aulas: {
        Row: {
          created_at: string
          data: string
          dojo_id: string
          fechada_em: string | null
          foco_do_dia: string | null
          horario_fim: string
          horario_inicio: string
          id: string
          midia_anexa: Json
          objetivos: string | null
          observacoes_gerais: string | null
          planejamento_cumprido: boolean | null
          turma_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          data: string
          dojo_id: string
          fechada_em?: string | null
          foco_do_dia?: string | null
          horario_fim: string
          horario_inicio: string
          id?: string
          midia_anexa?: Json
          objetivos?: string | null
          observacoes_gerais?: string | null
          planejamento_cumprido?: boolean | null
          turma_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          data?: string
          dojo_id?: string
          fechada_em?: string | null
          foco_do_dia?: string | null
          horario_fim?: string
          horario_inicio?: string
          id?: string
          midia_anexa?: Json
          objetivos?: string | null
          observacoes_gerais?: string | null
          planejamento_cumprido?: boolean | null
          turma_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "aulas_dojo_id_fkey"
            columns: ["dojo_id"]
            isOneToOne: false
            referencedRelation: "dojos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "aulas_turma_id_fkey"
            columns: ["turma_id"]
            isOneToOne: false
            referencedRelation: "turmas"
            referencedColumns: ["id"]
          },
        ]
      }
      dojos: {
        Row: {
          banner_url: string | null
          created_at: string
          descricao: string | null
          endereco: string | null
          id: string
          instagram_url: string | null
          logo_url: string | null
          modalidades: string[]
          nome: string
          plano: string
          slug: string
          trial_fim: string
          trial_inicio: string
          updated_at: string
          whatsapp: string | null
          youtube_url: string | null
        }
        Insert: {
          banner_url?: string | null
          created_at?: string
          descricao?: string | null
          endereco?: string | null
          id?: string
          instagram_url?: string | null
          logo_url?: string | null
          modalidades?: string[]
          nome: string
          plano?: string
          slug: string
          trial_fim?: string
          trial_inicio?: string
          updated_at?: string
          whatsapp?: string | null
          youtube_url?: string | null
        }
        Update: {
          banner_url?: string | null
          created_at?: string
          descricao?: string | null
          endereco?: string | null
          id?: string
          instagram_url?: string | null
          logo_url?: string | null
          modalidades?: string[]
          nome?: string
          plano?: string
          slug?: string
          trial_fim?: string
          trial_inicio?: string
          updated_at?: string
          whatsapp?: string | null
          youtube_url?: string | null
        }
        Relationships: []
      }
      presencas: {
        Row: {
          aluno_id: string
          aula_id: string
          created_at: string
          feedback_professor: string | null
          id: string
          justificativa: string | null
          marcada_por: string | null
          presenca_em: string | null
          presenca_status: string | null
          rsvp_em: string | null
          rsvp_mensagem: string | null
          rsvp_status: string | null
          updated_at: string
        }
        Insert: {
          aluno_id: string
          aula_id: string
          created_at?: string
          feedback_professor?: string | null
          id?: string
          justificativa?: string | null
          marcada_por?: string | null
          presenca_em?: string | null
          presenca_status?: string | null
          rsvp_em?: string | null
          rsvp_mensagem?: string | null
          rsvp_status?: string | null
          updated_at?: string
        }
        Update: {
          aluno_id?: string
          aula_id?: string
          created_at?: string
          feedback_professor?: string | null
          id?: string
          justificativa?: string | null
          marcada_por?: string | null
          presenca_em?: string | null
          presenca_status?: string | null
          rsvp_em?: string | null
          rsvp_mensagem?: string | null
          rsvp_status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "presencas_aluno_id_fkey"
            columns: ["aluno_id"]
            isOneToOne: false
            referencedRelation: "alunos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "presencas_aula_id_fkey"
            columns: ["aula_id"]
            isOneToOne: false
            referencedRelation: "aulas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "presencas_marcada_por_fkey"
            columns: ["marcada_por"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          anos_experiencia: number | null
          created_at: string
          dojo_id: string | null
          foto_url: string | null
          full_name: string | null
          id: string
          modalidade_principal: string | null
          owner_user_id: string
          role: Database["public"]["Enums"]["user_role"]
          telefone: string | null
          updated_at: string
        }
        Insert: {
          anos_experiencia?: number | null
          created_at?: string
          dojo_id?: string | null
          foto_url?: string | null
          full_name?: string | null
          id?: string
          modalidade_principal?: string | null
          owner_user_id: string
          role?: Database["public"]["Enums"]["user_role"]
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          anos_experiencia?: number | null
          created_at?: string
          dojo_id?: string | null
          foto_url?: string | null
          full_name?: string | null
          id?: string
          modalidade_principal?: string | null
          owner_user_id?: string
          role?: Database["public"]["Enums"]["user_role"]
          telefone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_dojo_id_fkey"
            columns: ["dojo_id"]
            isOneToOne: false
            referencedRelation: "dojos"
            referencedColumns: ["id"]
          },
        ]
      }
      turmas: {
        Row: {
          capacidade_max: number | null
          cor: string
          created_at: string
          descricao: string | null
          dojo_id: string
          faixa_etaria: string
          horario_recorrente: Json
          id: string
          modalidade: string
          nivel: string
          nome: string
          status: string
          updated_at: string
        }
        Insert: {
          capacidade_max?: number | null
          cor?: string
          created_at?: string
          descricao?: string | null
          dojo_id: string
          faixa_etaria?: string
          horario_recorrente?: Json
          id?: string
          modalidade: string
          nivel?: string
          nome: string
          status?: string
          updated_at?: string
        }
        Update: {
          capacidade_max?: number | null
          cor?: string
          created_at?: string
          descricao?: string | null
          dojo_id?: string
          faixa_etaria?: string
          horario_recorrente?: Json
          id?: string
          modalidade?: string
          nivel?: string
          nome?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "turmas_dojo_id_fkey"
            columns: ["dojo_id"]
            isOneToOne: false
            referencedRelation: "dojos"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      current_user_dojo_id: { Args: never; Returns: string }
    }
    Enums: {
      user_role: "professor" | "aluno" | "responsavel" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["professor", "aluno", "responsavel", "admin"],
    },
  },
} as const
