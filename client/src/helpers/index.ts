import decode from 'jwt-decode';
import { Product } from '../components/Objects/Product';
import { Category } from '../components/Objects/Category';

const CART = 'cart';
const CATEGORIES = 'categories';
const CACHE = 'cache';
const TOKEN = 'token';
const CACHE_TIME = 7;
export const getToken: any = () => localStorage.getItem(TOKEN);
export const setToken: any = (token: string) => localStorage.setItem(TOKEN, token);
export const deleteToken: any = () => localStorage.removeItem(TOKEN);
export const getDecodedToken: any = () => getToken() && decode(getToken());
export const getUsername: any = () => getDecodedToken() && getDecodedToken().username;
export const getRoles: any = () => getDecodedToken() && getDecodedToken().roles;


export const getCart: any = () => JSON.parse(localStorage.getItem(CART) || '{"totalItems": 0, "totalPrice": 0.00}');
export const setCart: any = (cart: any) => { localStorage.setItem(CART, JSON.stringify(cart)); return getCart() };
export const resetCart: any = () => { return setCart({totalItems: 0, totalPrice: 0.00}) };
export const setCartFromToken: any = (obj: string) => {
    let cart = JSON.parse(obj);
    let populatedCart = resetCart();
    cart.cartItems.map((cartItem: any) => populatedCart = populateCart(populatedCart, cartItem.product, cartItem.quantity));
    setCart(populatedCart);
};
export const updateCart: any = (product: Product) => {
    "use strict";
    if ('' === getCart()) {
        resetCart();
    }

    let cart = getCart();

    if (undefined === product.category || undefined === product.category) {
        return;
    }

    return setCart(populateCart(cart, product, 1));
};
const populateCart = (cart: any, product: any, quantity = 1) => {
    if (undefined !== cart[product.category.name]) {
        if (undefined !== cart[product.category.name][product.name]) {
            cart[product.category.name][product.name] = {
                ...cart[product.category.name][product.name],
                quantity: cart[product.category.name][product.name].quantity + quantity,
            };
        } else {
            cart[product.category.name][product.name] = generateNewProducttoCart(product, quantity);
        }
    } else {
        cart[product.category.name] = {};
        cart[product.category.name][product.name] = generateNewProducttoCart(product, quantity);
    }

    cart.totalItems = cart.totalItems + quantity;
    cart.totalPrice = (parseFloat(cart.totalPrice) + ( undefined !== product.pricePromotion ? product.pricePromotion : product.price ) * quantity).toFixed(2);

    return cart;
};
const generateNewProducttoCart = (product: Product, quantity: number) => ({
    quantity: quantity,
    price: product.promotion ? product.pricePromotion : product.price,
});


export const getCategories = () => localStorage.getItem(CATEGORIES) ? JSON.parse(localStorage.getItem(CATEGORIES) || '') : null;
export const setCategories = (categories: Category[]) => {
    localStorage.setItem(CATEGORIES, JSON.stringify(categories));
    setCache()
};
export const resetCategories = () => localStorage.removeItem(CATEGORIES);

export const getCache = () => new Date(localStorage.getItem(CACHE) || '');
export const setCache = () => {
    let date = new Date();
    date.setDate(date.getDate() + CACHE_TIME);
    localStorage.setItem(CACHE, date.toString())
};
