export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      locations: {
        Row: {
          commune: string | null
          created_at: string
          id: string
          name: string
          neighboring: string[] | null
          standing: string | null
          updated_at: string
        }
        Insert: {
          commune?: string | null
          created_at?: string
          id?: string
          name: string
          neighboring?: string[] | null
          standing?: string | null
          updated_at?: string
        }
        Update: {
          commune?: string | null
          created_at?: string
          id?: string
          name?: string
          neighboring?: string[] | null
          standing?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      prospects: {
        Row: {
          address: string | null
          created_at: string | null
          datetime: string
          id: string
          is_all_day: boolean | null
          location_id: string | null
          name: string | null
          notes: string | null
          phone: string
          price: number | null
          priority: Database["public"]["Enums"]["priority_type"]
          status: Database["public"]["Enums"]["status_type"]
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          datetime: string
          id?: string
          is_all_day?: boolean | null
          location_id?: string | null
          name?: string | null
          notes?: string | null
          phone: string
          price?: number | null
          priority?: Database["public"]["Enums"]["priority_type"]
          status?: Database["public"]["Enums"]["status_type"]
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          datetime?: string
          id?: string
          is_all_day?: boolean | null
          location_id?: string | null
          name?: string | null
          notes?: string | null
          phone?: string
          price?: number | null
          priority?: Database["public"]["Enums"]["priority_type"]
          status?: Database["public"]["Enums"]["status_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prospects_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "location_prospect_counts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prospects_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      reminders: {
        Row: {
          completed: boolean | null
          created_at: string | null
          datetime: string
          id: string
          note: string | null
          prospect_id: string | null
          updated_at: string | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          datetime: string
          id?: string
          note?: string | null
          prospect_id?: string | null
          updated_at?: string | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          datetime?: string
          id?: string
          note?: string | null
          prospect_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reminders_prospect_id_fkey"
            columns: ["prospect_id"]
            isOneToOne: false
            referencedRelation: "prospects"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          created_at: string | null
          details: Json
          id: string
          prospect_id: string | null
          type: Database["public"]["Enums"]["service_type"]
        }
        Insert: {
          created_at?: string | null
          details: Json
          id?: string
          prospect_id?: string | null
          type: Database["public"]["Enums"]["service_type"]
        }
        Update: {
          created_at?: string | null
          details?: Json
          id?: string
          prospect_id?: string | null
          type?: Database["public"]["Enums"]["service_type"]
        }
        Relationships: [
          {
            foreignKeyName: "fk_prospect"
            columns: ["prospect_id"]
            isOneToOne: false
            referencedRelation: "prospects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_prospect_id_fkey"
            columns: ["prospect_id"]
            isOneToOne: false
            referencedRelation: "prospects"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      location_prospect_counts: {
        Row: {
          commune: string | null
          completed_count: number | null
          confirmed_count: number | null
          created_at: string | null
          id: string | null
          name: string | null
          neighboring: string[] | null
          pending_count: number | null
          standing: string | null
          total_prospects: number | null
          updated_at: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      couch_type: "leather" | "tissue"
      location_type:
        | "Bastos"
        | "Mvan"
        | "Nsam"
        | "Mvog-Mbi"
        | "Essos"
        | "Mimboman"
        | "Nkoldongo"
        | "Ekounou"
        | "Emana"
        | "Nkolbisson"
        | "Olembe"
        | "Ngousso"
        | "Messa"
        | "Omnisport"
        | "Tsinga"
        | "Etoa-Meki"
        | "Nlongkak"
      priority_type: "low" | "medium" | "high"
      service_type: "couch" | "carpet" | "auto-detailing" | "mattress"
      size_type: "small" | "medium" | "large"
      status_type: "pending" | "confirmed" | "completed" | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
