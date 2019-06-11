import React from 'react';
import { Layout } from '../Common/Layout';
import { Login } from '../Login';
import { Register } from '../Register';
import {
    Divider,
    Segment
} from 'semantic-ui-react';

export const Connection = () => (
    <Layout container noPadding textContainer>
        <Segment className="py-md-4 px-0">
            <div className="row m-0">
                <div className="col-12 col-md-6 px-md-5 py-sm-4">
                    <Login/>
                </div>
                <div className="dropdown-divider w-100 d-md-none" />
                <div className="col-12 col-md-6 px-md-5 py-sm-4">
                    <Register/>
                </div>
            </div>
            <Divider vertical className="d-none d-md-block">OU</Divider>
        </Segment>
    </Layout>
);
