import * as React from 'react';
import { GenerateForm } from './common';
import { connect } from 'react-redux';
import { UserReducerProps } from './store/UserReducer';
import { Success } from '../Common/Alert';
import { newpassword, username } from './fields';
import { applyResetPassword, resetPassword } from './store/user';
import { Link } from '../Objects/Link';

interface Reducers {
    UserReducer: UserReducerProps;
}

export const mapStateToProps = (reducers: Reducers) => ({
    isSuccess: reducers.UserReducer.isSuccess
});

const link: Link = {
    label: 'Mot de passe retrouvé ?',
    path: '/login'
};

export const RequestResetPasswordForm: any = connect(
    mapStateToProps,
    {
        resetPassword
    }
)(({ isSuccess, resetPassword }) => (
    <GenerateForm
        additionnalLinks={[link]}
        fields={[ username ]}
        onSubmit={resetPassword}
    >
        {
            isSuccess &&
                <Success>
                    <span>Si le compte existe, un email sera envoyé au compte associé</span>
                </Success>
        }
    </GenerateForm>
));

export const ApplyResetPasswordForm: any = connect(
    mapStateToProps,
    {
        applyResetPassword
    }
)(({ applyResetPassword, isSuccess }) => (
    <GenerateForm
        fields={[ newpassword ]}
        onSubmit={applyResetPassword}
    >
        {
            isSuccess &&
                <Success>
                    <span>Votre mot de passe a bien été réinitialisé</span>
                </Success>
        }
    </GenerateForm>
));
