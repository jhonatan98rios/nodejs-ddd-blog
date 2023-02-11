import { NextFunction, Request, Response } from 'express';
import { Roles } from '@users/domain/models/User';
import AppError from '@shared/errors/AppError';

export function useAuthorization(requiredRole: string) {
    return function(request: Request, response: Response, next: NextFunction) {

        const { role } = request.user

        if (!Object.values(Roles).includes(role as Roles)) {
            throw new AppError('Invalid role');
        }

        if (!isAuthorized(requiredRole, role)) {
            throw new AppError('The user does not meet the minimum permissions');
        }

        return next()
    }
}

function isAuthorized(requiredRole: string, userRole: string) {

    const isAuthorized = userRole === Roles.ADMIN 
    ? true 
    : requiredRole === Roles.WRITE && userRole === Roles.WRITE 
        ? true 
        : false

    if (!isAuthorized) {
        throw new AppError('The user does not meet the minimum permissions');
    }

    console.log('userRole: ', userRole)
    console.log('requiredRole: ', requiredRole)

    return isAuthorized
}