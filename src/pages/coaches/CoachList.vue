<template>
    <div>
        <section>
            <CoachFilter @change-filters="setFilters" />
        </section>
        <base-card>

            <section>
                <div class="controls">
                    <base-button @click="loadCoaches(true)">Refresh</base-button>
                    <base-button mode="flat" link to="/auth?redirect=register" v-if="!isLoggedIn">
                        Login to Register as a Coach
                    </base-button>
                    <base-button v-if="isLoggedIn && !isCoach && !isLoading" :link="true" to="/register" mode="outline">
                        Register as Coach
                    </base-button>

                </div>

                <base-spinner v-if="isLoading"></base-spinner>
                <ul v-else-if="hasCoaches">
                    <CoachItem v-for="coach in filteredCoaches" :key="coach.id" :coach="coach" />
                </ul>
                <h3 v-else> No coaches to show...</h3>
            </section>
        </base-card>

        <base-dialog :show="!!error" @close="handleClose">
            <p>{{ error }}</p>
        </base-dialog>
    </div>
</template>

<script>
import CoachFilter from '../../components/coaches/CoachFilter.vue'
import CoachItem from '../../components/coaches/CoacheItem.vue';

export default {
    components: { CoachFilter, CoachItem },
    data() {
        return {
            activeFilters: {
                frontend: true,
                backend: true,
                career: true,
            },
            isLoading: false,
            error: null,
        }
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters.isAuthenticated;
        },
        isCoach() {
            return this.$store.getters['coaches/isCoach'];
        },
        filteredCoaches() {
            /* Should use "coaches/coaches" because the Vue-Store is using 'namespacing'
                a) So the first "coaches" is the namespace defining on createStore.modules
                b) The second "coaches" is the getter name in the store that has the coaches List
            */
            const coaches = this.$store.getters['coaches/coachesList'];

            return coaches.filter(coach => {
                console.log('coach --->', coach);
                if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
                    return true;
                }
                if (this.activeFilters.backend && coach.areas.includes('backend')) {
                    return true;
                }
                if (this.activeFilters.career && coach.areas.includes('career')) {
                    return true;
                }
                return false
            });
        },
        hasCoaches() {
            return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
        }
    },
    created() {
        this.loadCoaches();
    },
    methods: {
        handleClose() {
            this.error = null;
        },
        setFilters(updatedFilters) {
            this.activeFilters = updatedFilters;
        },
        async loadCoaches(forceRefresh = false) {
            this.isLoading = true;
            try {
                await this.$store.dispatch('coaches/loadCoaches', { forceRefresh });
            } catch (error) {
                this.error = error.message || 'Something went wrong';
            }
            this.isLoading = false;
        }
    }
}
</script>

<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.controls {
    display: flex;
    justify-content: space-between;
}
</style>