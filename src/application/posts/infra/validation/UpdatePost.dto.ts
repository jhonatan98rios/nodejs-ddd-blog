import { z as zod } from 'zod'
import { ImageValidation } from './ImageValidation.dto'

export const UpdatePost = zod.object({
    title: zod.string().min(4).trim().optional(),
    subtitle: zod.string().min(8).trim().optional(),
    content: zod.string().min(8).trim().optional(),
    categories: zod.string().min(4).array().length(2).optional(),
    createdAt: zod.date().optional(),
    images: zod.array(ImageValidation).optional(),
    seo_title: zod.string().min(8).trim().optional(),
    seo_description: zod.string().min(8).trim().optional(),
    seo_keywords: zod.string().min(8).trim().optional(),
})

export type UpdatePostDto = zod.infer<typeof UpdatePost>