import { Usecase } from "../usecase";

import { TransactionGateway } from "../../domain/gateway/transaction-gateway";
import { CreditCard } from "../../domain/entity/transaction/credit-card";
import { Transaction } from "../../domain/entity/transaction/transaction";
import { Product } from '../../domain/entity/product/product';
import { ProductGateway } from "../../domain/gateway/product-gateway";
import { ProductRepository } from '../../infra/repository/prisma/product/product-repository';

export type ProductInput = {
    title: string
    price: number
    zipcode: string
    seller: string
    thumbnailHd: string
    date: string
}

export type ProductOutput = {
    id: string
}


export class CreateProductUseCase implements Usecase<ProductInput, ProductOutput> {
    private constructor(
        private readonly productRepository: ProductGateway,
    ) { }

    public static create(
        productRepository: ProductGateway,
    ) {

        return new CreateProductUseCase(
            productRepository
        )
    }

    public async call(input: ProductInput): Promise<ProductOutput> {
        const product = Product.create(input.title, input.price, input.zipcode, input.seller, input.thumbnailHd, input.date)

        await this.productRepository.save(product)

        return {
            id: product.id
        }
    }


}