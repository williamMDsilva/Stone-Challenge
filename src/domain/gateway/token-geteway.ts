export type UserTokenSign = {
    id: string,
    email: string,
    role: "ADMIN" | "USER", // TODO - improve
}

export interface TokenGateway {
    generate(user: UserTokenSign): string

    validate(token: string): any //TODO - check return
}