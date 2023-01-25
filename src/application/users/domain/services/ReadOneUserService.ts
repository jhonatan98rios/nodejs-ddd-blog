import AppError from "../../../../shared/errors/AppError"
import { IUser } from "../models/User"
import { AbstractUserRepository } from "../repositories/AbstractUserRepository"

type ReadOneUserResponse = {
    user: IUser | null
}

export class ReadOneUserService {

    constructor(private userRepository: AbstractUserRepository) {}

    async execute(user: string): Promise<ReadOneUserResponse> {

        const findedUser = await this.userRepository.readOne(user)

        if (!findedUser) {
            throw new AppError('User not found', 404)
        }

        return { user: findedUser }
    }
}