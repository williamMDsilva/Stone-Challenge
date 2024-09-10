import { Request, Response, NextFunction } from "express";
import { Middleware } from "../middleware";
import { CheckSessionUseCase, SessionInput } from '../../../../../usecase/session/check-session-usecase';

export class AuthMiddleware implements Middleware {
    private constructor(private readonly checkSessionUseCase: CheckSessionUseCase, private readonly skipRoutes: string[]) { }

    public static create(checkSessionUseCase: CheckSessionUseCase, skipRoutes: string[]) {
        return new AuthMiddleware(checkSessionUseCase, skipRoutes)
    }

    public getHandler(): (request: Request, response: Response, next: NextFunction) => Promise<void> {
        return async (request: Request, response: Response, next: NextFunction) => {

            try {
                if (this.skipRoutes.includes(request.path)) {
                    next();
                    return
                }

                const [_type, token] = request.headers.authorization?.split(' ') || [' ', ' '];

                const sessionInput: SessionInput = {
                    token,
                }

                const result = await this.checkSessionUseCase.call(sessionInput)

                if (result.isValid) {
                    // TODO - create user on request
                    // request.user = result.user
                    next();
                    return
                }

                response.status(401).json({ kind: "UNAUTHORIZED" })
            } catch (error) {
                response.status(401).json({ kind: "UNAUTHORIZED", error })
            }
        }
    }

}