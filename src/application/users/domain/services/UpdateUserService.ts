import AppError from "../../../../shared/errors/AppError"
import { generateHash } from "../../../../shared/utils/hash"
import { CreateUserDto } from "../../infra/validation/CreateUser.dto"
import { UpdateUserDto } from "../../infra/validation/UpdateUser.dto"
import { User } from "../models/User"
import { AbstractUserRepository } from "../repositories/AbstractUserRepository"

type UpdateUserResponse = {
    user: User
}

export class UpdateUserService {
    constructor(private userRepository: AbstractUserRepository) {}

    async execute({
        username, password
    }: UpdateUserDto): Promise<UpdateUserResponse> {

        const userAlreadyExists = await this.userRepository.readOne(username)

        if (!userAlreadyExists) {
            throw new AppError(`The user ${username} did not exists`, 404)
        }

        const hashedPassword = await generateHash(password)

        const updatedUser = new User({
            user: username, 
            password: hashedPassword
        })

        await this.userRepository.update(username, updatedUser.props)
        return { user: updatedUser }
    }
}