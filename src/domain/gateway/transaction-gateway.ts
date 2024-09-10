import { Transaction } from '../entity/transaction/transaction';

export interface TransactionGateway {
    save(transaction: Transaction): Promise<void>

    fetch(): Promise<Transaction[]>

    fetchByClientId(clientId: string): Promise<Transaction[]>
}