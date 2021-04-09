<template>
    <div>
        <success v-if="isSuccess">Your booking is complete, thank you!</success>
        <fatal-error v-else-if="error"></fatal-error>
        <div class="row" v-else>
            <div class="col-md-8 pb-4" v-if="itemsInCart">
                <div class="row">
                    <div class="col-md-6 form-group">
                        <label for="first_name">First Name</label>
                        <input type="text"
                               name="first_name"
                               v-model="customer.first_name"
                               class="form-control"
                               :class="[
                               { 'is-invalid': errorFor('customer.first_name') }
                           ]"
                        >
                        <v-errors :errors="errorFor('customer.first_name')"></v-errors>
                    </div>
                    <div class="col-md-6 form-group">
                        <label for="last_name">Last Name</label>
                        <input type="text"
                               name="last_name"
                               v-model="customer.last_name"
                               class="form-control"
                               :class="[
                               { 'is-invalid': errorFor('customer.last_name') }
                           ]"
                        >
                        <v-errors :errors="errorFor('customer.last_name')"></v-errors>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12 form-group">
                        <label for="email">Email</label>
                        <input type="text"
                               name="email"
                               v-model="customer.email"
                               class="form-control"
                               :class="[
                               { 'is-invalid': errorFor('customer.email') }
                           ]"
                        >
                        <v-errors :errors="errorFor('customer.email')"></v-errors>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 form-group">
                        <label for="street">Street</label>
                        <input type="text"
                               name="street"
                               v-model="customer.street"
                               class="form-control"
                               :class="[
                               { 'is-invalid': errorFor('customer.street') }
                           ]"
                        >
                        <v-errors :errors="errorFor('customer.street')"></v-errors>
                    </div>
                    <div class="col-md-6 form-group">
                        <label for="city">City</label>
                        <input type="text"
                               name="city"
                               v-model="customer.city"
                               class="form-control"
                               :class="[
                               { 'is-invalid': errorFor('customer.city') }
                           ]"
                        >
                        <v-errors :errors="errorFor('customer.city')"></v-errors>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 form-group">
                        <label for="country">Country</label>
                        <input type="text"
                               name="country"
                               v-model="customer.country"
                               class="form-control"
                               :class="[
                               { 'is-invalid': errorFor('customer.country') }
                           ]"
                        >
                        <v-errors :errors="errorFor('customer.country')"></v-errors>
                    </div>
                    <div class="col-md-4 form-group">
                        <label for="state">State</label>
                        <input type="text"
                               name="state"
                               v-model="customer.state"
                               class="form-control"
                               :class="[
                               { 'is-invalid': errorFor('customer.state') }
                           ]"
                        >
                        <v-errors :errors="errorFor('customer.state')"></v-errors>
                    </div>
                    <div class="col-md-2 form-group">
                        <label for="zip">Zip</label>
                        <input type="text"
                               name="zip"
                               v-model="customer.zip"
                               class="form-control"
                               :class="[
                               { 'is-invalid': errorFor('customer.zip') }
                           ]"
                        >
                        <v-errors :errors="errorFor('customer.zip')"></v-errors>
                    </div>
                </div>

                <hr>

                <div class="row">
                    <div class="col-md-12 form-group">
                        <button type="submit"
                                @click.prevent="book"
                                :disabled="loading"
                                class="btn btn-lg btn-primary btn-block"
                        >Book now!</button>
                    </div>
                </div>
            </div><!-- End v-if itemsInCart -->

            <div class="col-md-8 pb-2" v-else>
                <div class="jumbotron jumbotron-fluid text-center">
                    <h1>Empty</h1>
                </div>
            </div><!-- End v-else -->

            <div class="col-md-4">
                <div class="d-flex justify-content-between">
                    <h6 class="text-uppercase text-secondary font-weight-bolder">Your Cart</h6>
                    <h6 class="badge badge-secondary text-uppercase">
                        <span v-if="itemsInCart">Items: {{ itemsInCart }}</span>
                        <span v-else>Empty</span>
                    </h6>
                </div>

                <transition-group name="fade" tag="div">
                    <div v-for="item in cart" :key="item.bookable.id">
                        <div class="pt-2 pb-2 border-top d-flex justify-content-between">
                            <span>
                                <router-link
                                    :to="{
                                        name: 'bookable',
                                        params: {
                                            id: String(item.bookable.id)
                                        }
                                    }"
                                >{{ item.bookable.title }}</router-link>
                            </span>

                            <span class="font-weight-bolder">${{ item.price.total }}</span>
                        </div>

                        <div class="pt-2 pb-2 d-flex justify-content-between">
                            <span>From {{ item.dates.from }}</span>
                            <span>To {{ item.dates.to }}</span>
                        </div>

                        <div class="pt-2 pb-2 text-right">
                            <button @click="$store.dispatch('removeFromCart', item.bookable.id)"
                                    class="btn btn-sm btn-outline-secondary">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { is422 } from '../shared/utils/response';
import validationErrors from '../shared/mixins/validationErrors';

export default {
    mixins: [validationErrors],

    data() {
        return {
            customer: {
                first_name: null,
                last_name: null,
                email: null,
                street: null,
                city: null,
                country: null,
                state: null,
                zip: null
            },
            loading: false,
            error: false,
            success: false
        }
    },

    computed: {
        ...mapGetters([ 'itemsInCart' ]),

        ...mapState({ cart: state => state.cart.items }),

        isSuccess() {
            return !this.loading && 0 === this.itemsInCart && this.success;
        }
    },

    methods: {
        async book() {
            this.loading = true;
            this.errors = null;
            this.success = false;

            try {
                await axios.post(`/api/checkout`, {
                    bookings: this.cart.map(item => {
                        return {
                            bookable_id: item.bookable.id,
                            from: item.dates.from,
                            to: item.dates.to
                        };
                    }),
                    customer: this.customer
                });

                await this.$store.dispatch('clearCart');

                this.success = true;

            } catch (error) {
                if (is422(error)) this.errors = error.response.data.errors;
                else this.error = true;

            } finally {
                this.loading = false;
            }
        }
    }
}
</script>

<style scoped>
h6.badge {
    font-size: 100%;
}
</style>
