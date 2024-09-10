import { UserDomainService } from "./user-domain-service";

describe('testing user', () => {
    test('entity with right data', () => {
        const password = "Email@123_456_789"

        const isValidToLogin = UserDomainService.validatePassword(password)

        expect(isValidToLogin).toBeTruthy()
    });

    test('with wrog data', () => {
        const password = "sen"

        const isValidToLogin = UserDomainService.validatePassword(password)

        expect(isValidToLogin).toBeFalsy()
    });
})