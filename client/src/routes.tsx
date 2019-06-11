import * as React from 'react';
import { Cart } from './components/Cart';
import { Category } from './components/Category';
import { Discount } from './components/Discount';
import { Connection } from './components/Connexion';
import { Register } from './components/Register';
import { Welcome } from './components/Welcome';
import { Profile } from './components/Profile';
import { ChangePassword } from './components/Profile/change';
import { ResetPassword } from './components/Login/resetPassword';
import { CGU } from './components/Static/cgu';
import { getRoles } from './helpers';
import { About } from './components/Static/about';
import { Activate } from './components/Activate';

const ROLE_USER = 'ROLE_USER';

const is_granted = () => {
    if (!getRoles() || !getRoles().includes(ROLE_USER)) {
        typeof window !== 'undefined' && (window.location.pathname = '/');
    }
};

export const routes = [
    {
        component: Connection,
        path: '/connection'
    },
    {
        component: About,
        path: '/about'
    },
    {
        component: Activate,
        path: '/activate/:token'
    },
    {
        component: () => { is_granted(); return <Cart/> },
        path: '/cart'
    },
    {
        component: CGU,
        path: '/cgu'
    },
    {
        component: () => { is_granted(); return <ChangePassword/> },
        path: '/change-password'
    },
    {
        component: ResetPassword,
        path: '/reset-password/:token?'
    },
    {
        component: () => { is_granted(); return <Profile/> },
        path: '/profile'
    },
    {
        component: Category,
        path: '/products'
    },
    {
        component: Category,
        path: '/categories/:name'
    },
    {
        component: Discount,
        path: '/discount'
    },
    {
        component: Register,
        path: '/register'
    },
    {
        component: Welcome,
        path: '/'
    },
];
