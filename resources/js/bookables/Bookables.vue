<template>
    <div>
        <bookable-list-item
            :item-title="bookable1.title"
            :item-content="bookable1.content"
            :price="bookable1.price"
        ></bookable-list-item>
        <bookable-list-item
            :item-title="bookable2.title"
            :item-content="bookable2.content"
            :price="bookable2.price"
        ></bookable-list-item>
        <bookable-list-item
            :item-title="bookable3.title"
            :item-content="bookable3.content"
            :price="bookable3.price"
        ></bookable-list-item>
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
            bookable1: null,
            bookable2: null,
            // bookable1: {
            //     title: 'Cheap Villa',
            //     content: 'A very cheap villa',
            //     price: 1000
            // },
            // bookable2: {
            //     title: 'Cheap Villa 2',
            //     content: 'A very cheap villa 2',
            //     price: 1500
            // }
        };
    },

    // Lifecycle Hooks
    // beforeCreate() {
    //     console.log('before create');
    // },

    // Fetch data from back-end API here
    created() {
        console.log('created');
        console.log(this.bookable1);
        console.log(this.bookable2);

        setTimeout(() => {
            this.bookable1 = {
                title: 'Cheap Villa !!!',
                content: 'A very cheap villa',
                price: 1000
            };
            this.bookable2 = {
                title: 'Cheap Villa 2',
                content: 'A very cheap villa 2',
                price: 1500
            };
            this.bookable3 = {
                title: 'Expensive Villa',
                content: 'A very expensive villa',
                price: 10000
            };
        }, 5000);

        setTimeout(() => {
            console.log('First change');
            this.bookable1.title = 'You will see this!';
        }, 8000);

        setTimeout(() => {
            console.log('Second change');
            this.bookable3.title = "You won't see this!";
        }, 12000);
    },

    // beforeMount() {
    //     console.log('before mount');
    // },

    mounted() {
        console.log('mounted');
    },

    // beforeUpdate() {
    //     console.log('before update');
    // },
    //
    // updated() {
    //     console.log('updated');
    // },

    // beforeDestroy() {
    //     console.log('before destroy');
    // },
    //
    // destroyed() {
    //     console.log('destroyed');
    // }
};
</script>
