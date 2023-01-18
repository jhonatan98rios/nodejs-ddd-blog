export enum Role {
    READ = 'read',
    WRITE = 'write',
    ADMIN = 'admin'
}

export interface IUser {
    user: string
    password: string
    role: Role
}

export class User {

    props: IUser

    constructor(props: IUser) {
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

    get role(): Role {
        return this.props.role || Role.READ
    }

    set role(role: Role) {
        this.props.role = role
    }
}