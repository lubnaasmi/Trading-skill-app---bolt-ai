export interface Database {
  public: {
    Tables: {
      bloomers: {
        Row: {
          id: string;
          name: string;
          age: number;
          avatar_url: string | null;
          bg_color: string | null;
          offering: string;
          wants: string;
          category: string;
          match_score: number | null;
          watermark: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          age: number;
          avatar_url?: string | null;
          bg_color?: string | null;
          offering: string;
          wants: string;
          category: string;
          match_score?: number | null;
          watermark?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          age?: number;
          avatar_url?: string | null;
          bg_color?: string | null;
          offering?: string;
          wants?: string;
          category?: string;
          match_score?: number | null;
          watermark?: string | null;
          created_at?: string | null;
        };
      };
      trades: {
        Row: {
          id: string;
          bloomer_id: string;
          you_give: string;
          you_get: string;
          status: string;
          progress: number;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          bloomer_id: string;
          you_give: string;
          you_get: string;
          status?: string;
          progress?: number;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          bloomer_id?: string;
          you_give?: string;
          you_get?: string;
          status?: string;
          progress?: number;
          created_at?: string | null;
        };
      };
      messages: {
        Row: {
          id: string;
          bloomer_id: string;
          sender: string;
          text: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          bloomer_id: string;
          sender: string;
          text: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          bloomer_id?: string;
          sender?: string;
          text?: string;
          created_at?: string | null;
        };
      };
    };
  };
}
