import { PrismaClient } from "@prisma/client";
import { Role, User } from "../../../../domain/entity/user/user";
import { UserGateway } from "../../../../domain/gateway/user-gateway";
import { CacheTransactionGateway } from '../../../../domain/gateway/cache-transaction-geteway';

export class UserRepository implements UserGateway {
    private constructor(private readonly prismaClient: PrismaClient) { }

    public static create(prismaClient: PrismaClient) {
        return new UserRepository(prismaClient)
    }

    public async save(user: User): Promise<void> {
        const data = {
            id: user.id,
            email: user.email,
            name: user.name,
            password: user.password,
            role: user.role,
        }

        await this.prismaClient.user.create({ data })
    }

    public async fetch(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

    public async fetchByEmail(email: string): Promise<User> {
        const user = await this.prismaClient.user.findUnique({
            where: {
                email,
            },
        })

        return User.with({
            id: user!.id,
            email: user!.email,
            password: user!.password,
            name: user!.name,
            role: user!.role as Role
        })
    }

    public async fetchById(id: string): Promise<User> {
        const user = await this.prismaClient.user.findUnique({
            where: {
                id,
            },
        })

        return User.with({
            id: user!.id,
            email: user!.email,
            password: user!.password,
            name: user!.name,
            role: user!.role as Role
        })
    }

}