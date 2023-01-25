import { CheckInDto } from "../../infra/validation/CheckIn.dto";

export interface IUserToken {
    token: string;
    user: string;
    created_at: Date;
}

export class UserToken {

    props: IUserToken

    constructor(props: CheckInDto) {
        this.props = {
            ...props,
            created_at: new Date()
        }
    }

    get token(): string {
        return this.props.token
    }

    set token(token: string) {
        this.props.token = token
    }

    get user(): string {
        return this.props.user
    }

    set user(user: string) {
        this.props.user = user
    }

    get created_at(): Date {
        return this.props.created_at
    }
}