import * as React from 'react';
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import { CommonCategory, mapDispatchToProps, mapStateToProps } from "../Category/common";

export const Discount = compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    lifecycle({
        componentDidMount(){
            this.props.getProduct('promotion=true');
        }
    })
)(({ products }: any) => (
    <CommonCategory products={products} title={'Voici tous nos articles en promotion'}/>
));
