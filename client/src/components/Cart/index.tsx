import * as React from 'react';
import { Layout } from '../Common/Layout';
import { TextContainer } from '../Common/ObliqueContainer';
import { connect } from 'react-redux';
import { CartReducerProps } from './store/cartReducer';
import { Warning } from '../Common/Alert';

const CartItem = ({ name, product }: any) => (
    <React.Fragment>
        <div className="col-8">
            { name } x { product.quantity }
        </div>
        <div className="col-4">
            { (product.quantity * product.price).toFixed(2) }€
        </div>
    </React.Fragment>
);

const CartCategories = ({ cart, category }: any) => (
    <React.Fragment>
        <h4>{ category }</h4>
        <div className="row m-0 py-2">
            { Object.keys(cart).map((item: any, index: any) => <CartItem key={index} product={cart[item]} name={item} />) }
        </div>
    </React.Fragment>
);

interface Reducers {
    CartReducer: CartReducerProps;
}
const mapStateToProps = (reducers: Reducers) => ({
    cart: reducers.CartReducer.cart
});

export const Cart = connect(
    mapStateToProps,
    {}
)(({ cart }: CartReducerProps) => (
    <Layout container noPadding>
        <TextContainer>
            <h1 className="text-center">
                Récapitulatif de votre panier
            </h1>
            <div className="row m-0 py-2">
                {
                    Object.keys(cart).length > 2 ? (
                        <React.Fragment>
                            <div className="col-8">
                                <h3>Produits</h3>
                            </div>
                            <div className="col-4">
                                <h3>Prix</h3>
                            </div>
                            <div className="dropdown-divider w-100"/>
                            <div className="container py-3">
                                {
                                    Object.keys(cart).map((key, index) => (
                                        ('totalItems' !== key && 'totalPrice' !== key) && ( <CartCategories key={index} cart={cart[key]} category={key}/> )
                                    ))
                                }
                            </div>
                            <div className="dropdown-divider w-100"/>
                            <div className="col-8">
                                <h3>TOTAL</h3>
                            </div>
                            <div className="col-4">
                                <h3>{ cart.totalPrice }€</h3>
                            </div>
                        </React.Fragment>
                    ) :
                        <div className="col-md-8 offset-md-2">
                            <Warning>
                                <span>Votre panier ne contient aucun article pour le moment</span>
                            </Warning>
                        </div>
                }
            </div>
        </TextContainer>
    </Layout>
));
