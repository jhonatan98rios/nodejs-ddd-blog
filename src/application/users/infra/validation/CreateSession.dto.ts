import { z as zod } from 'zod'

export const CreateSession = zod.object({
    user: zod.string().trim(),
    password: zod.string().min(8).trim()
})

export type CreateSessionDto = zod.infer<typeof CreateSession>