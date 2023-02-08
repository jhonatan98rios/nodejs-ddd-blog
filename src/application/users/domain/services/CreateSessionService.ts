import authConfig from '@adapters/auth/config'
import { sign, Secret } from 'jsonwebtoken';
import AppError from "@shared/errors/AppError";
import { compareHash } from "@shared/utils/hash";
import { CreateSessionDto } from "@user/infra/validation/CreateSession.dto";
import { AbstractUserRepository } from "../repositories/AbstractUserRepository";
import { AbstractUserTokenRepository } from '../repositories/AbstractUserTokenRepository';
import { UserToken } from '../models/UserToken';

type CreateSessionResponse = {
    user: string,
    token: string,
    role: string,
}

export class CreateSessionService {

    constructor(
        private userRepository: AbstractUserRepository,
        private userTokenRepository: AbstractUserTokenRepository
    ) {}

    async execute({ user, password }: CreateSessionDto): Promise<CreateSessionResponse> {

        const findedUser = await this.userRepository.readOne(user)

        if (!findedUser) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwordConfirmed = await compareHash(
            password, 
            findedUser.password
        )

        if (!passwordConfirmed) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const payload = {
            role: findedUser.role,
        }

        const options = {
            subject: user,
            expiresIn: authConfig.jwt.expiresIn
        }

        const token = sign(payload, authConfig.jwt.secret as Secret, options)
        
        const userToken = new UserToken({
            token, user
        })
        
        await this.userTokenRepository.create(userToken.props) 
       
        return {
            user: userToken.user,
            token: token,
            role: findedUser.role
        }
    }
}