export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          username: string
          email: string
          avatar_url: string | null
          age: number | null
          project: string | null
          discord: string | null
          bio: string | null
          created_at: string
          last_login: string | null
          playing_on: string | null
        }
        Insert: {
          id?: string
          username: string
          email: string
          avatar_url?: string | null
          age?: number | null
          project?: string | null
          discord?: string | null
          bio?: string | null
          created_at?: string
          last_login?: string | null
          playing_on?: string | null
        }
        Update: {
          id?: string
          username?: string
          email?: string
          avatar_url?: string | null
          age?: number | null
          project?: string | null
          discord?: string | null
          bio?: string | null
          created_at?: string
          last_login?: string | null
          playing_on?: string | null
        }
      }
      votes: {
        Row: {
          id: string
          user_id: string
          content_id: string
          content_type: string
          vote_type: "like" | "dislike"
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content_id: string
          content_type: string
          vote_type: "like" | "dislike"
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content_id?: string
          content_type?: string
          vote_type?: "like" | "dislike"
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
  }
}

