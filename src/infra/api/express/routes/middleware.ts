import { NextFunction, Request, Response } from "express";

export interface Middleware {
    getHandler(): (request: Request, response: Response, next: NextFunction) => Promise<void>;
}