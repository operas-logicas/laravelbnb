export default {
    state: {
        lastSearch: {
          from: null,
          to: null
        },
        cart: {
            items: []
        }
    },

    mutations: {
        setLastSearch(state, payload) {
            state.lastSearch = payload;
        },

        addToCart(state, payload) {
            state.cart.items.push(payload);
        },

        removeFromCart(state, payload) {
            state.cart.items = state.cart.items.filter(
                item => item.bookable.id !== payload
            );
        }
    },

    actions: {
        setLastSearch(context, payload) {
            context.commit('setLastSearch', payload);
            localStorage.setItem('lastSearch', JSON.stringify(payload));
        },

        loadStoredState(context) {
            const lastSearch = localStorage.getItem('lastSearch');
            if (lastSearch) {
                context.commit('setLastSearch', JSON.parse(lastSearch));
            }
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
