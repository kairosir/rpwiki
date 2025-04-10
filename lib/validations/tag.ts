import { z } from 'zod'

export const createTagSchema = z.object({
  name: z.string()
    .min(2, 'Название тега должно содержать минимум 2 символа')
    .max(50, 'Название тега не должно превышать 50 символов'),
  slug: z.string()
    .min(2, 'Slug должен содержать минимум 2 символа')
    .max(50, 'Slug не должен превышать 50 символов')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug может содержать только строчные буквы, цифры и дефис'),
  description: z.string()
    .max(200, 'Описание не должно превышать 200 символов')
    .optional()
})

export const updateTagSchema = createTagSchema.partial() 