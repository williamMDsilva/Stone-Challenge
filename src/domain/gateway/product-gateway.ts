import { Product } from '../entity/product/product';

export interface ProductGateway {
    save(product: Product): Promise<void>

    fetch(): Promise<Product[]>
}