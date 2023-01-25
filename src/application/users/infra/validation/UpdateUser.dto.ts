import { z as zod } from 'zod'

export const UpdateUser = zod.object({
    password: zod.string().min(8).trim()
})

export type UpdateUserDto = {
    username: string
    password: string
}