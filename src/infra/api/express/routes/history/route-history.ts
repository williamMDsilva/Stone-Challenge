import { Request, response, Response } from 'express';

import { Method, Permissions, Route } from '../routes';
import { FetchProductUseCase, ProductOutput, ProductTypeOutput } from '../../../../../usecase/product/fetch-product-usecase';
import { Product } from '../../../../../domain/entity/product/product';
import { FetchHistoryUseCase, HistoryOutput, HistoryType } from '../../../../../usecase/history/fetch-history-usecase';

export type ResponseHistory = {
    history: HistoryType[]
}

export class RouteFetchHistory implements Route {
    readonly path
    readonly method
    private readonly permissions: Permissions[];

    private constructor(
        path: string,
        method: Method,
        permissions: Permissions[],
        private readonly fetchHistoryUseCase: FetchHistoryUseCase
    ) {
        this.path = path
        this.method = method
        this.permissions = permissions
    }

    public static create(fetchHistoryUseCase: FetchHistoryUseCase) {
        return new RouteFetchHistory("/history", Method.GET, ["ADMIN", "USER"], fetchHistoryUseCase)
    }

    public getPermission(): string[] {
        return this.permissions
    }

    // TODO - Improve error handler
    public getHandler(): (request: Request, response: Response) => Promise<void> {
        return async (request: Request, response: Response) => {

            try {
                const historyOutput = await this.fetchHistoryUseCase.call({});

                const outputResponse = this.buildResponse(historyOutput)

                response.status(200).json(outputResponse)

            } catch (error) {
                response.status(400).json({ error: "INVALID_DATA", message: error })

            }
        }
    }

    private buildResponse(historyOutput: HistoryOutput): ResponseHistory {
        const response: ResponseHistory = { history: historyOutput.history }
        return response
    }

}