import { roleValidation } from "@shared/utils/RoleValidation"
import AppError from "@shared/errors/AppError"
import { UpdateUserRoleDto } from "@users/infra/validation/UpdateUserRole.dto"
import { User } from "../models/User"
import { AbstractUserRepository } from "../repositories/AbstractUserRepository"
import { AbstractUserTokenRepository } from "../repositories/AbstractUserTokenRepository"

type UpdateUserRoleReponse = {
    user: User
}

export class UpdateUserRoleService {
    constructor(
        private userRepository: AbstractUserRepository,
        private userTokenRepository: AbstractUserTokenRepository
    ) {}

    async execute({
        username, role
    }: UpdateUserRoleDto): Promise<UpdateUserRoleReponse> {

        const userAlreadyExists = await this.userRepository.readOne(username)

        if (!userAlreadyExists) {
            throw new AppError(`The user ${username} did not exists`, 404)
        }

        const updatedUser = new User({
            role: roleValidation(role),
            user: username,
            mail: userAlreadyExists.mail,
            password: userAlreadyExists.password
        })

        await this.userRepository.update(username, updatedUser.props)
        await this.userTokenRepository.delete(username)

        return { user: updatedUser }
    }
}