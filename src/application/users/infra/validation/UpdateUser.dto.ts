import { z as zod } from 'zod'

export const UpdateUser = zod.object({
    username: zod.string().trim(),
    user: zod.string().trim(),
    password: zod.string().min(8).trim()
})

export type UpdateUserDto = zod.infer<typeof UpdateUser>