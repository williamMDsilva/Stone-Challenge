import { PrismaClient } from '@prisma/client';
import { UserRepository } from '../../infra/repository/prisma/user/user-repository';
import { CheckSessionUseCase, SessionInput } from "./check-session-usecase";
import { UserTokenService } from '../../infra/service/session/user-token-service';
import { User } from '../../domain/entity/user/user';
import { UserPasswordService } from '../../infra/service/password/user-password-service';
import { UserTokenSign } from '../../domain/gateway/token-geteway';
import prismaClient from '../../../prisma/prisma-client';

const PASSWORD = "Teste123w$%";
const ROLE = "USER";
const EMAIL = "email@email.com";

describe('testing check session use case', () => {

    beforeEach(async () => {
        const userPasswordService = UserPasswordService.create(10)

        const userRepository = UserRepository.create(prismaClient)

        await userRepository.save(User.create(
            EMAIL,
            userPasswordService.generate(PASSWORD),
            "Meu Nome Completo",
            ROLE,
        ))
    });

    afterEach(async () => {
        // TODO - uncomment before create seeds
        await prismaClient.user.deleteMany({})
    });

    test('with a pre-saved user', async () => {
        const userRepository = UserRepository.create(prismaClient)
        const tokenService = UserTokenService.create("secret", "24h")

        const checkSession = CheckSessionUseCase.create(
            userRepository,
            tokenService
        )

        const userDatabase = await userRepository.fetchByEmail(EMAIL)

        const user: UserTokenSign = {
            id: userDatabase.id,
            email: EMAIL,
            role: ROLE

        }

        const userOutput = {
            id: user.id,
            email: user.email,
            role: user.role
        }

        const token = tokenService.generate(user)

        const userInput: SessionInput = {
            token: token
        }

        const result = await checkSession.call(userInput)

        expect(result.isValid).toBeTruthy()
        expect(result.user).toMatchObject(userOutput)
    });

})