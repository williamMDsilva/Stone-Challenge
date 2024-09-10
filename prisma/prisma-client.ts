import { PrismaClient } from '@prisma/client';

const NODE_ENV: string = process.env.NODE_ENV || "dev"

function gen_prisma_client(): PrismaClient {
    let prismaClient = new PrismaClient();

    if (NODE_ENV === "test") {
        // TODO - create mock from prisma client
        // prismaClient = new PrismaClient({ datasources: { db: { url: 'postgresql://postgres:postgres@localhost:5432/stone_challenge_test' } } })
    }

    return prismaClient
}


export default gen_prisma_client()