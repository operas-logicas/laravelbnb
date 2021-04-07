<template>
    <div class="row">
        <div class="col-md-8">
            <div class="row">
                <div class="col-md-6 form-group">
                    <label for="first_name">First Name</label>
                    <input type="text" name="first_name" v-model="customer.first_name" class="form-control">
                </div>
                <div class="col-md-6 form-group">
                    <label for="last_name">Last Name</label>
                    <input type="text" name="last_name" v-model="customer.last_name" class="form-control">
                </div>
            </div>

            <div class="row">
                <div class="col-md-12 form-group">
                    <label for="email">Email</label>
                    <input type="text" name="email" v-model="customer.email" class="form-control">
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 form-group">
                    <label for="street">Street</label>
                    <input type="text" name="street" v-model="customer.street" class="form-control">
                </div>
                <div class="col-md-6 form-group">
                    <label for="city">City</label>
                    <input type="text" name="city" v-model="customer.city" class="form-control">
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 form-group">
                    <label for="country">Country</label>
                    <input type="text" name="country" v-model="customer.country" class="form-control">
                </div>
                <div class="col-md-4 form-group">
                    <label for="state">State</label>
                    <input type="text" name="state" v-model="customer.state" class="form-control">
                </div>
                <div class="col-md-2 form-group">
                    <label for="zip">Zip</label>
                    <input type="text" name="zip" v-model="customer.zip" class="form-control">
                </div>
            </div>

            <hr>

            <div class="row">
                <div class="col-md-12 form-group">
                    <button type="submit" class="btn btn-lg btn-primary btn-block">Book now!</button>
                </div>
            </div>
        </div>

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
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
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
            }
        }
    },

    computed: {
        ...mapGetters([ 'itemsInCart' ]),
        ...mapState({ cart: state => state.cart.items })
    }
}
</script>

<style scoped>
h6.badge {
    font-size: 100%;
}
</style>
