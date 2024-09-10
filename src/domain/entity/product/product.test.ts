import { Product } from "./product";

describe('test product', () => {
    test('entity with right data', () => {
        const product: Product = Product.create(
            "Blusa do Imperio",
            7990,
            "78993-000",
            "João da Silva",
            "https://cdn.awsli.com.br/600x450/21/21351/produto/3853007/f66e8c63ab.jpg",
            "26/11/2024"
        )


        expect(product.title).toBe("Blusa do Imperio")
        expect(product.price).toBe(7990)
        expect(product.zipcode).toBe("78993-000")
        expect(product.seller).toBe("João da Silva")
        expect(product.thumbnailHd).toBe("https://cdn.awsli.com.br/600x450/21/21351/produto/3853007/f66e8c63ab.jpg")
        expect(product.date).toBe("26/11/2024")
    });

    test('with any list', () => {
        const rawProducts: any[] = [
            {
                "title": "Blusa do Imperio 01",
                "price": 7990,
                "zipcode": "78993-000",
                "seller": "João da Silva",
                "thumbnailHd": "https://cdn.awsli.com.br/600x450/21/21351/produto/3853007/f66e8c63ab.jpg",
                "date": "26/11/2015"
            },
            {
                "title": "Blusa do Imperio 02",
                "price": 7990,
                "zipcode": "78993-000",
                "seller": "João da Silva",
                "thumbnailHd": "https://cdn.awsli.com.br/600x450/21/21351/produto/3853007/f66e8c63ab.jpg",
                "date": "26/11/2015"
            }
        ];

        const products = Product.withList(rawProducts)

        expect(products[0]).toBeInstanceOf(Product)
        expect(products[1]).toBeInstanceOf(Product)
    });
});