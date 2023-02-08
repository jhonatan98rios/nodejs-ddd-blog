import { Model, model, Schema } from 'mongoose'
import { IUser } from "@user/domain/models/User"

const UserSchema: Schema = new Schema<IUser, Model<IUser>>({
    user: { type: String, required: true, unique: true },
    mail: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: false },
    role: { type: String, required: true, unique: false },
})

export type IUserModel = Model<IUser>

export class UserModel {
    static getInstance() {
        return model<IUser>('User', UserSchema)
    }
}