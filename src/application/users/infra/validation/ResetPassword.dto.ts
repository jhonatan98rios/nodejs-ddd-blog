import { z as zod } from 'zod'

export const ResetPasswordValidation = zod.object({
    mail: zod.string().trim(),
    token: zod.string().trim(),
    password: zod.string().min(8).trim(),
    passwordConfirmation: zod.string().min(8).trim(),
})

export type ResetPasswordDto = zod.infer<typeof ResetPasswordValidation>