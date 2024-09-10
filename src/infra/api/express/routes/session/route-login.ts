import { Request, response, Response } from 'express';

import { Method, Permissions, Route } from '../routes';
import { LoginInput, LoginOutput, LoginUseCase } from '../../../../../usecase/session/login-usecase';

export type ResponseLogin = {
    token: string,
}

export class RouteLogin implements Route {
    readonly path
    readonly method
    private readonly permissions: Permissions[];

    private constructor(
        path: string,
        method: Method,
        permissions: Permissions[],
        private readonly loginUseCase: LoginUseCase
    ) {
        this.path = path
        this.method = method
        this.permissions = permissions
    }

    public static create(loginUseCase: LoginUseCase) {
        return new RouteLogin("/login", Method.POST, ["ADMIN", "USER"], loginUseCase)
    }

    public getPermission(): string[] {
        return this.permissions
    }

    // TODO - Improve error handler
    public getHandler(): (request: Request, response: Response) => Promise<void> {
        return async (request: Request, response: Response) => {

            try {
                const {
                    email,
                    password,
                } = request.body

                const input: LoginInput = {
                    email,
                    password,
                }

                const loginOutput: LoginOutput = await this.loginUseCase.call(input);

                const outputResponse = this.buildResponse(loginOutput)

                response.status(200).json(outputResponse)

            } catch (error) {
                response.status(400).json({ error: "INVALID_DATA", message: error })

            }
        }
    }

    private buildResponse(loginOutput: LoginOutput): ResponseLogin {
        const response: ResponseLogin = { token: loginOutput.token }
        return response
    }

}