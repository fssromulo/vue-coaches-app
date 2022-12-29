<template>
    <section>
        <base-dialog :show="!!error" @close="handleClose">
            <p>{{ error }}</p>
        </base-dialog>
        <base-card>
            <header>
                <h2>Request received</h2>
            </header>
            <ul v-if="hasRequests">
                <RequestItem v-for="request in receivedRequests" :key="request.id" :request="request" />
            </ul>
            <base-spinner v-else-if="isLoading"></base-spinner>
            <h3 v-else>You haven't received any request yet!</h3>
        </base-card>
    </section>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';
export default {
    components: { RequestItem },
    data() {
        return {
            isLoading: false,
            error: null,
        }
    },
    computed: {
        receivedRequests() {
            return this.$store.getters['requests/requests']
        },
        hasRequests() {
            return !this.isLoading && this.$store.getters['requests/hasRequests']
        }
    },
    created() {
        this.loadRequests();
    },
    methods: {
        handleClose() {
            this.error = null;
        },
        async loadRequests() {
            this.isLoading = true;
            try {
                await this.$store.dispatch('requests/loadRequest');
            } catch (error) {
                this.error = error.message;
            }
            this.isLoading = false;
        }
    }
}
</script>

<style scoped>
header {
    text-align: center;
}

ul {
    list-style: none;
    margin: 2rem auto;
    padding: 0;
    max-width: 30rem;
}

h3 {
    text-align: center;
}
</style>