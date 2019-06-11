import * as React from 'react';
import { GenerateForm } from './common';
import { Link } from '../Objects/Link';
import { connect } from 'react-redux';
import { UserReducerProps } from './store/UserReducer';
import { Warning } from '../Common/Alert';
import { login } from './store/login';
import { password, username } from './fields';

interface Reducers {
    UserReducer: UserReducerProps;
}

export const mapStateToProps = (reducers: Reducers) => ({
    isLoginError: reducers.UserReducer.isLoginError,
    isRegisterError: reducers.UserReducer.isRegisterError
});

const link: Link = {
    label: 'Pas encore de compte ?',
    path: '/connection',
};

const link2: Link = {
    label: 'Mot de passe oublié ?',
    path: '/reset-password',
};

export const LoginForm = connect(
    mapStateToProps,
    {
        login
    }
)(({ isLoginError, login, ...rest }: any) => (
    <GenerateForm
        additionnalLinks={[ link, link2 ]}
        fields={[ username, password ]}
        onSubmit={login}
        {...rest}
    >
        {
            isLoginError &&
                <Warning>
                    <span>Identifiant ou mot de passe incorrect</span>
                </Warning>
        }
    </GenerateForm>
));
