import * as React from 'react';
import { formatFormDatas, GenerateForm } from './common';
import { register } from './store/register';
import { connect } from 'react-redux';
import { mapStateToProps } from './login';
import { email, password, pseudo } from './fields';
import { Danger } from '../Common/Alert';

export const RegisterForm = connect(
    mapStateToProps,
    dispatch => ({
        handleSubmit: (event: any) => {
            event.preventDefault();
            dispatch(register(formatFormDatas(event.target.elements)));
        }
    })
)(({ handleSubmit, isRegisterError, ...rest }: any) => (
  <GenerateForm
      fields={[email, pseudo, password]}
      onSubmit={handleSubmit}
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
