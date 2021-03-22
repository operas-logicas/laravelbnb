<template>
    <div class="card w-100">
        <div class="card-body">
            <router-link :to="{ name: 'bookable', params: { id: bookable.id } }">
                <h5 class="card-title">{{ bookable.title }}</h5>
            </router-link>
            <p class="card-text">{{ bookable.description }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        bookable: {
            title: String,
            description: String,
            id: Number
        }
    }
};
</script>
