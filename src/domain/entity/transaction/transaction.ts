import { CreditCard } from './credit-card';

export type TransactionProps = {
    id: string,
    clientId: string,
    clientName: string,
    totalToPay: number,
    date: string,
    creditCard: CreditCard
}

export class Transaction {
    private constructor(private props: TransactionProps) { }

    public static create(
        clientId: string,
        clientName: string,
        totalToPay: number,
        creditCard: CreditCard
    ) {
        return new Transaction({
            id: crypto.randomUUID().toString(),
            clientId,
            clientName,
            totalToPay,
            date: Date.now().toString(),
            creditCard
        })
    }

    public static with(props: TransactionProps) {
        const creditCard = props.creditCard as CreditCard
        return new Transaction({ ...props, creditCard })
    }

    public static withList(rawProps: any[]): Transaction[] {
        const transactions: Transaction[] = [];

        for (const props of rawProps) {
            const transaction = Transaction.with(props);

            transactions.push(transaction)
        }

        return transactions
    }

    public static buildCreditCardFromHistory(history: any) {
        return { ...history, creditCard: { cardNumber: history.creditCardNumber } }
    }

    public static withHistory(rawProps: any[]) {
        const transactions: Transaction[] = [];

        for (const history of rawProps) {
            const props = this.buildCreditCardFromHistory(history)

            const transaction = Transaction.with(props);

            transactions.push(transaction)
        }

        return transactions
    }

    public get id() {
        return this.props.id
    }

    public get clientId() {
        return this.props.clientId
    }

    public get clientName() {
        return this.props.clientName
    }

    public get totalToPay() {
        return this.props.totalToPay
    }

    public get date() {
        return this.props.date
    }

    public get creditCard() {
        return this.props.creditCard
    }

}