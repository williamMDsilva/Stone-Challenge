export interface PasswordGateway {
    generate(password: string): string

    validate(token: string, password: string): boolean // TODO - check return
}