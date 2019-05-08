import * as React from 'react';
import { Layout } from '../Common/Layout';
import { RegisterForm } from '../_forms/register';

export const Register: React.FunctionComponent = () => (
    <Layout container noPadding textContainer>
        <h1 className="text-center">Rejoins-nous, c'est gratuit</h1>
        <div className="py-2">
            <RegisterForm/>
        </div>
    </Layout>
);
