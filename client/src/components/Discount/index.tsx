import * as React from 'react';
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import { CommonCategory, mapDispatchToProps } from "../Category/common";

export const Discount = compose(
    connect(
        null,
        mapDispatchToProps
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
