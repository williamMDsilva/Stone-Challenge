import { Transaction } from "./transaction";
import { CreditCard } from './credit-card';

describe('tests credit card', () => {
    test('test instance objects', () => {
        const creditCard = CreditCard.create("1234123412341234", "Luke Skywalker", 7990, 789, "12/24")

        expect(creditCard).toBeInstanceOf(CreditCard)

        expect(creditCard.cardNumber).toBe("1234123412341234")
        expect(creditCard.cardHolderName).toBe("Luke Skywalker")
        expect(creditCard.value).toBe(7990)
        expect(creditCard.cvv).toBe(789)
        expect(creditCard.expDate).toBe("12/24")

    });
});