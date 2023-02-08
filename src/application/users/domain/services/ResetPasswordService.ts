import { Secret, verify } from 'jsonwebtoken';
import { generateHash } from '@shared/utils/hash';
import authConfig from '@adapters/auth/config'
import AppError from "@shared/errors/AppError";
import { Roles, User } from '../models/User';
import { AbstractUserRepository } from "../repositories/AbstractUserRepository";

interface ITokenPayload {
    iat: number
    exp: number
    mail: string
    password: string
}

interface IResetPasswordService {
    mail: string
    token: string
    password: string
    passwordConfirmation: string
}

type ResetPasswordResponse = {
    user: User
}

export class ResetPasswordService {

    constructor(
        private userRepository: AbstractUserRepository,
    ) {}

    async execute({ 
        mail, token, password, passwordConfirmation 
    }: IResetPasswordService): Promise<ResetPasswordResponse> {

        if (password != passwordConfirmation) {
            throw new AppError(`Password does not match password confirmation`);
        }
        
        const findedUser = await this.userRepository.readOneByMail(mail)

        if (!findedUser) {
            throw new AppError('User does not exists.');
        }

        try {
            const decodedToken = verify(token, authConfig.jwt.secret as Secret)
            const payload = decodedToken as ITokenPayload

            if (payload.mail != mail) {
                throw new AppError(`Token does not match user: ${findedUser.user}`);
            }

            if (payload.password != findedUser.password) {
                throw new AppError(`Invalid JWT Token.`);
            }

            const hashedPassword = await generateHash(password)

            const updatedUser = new User({
                user: findedUser.user,
                mail: findedUser.mail,
                password: hashedPassword,
                role: Roles.READ
            })

            this.userRepository.update(findedUser.user, updatedUser.props)

            return { user: updatedUser }

        } catch {
            throw new AppError('Invalid JWT Token.');
        }
    }
}