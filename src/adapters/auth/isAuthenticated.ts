import { verify, Secret } from 'jsonwebtoken'
import AppError from '@shared/errors/AppError'
import authConfig from './config'

interface ITokenPayload {
  iat: number
  exp: number
  sub: string
  role: string
}

export function isAuthenticated(authHeader: string) {

  const [, token] = authHeader.split(' ')

  try {
    const decodedToken = verify(token, authConfig.jwt.secret as Secret)
    const { sub, role } = decodedToken as ITokenPayload
    return { sub, role }

  } catch {
    throw new AppError('Falha ao autenticar o usuário');
  }
}