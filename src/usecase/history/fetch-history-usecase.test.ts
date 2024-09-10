import Redis from 'ioredis';
import prismaClient from '../../../prisma/prisma-client';
import { Product } from '../../domain/entity/product/product';
import { TransactionRepository } from '../../infra/repository/prisma/transaction/transaction-repository';
import { FetchHistoryUseCase, HistoryInput } from './fetch-history-usecase';
import { CacheClient } from '../../infra/repository/redis/transaction/redis-client-transaction';

const redis = new Redis("redis://127.0.0.1:6379/0")
const cache = CacheClient.create(redis)

describe('testing history use case', () => {

    beforeAll(async () => {
        await prismaClient.transaction.createMany({
            data: [
                {
                    clientId: "7e655c6e-e8e5-4349-8348-e51e0ff3072e",
                    clientName: "Luke Skywalker",
                    totalToPay: 1236,
                    date: Date.now().toString(),
                    creditCardNumber: "**** **** **** 1234"
                },
                {
                    clientId: "7e655c6e-e8e5-4349-8348-e51e0ff3072e",
                    clientName: "Luke Skywalker",
                    totalToPay: 1236,
                    date: Date.now().toString(),
                    creditCardNumber: "**** **** **** 1234"
                },
                {
                    clientId: "a082c018-c439-449c-902e-adda57d0b808",
                    clientName: "Luke Skywalker",
                    totalToPay: 1236,
                    date: Date.now().toString(),
                    creditCardNumber: "**** **** **** 1234"
                },
                {
                    clientId: "a082c018-c439-449c-902e-adda57d0b808",
                    clientName: "Luke Skywalker",
                    totalToPay: 1236,
                    date: Date.now().toString(),
                    creditCardNumber: "**** **** **** 1234"
                },
            ]
        })
    });

    afterAll(async () => {
        await prismaClient.transaction.deleteMany({})
        await redis.flushall()
        redis.disconnect()
    });

    test('with a no input shout return a list of all transction', async () => {
        const tRepository = TransactionRepository.create(prismaClient, cache)

        const fetchHistoryUseCase = FetchHistoryUseCase.create(tRepository)

        const output = await fetchHistoryUseCase.call({})

        expect(output.history).toHaveLength(4)
        expect(output.history[0].clientId).toBe("7e655c6e-e8e5-4349-8348-e51e0ff3072e")
        expect(output.history[0].purchaseId).not.toBeNull()
        expect(output.history[0].value).toBe(1236)
        expect(output.history[0].date).not.toBeNull()
        expect(output.history[0].cardNumber).toBe("**** **** **** 1234")
    });

    test('with a clientId input shout return a list of all transction', async () => {

        const tRepository = TransactionRepository.create(prismaClient, cache)

        const fetchHistoryUseCase = FetchHistoryUseCase.create(tRepository)

        const historyInput: HistoryInput = {
            clientId: "a082c018-c439-449c-902e-adda57d0b808"
        }

        const output = await fetchHistoryUseCase.call(historyInput)

        expect(output.history).toHaveLength(2)

        expect(output.history[0].clientId).toBe("a082c018-c439-449c-902e-adda57d0b808")
        expect(output.history[1].clientId).toBe("a082c018-c439-449c-902e-adda57d0b808")

        expect(output.history[0].purchaseId).not.toBeNull()
        expect(output.history[0].value).toBe(1236)
        expect(output.history[0].date).not.toBeNull()
        expect(output.history[0].cardNumber).toBe("**** **** **** 1234")
    });
})