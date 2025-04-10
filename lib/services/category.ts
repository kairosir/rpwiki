import { supabase } from '@/lib/supabase';
import { Category } from '@/types/database';

export class CategoryService {
  private readonly table = 'categories';

  async getAll() {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .select('*')
        .order('name');

      if (error) throw error;
      return data as Category[];
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  async getBySlug(slug: string) {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      return data as Category;
    } catch (error) {
      console.error('Error fetching category by slug:', error);
      throw error;
    }
  }

  async create(category: Omit<Category, 'id'>) {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .insert(category)
        .select()
        .single();

      if (error) throw error;
      return data as Category;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }

  async update(id: string, category: Partial<Category>) {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .update(category)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Category;
    } catch (error) {
      console.error('Error updating category:', error);
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
      console.error('Error deleting category:', error);
      throw error;
    }
  }
} 