import { CreateUserDto } from "../../infra/validation/CreateUser.dto";
import { IUser } from "../models/User";
import { IUserToken } from "../models/UserToken";

export abstract class AbstractUserRepository {
    abstract create(user: CreateUserDto): Promise<IUser>
    abstract readOne(user: string): Promise<IUser | null>
}