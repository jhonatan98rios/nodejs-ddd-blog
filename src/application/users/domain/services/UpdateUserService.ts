import AppError from "@shared/errors/AppError"
import { compareHash, generateHash } from "@shared/utils/hash"
import { UpdateUserDto } from "@users/infra/validation/UpdateUser.dto"
import { User } from "../models/User"
import { AbstractUserRepository } from "../repositories/AbstractUserRepository"

type UpdateUserResponse = {
    user: User
}

export class UpdateUserService {
    constructor(private userRepository: AbstractUserRepository) {}

    async execute({
        username, currentPassword, password, passwordConfirmation
    }: UpdateUserDto): Promise<UpdateUserResponse> {

        if (password != passwordConfirmation) {
            throw new AppError(`O campo "confirmação de senha" precisa ser igual ao campo senha`);
        }

        const findedUser = await this.userRepository.readOne(username)

        if (!findedUser) {
            throw new AppError(`O usuário ${username} não foi encontrado`, 404)
        }

        const currentPasswordConfirmed = await compareHash(
            currentPassword, 
            findedUser.password
        )

        if (!currentPasswordConfirmed) {
            throw new AppError('A senha atual informada é invalida', 401);
        }

        const hashedPassword = await generateHash(password)

        const updatedUser = new User({
            user: username,
            mail: findedUser.mail,
            password: hashedPassword,
            role: findedUser.role
        })

        await this.userRepository.update(username, updatedUser.props)
        return { user: updatedUser }
    }
}