import decode from 'jwt-decode';

interface Match {
    params: any;
    url: string;
}

interface Location {
    pathname: string;
}

export interface Props {
    match?: Match;
    location?: Location;
}

const CART = 'cart';
const TOKEN = 'token';
export const getToken: any = () => localStorage.getItem(TOKEN);
export const setToken: any = (token: string) => localStorage.setItem(TOKEN, token);
export const deleteToken: any = () => localStorage.removeItem(TOKEN);
export const getDecodedToken: any = () => decode(getToken());
export const getUsername: any = () => getDecodedToken.username;
export const getCart: any = () => JSON.parse(localStorage.getItem(CART) || '');
export const setCart: any = (cart: any) => localStorage.setItem(CART, JSON.stringify(cart));
export const resetCart: any = () => setCart({});
