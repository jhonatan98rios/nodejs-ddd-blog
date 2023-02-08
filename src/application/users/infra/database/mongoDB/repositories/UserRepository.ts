import { IUser } from "../../../../domain/models/User";
import { AbstractUserRepository } from "../../../../domain/repositories/AbstractUserRepository";
import { UpdateUserDto } from "../../../validation/UpdateUser.dto";
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

    async readAll(): Promise<IUser[] | null> {
        const users = await this.userModel.find()
        return users
    }

    async readOne(user: string): Promise<IUser | null> {
        const findedUser = await this.userModel.findOne({ user })
        return findedUser
    }

    async readOneByMail(mail: string): Promise<IUser | null> {
        const findedUser = await this.userModel.findOne({ mail })
        return findedUser
    }

    async update(username: string, user: UpdateUserDto): Promise<UpdateUserDto> {
        await this.userModel.findOneAndUpdate({ user: username }, user)
        return user
    }
}