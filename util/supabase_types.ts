export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      klist_entries: {
        Row: {
          created_at: string;
          id: string;
          list_id: string;
          title_id: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          list_id: string;
          title_id: number;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          list_id?: string;
          title_id?: number;
          user_id?: string;
        };
      };
      klist_users: {
        Row: {
          bio: string | null;
          created_at: string | null;
          id: string;
          username: string;
        };
        Insert: {
          bio?: string | null;
          created_at?: string | null;
          id?: string;
          username: string;
        };
        Update: {
          bio?: string | null;
          created_at?: string | null;
          id?: string;
          username?: string;
        };
      };
      klists: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          user_id?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
