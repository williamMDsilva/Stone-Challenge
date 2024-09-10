export type CreditCardProps = {
    id: string,
    cardNumber: string,
    cardHolderName: string,
    value: number,
    cvv: number,
    expDate: string,
}

// TODO - create way to hide credit card number
export class CreditCard {
    private constructor(private props: CreditCardProps) { }

    public static create(
        cardNumber: string,
        cardHolderName: string,
        value: number,
        cvv: number,
        expDate: string,
    ) {
        return new CreditCard({
            id: crypto.randomUUID().toString(),
            cardNumber,
            cardHolderName,
            value,
            cvv,
            expDate
        })
    }

    public static with(props: CreditCardProps) {
        return new CreditCard(props)
    }

    public static withList(rawProps: any[]): CreditCard[] {
        const transactions: CreditCard[] = [];

        for (const props of rawProps) {
            const transaction = CreditCard.with(props);

            transactions.push(transaction)
        }

        return transactions
    }


    public get cardNumber() {
        return this.props.cardNumber
    }
    public get cardHolderName() {
        return this.props.cardHolderName
    }
    public get value() {
        return this.props.value
    }
    public get cvv() {
        return this.props.cvv
    }
    public get expDate() {
        return this.props.expDate
    }
}