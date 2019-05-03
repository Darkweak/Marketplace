import * as React from 'react';
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import { CommonCategory, mapDispatchToProps, mapStateToProps } from "./common";

export const Category = compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
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
