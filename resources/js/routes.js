import VueRouter from 'vue-router';
import Bookables from './bookables/Bookables';
import Bookable from './bookable/Bookable';
import Cart from './cart/Cart';
import Login from './auth/Login';
import Review from './review/Review';

const routes = [
    {
        path: '/',
        component: Bookables,
        name: 'home'
    },
    {
        path: '/auth/login',
        component: Login,
        name: 'login'
    },
    {
        path: '/bookable/:id',
        component: Bookable,
        name: 'bookable'
    },
    {
        path: '/cart',
        component: Cart,
        name: 'cart'
    },
    {
        path: '/review/:id',
        component: Review,
        name: 'review'
    }
];

const router = new VueRouter({
    mode: 'history', // Enable HTML 5 history mode (hash mode default)
    routes // short for `routes: routes`
});

export default router;
