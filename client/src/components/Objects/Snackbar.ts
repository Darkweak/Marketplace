export interface Snackbar {
    text: string;
    type?:
        | 'warning'
        | 'success'
        | 'error'
        | 'info';
}
