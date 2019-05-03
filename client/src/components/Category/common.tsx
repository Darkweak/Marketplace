import * as React from 'react';
import { Layout } from "../Common/Layout";
import { TextContainer } from "../Common/ObliqueContainer";
import { Item } from "../Item";
import { Product } from "../Objects/Product";
import { getProduct } from "../Item/store/product";
import { ProductReducerProps } from "../Item/store/productReducer";

interface Reducers {
    ProductReducer: ProductReducerProps
}
export const mapStateToProps = (reducers: Reducers) => ({
    products: reducers.ProductReducer.products
});
export const mapDispatchToProps = (dispatch: Function) => ({
    getProduct: (args?: string) => dispatch(getProduct(args)),
});

export const generateArticles = (products: Product[] = [], max: number = products.length) => {
    let items: any[] = [];
    for (let i = 0; i < max && products.length; i++) {
        items.push(
            <div key={i} className="col-sm-12 col-md-4 mb-3">
                <Item product={products[i]}/>
            </div>
        )
    }
    return items;
};

export const CommonCategory = ({ products, title }: any) => (
    <Layout noPadding>
        <TextContainer>
            <h1 className="text-center">
                {title}
            </h1>
            <div className="row m-0 py-2">
                {generateArticles(products)}
            </div>
        </TextContainer>
    </Layout>
);
