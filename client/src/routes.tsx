import * as React from 'react';
import { Cart } from './components/Cart';
import { Category } from './components/Category';
import { Discount } from './components/Discount';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Welcome } from './components/Welcome';
import { Profile } from './components/Profile';
import { ChangePassword } from './components/Profile/change';
import { ResetPassword } from './components/Login/resetPassword';
import { CGU } from './components/Static/cgu';
import { getRoles } from './helpers';

const ROLE_USER = 'ROLE_USER';

const is_granted = (component: any) => {
    if (getRoles() && getRoles().includes(ROLE_USER)) {
        return component
    }

    window.location.pathname = '/';
};

export const routes = [
    {
        component: Login,
        url: '/login'
    },
    {
        component: () => is_granted(<Cart/>),
        url: '/cart'
    },
    {
        component: CGU,
        url: '/cgu'
    },
    {
        component: () => is_granted(<ChangePassword/>),
        url: '/change-password'
    },
    {
        component: ResetPassword,
        url: '/reset-password/:token?'
    },
    {
        component: () => is_granted(<Profile/>),
        url: '/profile'
    },
    {
        component: Category,
        url: '/products'
    },
    {
        component: Category,
        url: '/categories/:name'
    },
    {
        component: Discount,
        url: '/discount'
    },
    {
        component: Register,
        url: '/register'
    },
    {
        component: Welcome,
        url: '/'
    },
];
