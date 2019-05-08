import * as React from 'react';
import { Layout } from '../Common/Layout';
import { LoginForm } from '../_forms/login';

export const Login = () => (
    <Layout container noPadding textContainer>
        <h1 className="text-center">Connectes toi ça prend dix secondes</h1>
        <div className="py-2">
            <LoginForm/>
        </div>
    </Layout>
);
