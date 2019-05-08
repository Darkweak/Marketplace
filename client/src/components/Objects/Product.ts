import { Category } from "./Category";
import { Image } from "./Image";

export interface Product {
    name: string,
    price: number,
    promotion: boolean,
    pricePromotion?: number,
    description: string,
    category: Category,
    image: Image
}
