import * as React from 'react';
import { formatFormDatas, GenerateForm } from './common';
import { Field } from '../Objects/Field';
import { Link } from '../Objects/Link';
import { connect } from 'react-redux';
import { UserReducerProps } from './store/UserReducer';
import { Warning } from '../Common/Alert';
import { login } from './store/login';

interface Reducers {
    UserReducer: UserReducerProps;
}

export const mapStateToProps = (reducers: Reducers) => ({
    isError: reducers.UserReducer.isError
});

const username: Field = {
    label: 'Email ou pseudo',
    placeholder: 'votre@email.fr / votrePseudo',
    name: 'username'
};

const password: Field = {
    label: 'Mot de passe',
    placeholder: 'votremotdepasse',
    name: 'password',
    type: 'password'
};

const link: Link = {
    label: 'Pas encore de compte ?',
    path: '/register',
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
        additionnalLinks={[ link ]}
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
