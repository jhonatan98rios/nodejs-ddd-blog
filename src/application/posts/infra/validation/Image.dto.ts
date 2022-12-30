import { z as zod } from 'zod'

export const ImageValidation = zod.object({
    destination: zod.string().min(4).trim(),
    filename: zod.string().min(4).trim(),
    mimetype: zod.string().min(4).trim(),
    size: zod.number(),
})

export type ImageDto = zod.infer<typeof ImageValidation>