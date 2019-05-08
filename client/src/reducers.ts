import { CartReducer } from './components/Cart/store/cartReducer';
import { CategoryReducer } from './components/Item/store/categoryReducer';
import { CommonReducer } from './components/_forms/store/commonReducer';
import { NavbarReducer } from './components/Common/store/NavbarReducer';
import { ProductReducer } from './components/Item/store/productReducer';
import { UserReducer } from './components/_forms/store/UserReducer';

export const reducers = {
    CartReducer,
    CategoryReducer,
    CommonReducer,
    NavbarReducer,
    ProductReducer,
    UserReducer
};
