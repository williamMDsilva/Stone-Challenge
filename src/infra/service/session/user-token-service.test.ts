import { TokenGateway, UserTokenSign } from "../../../domain/gateway/token-geteway";
import { UserDomainService } from "../user/user-domain-service";
import { UserTokenService } from "./user-token-service";

describe('testing token service', () => {
    test('with a UserTokenSign user', () => {
        const tokenService: TokenGateway = UserTokenService.create("secret", "24h")

        const user: UserTokenSign = {
            id: "asdasd",
            email: "email@email.com",
            role: "ADMIN", // TODO - improve
        }

        const token = tokenService.generate(user)
        const userFromToken = tokenService.validate(token)

        expect(token).not.toBe(null)
        expect(token).not.toBe("")
        expect(userFromToken).toMatchObject(user)
    });

})