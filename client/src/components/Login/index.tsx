import * as React from 'react';
import { LoginForm } from '../_forms/login';

export const Login = () => (
    <React.Fragment>
        <h1 className="text-center">Connecte toi ça prend dix secondes</h1>
        <div className="py-2">
            <LoginForm withoutText/>
        </div>
    </React.Fragment>
);
