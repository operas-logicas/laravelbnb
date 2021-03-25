require('./bootstrap');

// import Vue from 'vue';
import moment from 'moment';
import VueRouter from 'vue-router';
import router from './routes';
import Index from './Index';

// window.Vue = Vue;
window.Vue = require('vue').default;

// Register component globally
// Vue.component(
//     'example-component',
//     require('./components/ExampleComponent.vue').default
// );

// Register filter globally
Vue.filter(
    'fromNow', value => moment(value).fromNow()
);

// Register plugin globally
Vue.use(VueRouter);

const app = new Vue({
    el: '#app',
    router,
    components: {
        'index': Index
    }
});
