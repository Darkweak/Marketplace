export const UPDATE_NAVBAR_POSITION = 'UPDATE_NAVBAR_POSITION';

export function updateNavbarPosition(data: number) {
    return {
        payload: data,
        type: UPDATE_NAVBAR_POSITION
    }
};
