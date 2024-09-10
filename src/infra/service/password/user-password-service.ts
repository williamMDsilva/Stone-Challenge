
import bcrypt from 'bcrypt'

import { PasswordGateway } from '../../../domain/gateway/password-geteway';

export type PropsUserPassword = {
    saltRounds: number,
}

export class UserPasswordService implements PasswordGateway {
    private readonly salt;

    private constructor(private readonly props: PropsUserPassword) {
        this.salt = bcrypt.genSaltSync(this.props.saltRounds);
    }

    public static create(saltRounds: number) {
        return new UserPasswordService({ saltRounds })
    }

    public generate(password: string): string {
        return bcrypt.hashSync(password, this.salt);
    }

    public validate(token: string, password: string): boolean {
        return bcrypt.compareSync(password, token);
    }

}