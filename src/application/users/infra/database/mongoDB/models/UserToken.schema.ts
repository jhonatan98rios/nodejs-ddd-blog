import { Model, model, Schema } from 'mongoose'
import { IUserToken } from "../../../../domain/models/UserToken"

const UserTokenSchema: Schema = new Schema<IUserToken, Model<IUserToken>>({
    token: { type: String, required: true, unique: true },
    user: { type: String, required: true, unique: true },
    created_at: { type: Date, required: true, unique: true }
})

export type IUserTokenModel = Model<IUserToken>

export class UserTokenModel {
    static getInstance() {
        return model<IUserToken>('UserToken', UserTokenSchema)
    }
}