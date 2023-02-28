import { Request, Response } from 'express';
import { UpdateUserService } from '@users/domain/services/UpdateUserService';
import { ReadAllUsersService } from '@users/domain/services/ReadAllUsersService';
import { CheckInSessionService } from '@users/domain/services/CheckInSessionService';
import { CreateSessionService } from '@users/domain/services/CreateSessionService';
import { CreateUserService } from '@users/domain/services/CreateUserService';
import { ReadOneUserService } from '@users/domain/services/ReadOneUserService';
import { MongoDBUserRepository } from '@users/infra/database/mongoDB/repositories/UserRepository';
import { MongoDBUserTokenRepository } from '@users/infra/database/mongoDB/repositories/UserTokenRepository';
import { UpdateUserRoleService } from '@users/domain/services/UpdateUserRoleService';
import { LogoutSessionService } from '@users/domain/services/LogoutSessionService';
import { ForgotPasswordService } from '@users/domain/services/ForgotPasswordService';
import { ResetPasswordService } from '@users/domain/services/ResetPasswordService';
import SESMailProvider from '@users/infra/mail/SESMailProvider';

export class UserController {

    public async create(request: Request, response: Response): Promise<Response> {

        const { user, password, mail, consent } = request.body

        const userRepository = new MongoDBUserRepository()

        const createUserService = new CreateUserService(userRepository)
        const createdUser = await createUserService.execute({
            user, password, mail, consent
        })

        return response.json(createdUser)
    }


    public async update(request: Request, response: Response): Promise<Response> {

        const { username } = request.params
        const { currentPassword, password, passwordConfirmation } = request.body

        const userRepository = new MongoDBUserRepository()

        const updateUserService = new UpdateUserService(userRepository)
        const updatedUser = await updateUserService.execute({
            username, currentPassword, password, passwordConfirmation
        })

        return response.json(updatedUser)
    }


    public async updateUserRole(request: Request, response: Response): Promise<Response> {

        const { username } = request.params
        const { role } = request.body

        const userRepository = new MongoDBUserRepository()
        const userTokenRepository = new MongoDBUserTokenRepository()

        const updateUserRoleService = new UpdateUserRoleService(userRepository, userTokenRepository)
        const updatedUser = await updateUserRoleService.execute({
            username, role
        })

        return response.json(updatedUser)
    }


    public async readAll(request: Request, response: Response): Promise<Response> {

        const userRepository = new MongoDBUserRepository()
        
        const readAllUsersService = new ReadAllUsersService(userRepository)
        const users = await readAllUsersService.execute()
        return response.json(users)
    }


    public async readOne(request: Request, response: Response): Promise<Response> {
        const { user } = request.params

        const userRepository = new MongoDBUserRepository()
        
        const readUserService = new ReadOneUserService(userRepository)
        const findedUser = await readUserService.execute(user)
        return response.json(findedUser)
    }

    public async login(request: Request, response: Response): Promise<Response> {

        const { user, password } = request.body

        const userRepository = new MongoDBUserRepository()
        const userTokenRepository = new MongoDBUserTokenRepository()
        
        const createSession = new CreateSessionService(userRepository, userTokenRepository)

        const session = await createSession.execute({
            user, password
        })

        return response.json(session)
    }

    public async checkIn(request: Request, response: Response): Promise<Response> {

        const { token } = request.body

        const userRepository = new MongoDBUserRepository()
        const userTokenRepository = new MongoDBUserTokenRepository()

        const checkInSession = new CheckInSessionService(userRepository, userTokenRepository)

        const session = await checkInSession.execute(token)
        return response.json(session)
    }

    public async logout(request: Request, response: Response): Promise<Response> {

        const { username } = request.params

        const userRepository = new MongoDBUserRepository()
        const userTokenRepository = new MongoDBUserTokenRepository()
        
        const logoutService = new LogoutSessionService(userRepository, userTokenRepository)
        
        await logoutService.execute(username)
        return response.status(202).send()
    }


    public async forgotPassword(request: Request, response: Response): Promise<Response> {

        const { mail } = request.body

        const userRepository = new MongoDBUserRepository()
        const mailProvider = new SESMailProvider()

        const forgotPasswordService = new ForgotPasswordService(userRepository, mailProvider)

        const result = await forgotPasswordService.execute(mail)
        return response.json(result)
    }


    public async resetPassword(request: Request, response: Response): Promise<Response> {

        const { mail, token, password, passwordConfirmation } = request.body

        const userRepository = new MongoDBUserRepository()
        const resetPasswordService = new ResetPasswordService(userRepository)

        const updatedUser = await resetPasswordService.execute({ 
            mail, token, password, passwordConfirmation 
        })

        return response.json(updatedUser)
    }
}