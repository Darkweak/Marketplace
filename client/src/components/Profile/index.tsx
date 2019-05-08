import * as React from 'react';
import { connect } from 'react-redux';
import { UserReducerProps } from '../_forms/store/UserReducer';
import { compose, lifecycle } from 'recompose';
import { getUser } from '../_forms/store/user';
import { Layout } from '../Common/Layout';
import { getUsername } from '../../helpers';
import { CartReducerProps } from '../Cart/store/cartReducer';

interface Reducers {
    UserReducer: UserReducerProps,
    CartReducer: CartReducerProps
}
const mapStateToProps = ( reducers: Reducers ) => ({
    user: reducers.UserReducer.user,
    cart: reducers.CartReducer.cart
});

const BorderInfos = ({ children, title }: any) => (
    <div className="col-sm-6 py-2">
        <div className="container border py-4">
            <h4 className="text-center">{ title }</h4>
            <div className="pt-4">
                { children }
            </div>
        </div>
    </div>
)

export const Profile = compose(
    connect(
        mapStateToProps,
        dispatch => ({
            getUser: () => dispatch(getUser()),
        })
    ),
    lifecycle({
        componentDidMount() {
            const { getUser }: any = this.props;
            getUser();
        }
    })
)(({ cart, user }: any) => (
    <Layout container>
        <h1 className="text-center">Bienvenue sur votre profil { getUsername() }</h1>
        <div className="row m-0">
            <BorderInfos title={`Vos informations personnelles`}>
                <p>Pseudo : darkweak</p>
                <p>email : sylvaincombraque@hotmail.fr</p>
                <div className="text-center">
                    <a href="/change-password" className="btn btn-primary">
                        Changer votre mot de passe
                    </a>
                </div>
            </BorderInfos>
            <BorderInfos title={`Votre panier`}>
                <p>Contient { cart.totalItems } article{ cart.totalItems > 1 ? 's' : null }</p>
                <p>Pour un total de { cart.totalPrice }€</p>
            </BorderInfos>
        </div>
    </Layout>
));
