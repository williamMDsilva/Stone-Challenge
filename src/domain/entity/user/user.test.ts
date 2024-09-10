import { User } from "./user";

describe('testing user', () => {
    test('entity with right data', () => {
        const userAdmin = User.create("email@email.com", "password", "name", "ADMIN")

        const userUser = User.create("emai1l@email.com", "password", "name", "USER")

        expect(userAdmin.role).toBe("ADMIN")
        expect(userAdmin.email).toBe("email@email.com")

        expect(userUser.role).toBe("USER")
        expect(userUser.email).toBe("emai1l@email.com")

    });

    test('with wrog data', () => {
        let email: any;

        expect(() => (User.create("nao email.com", "password", "name", "ADMIN"))).toThrow(/Invalid Email/)
        expect(() => (User.create(email, "password", "name", "ADMIN"))).toThrow(/Invalid Email/)
    });
});