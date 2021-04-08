import * as Auth from './shared/utils/auth';

export default {
    state: {
        lastSearch: {
          from: null,
          to: null
        },
        cart: {
            items: []
        },
        isLoggedIn: false,
        user: {}
    },

    mutations: {
        setLastSearch(state, payload) {
            state.lastSearch = payload;
        },

        setCart(state, payload) {
            state.cart = payload;
        },

        addToCart(state, payload) {
            state.cart.items.push(payload);
        },

        removeFromCart(state, payload) {
            state.cart.items = state.cart.items.filter(
                item => item.bookable.id !== payload
            );
        },

        setUser(state, payload) {
            state.user = payload;
        },

        setLoggedIn(state, payload) {
            state.isLoggedIn = payload;
        }
    },

    actions: {
        setLastSearch(context, payload) {
            context.commit('setLastSearch', payload);
            localStorage.setItem('lastSearch', JSON.stringify(payload));
        },

        loadStoredState(context) {
            context.commit('setLoggedIn', Auth.isLoggedIn());

            const lastSearch = localStorage.getItem('lastSearch');
            if (lastSearch)
                context.commit('setLastSearch', JSON.parse(lastSearch));

            const cart = localStorage.getItem('cart');
            if (cart) context.commit('setCart', JSON.parse(cart));
        },

        addToCart({ commit, state }, payload) {
            commit('addToCart', payload);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },

        removeFromCart({ commit, state }, payload) {
            commit('removeFromCart', payload);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },

        clearCart({ commit, state }) {
            commit('setCart', { items: [] });
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },

        async loadUser({ commit, dispatch }) {
            if (Auth.isLoggedIn()) {
                try {
                    const user = (await axios.get(`/user`)).data;
                    commit('setUser', user);
                    commit('setLoggedIn', true);
                } catch (error) {
                    await dispatch('logout');
                }
            }
        },

        logout({ commit }) {
            commit('setUser', {});
            commit('setLoggedIn', false);
            Auth.logOut();
        }
    },

    getters: {
        itemsInCart: state => state.cart.items.length,

        inCartAlready: state =>
            id => {
                return state.cart.items.reduce(
                    (result, item) => result || item.bookable.id === id,
                    false
                );
            }
    }
};
