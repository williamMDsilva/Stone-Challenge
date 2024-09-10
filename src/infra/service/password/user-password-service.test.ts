import exp from "constants";
import { UserPasswordService } from "./user-password-service";
import { PasswordGateway } from "../../../domain/gateway/password-geteway";

describe('testing token service', () => {
    test('with a genate token to password user', () => {
        const tokenService: PasswordGateway = UserPasswordService.create(10)

        const password = "passworkd";

        const token = tokenService.generate(password)

        const isValid = tokenService.validate(token, password)

        expect(isValid).toBe(true)
    });

    test('with a genate token to password user test wrong password', () => {
        const tokenService: PasswordGateway = UserPasswordService.create(10)

        const password = "passworkd";

        const passwordWrong = "Senhasenha";

        const token = tokenService.generate(password)

        const isValid = tokenService.validate(token, passwordWrong)

        expect(isValid).toBe(false)
    });

})