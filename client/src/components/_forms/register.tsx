import * as React from 'react';
import { formatFormDatas, GenerateForm } from './common';
import { Field } from '../Objects/Field';
import { Link } from '../Objects/Link';
import { register } from './store/register';
import { connect } from 'react-redux';
import { mapStateToProps } from './login';

const email: Field = {
    label: 'Email',
    placeholder: 'votre@email.fr',
    name: 'email',
    type: 'email'
};

const username: Field = {
    label: 'Pseudo',
    placeholder: 'votrePseudo',
    name: 'username'
};

const password: Field = {
    label: 'Mot de passe',
    placeholder: 'votremotdepasse',
    name: 'password',
    type: 'password'
};

const link: Link = {
    label: 'Déjà un compte ?',
    path: '/login'
};

export const RegisterForm: React.FunctionComponent = connect(
    mapStateToProps,
    dispatch => ({
        handleSubmit: (event: any) => {
            event.preventDefault();
            dispatch(register(formatFormDatas(event.target.elements)));
        }
    })
)(({ handleSubmit }) => (
  <GenerateForm
      additionnalLinks={[link]}
      fields={[email, username, password]}
      onSubmit={handleSubmit}
  />
));
