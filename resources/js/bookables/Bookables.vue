<template>
    <div>
        <div v-if="loading">Data is loading...</div>
        <div v-else>
            <div class="row mb-4" v-for="row in rows" :key="`row-${row}`">
                <div
                    class="col"
                    v-for="(bookable, col) in bookablesInRow(row)" :key="`row-${row + col}`"
                >
                    <bookable-list-item
                        :item-title="bookable.title"
                        :item-content="bookable.content"
                        :price="bookable.price"
                    >
                    </bookable-list-item>
                </div>
                <div class="col"
                     v-for="p in placeholdersInRow(row)" :key="`placholder-${row + p}`"
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

        setTimeout(() => {
            this.bookables = [
                {
                    title: 'Cheap Villa !!!',
                    content: 'A very cheap villa',
                    price: 1000
                },
                {
                    title: 'Cheap Villa 2',
                    content: 'A very cheap villa 2',
                    price: 1500
                },
                {
                    title: 'Cheap Villa 2',
                    content: 'A very cheap villa 2',
                    price: 1500
                },
                {
                    title: 'Cheap Villa 2',
                    content: 'A very cheap villa 2',
                    price: 1500
                },
                {
                    title: 'Cheap Villa 2',
                    content: 'A very cheap villa 2',
                    price: 1500
                },
                {
                    title: 'Cheap Villa 2',
                    content: 'A very cheap villa 2',
                    price: 1500
                },
                {
                    title: 'Cheap Villa 2',
                    content: 'A very cheap villa 2',
                    price: 1500
                }
            ];
            this.loading = false;
        }, 2000);
    }
};
</script>
