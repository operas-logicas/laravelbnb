<template>
    <div style="padding: 1.25rem">
        <h6 class="pt-4">
            <a href="#"
               @click.prevent="toggleReviews"
               class="text-uppercase font-weight-bolder"
            >Review List</a>
            <small class="text-muted">( hide / view )</small>
        </h6>

        <div v-if="loading">Loading...</div>
        <div v-else>
            <div
                class="border-bottom pt-4"
                :class="[
                    { 'd-none': !showReviews }
                ]"
                v-for="(review, index) in reviews" :key="`review-${index}`"
            >
                <div class="row">
                    <div class="col-md-6">Robert Miller</div>
                    <div class="col-md-6 d-flex justify-content-end">
                        <star-rating :value="review.rating" class="fa-lg"></star-rating>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">{{ review.created_at | fromNow }}</div>
                </div>

                <div class="row pt-4 pb-4">
                    <div class="col-md-12">{{ review.content }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import moment from 'moment';

export default {
    props: {
        bookableId: String
    },

    data() {
        return {
            loading: false,
            reviews: null,
            showReviews: true
        }
    },

    methods: {
        toggleReviews() {
            this.showReviews = !this.showReviews;
        }
    },

    created() {
        this.loading = true;

        axios.get(`/api/bookables/${this.bookableId}/reviews`)
            .then(response => {
                this.reviews = response.data.data;
                this.loading = false;
            })
            .catch(error =>
                console.log(`Error! ${error.response.status} ${error.response.statusText}`)
            );
    },

    // filters: {
    //     fromNow(value) {
    //         return moment(value).fromNow();
    //     }
    // }
}
</script>
