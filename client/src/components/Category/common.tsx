import * as React from 'react';
import { Layout } from "../Common/Layout";
import { TextContainer } from "../Common/ObliqueContainer";
import { Item } from "../Item";
import { Product } from "../Objects/Product";
import { getProduct } from "../Item/store/product";
import { ProductReducerProps } from "../Item/store/productReducer";
import { Info, Warning } from '../Common/Alert';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';

interface Reducers {
    ProductReducer: ProductReducerProps
}
export const mapStateToProps = (reducers: Reducers) => ({
    isError: reducers.ProductReducer.isError,
    isFetching: reducers.ProductReducer.isFetching,
    products: reducers.ProductReducer.products,
});
export const mapDispatchToProps = (dispatch: Function) => ({
    getProduct: (args?: string) => dispatch(getProduct(args)),
});

export const generateArticles = (products: Product[] = [], max: number = products.length) => {
    let items: any[] = [];

    for (let i = 0; i < max && ( products.length >= max ) ; i++) {
        items.push(
            <div key={i} className="col-sm-12 col-md-4 mb-3">
                <Item product={products[i]}/>
            </div>
        )
    }
    return items;
};

export const CommonCategory = connect(
    mapStateToProps,
    {}
)(({ isError, isFetching, products, title }: any) => (
    <Layout noPadding>
        <TextContainer>
            <h1 className="text-center">
                {title}
            </h1>
            <div className="row m-0 py-2">
                {
                    (!isError && isFetching) && (
                        <div className="col-md-8 offset-md-2">
                            <Info>
                                <span>
                                    <Spinner animation="border" size="sm"/> Chargement des articles en cours...
                                </span>
                            </Info>
                        </div>
                    )
                }
                {
                    (!products.length && !isFetching) && (
                        <div className="col-md-8 offset-md-2">
                            <Warning>
                                <span>
                                    Aucun article trouvé, réessayez plus tard
                                </span>
                            </Warning>
                        </div>
                    )
                }
                {generateArticles(products)}
            </div>
        </TextContainer>
    </Layout>
));
