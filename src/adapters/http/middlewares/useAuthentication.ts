import { NextFunction, Request, Response } from 'express';
import AppError from '../../../shared/errors/AppError';
import { isAuthenticated } from '../../auth/isAuthenticated';

export function useAuthentication(
    request: Request,
    response: Response,
    next: NextFunction,
) {

    const authHeader = request.headers.authorization

    if (!authHeader) {
        throw new AppError('JWT Token is missing.')
    }

    const userAuthentication = isAuthenticated(authHeader)

    request.user = {
        id: userAuthentication
    }

    return next()
}