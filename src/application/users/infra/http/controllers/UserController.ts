import { Request, Response } from 'express';
import { CheckInSessionService } from '../../../domain/services/CheckInSessionService';
import { CreateSessionService } from '../../../domain/services/CreateSessionService';
import { CreateUserService } from '../../../domain/services/CreateUserService';
import { ReadOneUserService } from '../../../domain/services/ReadOneUserService';
import { MongoDBUserRepository } from '../../database/mongoDB/repositories/UserRepository';
import { MongoDBUserTokenRepository } from '../../database/mongoDB/repositories/UserTokenRepository';

export class UserController {

    public async create(request: Request, response: Response): Promise<Response> {

        const { user, password } = request.body

        const userRepository = new MongoDBUserRepository()

        const createUserService = new CreateUserService(userRepository)
        const createdUser = await createUserService.execute({
            user, password
        })

        return response.json(createdUser)
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
}