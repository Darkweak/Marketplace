import * as React from 'react';
import { Layout } from '../Common/Layout';
import { ApplyResetPasswordForm, RequestResetPasswordForm } from '../_forms/resetPassword';

export const ResetPassword = ({ match: { params: { token } } }: any) => (
    <Layout container noPadding textContainer>
        {
            token ?
                <ApplyResetPasswordForm/> :
                <ResetPasswordRequest/>
        }
    </Layout>
);

export const ResetPasswordRequest = () => (
    <React.Fragment>
        <h1 className="text-center">Un oubli de mot de passe, ça arrive à tout le monde</h1>
        <div className="py-2">
            <RequestResetPasswordForm/>
        </div>
    </React.Fragment>
);
