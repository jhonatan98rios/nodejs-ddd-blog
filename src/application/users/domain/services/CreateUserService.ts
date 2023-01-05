import AppError from "../../../../shared/errors/AppError"
import { generateHash } from "../../../../shared/utils/hash"
import { CreateUserDto } from "../../infra/validation/CreateUser.dto"
import { User } from "../models/User"
import { AbstractUserRepository } from "../repositories/AbstractUserRepository"

type CreateUserResponse = {
    user: User
}

export class CreateUserService {
    constructor(private userRepository: AbstractUserRepository) {}

    async execute({
        user, password
    }: CreateUserDto): Promise<CreateUserResponse> {

        const userAlreadyExists = await this.userRepository.readOne(user)

        if (userAlreadyExists) {
            throw new AppError('This user already exists', 409)
        }

        const hashedPassword = await generateHash(password)

        const createdUser = new User({
            user, 
            password: hashedPassword
        })

        await this.userRepository.create(createdUser.props)
        return { user: createdUser }
    }
}