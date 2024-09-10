import Redis from "ioredis";
import { Transaction } from '../../../../domain/entity/transaction/transaction';
import { CacheTransactionGateway } from "../../../../domain/gateway/cache-transaction-geteway";

export class CacheClient implements CacheTransactionGateway {
    private constructor(private readonly client: Redis) { }

    public static create(client: Redis) {
        return new CacheClient(client)
    }

    public async get(hash: string): Promise<Transaction> {
        const value: any = await this.client.get(hash);

        return Transaction.with({
            id: value!.id,
            clientId: value!.clientId,
            clientName: value!.clientName,
            totalToPay: value!.totalToPay,
            date: value!.date,
            creditCard: value!.creditCard
        })
    }

    public async save(transaction: Transaction): Promise<void> {
        await this.client.hset(`transaction:${transaction.clientId}:${transaction.id}`, {
            id: transaction.id,
            clientId: transaction.clientId,
            clientName: transaction.clientName,
            totalToPay: transaction.totalToPay,
            date: transaction.date,
            cardNumber: transaction.creditCard.cardNumber
        })
    }

    private async getListFromCache(keys: string[]): Promise<Transaction[]> {
        const transactions: Transaction[] = []

        for (const key of keys) {
            const value: any = await this.client.hgetall(key);

            const history = Transaction.buildCreditCardFromHistory(value)

            const transaction = Transaction.with(history)

            transactions.push(transaction)
        }

        return transactions
    }

    public async getValues(hash: string): Promise<Transaction[]> {
        const pattern = `transaction:${hash}:*`
        const keys = await this.client.keys(pattern)

        const transaction = await this.getListFromCache(keys)

        return transaction
    }

    public async refesh(hash: string, value: Transaction): Promise<void> {
        await this.client.hset(`transaction:${hash}`, {
            id: value.id,
            clientId: value.clientId,
            clientName: value.clientName,
            totalToPay: value.totalToPay,
            cardNumber: value.creditCard.cardNumber
        })
    }

    public async delete(hash: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}