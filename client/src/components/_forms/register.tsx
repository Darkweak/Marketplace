import * as React from 'react';
import { formatFormDatas, GenerateForm } from './common';
import { Link } from '../Objects/Link';
import { register } from './store/register';
import { connect } from 'react-redux';
import { mapStateToProps } from './login';
import { email, password, pseudo } from './fields';

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
      fields={[email, pseudo, password]}
      onSubmit={handleSubmit}
  />
));
