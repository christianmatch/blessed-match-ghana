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
      blog_comments: {
        Row: {
          author_id: string
          content: string
          created_at: string
          id: string
          post_id: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          id?: string
          post_id: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          id?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_id: string
          category: string
          content: string
          created_at: string
          featured_image_url: string | null
          id: string
          published: boolean | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          category: string
          content: string
          created_at?: string
          featured_image_url?: string | null
          id?: string
          published?: boolean | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          category?: string
          content?: string
          created_at?: string
          featured_image_url?: string | null
          id?: string
          published?: boolean | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      gallery_photos: {
        Row: {
          approved: boolean | null
          caption: string | null
          created_at: string
          event_name: string | null
          id: string
          image_url: string
          likes_count: number | null
          user_id: string
        }
        Insert: {
          approved?: boolean | null
          caption?: string | null
          created_at?: string
          event_name?: string | null
          id?: string
          image_url: string
          likes_count?: number | null
          user_id: string
        }
        Update: {
          approved?: boolean | null
          caption?: string | null
          created_at?: string
          event_name?: string | null
          id?: string
          image_url?: string
          likes_count?: number | null
          user_id?: string
        }
        Relationships: []
      }
      page_analytics: {
        Row: {
          id: string
          page_name: string
          session_id: string | null
          user_id: string | null
          visited_at: string
        }
        Insert: {
          id?: string
          page_name: string
          session_id?: string | null
          user_id?: string | null
          visited_at?: string
        }
        Update: {
          id?: string
          page_name?: string
          session_id?: string | null
          user_id?: string | null
          visited_at?: string
        }
        Relationships: []
      }
      photo_likes: {
        Row: {
          created_at: string
          id: string
          photo_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          photo_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          photo_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "photo_likes_photo_id_fkey"
            columns: ["photo_id"]
            isOneToOne: false
            referencedRelation: "gallery_photos"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          bio: string | null
          church_name: string | null
          created_at: string
          dark_mode_preference: boolean | null
          denomination: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          profile_image_url: string | null
          updated_at: string
        }
        Insert: {
          bio?: string | null
          church_name?: string | null
          created_at?: string
          dark_mode_preference?: boolean | null
          denomination?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          profile_image_url?: string | null
          updated_at?: string
        }
        Update: {
          bio?: string | null
          church_name?: string | null
          created_at?: string
          dark_mode_preference?: boolean | null
          denomination?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          profile_image_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          approved: boolean | null
          created_at: string
          featured: boolean | null
          id: string
          image_url: string | null
          partner_name: string | null
          story: string
          user_id: string
          video_url: string | null
        }
        Insert: {
          approved?: boolean | null
          created_at?: string
          featured?: boolean | null
          id?: string
          image_url?: string | null
          partner_name?: string | null
          story: string
          user_id: string
          video_url?: string | null
        }
        Update: {
          approved?: boolean | null
          created_at?: string
          featured?: boolean | null
          id?: string
          image_url?: string | null
          partner_name?: string | null
          story?: string
          user_id?: string
          video_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
