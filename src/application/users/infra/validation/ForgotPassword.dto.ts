import { z as zod } from 'zod'

export const ForgotPasswordValidation = zod.object({
    mail: zod.string().trim().email({ message: 'Endereço de e-mail inválido' }),
})

export type ForgotPasswordDto = zod.infer<typeof ForgotPasswordValidation>