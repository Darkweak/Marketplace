import * as React from 'react';
import { RegisterForm } from '../_forms/register';

export const Register: React.FunctionComponent = () => (
    <React.Fragment>
        <h1 className="text-center">Inscris-toi, c'est gratuit</h1>
        <div className="py-2">
            <RegisterForm/>
        </div>
    </React.Fragment>
);
