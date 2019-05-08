import * as React from 'react';
import { formatFormDatas, GenerateForm } from './common';
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
    isError: reducers.UserReducer.isError
});

const link: Link = {
    label: 'Pas encore de compte ?',
    path: '/register',
};

const link2: Link = {
    label: 'Mot de passe oublié ?',
    path: '/reset-password',
};

export const LoginForm: React.FunctionComponent = connect(
    mapStateToProps,
    dispatch => ({
        handleSubmit: (event: any) => {
            event.preventDefault();
            dispatch(login(formatFormDatas(event.target.elements)))
        }
    })
)(({ handleSubmit, isError }) => (
    <GenerateForm
        additionnalLinks={[ link, link2 ]}
        fields={[ username, password ]}
        onSubmit={handleSubmit}
    >
        {
            isError &&
                <Warning>
                    <span>Identifiant ou mot de passe incorrect</span>
                </Warning>
        }
    </GenerateForm>
));
