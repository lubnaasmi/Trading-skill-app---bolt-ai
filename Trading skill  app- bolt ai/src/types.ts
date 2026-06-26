export interface Bloomer {
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
}

export interface Trade {
  id: string;
  bloomer_id: string;
  you_give: string;
  you_get: string;
  status: string;
  progress: number;
  created_at: string | null;
  bloomer?: Bloomer;
}

export interface Message {
  id: string;
  bloomer_id: string;
  sender: string;
  text: string;
  created_at: string | null;
}

export type View = 'dashboard' | 'messages' | 'trades' | 'safety';

export const CATEGORIES = ['All', 'Tech', 'Art', 'School', 'Music', 'Sports', 'Cooking'] as const;
