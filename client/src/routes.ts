import { Welcome } from "./components/Welcome";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Discount } from "./components/Discount";
import { Category } from "./components/Category";

export const routes = [
  {
    component: Login,
    url: '/login'
  },
  {
    component: Category,
    url: '/products'
  },
  {
    component: Category,
    url: '/categories/:name'
  },
  {
    component: Discount,
    url: '/discount'
  },
  {
    component: Register,
    url: '/register'
  },
  {
    component: Welcome,
    url: '/'
  },
];
