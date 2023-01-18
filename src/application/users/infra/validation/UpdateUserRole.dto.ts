import { z as zod } from 'zod'

export const UpdateUserRole = zod.object({
    role: zod.string().trim(),
})

export type UpdateUserRoleDto = {
    username: string
    role: string
}