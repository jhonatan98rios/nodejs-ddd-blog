import AppError from "@shared/errors/AppError";
import { IUserToken } from "@user/domain/models/UserToken";
import { AbstractUserTokenRepository } from "@user/domain/repositories/AbstractUserTokenRepository";
import { IUserTokenModel, UserTokenModel } from "../models/UserToken.schema";


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

    async delete(username: string): Promise<void> {       
        await this.userTokenModel.findOneAndDelete({
            user: username
        })
    }
}