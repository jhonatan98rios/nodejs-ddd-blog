import { z as zod } from 'zod'

export const CheckIn = zod.object({
    user: zod.string().min(4, 'O campo "usuário" deve conter ao menos 4 caracteres'),
    token: zod.string().trim(),
    created_at: zod.date().optional()
})

export type CheckInDto = zod.infer<typeof CheckIn>