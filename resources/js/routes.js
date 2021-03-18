import VueRouter from 'vue-router';
import Bookables from './bookables/Bookables';
import Example2 from "./components/Example2";

const routes = [
    {
        path: '/',
        component: Bookables,
        name: 'home'
    },
    {
        path: '/second',
        component: Example2,
        name: 'second'
    }
];

const router = new VueRouter({
    mode: 'history', // Enable HTML 5 history mode (hash mode default)
    routes // short for `routes: routes`
});

export default router;
