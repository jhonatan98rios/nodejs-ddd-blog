import { z as zod } from 'zod'
import { ImageValidation } from './ImageValidation.dto'

export const CreatePost = zod.object({
    title: zod.string().min(4).trim(),
    subtitle: zod.string().min(8).trim(),
    content: zod.string().min(8).trim(),
    categories: zod.string().min(4).array().length(2),
    createdAt: zod.date().optional(),
    images: zod.array(ImageValidation).optional(),
    seo_title: zod.string().min(8).trim().optional(),
    seo_description: zod.string().min(8).trim().optional(),
    seo_keywords: zod.string().min(8).trim().optional(),
})

export type CreatePostDto = zod.infer<typeof CreatePost>