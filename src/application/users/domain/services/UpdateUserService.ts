import AppError from "@shared/errors/AppError"
import { generateHash } from "@shared/utils/hash"
import { UpdateUserDto } from "@users/infra/validation/UpdateUser.dto"
import { User } from "../models/User"
import { AbstractUserRepository } from "../repositories/AbstractUserRepository"

type UpdateUserResponse = {
    user: User
}

export class UpdateUserService {
    constructor(private userRepository: AbstractUserRepository) {}

    async execute({
        username, password, passwordConfirmation
    }: UpdateUserDto): Promise<UpdateUserResponse> {

        if (password != passwordConfirmation) {
            throw new AppError(`O campo confirmação de senha precisa ser igual ao campo senha`);
        }

        const userAlreadyExists = await this.userRepository.readOne(username)

        if (!userAlreadyExists) {
            throw new AppError(`O usuário ${username} não foi encontrado`, 404)
        }

        const hashedPassword = await generateHash(password)

        const updatedUser = new User({
            user: username,
            mail: userAlreadyExists.mail,
            password: hashedPassword,
            role: userAlreadyExists.role
        })

        await this.userRepository.update(username, updatedUser.props)
        return { user: updatedUser }
    }
}