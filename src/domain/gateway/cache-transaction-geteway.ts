import { Transaction } from '../entity/transaction/transaction';

export interface CacheTransactionGateway {
    get(hash: string): Promise<Transaction>

    getValues(hash: string): Promise<Transaction[]>

    save(transaction: Transaction): Promise<void>

    refesh(hash: string, value: Transaction): Promise<void>

    delete(hash: string): Promise<void>
}