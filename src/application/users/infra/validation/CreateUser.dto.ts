import { z as zod } from 'zod'

export const CreateUser = zod.object({
    user: zod.string().trim(),
    password: zod.string().min(8).trim()
})

export type CreateUserDto = zod.infer<typeof CreateUser>