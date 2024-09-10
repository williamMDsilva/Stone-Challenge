import { Usecase } from "../usecase";

import { TransactionGateway } from "../../domain/gateway/transaction-gateway";
import { CreditCard } from "../../domain/entity/transaction/credit-card";
import { Transaction } from "../../domain/entity/transaction/transaction";

export type BuyInput = {
    clientId: string,
    clientName: string
    totalToPay: number,
    creditCard: {
        cardNumber: string
        value: number,
        cvv: number,
        cardHolderName: string
        expDate: string
    }
}

export type BuyOutput = {
    purchaseId: string
}


export class NewBuyUseCase implements Usecase<BuyInput, BuyOutput> {
    private constructor(
        private readonly transactionRepository: TransactionGateway,
    ) { }

    public static create(
        transactionRepository: TransactionGateway,
    ) {

        return new NewBuyUseCase(
            transactionRepository
        )
    }

    public async call(input: BuyInput): Promise<BuyOutput> {
        const creditCard = CreditCard.create(input.creditCard.cardNumber, input.creditCard.cardHolderName, input.creditCard.value, input.creditCard.cvv, input.creditCard.expDate)
        const transaction = Transaction.create(
            input.clientId,
            input.clientName,
            input.totalToPay,
            creditCard
        )

        await this.transactionRepository.save(transaction)

        return {
            purchaseId: transaction.id
        }
    }


}