import * as React from 'react';
import { Message } from 'semantic-ui-react';
import { ChildrenInterface } from './Layout';

interface BaseAlertProps {
    children: any;
    info?: boolean;
    error?: boolean;
    success?: boolean;
    warning?: boolean;
}

const BaseAlert = ({children, ...rest}: BaseAlertProps) => (
    <Message className="text-center w-100" {...rest}>
        {children}
    </Message>
);

export const Warning = ({children}: ChildrenInterface) => (
    <BaseAlert warning>
        {children}
    </BaseAlert>
);

export const Success = ({children}: ChildrenInterface) => (
    <BaseAlert success>
        {children}
    </BaseAlert>
);

export const Danger = ({children}: ChildrenInterface) => (
    <BaseAlert error>
        {children}
    </BaseAlert>
);

export const Info = ({children}: ChildrenInterface) => (
    <BaseAlert info>
        {children}
    </BaseAlert>
);

