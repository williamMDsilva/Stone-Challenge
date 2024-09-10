import { UserRepository } from '../../infra/repository/prisma/user/user-repository';
import { CheckSessionUseCase, SessionInput } from "./check-session-usecase";
import { UserTokenService } from '../../infra/service/session/user-token-service';
import { LoginUseCase } from './login-usecase';
import { User } from '../../domain/entity/user/user';
import { UserTokenSign } from '../../domain/gateway/token-geteway';
import { UserPasswordService } from '../../infra/service/password/user-password-service';
import prismaClient from '../../../prisma/prisma-client';

const PASSWORD = "Teste123w$%";
const ROLE = "USER";
const EMAIL = "email@email.com";

const userPasswordService = UserPasswordService.create(10)
const tokenService = UserTokenService.create("secret", "24h")

describe('testing check session use case', () => {

    beforeEach(async () => {
        const userRepository = UserRepository.create(prismaClient)

        await userRepository.save(User.create(
            EMAIL,
            userPasswordService.generate(PASSWORD),
            "Meu Nome Completo",
            ROLE,
        ))
    });

    afterEach(async () => {
        await prismaClient.user.deleteMany({})
    });

    test('with a pre-saved user', async () => {
        const userRepository = UserRepository.create(prismaClient)

        const createSession = LoginUseCase.create(userRepository, userPasswordService, tokenService)

        const loginInput = {
            email: EMAIL,
            password: PASSWORD
        }

        const result = await createSession.call(loginInput)

        expect(result.token).not.toBeNull()
        expect(result.token).not.toBeUndefined()
    });

})