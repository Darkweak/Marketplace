import * as React from 'react';
import { formatFormDatas, GenerateForm } from './common';
import { connect } from 'react-redux';
import { UserReducerProps } from './store/UserReducer';
import { Warning } from '../Common/Alert';
import { changePassword } from './store/user';
import { newpassword, oldpassword } from './fields';

interface Reducers {
    UserReducer: UserReducerProps;
}

export const mapStateToProps = (reducers: Reducers) => ({
    isError: reducers.UserReducer.isError
});

export const ChangePasswordForm: React.FunctionComponent = connect(
    mapStateToProps,
    dispatch => ({
        handleSubmit: (event: any) => {
            event.preventDefault();
            dispatch(changePassword(formatFormDatas(event.target.elements)))
        }
    })
)(({ handleSubmit, isError }) => (
    <GenerateForm
        fields={[ oldpassword, newpassword ]}
        onSubmit={handleSubmit}
    >
        {
            isError &&
                <Warning>
                    <span>Identifiant ou mot de passe incorrect</span>
                </Warning>
        }
    </GenerateForm>
));
