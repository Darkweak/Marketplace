import { Product } from "./Product";

export interface Category {
    name: string,
    products?: Product[]
}
