import { Transaction, TransactionProps } from './transaction';
import { CreditCard } from './credit-card';

describe('tests transaction', () => {
    test('test instance objects', () => {
        const creditCard = CreditCard.create("1234123412341234", "Luke Skywalker", 7990, 789, "12/24")

        const buy = Transaction.create(
            "7e655c6e-e8e5-4349-8348-e51e0ff3072e",
            "Luke Skywalker",
            950,
            creditCard
        )

        expect(buy).toBeInstanceOf(Transaction)
        expect(creditCard).toBeInstanceOf(CreditCard)

        expect(buy.clientId).toBe("7e655c6e-e8e5-4349-8348-e51e0ff3072e")
        expect(buy.clientName).toBe("Luke Skywalker")
        expect(buy.totalToPay).toBe(950)
    });

    test('test instance objects with History', () => {
        const history = [
            {
                clientId: "7e655c6e-e8e5-4349-8348-e51e0ff3072e",
                clientName: "Luke Skywalker",
                totalToPay: 950,
                date: Date.now().toString(),
                creditCardNumber: "**** **** **** 1234"
            },
            {
                clientId: "7e655c6e-e8e5-4349-8348-e51e0ff3072e",
                clientName: "Luke Skywalker",
                totalToPay: 950,
                date: Date.now().toString(),
                creditCardNumber: "**** **** **** 1234"
            }
        ]

        const transactions = Transaction.withHistory(history)

        expect(transactions[0]).toBeInstanceOf(Transaction)
        expect(transactions[0].creditCard.cardNumber).toBe(history[0].creditCardNumber)
        expect(transactions[0].clientId).toBe("7e655c6e-e8e5-4349-8348-e51e0ff3072e")
        expect(transactions[0].clientName).toBe("Luke Skywalker")
        expect(transactions[0].totalToPay).toBe(950)

        expect(transactions[1]).toBeInstanceOf(Transaction)
        expect(transactions[1].creditCard.cardNumber).toBe(history[1].creditCardNumber)
        expect(transactions[1].clientId).toBe("7e655c6e-e8e5-4349-8348-e51e0ff3072e")
        expect(transactions[1].clientName).toBe("Luke Skywalker")
        expect(transactions[1].totalToPay).toBe(950)
    });

});