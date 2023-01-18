import AppError from "../errors/AppError";
import { Role } from "../../application/users/domain/models/User";

export function roleValidation(role: string): Role {

    const roles = {
        'read': Role.READ,
        'write': Role.WRITE,
        'admin': Role.ADMIN
    } as any

    if (!Object.keys(roles).includes(role)) {
        throw new AppError('Invalid role')
    }
    
    return roles[role]
}