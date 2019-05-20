import * as React from 'react';
import '../Common/snackbar.scss';
import { Snackbar } from '../Objects/Snackbar';
import { SnackbarReducerProps } from './store/snackbarReducer';
import { connect } from 'react-redux';
import { addSnackbar } from './store/snackbar';

interface ReducerProps {
    SnackbarReducer: SnackbarReducerProps;
}

const selectAppropriatedIcon: any = (type: string) => {
    switch (type) {
        case 'warning':
            return 'exclamation-circle';
        case 'danger':
            return 'exclamation-triangle';
        case 'succes':
            return 'check-circle';
        default:
            return 'info-circle';
    }
};

const mapStateToProps = (reducers: ReducerProps) => ({
    snackbars: reducers.SnackbarReducer.snackbars
});
const mapDispatchToProps = (dispatch: (args?: any) => void) => ({
    addSnackbar: (args: any) => dispatch(addSnackbar(args))
});
export const BaseSnackbar = ({text, type}: Snackbar) => (
    <div className={`p-3 m-3 snackbar-${type} text-white`}>
        <i className={`fas fa-${selectAppropriatedIcon(type)}`}/> {text}
    </div>
);

export const NotificationsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(({ addSnackbar, snackbars }: any) => (
    <div className="fixed-bottom" id="notification-center">
        {
            snackbars.map((snackbar: Snackbar, index: number) => (
                <BaseSnackbar key={index} type={snackbar.type} text={snackbar.text}/>
            ))
        }
    </div>
));
