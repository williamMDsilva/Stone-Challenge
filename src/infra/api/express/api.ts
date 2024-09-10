import express, { Express } from 'express';

import { Api } from '../api';
import { Route } from './routes/routes';
import { Middleware } from './routes/middleware';

export class ApiExpress implements Api {
    private app: Express;

    private constructor(routes: Route[], middlewares: Middleware[]) {
        this.app = express()
        this.app.use(express.json())
        this.app.use(express.static("public"));

        this.createMiddleware(middlewares)

        this.createRoutes(routes)
    }


    public static create(routes: Route[], middlewares: Middleware[]) {
        return new ApiExpress(routes, middlewares)
    }


    private createRoutes(routes: Route[]) {
        for (const route of routes) {
            const handler = route.getHandler()
            const path = `/api${route.path}`
            const method = route.method

            this.app[method](path, handler)
        }

        this.printRoutesAvailable()

    }

    private createMiddleware(middlewares: Middleware[]) {

        for (const middleware of middlewares) {

            const handlerMiddleware = middleware.getHandler()

            this.app.use(handlerMiddleware)

        }
    }

    public run(port: number): void {
        this.app.listen(port, () => {
            console.log(`running on ${port}... \npress CTRL + C to cancel`)
        })
    }

    private printRoutesAvailable() {
        const routes = this.app._router.stack
            .filter((route: any) => route.route)
            .map((route: any) => {
                return {
                    path: route.route.path,
                    method: route.route.stack[0].method,
                };
            });

        console.log(routes);
    }
}