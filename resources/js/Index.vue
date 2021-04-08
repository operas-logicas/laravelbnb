<template>
    <div>
        <nav class="navbar navbar-expand-md bg-white border-bottom navbar-light">
            <router-link class="navbar-brand mr-auto" :to="{ name: 'home' }">LaravelBnb</router-link>

            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link :to="{ name: 'cart' }" class="nav-link">
                        Cart
                        <span v-if="itemsInCart" class="badge badge-secondary">{{ itemsInCart }}</span>
                    </router-link>
                </li>

                <li v-if="!isLoggedIn" class="nav-item">
                    <router-link :to="{ name: 'register' }" class="nav-link">Register</router-link>
                </li>

                <li v-if="!isLoggedIn" class="nav-item">
                    <router-link :to="{ name: 'login' }" class="nav-link">Login</router-link>
                </li>

                <li v-if="isLoggedIn" class="nav-item">
                    <a @click.prevent="logout" href="#" class="nav-link">Logout</a>
                </li>
            </ul>
        </nav>

        <div class="container mt-4 mb-4 pr-4 pl-4">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
    data() {
        return {
          lastSearch: this.$store.state.lastSearch
        };
    },

    methods: {
        async logout() {
            try {
                await axios.post(`/logout`);
                await this.$store.dispatch('logout');
            } catch (error) {
                await this.$store.dispatch('logout');
            }
        }
    },

    computed: {
        ...mapState({
            lastSearchComputed: 'lastSearch',
            isLoggedIn: 'isLoggedIn'
        }),

        ...mapGetters({
            itemsInCart: 'itemsInCart'
        })
    }
};
</script>
