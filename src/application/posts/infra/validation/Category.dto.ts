import { z as zod } from 'zod'

export const CategoryValidation = zod.object({
    label: zod.string().min(1).trim(),
    path: zod.string().min(1).trim(),
})

export type CategoryDto = zod.infer<typeof CategoryValidation>