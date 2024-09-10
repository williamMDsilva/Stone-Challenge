import prismaClient from '../../../prisma/prisma-client';
import { ProductRepository } from '../../infra/repository/prisma/product/product-repository';
import { FetchProductUseCase } from './fetch-product-usecase';
import { Product } from '../../domain/entity/product/product';

describe('testing new buy use case', () => {

    beforeEach(async () => {
        await prismaClient.product.createMany({
            data: [{
                "title": "Blusa do Imperio 01",
                "price": 7990,
                "zipcode": "78993-000",
                "seller": "João da Silva",
                "thumbnailHd": "https://cdn.awsli.com.br/600x450/21/21351/produto/3853007/f66e8c63ab.jpg",
                "date": "26/11/2015"
            },
            {
                "title": "Blusa do Imperio 02",
                "price": 7990,
                "zipcode": "78993-000",
                "seller": "João da Silva",
                "thumbnailHd": "https://cdn.awsli.com.br/600x450/21/21351/produto/3853007/f66e8c63ab.jpg",
                "date": "26/11/2015"
            }]
        })

    });

    afterEach(async () => {
        await prismaClient.product.deleteMany({})
    });

    test('with a buy input', async () => {

        const pRepository = ProductRepository.create(prismaClient)

        const fetchProductUseCase = FetchProductUseCase.create(pRepository)

        const output = await fetchProductUseCase.call({})

        expect(output.products[0]).toBeInstanceOf(Product)
        expect(output.products[1]).toBeInstanceOf(Product)
    });
})