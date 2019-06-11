import * as React from 'react';
import { compose, lifecycle, setStatic } from 'recompose';
import { connect } from "react-redux";
import { CommonCategory, mapDispatchToProps, mapStateToProps } from "./common";
import { getProduct } from '../Item/store/product';

export const Category = compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    setStatic(
        'fetching', ({ dispatch, path }: any) => [dispatch(getProduct(path.includes('/products') ? `category.name=${path.substr(12)}` : ''))]
    ),
    lifecycle({
        componentDidMount(){
            let { match, getProduct }: any = this.props;
            let value = '/products' !== match.path && match.params ? `category.name=${match.params.name}` : '';
            getProduct(value);
        }
    })
)(({ products, match , match: { params } }: any) => (
    <CommonCategory products={products} title={'/products' === match.path ? 'Voici tous nos articles disponibles' : `Catégorie ${params.name}`}/>
));
