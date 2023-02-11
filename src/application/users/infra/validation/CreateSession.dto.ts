import { z as zod } from 'zod'

export const CreateSession = zod.object({
    user: zod.string().trim().min(4, 'O campo "usuário" deve conter ao menos 4 caracteres'),
    password: zod.string().trim().min(8, 'O campo "senha" deve conter ao menos 8 caracteres')
})

export type CreateSessionDto = zod.infer<typeof CreateSession>