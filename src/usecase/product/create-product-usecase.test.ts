import Redis from 'ioredis';
import prismaClient from '../../../prisma/prisma-client';
import { ProductRepository } from '../../infra/repository/prisma/product/product-repository';
import { CreateProductUseCase, ProductInput } from './create-product-usecase';

describe('testing new buy use case', () => {

    beforeEach(async () => {

    });

    afterEach(async () => {
        await prismaClient.product.deleteMany({})
    });

    test('with a buy input', async () => {

        const pRepository = ProductRepository.create(prismaClient)

        const createProductUseCase = CreateProductUseCase.create(pRepository)

        const input: ProductInput = {
            title: "Blusa do Imperio",
            price: 7990,
            zipcode: "78993-000",
            seller: "João da Silva",
            thumbnailHd: "https://cdn.awsli.com.br/600x450/21/21351/produto/3853007/f66e8c63ab.jpg",
            date: "26/11/2015"
        }

        const product = await createProductUseCase.call(input)

        expect(product.id).not.toBeNull()
        expect(product.id).not.toBeUndefined()
    });
})