<template>
    <button class="btn btn-secondary btn-block" @click="check" :disabled="loading">
        <span v-if="!loading">
            <slot name="notLoading">Check!</slot>
        </span>
        <span v-if="loading">
            <i class="fas fa-circle-notch fa-spin"></i> <slot name="loading">Checking...</slot></span>
    </button>
</template>

<script>
export default {
    props: {
        check: Function,
        loading: Boolean
    }
}
</script>
