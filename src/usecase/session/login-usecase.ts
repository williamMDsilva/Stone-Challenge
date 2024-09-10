import { UserRepository } from "../../infra/repository/prisma/user/user-repository";
import { UserTokenService } from "../../infra/service/session/user-token-service";
import { Usecase } from "../usecase";

import { TokenGateway, UserTokenSign } from "../../domain/gateway/token-geteway";
import { PasswordGateway } from "../../domain/gateway/password-geteway";
import { UserGateway } from "../../domain/gateway/user-gateway";

export type LoginInput = {
    email: string,
    password: string,
}

export type LoginOutput = {
    token: string
}


export class LoginUseCase implements Usecase<LoginInput, LoginOutput> {
    private constructor(
        private readonly userRepository: UserGateway,
        private readonly userPasswordService: PasswordGateway,
        private readonly userTokenService: TokenGateway
    ) { }

    public static create(
        userRepository: UserGateway,
        userPasswordService: PasswordGateway,
        userTokenService: TokenGateway
    ) {

        return new LoginUseCase(
            userRepository,
            userPasswordService,
            userTokenService
        )
    }

    public async call(input: LoginInput): Promise<LoginOutput> {
        const user = await this.userRepository.fetchByEmail(input.email);
        if (!this.userPasswordService.validate(user.password, input.password))
            throw new Error("password or email invalid")

        const userToGenerateToken: UserTokenSign = {
            id: user.id,
            email: user.email,
            role: user.role,
        }

        const token = this.userTokenService.generate(userToGenerateToken)

        return {
            token
        }
    }


}