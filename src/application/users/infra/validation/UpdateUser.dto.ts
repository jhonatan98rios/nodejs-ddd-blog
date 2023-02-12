import { z as zod } from 'zod'

export const UpdateUser = zod.object({
    currentPassword: zod.string().trim().min(8, 'O campo "senha antiga" contem ao menos 8 caracteres'),
    password: zod.string().trim().min(8, 'O campo "senha" deve conter ao menos 8 caracteres'),
    passwordConfirmation: zod.string().trim().min(8, 'O campo "senha" deve conter ao menos 8 caracteres')
})

export type UpdateUserDto = {
    username: string
    currentPassword: string
    password: string
    passwordConfirmation: string
}