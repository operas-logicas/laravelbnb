require('./bootstrap');

// import Vue from 'vue';
import moment from 'moment';
import VueRouter from 'vue-router';
import router from './routes';
import Index from './Index';
import FatalError from './shared/components/FatalError';
import Success from './shared/components/Success';
import StarRating from './shared/components/StarRating';
import ValidationErrors from './shared/components/ValidationErrors';

// window.Vue = Vue;
window.Vue = require('vue').default;

// Register components globally
Vue.component('fatal-error', FatalError);
Vue.component('success', Success);
Vue.component('star-rating', StarRating);
Vue.component('v-errors', ValidationErrors);

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
