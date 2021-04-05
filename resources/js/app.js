require('./bootstrap');

import moment from 'moment';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import router from './routes';
import Index from './Index';
import FatalError from './shared/components/FatalError';
import LoadingButton from './shared/components/LoadingButton';
import Success from './shared/components/Success';
import StarRating from './shared/components/StarRating';
import ValidationErrors from './shared/components/ValidationErrors';
import StoreDefinition from './store.js';

window.Vue = Vue;

// Register components globally
Vue.component('fatal-error', FatalError);
Vue.component('loading-button', LoadingButton);
Vue.component('success', Success);
Vue.component('star-rating', StarRating);
Vue.component('v-errors', ValidationErrors);

// Register filters globally
Vue.filter('fromNow', value => moment(value).fromNow());

// Register plugins globally
Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store(StoreDefinition);

const app = new Vue({
    el: '#app',
    router,
    store,

    components: {
        'index': Index
    },

    beforeCreate() {
        this.$store.dispatch('loadStoredState');
    }
});
