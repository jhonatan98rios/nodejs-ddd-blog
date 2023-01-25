import { Secret, sign } from "jsonwebtoken";
import AppError from "../../../../../../shared/errors/AppError";
import { IUserToken, UserToken } from "../../../../domain/models/UserToken";
import { AbstractUserTokenRepository } from "../../../../domain/repositories/AbstractUserTokenRepository";
import { IUserTokenModel, UserTokenModel } from "../models/UserToken.schema";
import authConfig from '../../../../../../adapters/auth/config'

export class MongoDBUserTokenRepository implements AbstractUserTokenRepository {

    private userTokenModel: IUserTokenModel

    constructor() {
        this.userTokenModel = UserTokenModel.getInstance()
    }

    async findByToken(token: string): Promise<IUserToken | undefined> {
        const userToken = await this.userTokenModel.findOne({ token })

        if (!userToken) {
            throw new AppError("Invalid token")
        }

        return userToken
    }

    async create(userToken: IUserToken): Promise<void> {       
        await this.userTokenModel.create(userToken)
    }
}