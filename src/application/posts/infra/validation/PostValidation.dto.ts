import { z as zod } from 'zod'

export const PostValidation = zod.object({
    title: zod.string().min(4).trim(),
    subtitle: zod.string().min(8).trim(),
    content: zod.string().min(8).trim(),
    categories: zod.string().min(4).array().length(2),
    createdAt: zod.date().optional(),
})

export type PostDto = zod.infer<typeof PostValidation>