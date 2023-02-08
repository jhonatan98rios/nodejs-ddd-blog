import { CreateUserDto } from "@user/infra/validation/CreateUser.dto";
import { UpdateUserDto } from "@user/infra/validation/UpdateUser.dto";
import { IUser } from "../models/User";

export abstract class AbstractUserRepository {
    abstract create(user: CreateUserDto): Promise<IUser>
    abstract readAll(): Promise<IUser[] | null>
    abstract readOne(user: string): Promise<IUser | null>
    abstract readOneByMail(mail: string): Promise<IUser | null>
    abstract update(username: string, user: Partial<UpdateUserDto>): Promise<UpdateUserDto>
}