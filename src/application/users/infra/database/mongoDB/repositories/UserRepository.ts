import AppError from "../../../../../../shared/errors/AppError";
import { IUser } from "../../../../domain/models/User";
import { IUserToken } from "../../../../domain/models/UserToken";
import { AbstractUserRepository } from "../../../../domain/repositories/AbstractUserRepository";
import { IUserModel, UserModel } from "../models/User.schema";


export class MongoDBUserRepository implements AbstractUserRepository {

    private userModel: IUserModel

    constructor() {
        this.userModel = UserModel.getInstance()
    }

    async create(user: IUser): Promise<IUser> {
        await this.userModel.create(user)
        return user
    }

    async readOne(user: string): Promise<IUser | null> {
        const findedUser = await this.userModel.findOne({ user })
        return findedUser
    }
}