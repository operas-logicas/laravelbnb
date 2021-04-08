<template>
    <fatal-error v-if="error"></fatal-error>
    <div v-else class="w-50 m-auto align-items-center">
        <div class="card card-body">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="text"
                       name="email"
                       placeholder="Enter your email"
                       v-model="email"
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
                       v-model="password"
                       class="form-control"
                       :class="[
                           { 'is-invalid': errorFor('password') }
                       ]"
                >
                <v-errors :errors="errorFor('password')"></v-errors>
            </div>

            <button type="submit"
                    @click.prevent="login"
                    :disabled="loading"
                    class="btn btn-primary btn-lg btn-block"
            >Login</button>

            <hr>

            <div>
                No account yet?
                <router-link :to="{ name: 'register' }"
                             class="font-weight-bold"
                >Register</router-link>
            </div>

            <div>
                Forgotten password?
                <router-link :to="{ name: 'home' }"
                             class="font-weight-bolder"
                >Reset password</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import validationErrors from '../shared/mixins/validationErrors';
import * as Auth from '../shared/utils/auth';
import { is422 } from '../shared/utils/response';

export default {
    mixins: [validationErrors],

    data() {
        return {
            email: null,
            password: null,
            loading: false,
            error: false
        };
    },

    methods: {
        async login() {
            this.loading = true;
            this.errors = null;

            try {
                await axios.get(`/sanctum/csrf-cookie`);
                await axios.post(`/login`, {
                    email: this.email,
                    password: this.password
                });

                Auth.logIn();
                await this.$store.dispatch('loadUser');
                await this.$router.push({ name: 'home' });

            } catch (error) {
                if (is422(error)) this.errors = error.response.data.errors;
                else this.error = true;

            } finally {
                this.loading = false;

            }
        }
    }
};
</script>
