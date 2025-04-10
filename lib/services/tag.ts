import { db } from '@/lib/db'
import { Tag } from '@prisma/client'

export class TagService {
  async getBySlug(slug: string): Promise<Tag | null> {
    try {
      return await db.tag.findUnique({
        where: { slug }
      })
    } catch (error) {
      console.error('Error fetching tag by slug:', error)
      throw error
    }
  }

  async update(slug: string, data: Partial<Tag>): Promise<Tag> {
    try {
      return await db.tag.update({
        where: { slug },
        data
      })
    } catch (error) {
      console.error('Error updating tag:', error)
      throw error
    }
  }

  async delete(slug: string): Promise<Tag> {
    try {
      return await db.tag.delete({
        where: { slug }
      })
    } catch (error) {
      console.error('Error deleting tag:', error)
      throw error
    }
  }
}

export const tagService = new TagService() 