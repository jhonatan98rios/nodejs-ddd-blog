import { Model, model, Schema } from 'mongoose'
import { IUser } from "../../../../domain/models/User"

const UserSchema: Schema = new Schema<IUser, Model<IUser>>({
    user: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
})

export type IUserModel = Model<IUser>

export class UserModel {
    static getInstance() {
        return model<IUser>('User', UserSchema)
    }
}