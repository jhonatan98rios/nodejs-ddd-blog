import AppError from "../errors/AppError";
import { Roles } from "@users/domain/models/User";

export function roleValidation(role: string): Roles {

    const roles = {
        'read': Roles.READ,
        'write': Roles.WRITE,
        'admin': Roles.ADMIN
    } as any

    if (!Object.keys(roles).includes(role)) {
        throw new AppError('Permissão inválida')
    }
    
    return roles[role]
}