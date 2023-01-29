import AppError from "../../../../shared/errors/AppError";
import { AbstractUserRepository } from "../repositories/AbstractUserRepository";
import { AbstractUserTokenRepository } from "../repositories/AbstractUserTokenRepository";

export class LogoutSessionService {

    constructor(
        private userRepository: AbstractUserRepository,
        private userTokenRepository: AbstractUserTokenRepository
    ) {}

    async execute(username: string): Promise<void> {
        const userAlreadyExists = await this.userRepository.readOne(username)

        if (!userAlreadyExists) {
            throw new AppError(`The user ${username} did not exists`, 404)
        }

        await this.userTokenRepository.delete(username)
    }
}