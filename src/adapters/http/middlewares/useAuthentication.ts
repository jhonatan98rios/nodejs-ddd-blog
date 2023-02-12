import { NextFunction, Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import { isAuthenticated } from '@adapters/auth/isAuthenticated';

export function useAuthentication(
    request: Request,
    response: Response,
    next: NextFunction,
) {

    const authHeader = request.headers.authorization

    if (!authHeader) {
        throw new AppError('Falha ao autenticar o usuário');
    }

    const { sub, role } = isAuthenticated(authHeader)

    request.user = {
        id: sub,
        role
    }

    return next()
}