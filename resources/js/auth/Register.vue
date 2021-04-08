<template>
    <fatal-error v-if="error"></fatal-error>
    <div v-else class="w-50 m-auto align-items-center">
        <div class="card card-body">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text"
                       name="name"
                       placeholder="Enter your name"
                       v-model="user.name"
                       class="form-control"
                       :class="[
                           { 'is-invalid': errorFor('name') }
                       ]"
                >
                <v-errors :errors="errorFor('email')"></v-errors>
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input type="text"
                       name="email"
                       placeholder="Enter your email"
                       v-model="user.email"
                       class="form-control"
                       :class="[
                           { 'is-invalid': errorFor('email') }
                       ]"
                >
                <v-errors :errors="errorFor('email')"></v-errors>
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password"
                       name="password"
                       placeholder="Enter your password"
                       v-model="user.password"
                       class="form-control"
                       :class="[
                           { 'is-invalid': errorFor('password') }
                       ]"
                >
                <v-errors :errors="errorFor('password')"></v-errors>
            </div>

            <div class="form-group">
                <label for="password_confirmation">Confirm Password</label>
                <input type="password"
                       name="password_confirmation"
                       placeholder="Confirm your password"
                       v-model="user.password_confirmation"
                       class="form-control"
                       :class="[
                           { 'is-invalid': errorFor('password_confiirmation') }
                       ]"
                >
                <v-errors :errors="errorFor('password_confirmation')"></v-errors>
            </div>

            <button type="submit"
                    @click.prevent="register"
                    :disabled="loading"
                    class="btn btn-primary btn-lg btn-block"
            >Register</button>

            <hr>

            <div>
                Already have an account?
                <router-link :to="{ name: 'login' }"
                             class="font-weight-bold"
                >Login</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import validationErrors from '../shared/mixins/validationErrors';
import * as Auth from "../shared/utils/auth";
import { is422 } from "../shared/utils/response";

export default {
    mixins: [validationErrors],

    data() {
        return {
            user: {
                name: null,
                email: null,
                password: null,
                password_confirmation: null
            },
            loading: false
        };
    },

    methods: {
        async register() {
            this.loading = true;
            this.errors = null;

            try {
                const response = await axios.post(`/register`, this.user);
                if (201 === response.status) {
                    Auth.logIn();
                    await this.$store.dispatch('loadUser');
                    await this.$router.push({ name: 'home' });
                }

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
