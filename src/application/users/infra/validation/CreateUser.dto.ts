import { z as zod } from 'zod'

export const CreateUser = zod.object({
    user: zod.string().trim().min(4, 'O campo "usuário" deve conter ao menos 4 caracteres'),
    mail: zod.string().trim().email({ message: 'Endereço de e-mail inválido' }),
    password: zod.string().trim().min(8, 'O campo "senha" deve conter ao menos 8 caracteres'),
    consent: zod.boolean(),
})

export type CreateUserDto = {
    user: string
    mail: string
    password: string
    role?: string
    consent: boolean
}