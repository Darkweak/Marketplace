import * as React from 'react';
import { Alert } from 'react-bootstrap';
import { ChildrenInterface } from './Layout';

interface BaseAlertProps {
  children: any;
  color:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light';
}
const BaseAlert = ({ children, color }: BaseAlertProps) => (
  <Alert className="text-center w-100" variant={color}>
    { children }
  </Alert>
);

export const Warning = ({ children }: ChildrenInterface) => (
  <BaseAlert color={'warning'}>
    { children }
  </BaseAlert>
);

export const Success = ({ children }: ChildrenInterface) => (
  <BaseAlert color={'success'}>
    { children }
  </BaseAlert>
);

export const Danger = ({ children }: ChildrenInterface) => (
  <BaseAlert color={'danger'}>
    { children }
  </BaseAlert>
);

export const Info = ({ children }: ChildrenInterface) => (
  <BaseAlert color={'info'}>
    { children }
  </BaseAlert>
);

