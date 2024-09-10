import { Request, response, Response } from 'express';
import { Usecase } from '../../../../../usecase/usecase';
import { Method, Permissions, Route } from '../routes';
import { CreateProductUseCase, ProductInput, ProductOutput } from '../../../../../usecase/product/create-product-usecase';
import { BuyInput, BuyOutput, NewBuyUseCase } from '../../../../../usecase/buy/new-buy-usecase';

export type ResponseNewBuy = {
    purchaseId: string,
}

export class RouteNewBuyProduct implements Route {
    readonly path
    readonly method
    private readonly permissions: Permissions[];

    private constructor(
        path: string,
        method: Method,
        permissions: Permissions[],
        private readonly newBuyUsecase: NewBuyUseCase
    ) {
        this.path = path
        this.method = method
        this.permissions = permissions
    }

    public static create(newBuyUsecase: NewBuyUseCase) {
        return new RouteNewBuyProduct("/buy", Method.POST, ["ADMIN", "USER"], newBuyUsecase)
    }

    public getPermission(): string[] {
        return this.permissions
    }

    // TODO - Improve error handler
    public getHandler(): (request: Request, response: Response) => Promise<void> {
        return async (request: Request, response: Response) => {
            try {
                const {
                    clientId,
                    clientName,
                    totalToPay,
                    creditCard,
                } = request.body

                const {
                    cardNumber,
                    value,
                    cvv,
                    cardHolderName,
                    expDate,
                } = creditCard

                const input: BuyInput = {
                    clientId,
                    clientName,
                    totalToPay,
                    creditCard: {
                        cardNumber,
                        value,
                        cvv,
                        cardHolderName,
                        expDate
                    }
                }

                const newBuyOutput: BuyOutput = await this.newBuyUsecase.call(input);

                const outputResponse = this.buildResponse(newBuyOutput)

                response.status(200).json(outputResponse)
                return
            } catch (error) {
                response.status(400).json({ error: "INVALID_DATA", message: error })
                return

            }
        }
    }

    private buildResponse(newBuyOutput: BuyOutput): ResponseNewBuy {
        const response: ResponseNewBuy = { purchaseId: newBuyOutput.purchaseId }
        return response
    }

}