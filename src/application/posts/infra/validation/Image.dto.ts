import { z as zod } from 'zod'

export const ImageValidation = zod.object({
    src: zod.string().min(4).trim(),
    size: zod.number(),
})

export type ImageDto = zod.infer<typeof ImageValidation>