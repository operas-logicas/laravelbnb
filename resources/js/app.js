require('./bootstrap');

// import Vue from 'vue';
import moment from 'moment';
import VueRouter from 'vue-router';
import router from './routes';
import Index from './Index';
import FatalError from './shared/components/FatalError';
import StarRating from './shared/components/StarRating';

// window.Vue = Vue;
window.Vue = require('vue').default;

// Register components globally
Vue.component('fatal-error', FatalError);
Vue.component('star-rating', StarRating);

// Register filters globally
Vue.filter('fromNow', value => moment(value).fromNow());

// Register plugins globally
Vue.use(VueRouter);

const app = new Vue({
    el: '#app',
    router,
    components: {
        'index': Index
    }
});
