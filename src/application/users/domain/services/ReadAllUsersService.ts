import AppError from "../../../../shared/errors/AppError"
import { IUser } from "../models/User"
import { AbstractUserRepository } from "../repositories/AbstractUserRepository"

type ReadOneUserResponse = {
    users: IUser[] | null
}

export class ReadAllUsersService {

    constructor(private userRepository: AbstractUserRepository) {}

    async execute(): Promise<ReadOneUserResponse> {
        const users = await this.userRepository.readAll()
        if (!users) {
            throw new AppError('No user found', 404)
        }
        return { users: users }
    }
}