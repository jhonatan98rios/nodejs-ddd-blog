import { addHours, isAfter } from "date-fns";
import AppError from "@shared/errors/AppError";
import { AbstractUserRepository } from "../repositories/AbstractUserRepository";
import { AbstractUserTokenRepository } from "../repositories/AbstractUserTokenRepository";

type CheckInSessionResponse = {
    user: string,
    token: string,
    role: string
}

export class CheckInSessionService {

    constructor(
        private userRepository: AbstractUserRepository,
        private userTokenRepository: AbstractUserTokenRepository
    ) {}

    async execute(token: string): Promise<CheckInSessionResponse> {

        const userToken = await this.userTokenRepository.findByToken(token)

        if (!userToken) {
            throw new AppError('User Token does not exists.');
        }

        const user = await this.userRepository.readOne(userToken.user)

        if (!user) {
            throw new AppError('User does not exists.');
        }

        const compare = addHours(userToken.created_at, 2)

        if (isAfter(Date.now(), compare)) {
            throw new AppError('Token expired.');
        }

        return {
            user: userToken.user,
            token: userToken.token,
            role: user.role
        }
    }
}