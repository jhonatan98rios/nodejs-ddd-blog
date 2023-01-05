import { verify, Secret } from 'jsonwebtoken'
import AppError from '../../shared/errors/AppError'
import authConfig from './config'

interface ITokenPayload {
    iat: number
    exp: number
    sub: string
}

export function isAuthenticated(authHeader: string) {

    const [, token] = authHeader.split(' ')

    try {
        const decodedToken = verify(token, authConfig.jwt.secret as Secret)
        const { sub } = decodedToken as ITokenPayload
        return sub

      } catch {
        throw new AppError('Invalid JWT Token.');
      }
}