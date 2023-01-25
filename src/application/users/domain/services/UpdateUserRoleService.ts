import { roleValidation } from "../../../../shared/utils/RoleValidation"
import AppError from "../../../../shared/errors/AppError"
import { UpdateUserRoleDto } from "../../infra/validation/UpdateUserRole.dto"
import { Roles, User } from "../models/User"
import { AbstractUserRepository } from "../repositories/AbstractUserRepository"

type UpdateUserRoleReponse = {
    user: User
}

export class UpdateUserRoleService {
    constructor(private userRepository: AbstractUserRepository) {}

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
            password: userAlreadyExists.password
        })

        await this.userRepository.update(username, updatedUser.props)
        return { user: updatedUser }
    }
}