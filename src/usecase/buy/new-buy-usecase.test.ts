import Redis from 'ioredis';
import prismaClient from '../../../prisma/prisma-client';
import { TransactionRepository } from '../../infra/repository/prisma/transaction/transaction-repository';
import { CacheClient } from '../../infra/repository/redis/transaction/redis-client-transaction';
import { BuyInput, NewBuyUseCase } from './new-buy-usecase';

const redis = new Redis("redis://127.0.0.1:6379/0")
const cache = CacheClient.create(redis)

describe('testing new buy use case', () => {

    beforeEach(async () => {

    });

    afterEach(async () => {
        await prismaClient.transaction.deleteMany({})
        await redis.flushall()
        redis.disconnect()
    });

    test('with a buy input', async () => {

        const tRepository = TransactionRepository.create(prismaClient, cache)

        const newBuyUseCase = NewBuyUseCase.create(tRepository)

        const input: BuyInput = {
            clientId: "7e655c6e-e8e5-4349-8348-e51e0ff3072e",
            clientName: "Luke Skywalker",
            totalToPay: 1236,
            creditCard: {
                cardNumber: "1234123412341234",
                value: 7990,
                cvv: 789,
                cardHolderName: "Luke Skywalker",
                expDate: "12/24"
            }
        }

        const id = await newBuyUseCase.call(input)

        expect(id).not.toBeNull()
        expect(id).not.toBeUndefined()
    });
})