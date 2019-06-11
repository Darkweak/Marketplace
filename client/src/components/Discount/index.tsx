import * as React from 'react';
import { compose, lifecycle, setStatic } from 'recompose';
import { connect } from "react-redux";
import { CommonCategory, mapDispatchToProps } from "../Category/common";
import { getProduct } from '../Item/store/product';

export const Discount = compose(
    connect(
        null,
        mapDispatchToProps
    ),
    setStatic(
        'fetching', ({ dispatch }: any) => [dispatch(getProduct('promotion=true'))]
    ),
    lifecycle({
        componentDidMount(){
            const { getProduct }: any = this.props;
            getProduct('promotion=true');
        }
    })
)(() => (
    <CommonCategory title={'Voici tous nos articles en promotion'}/>
));
