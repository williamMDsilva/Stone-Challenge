import { PrismaClient } from "@prisma/client";
import { CacheTransactionGateway } from "../../../../domain/gateway/cache-transaction-geteway";
import { Transaction } from '../../../../domain/entity/transaction/transaction';
import { TransactionGateway } from "../../../../domain/gateway/transaction-gateway";
import { CreditCard } from "../../../../domain/entity/transaction/credit-card";
import { isEmpty } from "../../../../helper/function";
import { compareSync } from "bcrypt";

export class TransactionRepository implements TransactionGateway {
    private constructor(private readonly prismaClient: PrismaClient,
        private readonly cache: CacheTransactionGateway
    ) { }

    public static create(prismaClient: PrismaClient, cache: CacheTransactionGateway) {
        return new TransactionRepository(prismaClient, cache)
    }

    public async save(transaction: Transaction): Promise<void> {
        const data = {
            clientId: transaction.clientId,
            clientName: transaction.clientName,
            totalToPay: transaction.totalToPay,
            date: transaction.date,
            creditCardNumber: transaction.creditCard.cardNumber,
        }

        await this.prismaClient.transaction.create({ data })
        await this.cache.save(transaction)
    }

    public async fetch(): Promise<Transaction[]> {
        let transactions = await this.cache.getValues('*');

        if (transactions.length <= 0) {
            const fromDatabase = await this.prismaClient.transaction.findMany({})
            transactions = Transaction.withHistory(fromDatabase)
        }

        return transactions
    }

    public async fetchByClientId(clientId: string): Promise<Transaction[]> {
        let transactions = await this.cache.getValues(`${clientId}`);

        if (transactions.length <= 0) {
            const fromDatabase = await this.prismaClient.transaction.findMany({
                where: {
                    clientId,
                },
            })

            transactions = Transaction.withHistory(fromDatabase)
        }

        return transactions
    }

    public async fetchById(id: string): Promise<Transaction> {
        const transaction = await this.prismaClient.transaction.findUnique({
            where: {
                id,
            },
        })

        return Transaction.with({
            id: transaction!.id,
            clientId: transaction!.clientId,
            clientName: transaction!.clientName,
            totalToPay: transaction!.totalToPay,
            date: transaction!.date,
            creditCard: CreditCard.with({
                id: "",
                cardNumber: transaction!.creditCardNumber,
                cardHolderName: "",
                value: 0,
                cvv: 0,
                expDate: ""
            })
        })
    }

}