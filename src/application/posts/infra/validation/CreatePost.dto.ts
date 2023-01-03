import { z as zod } from 'zod'
import { CategoryValidation } from './Category.dto'
import { ImageValidation } from './Image.dto'

export const CreatePost = zod.object({
    title: zod.string().min(4).trim(),
    subtitle: zod.string().min(8).trim(),
    content: zod.string().min(8).trim(),
    categories: zod.array(CategoryValidation),
    createdAt: zod.date().optional(),
    banner: ImageValidation,
    seo_title: zod.string().min(8).trim().optional(),
    seo_description: zod.string().min(8).trim().optional(),
    seo_keywords: zod.string().min(8).trim().optional(),
})

export type CreatePostDto = zod.infer<typeof CreatePost>