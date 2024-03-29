export enum Roles {
    READ = 'read',
    WRITE = 'write',
    ADMIN = 'admin'
}

export interface IUser {
    user: string
    mail: string
    password: string
    role: Roles
    consent: boolean
    likedPosts: string[]
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

    get mail(): string {
        return this.props.mail
    }

    set mail(mail: string) {
        this.props.mail = mail
    }

    get password(): string {
        return this.props.password
    }

    set password(password: string) {
        this.props.password = password
    }

    get role(): Roles {
        return this.props.role || Roles.READ
    }

    set role(role: Roles) {
        this.props.role = role
    }

    get consent(): boolean {
        return this.props.consent
    }

    set consent(consent: boolean) {
        this.props.consent = consent
    }

    
    get likedPosts(): string[] {
        return this.props.likedPosts
    }

    set likedPosts(likedPosts: string[]) {
        this.props.likedPosts = likedPosts
    }
}