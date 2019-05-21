import * as React from 'react';
import { formatFormDatas, GenerateForm } from './common';
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
    dispatch => ({
        handleSubmit: (event: any) => {
            event.preventDefault();
            dispatch(resetPassword(formatFormDatas(event.target.elements)))
        }
    })
)(({ handleSubmit, isSuccess }) => (
    <GenerateForm
        additionnalLinks={[link]}
        fields={[ username ]}
        onSubmit={handleSubmit}
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
    dispatch => ({
        handleSubmit: (event: any) => {
            event.preventDefault();
            dispatch(applyResetPassword(formatFormDatas(event.target.elements), {token: window.location.pathname.split('/')[2]}))
        }
    })
)(({ handleSubmit, isSuccess }) => (
    <GenerateForm
        fields={[ newpassword ]}
        onSubmit={handleSubmit}
    >
        {
            isSuccess &&
                <Success>
                    <span>Votre mot de passe a bien été réinitialisé</span>
                </Success>
        }
    </GenerateForm>
));
