import { supabase } from '@/lib/supabase';
import { Content, SearchFilters } from '@/types/database';

export class ContentService {
  private readonly table = 'content';

  async getAll(type?: Content['type']) {
    try {
      let query = supabase
        .from(this.table)
        .select(`
          *,
          category:categories(*),
          tags:content_tags(tags(*))
        `);

      if (type) {
        query = query.eq('type', type);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Content[];
    } catch (error) {
      console.error('Error fetching content:', error);
      throw error;
    }
  }

  async getBySlug(slug: string) {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .select(`
          *,
          category:categories(*),
          tags:content_tags(tags(*))
        `)
        .eq('slug', slug)
        .single();

      if (error) throw error;
      return data as Content;
    } catch (error) {
      console.error('Error fetching content by slug:', error);
      throw error;
    }
  }

  async search(filters: SearchFilters) {
    try {
      let query = supabase
        .from(this.table)
        .select(`
          *,
          category:categories(*),
          tags:content_tags(tags(*))
        `);

      if (filters.type) {
        query = query.eq('type', filters.type);
      }

      if (filters.categoryId) {
        query = query.eq('category_id', filters.categoryId);
      }

      if (filters.tagIds?.length) {
        query = query.contains('tag_ids', filters.tagIds);
      }

      if (filters.query) {
        query = query.textSearch('searchable', filters.query);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Content[];
    } catch (error) {
      console.error('Error searching content:', error);
      throw error;
    }
  }

  async create(content: Omit<Content, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .insert(content)
        .select()
        .single();

      if (error) throw error;
      return data as Content;
    } catch (error) {
      console.error('Error creating content:', error);
      throw error;
    }
  }

  async update(id: string, content: Partial<Content>) {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .update(content)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Content;
    } catch (error) {
      console.error('Error updating content:', error);
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const { error } = await supabase
        .from(this.table)
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting content:', error);
      throw error;
    }
  }
} 