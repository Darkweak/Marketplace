import * as React from 'react';
import { Layout } from '../Common/Layout';
import { ChangePasswordForm } from '../_forms/changePassword';

export const ChangePassword = () => (
    <Layout container>
        <h1 className="text-center">Changement de votre mot de passe</h1>
        <ChangePasswordForm/>
    </Layout>
)
