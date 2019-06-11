import React from 'react';
import { connect } from 'react-redux';
import { Layout } from '../Common/Layout';
import { Danger, Info, Success } from '../Common/Alert';
import { activateUser } from '../_forms/store/user';
import { compose, lifecycle } from 'recompose';
import { UserReducerProps } from '../_forms/store/UserReducer';

interface Reducers {
    UserReducer: UserReducerProps
}

const mapStateToProps = ( reducers: Reducers ) => ({
    isActivationError: reducers.UserReducer.isActivationError,
    isActivationSuccess: reducers.UserReducer.isActivationSuccess,
});
export const Activate = compose(
    connect(
        mapStateToProps,
        {
            activateUser
        }
    ),
    lifecycle({
        componentDidMount() {
            const { activateUser, match: { params : { token }} }: any = this.props;
            activateUser({ token: token });
        }
    })
)(({ isActivationError, isActivationSuccess }: any) => (
    <Layout textContainer>
        {
            isActivationError ?
                <Danger>
                    <span>Erreur lors de l'activation du compte, vérifiez le lien dans fourni dans le mail</span>
                </Danger> :
                isActivationSuccess ?
                    <Success>
                        <span>Votre compte a été activé, vous pouvez vous connecter</span>
                    </Success> :
                    <Info>
                        <span>Votre compte est en cours d'activation</span>
                    </Info>
        }
    </Layout>
));
