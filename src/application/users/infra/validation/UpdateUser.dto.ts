import { z as zod } from 'zod'

export const UpdateUser = zod.object({
    password: zod.string().trim().min(8, 'O campo "senha" deve conter ao menos 8 caracteres'),
    passwordConfirmation: zod.string().trim().min(8, 'O campo "senha" deve conter ao menos 8 caracteres')
})

export type UpdateUserDto = {
    username: string
    password: string
    passwordConfirmation: string
}