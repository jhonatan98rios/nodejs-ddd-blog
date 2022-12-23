import { z as zod } from 'zod'
import { ImageValidation } from './ImageValidation.dto'

export const PostValidation = zod.object({
    title: zod.string().min(4).trim(),
    subtitle: zod.string().min(8).trim(),
    content: zod.string().min(8).trim(),
    categories: zod.string().min(4).array().length(2),
    createdAt: zod.date().optional(),
    images: zod.array(ImageValidation).optional()
})

export type PostDto = zod.infer<typeof PostValidation>