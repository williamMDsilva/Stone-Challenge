import { PrismaClient } from "@prisma/client";
import { CacheTransactionGateway } from "../../../../domain/gateway/cache-transaction-geteway";
import { Transaction } from '../../../../domain/entity/transaction/transaction';
import { TransactionGateway } from "../../../../domain/gateway/transaction-gateway";
import { CreditCard } from "../../../../domain/entity/transaction/credit-card";
import { ProductGateway } from "../../../../domain/gateway/product-gateway";
import { Product } from "../../../../domain/entity/product/product";

// TODO - impl cache strategy
export class ProductRepository implements ProductGateway {
    private constructor(private readonly prismaClient: PrismaClient
    ) { }

    public static create(prismaClient: PrismaClient) {
        return new ProductRepository(prismaClient)
    }

    public async save(product: Product): Promise<void> {
        const data = {
            title: product.title,
            price: product.price,
            zipcode: product.zipcode,
            seller: product.seller,
            thumbnailHd: product.thumbnailHd,
            date: product.date,
        }

        await this.prismaClient.product.create({ data })
    }

    public async fetch(): Promise<Product[]> {
        const products = await this.prismaClient.product.findMany({})

        return Product.withList(products)
    }

}