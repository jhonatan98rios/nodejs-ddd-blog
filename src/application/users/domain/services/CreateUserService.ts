import AppError from "@shared/errors/AppError"
import { generateHash } from "@shared/utils/hash"
import { CreateUserDto } from "@users/infra/validation/CreateUser.dto"
import { Roles, User } from "../models/User"
import { AbstractUserRepository } from "../repositories/AbstractUserRepository"

type CreateUserResponse = {
    user: User
}

export class CreateUserService {
    constructor(private userRepository: AbstractUserRepository) {}

    async execute({
        user, password, mail, consent
    }: CreateUserDto): Promise<CreateUserResponse> {

        const userAlreadyExists = await this.userRepository.readOne(user)

        if (userAlreadyExists) {
            throw new AppError('Esse nome de usuário já esta sendo utilizado por outro usuário', 409)
        }

        const mailAlreadyExists = await this.userRepository.readOneByMail(mail)

        if (mailAlreadyExists) {
            throw new AppError('Esse e-mail já esta sendo utilizado por outro usuário', 409)
        }

        const hashedPassword = await generateHash(password)

        const createdUser = new User({
            user,
            mail,
            role: Roles.READ,
            password: hashedPassword,
            consent
        })

        await this.userRepository.create(createdUser.props)
        return { user: createdUser }
    }
}