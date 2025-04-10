import { supabase } from '@/lib/supabase';
import { Content, SearchFilters } from '@/types/database';
import pool from '@/lib/db'

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

export interface Content {
  id: number
  title: string
  slug: string
  content: string
  category: string
  image_url?: string
  image_path?: string
  author_id: number
  published: boolean
  created_at: Date
  updated_at: Date
}

export const contentService = {
  async getAll(): Promise<Content[]> {
    const { rows } = await pool.query(`
      SELECT c.*, u.username as author_name 
      FROM content c 
      LEFT JOIN users u ON c.author_id = u.id 
      ORDER BY c.created_at DESC
    `)
    return rows
  },

  async getById(id: number): Promise<Content | null> {
    const { rows } = await pool.query(`
      SELECT c.*, u.username as author_name 
      FROM content c 
      LEFT JOIN users u ON c.author_id = u.id 
      WHERE c.id = $1
    `, [id])
    return rows[0] || null
  },

  async create(data: Omit<Content, 'id' | 'created_at' | 'updated_at'>): Promise<Content> {
    const { rows } = await pool.query(`
      INSERT INTO content (
        title, slug, content, category, image_url, image_path, 
        author_id, published
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
      RETURNING *
    `, [
      data.title,
      data.slug,
      data.content,
      data.category,
      data.image_url,
      data.image_path,
      data.author_id,
      data.published
    ])
    return rows[0]
  },

  async update(id: number, data: Partial<Omit<Content, 'id' | 'created_at' | 'updated_at'>>): Promise<Content | null> {
    const sets: string[] = []
    const values: any[] = []
    let paramCount = 1

    if (data.title) {
      sets.push(`title = $${paramCount}`)
      values.push(data.title)
      paramCount++
    }
    if (data.slug) {
      sets.push(`slug = $${paramCount}`)
      values.push(data.slug)
      paramCount++
    }
    if (data.content) {
      sets.push(`content = $${paramCount}`)
      values.push(data.content)
      paramCount++
    }
    if (data.category) {
      sets.push(`category = $${paramCount}`)
      values.push(data.category)
      paramCount++
    }
    if (data.image_url !== undefined) {
      sets.push(`image_url = $${paramCount}`)
      values.push(data.image_url)
      paramCount++
    }
    if (data.image_path !== undefined) {
      sets.push(`image_path = $${paramCount}`)
      values.push(data.image_path)
      paramCount++
    }
    if (data.published !== undefined) {
      sets.push(`published = $${paramCount}`)
      values.push(data.published)
      paramCount++
    }

    if (sets.length === 0) return null

    values.push(id)
    const { rows } = await pool.query(
      `UPDATE content SET ${sets.join(', ')}, updated_at = NOW() WHERE id = $${paramCount} RETURNING *`,
      values
    )
    return rows[0] || null
  },

  async delete(id: number): Promise<Content | null> {
    const { rows } = await pool.query('DELETE FROM content WHERE id = $1 RETURNING *', [id])
    return rows[0] || null
  },

  async getByCategory(category: string): Promise<Content[]> {
    const { rows } = await pool.query(`
      SELECT c.*, u.username as author_name 
      FROM content c 
      LEFT JOIN users u ON c.author_id = u.id 
      WHERE c.category = $1 
      ORDER BY c.created_at DESC
    `, [category])
    return rows
  }
} 