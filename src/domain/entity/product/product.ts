export type ProductProps = {
    id: string
    title: string
    price: number
    zipcode: string
    seller: string
    thumbnailHd: string
    date: string
}

export class Product {
    private constructor(private props: ProductProps) { }

    public static create(
        title: string,
        price: number,
        zipcode: string,
        seller: string,
        thumbnailHd: string,
        date: string
    ) {
        return new Product({
            id: crypto.randomUUID().toString(),
            title,
            price,
            zipcode,
            seller,
            thumbnailHd,
            date
        })
    }

    public static with(props: ProductProps) {
        return new Product(props)
    }

    public static withList(rawProps: any[]): Product[] {
        const products: Product[] = [];

        for (const props of rawProps) {
            const product = Product.with(props);

            products.push(product)
        }

        return products
    }

    public get id(): string {
        return this.props.id
    }

    public get title(): string {
        return this.props.title
    }

    public get price(): number {
        return this.props.price
    }
    public get zipcode(): string {
        return this.props.zipcode
    }
    public get seller(): string {
        return this.props.seller
    }
    public get thumbnailHd(): string {
        return this.props.thumbnailHd
    }
    public get date(): string {
        return this.props.date
    }
}