import { Request, response, Response } from 'express';
import { Usecase } from '../../../../../usecase/usecase';
import { Method, Permissions, Route } from '../routes';
import { CreateProductUseCase, ProductInput, ProductOutput } from '../../../../../usecase/product/create-product-usecase';

export type ResponseProduct = {
    id: string,
}

export class RouteCreateProduct implements Route {
    readonly path
    readonly method
    private readonly permissions: Permissions[];

    private constructor(
        path: string,
        method: Method,
        permissions: Permissions[],
        private readonly createProductUsecase: CreateProductUseCase
    ) {
        this.path = path
        this.method = method
        this.permissions = permissions
    }

    public static create(createProductUsecase: CreateProductUseCase) {
        return new RouteCreateProduct("/product", Method.POST, ["ADMIN"], createProductUsecase)
    }

    public getPermission(): string[] {
        return this.permissions
    }

    // TODO - Improve error handler
    public getHandler(): (request: Request, response: Response) => Promise<void> {
        return async (request: Request, response: Response) => {
            try {
                const {
                    title,
                    price,
                    zipcode,
                    seller,
                    thumbnailHd,
                    date
                } = request.body

                const input: ProductInput = {
                    title,
                    price,
                    zipcode,
                    seller,
                    thumbnailHd,
                    date
                }

                const productOutput: ProductOutput = await this.createProductUsecase.call(input);

                const outputResponse = this.buildResponse(productOutput)

                response.status(200).json(outputResponse)
                return
            } catch (error) {
                response.status(400).json({ error: "INVALID_DATA", message: error })
                return

            }
        }
    }

    private buildResponse(productOutput: ProductOutput): ResponseProduct {
        const response: ResponseProduct = { id: productOutput.id }
        return response
    }

}