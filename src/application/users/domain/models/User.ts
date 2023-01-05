import { CreateUserDto } from "../../infra/validation/CreateUser.dto"

export interface IUser {
    user: string
    password: string
}

export class User {

    props: IUser

    constructor(props: CreateUserDto) {
        this.props = props
    }

    get user(): string {
        return this.props.user
    }

    set user(user: string) {
        this.props.user = user
    }

    get password(): string {
        return this.props.password
    }

    set password(password: string) {
        this.props.password = password
    }
}