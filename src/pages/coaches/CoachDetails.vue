<template>
    <section>
        <base-card>
            <h2>{{ fullName }}</h2>
            <h3>${{ selectedCoach.hourlyRate }}/ hour</h3>
        </base-card>
    </section>
    <section>
        <base-card>
            <header>
                <h2>Interested? Reach out now!</h2>
                <base-button link :to="coachContactLink">Contact</base-button>
            </header>
            <router-view></router-view>
        </base-card>
    </section>
    <section>
        <base-card>
            <base-bagde v-for="area in selectedCoach.areas" :key="area" :type="area" :title="area"></base-bagde>
            <p>{{ selectedCoach.description }}</p>
        </base-card>
    </section>
</template>

<script>
export default {
    props: ['id'],
    data() {
        return {
            selectedCoach: null,
        }
    },
    computed: {
        fullName() {
            return `${this.selectedCoach.firstName} ${this.selectedCoach.lastName}`
        },
        coachContactLink() {
            return `${this.$route.path}/${this.selectedCoach.id}/contact`
        }
    },
    created() {
        this.selectedCoach = this.$store.getters['coaches/coachesList'].find(coach => coach.id === this.id);
    }
}
</script>

<style>

</style>
