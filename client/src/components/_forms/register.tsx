import * as React from 'react';
import { GenerateForm } from './common';
import { register } from './store/register';
import { connect } from 'react-redux';
import { mapStateToProps } from './login';
import { email, password, pseudo } from './fields';
import { Danger } from '../Common/Alert';

export const RegisterForm = connect(
    mapStateToProps,
    {
        register
    }
)(({ isRegisterError, register, ...rest }: any) => (
  <GenerateForm
      fields={[email, pseudo, password]}
      onSubmit={register}
      {...rest}
  >
      {
          isRegisterError &&
          <Danger>
              <span>Une erreur est survenue lors de la création de votre compte</span>
          </Danger>
      }
  </GenerateForm>
));
