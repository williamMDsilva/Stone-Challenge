import { UserRepository } from "../../infra/repository/prisma/user/user-repository";
import { UserTokenService } from "../../infra/service/session/user-token-service";
import { Usecase } from "../usecase";

export type SessionInput = {
    token: string,
}


type SessionUserOutput = {
    id: string,
    email: string,
    role: "ADMIN" | "USER" // TODO - make batter way
}

export type SessionOutput = {
    isValid: boolean,
    user: SessionUserOutput | undefined
}


export class CheckSessionUseCase implements Usecase<SessionInput, SessionOutput> {
    private constructor(
        private readonly userRepository: UserRepository,
        private readonly userTokenService: UserTokenService,
    ) { }

    public static create(
        userRepository: UserRepository,
        userTokenService: UserTokenService
    ) {
        return new CheckSessionUseCase(userRepository, userTokenService)
    }

    public async call(input: SessionInput): Promise<SessionOutput> {

        const userFromToken = this.userTokenService.validate(input.token);
        if (userFromToken.id == null) return {
            isValid: false,
            user: undefined
        }

        const user = await this.userRepository.fetchById(userFromToken.id);

        const userOutput: SessionUserOutput = {
            id: user.id,
            email: user.email,
            role: user.role
        }

        return {
            isValid: true,
            user: userOutput
        }
    }

}