import { z as zod } from 'zod'

export const CheckIn = zod.object({
    user: zod.string().trim(),
    token: zod.string().trim(),
    created_at: zod.date().optional()
})

export type CheckInDto = zod.infer<typeof CheckIn>