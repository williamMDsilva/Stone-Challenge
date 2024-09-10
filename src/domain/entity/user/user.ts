import { InvalidEntity } from "../../exceptions/InvalidEntity";

export type Role = "ADMIN" | "USER";

export type UserProps = {
    id: string,
    email: string,
    name: string,
    password: string,
    role: Role,
}

const REGEX_EMAIL = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export class User {

    private constructor(private props: UserProps) {
        this.validate()
    }

    public static create(
        email: string,
        password: string,
        name: string,
        role: Role) {

        return new User({
            id: crypto.randomUUID().toString(),
            email: String(email).toLowerCase(),
            password, // TODO encript password
            name,
            role,
        })

    }

    public static with(props: UserProps) {
        return new User(props)
    }

    private validate() {
        if (this.props.email == undefined || !REGEX_EMAIL.test(this.props.email)) {
            throw new InvalidEntity("Invalid Email")
        }
        // TODO - call domain service??
    }

    public get id(): string {
        return this.props.id
    }

    public get email(): string {
        return this.props.email
    }

    public get name(): string {
        return this.props.name
    }

    public get password(): string {
        return this.props.password
    }

    public get role(): Role {
        return this.props.role
    }
}