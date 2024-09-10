import { sign, verify } from 'jsonwebtoken';

import { TokenGateway, UserTokenSign } from "../../../domain/gateway/token-geteway";
import { Role } from '../../../domain/entity/user/user';

export type PropsUserToken = {
    secret: string,
    expiresIn: string
}

export type UserToken = {
    id: string,
    email: string,
    role: Role
}

export class UserTokenService implements TokenGateway {
    private constructor(private readonly props: PropsUserToken) { }

    public static create(secret: string, expiresIn: string) {
        return new UserTokenService({ secret, expiresIn })
    }

    public generate(user: UserTokenSign): string {
        const token = sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            this.props.secret,
            {
                // expiresIn: this.props.expiresIn, // TODO - fix calculation
            }
        );

        return token
    }

    public validate(token: string): UserToken {
        const user: any = verify(token, this.props.secret);

        return {
            id: user.id,
            email: user.email,
            role: user.role
        }
    }

}