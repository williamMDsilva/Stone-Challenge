import { Request, response, Response } from 'express';

import { Method, Permissions, Route } from '../routes';
import { FetchProductUseCase, ProductOutput, ProductTypeOutput } from '../../../../../usecase/product/fetch-product-usecase';
import { Product } from '../../../../../domain/entity/product/product';

export type ResponseProduct = {
    products: ProductTypeOutput[]
}

export class RouteFetchProduct implements Route {
    readonly path
    readonly method
    private readonly permissions: Permissions[];

    private constructor(
        path: string,
        method: Method,
        permissions: Permissions[],
        private readonly fetchProductUseCase: FetchProductUseCase
    ) {
        this.path = path
        this.method = method
        this.permissions = permissions
    }

    public static create(fetchProductUseCase: FetchProductUseCase) {
        return new RouteFetchProduct("/product", Method.GET, ["ADMIN", "USER"], fetchProductUseCase)
    }

    public getPermission(): string[] {
        return this.permissions
    }

    // TODO - Improve error handler
    public getHandler(): (request: Request, response: Response) => Promise<void> {
        return async (request: Request, response: Response) => {

            try {
                const productOutput = await this.fetchProductUseCase.call({});

                const outputResponse = this.buildResponse(productOutput)

                response.status(200).json(outputResponse)

            } catch (error) {
                response.status(400).json({ error: "INVALID_DATA", message: error })

            }
        }
    }

    private buildResponse(productOutput: ProductOutput): ResponseProduct {
        const response: ResponseProduct = { products: productOutput.products }
        return response
    }

}