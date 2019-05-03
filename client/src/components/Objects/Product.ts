import { Category } from "./Category";
import { Image } from "./Image";

export interface Product {
    name: string,
    price: number,
    promotion: boolean,
    pricePromotion?: number|null,
    description: string,
    category: Category,
    image: Image
}
