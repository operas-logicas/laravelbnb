<template>
    <div>
        <div v-if="loading">Data is loading...</div>
        <div v-else>
            <div class="row mb-0 mb-md-4" v-for="row in rows" :key="`row-${row}`">
                <div class="col-12 col-md-4 mb-4 mb-md-0 d-flex align-items-stretch"
                     v-for="(bookable, col) in bookablesInRow(row)"
                     :key="`row-${row + col}`"
                >
                    <bookable-list-item :bookable="bookable"></bookable-list-item>
                </div>
                <div class="col"
                     v-for="p in placeholdersInRow(row)"
                     :key="`placeholder-${row + p}`"
                >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BookableListItem from './BookableListItem';

export default {
    components: {
        BookableListItem
    },

    data() {
        return {
            bookables: null,
            loading: false,
            columns: 3
        };
    },

    computed: {
        rows() {
            return this.bookables
                ? Math.ceil(this.bookables.length / this.columns)
                : 0;
        }
    },

    methods: {
        bookablesInRow(row) {
            return this.bookables.slice(
                (row - 1) * this.columns, row * this.columns
            );
        },

        placeholdersInRow(row) {
            return this.columns - this.bookablesInRow(row).length;
        }
    },

    // Lifecycle Hooks

    // Fetch data from back-end API here
    created() {
        this.loading = true;

        axios.get('/api/bookables')
            .then(response => {
                this.bookables = response.data.data;
                this.loading = false;
            })
            .catch(error =>
                console.log(`Error! ${error.response.status} ${error.response.statusText}`)
            );
    }
};
</script>
