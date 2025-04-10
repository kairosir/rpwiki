export type Project = {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo_url?: string;
  website_url?: string;
  discord_url?: string;
  vk_url?: string;
  telegram_url?: string;
  created_at: string;
  updated_at: string;
};

export type Content = {
  id: string;
  title: string;
  slug: string;
  content: string;
  type: 'guide' | 'news' | 'article';
  preview_image?: string;
  category_id: string;
  tag_ids: string[];
  author_id: string;
  searchable: string;
  created_at: string;
  updated_at: string;
  category?: Category;
  tags?: Tag[];
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
  updated_at: string;
};

export type Tag = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
  updated_at: string;
};

export type SearchFilters = {
  type?: Content['type'];
  categoryId?: string;
  tagIds?: string[];
  query?: string;
};

export interface SearchResult {
  id: string;
  content_id: string;
  content_type: string;
  title: string;
  content: string | null;
  metadata: Record<string, any>;
  project: {
    name: string;
    slug: string;
  };
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  game: string;
  logo_url: string | null;
  banner_url: string | null;
  players_count: number;
  servers_count: number;
  founded_year: string;
  website_url: string | null;
  discord_url: string | null;
  created_at: string;
  updated_at: string;
  meta_description: string | null;
}

export interface Category {
  id: string;
  project_id: string;
  name: string;
  slug: string;
  icon: string | null;
  description: string | null;
  sort_order: number;
  created_at: string;
}

export interface Content {
  id: string;
  project_id: string;
  category_id: string;
  type: 'guide' | 'news' | 'article';
  title: string;
  slug: string;
  content: string | null;
  metadata: Record<string, any>;
  status: 'draft' | 'published' | 'archived';
  author_id: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface SearchResult {
  id: string;
  content_id: string;
  content_type: string;
  title: string;
  content: string | null;
  metadata: Record<string, any>;
  project: {
    name: string;
    slug: string;
  };
}

export interface SearchFilters {
  type?: string[];
  project?: string[];
  category?: string[];
} 