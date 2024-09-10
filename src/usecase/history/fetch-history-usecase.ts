import { TransactionGateway } from "../../domain/gateway/transaction-gateway";
import { isEmpty } from "../../helper/function";
import { Usecase } from "../usecase";

// TODO - pagination objects
export type HistoryInput = {
    clientId?: string
}

export type HistoryType = {
    clientId: string,
    purchaseId: string,
    value: number,
    date: string,
    cardNumber: string
}

export type HistoryOutput = {
    history: HistoryType[]
}


export class FetchHistoryUseCase implements Usecase<HistoryInput, HistoryOutput> {
    private constructor(
        private readonly TransactionRepository: TransactionGateway,
    ) { }

    public static create(
        TransactionRepository: TransactionGateway,
    ) {

        return new FetchHistoryUseCase(
            TransactionRepository
        )
    }

    public async call(input: HistoryInput): Promise<HistoryOutput> {
        if (isEmpty(input.clientId)) {
            const transactions = await this.TransactionRepository.fetch()

            const history: HistoryType[] = transactions.map(it => (
                {
                    clientId: it.clientId,
                    purchaseId: it.id,
                    value: it.totalToPay,
                    date: it.date,
                    cardNumber: it.creditCard.cardNumber,
                }
            ))

            return {
                history,
            }
        }

        const transactions = await this.TransactionRepository.fetchByClientId(input.clientId || "")

        const history: HistoryType[] = transactions.map(it => (
            {
                clientId: it.clientId,
                purchaseId: it.id,
                value: it.totalToPay,
                date: it.date,
                cardNumber: it.creditCard.cardNumber,
            }
        ))

        return {
            history,
        }
    }


}