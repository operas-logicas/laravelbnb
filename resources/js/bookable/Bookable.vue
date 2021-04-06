<template>
    <div v-if="loading">Data is loading...</div>
    <div v-else>
        <div class="row">
            <div class="col-md-8 pb-4">
                <div class="card">
                    <div class="card-body">
                        <h2 class="card-title">{{ bookable.title }}</h2>
                        <hr>
                        <article class="card-text">{{ bookable.description }}</article>
                    </div>
                </div>

                <review-list :bookable-id="this.$route.params.id"></review-list>
            </div>

            <div class="col-md-4 pb-4">
                <availability :bookable-id="this.$route.params.id"
                              @availability="checkPrice"
                              class="mb-4"
                ></availability>

                <transition name="fade">
                    <price-breakdown v-if="price" :price="price" class="mb-4">
                    </price-breakdown>
                </transition>

                <transition name="fade">
                    <button v-if="price"
                            @click="addToCart"
                            :disabled="inCartAlready"
                            class="btn btn-outline-secondary btn-block"
                    >Book now</button>
                </transition>

                <button v-if="inCartAlready"
                        @click="removeFromCart"
                        class="btn btn-outline-secondary btn-block"
                >Remove from cart</button>

                <div v-if="inCartAlready" class="mt-4 text-muted warning">
                    Seems like you've added this to the cart already. If you want to change dates, remove from cart first.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Availability from './Availability';
import PriceBreakdown from './PriceBreakdown';
import ReviewList from './ReviewList';

export default {
    components: {
        Availability,
        PriceBreakdown,
        ReviewList
    },

    data() {
        return {
            bookable: null,
            loading: false,
            price: null
        };
    },

    methods: {
        async checkPrice(hasAvailability) {
            if (!hasAvailability) {
                this.price = null;
                return;
            }

            try {
                this.price = (await axios
                    .get(`/api/bookables/${
                        this.bookable.id
                    }/price?from=${
                        this.lastSearch.from
                    }&to=${
                        this.lastSearch.to
                    }`)).data.data;
            } catch (error) {
                this.price = null;
            }
        },

        addToCart() {
            this.$store.commit(
                'addToCart',
                {
                    bookable: this.bookable,
                    price: this.price,
                    dates: this.lastSearch
                }
            );
        },

        removeFromCart() {
            this.$store.commit('removeFromCart', this.bookable.id);
        }
    },

    async created() {
        this.loading = true;

        try {
            this.bookable = (await axios
                .get(`/api/bookables/${this.$route.params.id}`)
            ).data.data;
        } catch (error) {
            console.log(`Error! ${error.response.status} ${error.response.statusText}`);
        } finally {
            this.loading = false;
        }
    },

    computed: {
        ...mapState({
            lastSearch: 'lastSearch'
        }),

        inCartAlready() {
            if (!this.bookable) return false;

            return this.$store.getters.inCartAlready(this.bookable.id);
        }
    }
};
</script>

<style scoped>
.warning {
    font-size: 0.7rem;
}
</style>
