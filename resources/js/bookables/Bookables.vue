<template>
    <div>
        <div v-if="loading">Data is loading...</div>
        <div v-else>
            <bookable-list-item
                v-for="(bookable, index) in bookables" :key="index"

                :item-title="bookable.title"
                :item-content="bookable.content"
                :price="bookable.price"
            ></bookable-list-item>
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
            loading: false
        };
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
                }
            ];
            this.loading = false;
        }, 2000);
    }
};
</script>
