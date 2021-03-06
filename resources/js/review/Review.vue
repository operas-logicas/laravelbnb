<template>
    <div>
        <success v-if="success">You've left a review, thank you very much!</success>
        <fatal-error v-else-if="error"></fatal-error>
        <div class="row" v-else>
            <div :class="[
                { 'col-md-4': twoColumns },
                { 'd-none': oneColumn }
            ]">
                <div class="card mb-4">
                    <div class="card-body">
                        <div v-if="loading">Loading...</div>
                        <div v-else-if="hasBooking">
                            <p>
                                Stayed at
                                <router-link
                                    :to="{
                                        name: 'bookable',
                                        params: { id: booking.bookable.bookable_id }
                                    }">{{ booking.bookable.title }}
                                </router-link>
                            </p>

                            <p>
                                From {{ booking.from }} to {{ booking.to }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div :class="[
                { 'col-md-8': twoColumns },
                { 'col-md-12': oneColumn }
            ]">
                <div>
                    <div v-if="loading">Loading...</div>
                    <div v-else>
                        <div v-if="alreadyReviewed">
                            <h3>You've already left a review for this booking!</h3>
                        </div>
                        <div v-else>
                            <div class="form-group">
                                <label class="text-muted">Select the star rating (1 is worst - 5 is best)</label>
                                <star-rating
                                    class="fa-3x"
                                    v-model="review.rating"
                                ></star-rating>
                            </div>

                            <div class="form-group">
                                <label for="content" class="text-muted">Describe your experience with</label>
                                <textarea
                                    name="content"
                                    cols="30" rows="10"
                                    class="form-control"
                                    v-model="review.content"
                                    :class="[
                                        { 'is-invalid': errorFor('content') }
                                    ]"
                                ></textarea>
                                <v-errors :errors="errorFor('content')"></v-errors>
                            </div>

                            <button class="btn btn-lg btn-primary btn-block"
                                    @click.prevent="submit"
                                    :disabled="sending"
                            >Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { is404, is422 } from '../shared/utils/response';
import validationErrors from '../shared/mixins/validationErrors';

export default {
    mixins: [validationErrors],

    data() {
        return {
            review: {
                id: null,
                rating: 5,
                content: null
            },
            existingReview: null,
            booking: null,
            loading: false,
            sending: false,
            error: false,
            success: false
        }
    },

    async created() {
        this.loading = true;
        this.review.id = this.$route.params.id;

        try {
            // 1. Check if review already exists (in reviews table by id - uuid)
            this.existingReview = (await axios.get(
                `/api/reviews/${this.review.id}`)
            ).data.data;

        } catch (error) {
            if (is404(error)) {
                try {
                    // 2. Else fetch a booking by a review key (then remove review key from db)
                    this.booking = (await axios.get(
                        `/api/booking-by-review/${this.review.id}`)
                    ).data.data;

                } catch (error) {
                    this.error = !is404(error);
                }
            } else {
                this.error = true;
            }

        } finally {
            this.loading = false;
        }
    },

    computed: {
        alreadyReviewed() {
            return this.existingReview || !this.booking;
        },

        hasReview() {
            return this.existingReview !== null;
        },

        hasBooking() {
            return this.booking !== null;
        },

        oneColumn() {
            return !this.loading && this.alreadyReviewed;
        },

        twoColumns() {
            return this.loading || !this.alreadyReviewed;
        }
    },

    methods: {
        async submit() {
            this.sending = true;
            this.errors = null;
            this.success = false;

            try {
                // 3. Store the review
                const response = await axios.post(`/api/reviews`, this.review);
                this.success = 201 === response.status;

            } catch (error) {
                if (is422(error)) {
                    const errors = error.response.data.errors;

                    if (errors['content'] && 1 === _.size(errors)) {
                        this.errors = errors;
                        return;
                    }
                }

                this.error = true;

            } finally {
                this.sending = false;
            }
        }
    }
}
</script>

<style scoped>
.is-invalid {
    border-color: #b22222;
    background-image: none;
}
</style>
