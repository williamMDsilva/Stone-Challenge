import { Request, Response } from "express";

export type Method = "get" | "post"

export const Method = {
    GET: "get" as Method,
    POST: "post" as Method,
} as const;

export type Permissions = "ADMIN" | "USER";

export interface Route {
    readonly path: string
    readonly method: Method

    getHandler(): (request: Request, response: Response) => Promise<void>;

    getPermission(): string[];
}

