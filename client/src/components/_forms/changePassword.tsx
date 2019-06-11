import * as React from 'react';
import { GenerateForm } from './common';
import { connect } from 'react-redux';
import { UserReducerProps } from './store/UserReducer';
import { Warning } from '../Common/Alert';
import { changePassword } from './store/user';
import { newpassword, oldpassword } from './fields';

interface Reducers {
    UserReducer: UserReducerProps;
}

export const mapStateToProps = (reducers: Reducers) => ({
    isError: reducers.UserReducer.isError
});

export const ChangePasswordForm = connect(
    mapStateToProps,
    {
        changePassword
    }
)(({ changePassword, isError }) => (
    <GenerateForm
        fields={[ oldpassword, newpassword ]}
        onSubmit={changePassword}
    >
        {
            isError &&
                <Warning>
                    <span>Identifiant ou mot de passe incorrect</span>
                </Warning>
        }
    </GenerateForm>
));
