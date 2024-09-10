import { Usecase } from "../usecase";

import { TransactionGateway } from "../../domain/gateway/transaction-gateway";
import { CreditCard } from "../../domain/entity/transaction/credit-card";
import { Transaction } from "../../domain/entity/transaction/transaction";
import { Product } from '../../domain/entity/product/product';
import { ProductGateway } from "../../domain/gateway/product-gateway";
import { ProductRepository } from '../../infra/repository/prisma/product/product-repository';

export type ProductTypeOutput = {
    id: string
    title: string
    price: number
    zipcode: string
    seller: string
    thumbnailHd: string
    date: string
}

// TODO - pagination objects
export type ProductInput = {

}

export type ProductOutput = {
    products: ProductTypeOutput[]
}


export class FetchProductUseCase implements Usecase<ProductInput, ProductOutput> {
    private constructor(
        private readonly productRepository: ProductGateway,
    ) { }

    public static create(
        productRepository: ProductGateway,
    ) {

        return new FetchProductUseCase(
            productRepository
        )
    }

    public async call(input: ProductInput): Promise<ProductOutput> {
        const products = await this.productRepository.fetch()

        return {
            products: products.map(it => (Product.with({
                id: it.id,
                title: it.title,
                price: it.price,
                zipcode: it.zipcode,
                seller: it.seller,
                thumbnailHd: it.thumbnailHd,
                date: it.date,
            })))
        }
    }


}