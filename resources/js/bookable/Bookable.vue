<template>
    <div v-if="loading">Data is loading...</div>
    <div v-else>
        <div class="row">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <h2 class="card-title">{{ bookable.title }}</h2>
                        <hr>
                        <article class="card-text">{{ bookable.description }}</article>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <!-- TODO -->
                Availability & Price
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            bookable: null,
            loading: false
        };
    },

    created() {
        this.loading = true;

        axios.get( `/api/bookables/${this.$route.params.id}`)
            .then(response => {
                this.bookable = response.data.data;
                this.loading = false;
            })
            .catch(error =>
                console.log(`Error! ${error.status} ${error.statusText}`)
            );
    }
};
</script>
