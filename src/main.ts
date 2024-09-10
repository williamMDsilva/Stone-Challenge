import dotenv from 'dotenv';
import Redis from 'ioredis';
import prismaClient from '../prisma/prisma-client';

import { LoginUseCase } from './usecase/session/login-usecase';
import { RouteLogin } from './infra/api/express/routes/session/route-login';
import { ApiExpress } from './infra/api/express/api';
import { UserRepository } from './infra/repository/prisma/user/user-repository';
import { UserPasswordService } from './infra/service/password/user-password-service';
import { UserTokenService } from './infra/service/session/user-token-service';
import { CheckSessionUseCase } from './usecase/session/check-session-usecase';
import { AuthMiddleware } from './infra/api/express/routes/session/auth-middleware';
import { RouteFetchProduct } from './infra/api/express/routes/product/route-fetch-product';
import { FetchProductUseCase } from './usecase/product/fetch-product-usecase';
import { ProductRepository } from './infra/repository/prisma/product/product-repository';
import { RouteCreateProduct } from './infra/api/express/routes/product/route-create-product';
import { CreateProductUseCase } from './usecase/product/create-product-usecase';
import { RouteNewBuyProduct } from './infra/api/express/routes/buy/route-new-buy';
import { NewBuyUseCase } from './usecase/buy/new-buy-usecase';
import { TransactionRepository } from './infra/repository/prisma/transaction/transaction-repository';
import { CacheClient } from './infra/repository/redis/transaction/redis-client-transaction';
import { RouteFetchHistory } from './infra/api/express/routes/history/route-history';
import { FetchHistoryUseCase } from './usecase/history/fetch-history-usecase';
import { RouteHistoryClientIdUseCase } from './infra/api/express/routes/history/route-history-client-id';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
const PORT: number = parseInt(process.env.PORT || "4000")
const ROUNDS: number = parseInt(process.env.PORT || "10")
const SECRET: string = process.env.PORT || "secreto"
const EXP: string = process.env.PORT || "360d"
const REDIS_URL: string = process.env.REDIS_URL || "redis://redis:6379/0"

const redis = new Redis(REDIS_URL)
const cache = CacheClient.create(redis)

function bootstrap() {
    //service and repositories
    const uRepository = UserRepository.create(prismaClient)
    const uPasswordService = UserPasswordService.create(ROUNDS)
    const uTokenService = UserTokenService.create(SECRET, EXP)
    const pRepository = ProductRepository.create(prismaClient)
    const tRepository = TransactionRepository.create(prismaClient, cache)

    // use cases
    const loginUseCase = LoginUseCase.create(uRepository, uPasswordService, uTokenService)
    const checkSessionUseCase = CheckSessionUseCase.create(uRepository, uTokenService)
    const fetchProductUseCase = FetchProductUseCase.create(pRepository)
    const createProductUseCase = CreateProductUseCase.create(pRepository)
    const newBuyUseCase = NewBuyUseCase.create(tRepository)
    const fetchHistoryUseCase = FetchHistoryUseCase.create(tRepository)

    // routes
    const loginRoute = RouteLogin.create(loginUseCase)
    const routeFetchProduct = RouteFetchProduct.create(fetchProductUseCase)
    const routeCreateProduct = RouteCreateProduct.create(createProductUseCase)
    const routeNewBuyProduct = RouteNewBuyProduct.create(newBuyUseCase)
    const routeFetchHistory = RouteFetchHistory.create(fetchHistoryUseCase)
    const routeHistoryClientIdUseCase = RouteHistoryClientIdUseCase.create(fetchHistoryUseCase)

    //Middleware
    const authMiddleware = AuthMiddleware.create(checkSessionUseCase, [`/api${loginRoute.path}`])

    // TODO - Improve to feture - write a middleware to check permission
    // const permitionMiddleware = PermitionMiddleware.create({[loginRoute.path]: loginRoute.permission})

    const api = ApiExpress.create([
        loginRoute,
        routeFetchProduct,
        routeNewBuyProduct,
        routeFetchHistory,
        routeHistoryClientIdUseCase,
        routeCreateProduct
    ], [authMiddleware])

    api.run(PORT)
}

bootstrap();