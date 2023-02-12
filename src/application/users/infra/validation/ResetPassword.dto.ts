import { z as zod } from 'zod'

export const ResetPasswordValidation = zod.object({
    mail: zod.string().trim().email({ message: 'Endereço de e-mail inválido' }),
    token: zod.string().trim(),
    password: zod.string().trim().min(8, 'O campo "senha" deve conter ao menos 8 caracteres'),
    passwordConfirmation: zod.string().trim().min(8, 'O campo "confirmação de senha" deve conter ao menos 8 caracteres'),
})

export type ResetPasswordDto = zod.infer<typeof ResetPasswordValidation>