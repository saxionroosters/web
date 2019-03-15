<template>
    <v-flex>
        <h1 class="title">Uitgelogd</h1>
        <p>Je bent nu uitgelogd.</p>
        <p>Je wordt zo doorverwezen.</p>
    </v-flex>
</template>

<script>
    export default {
        name: "Logout",
        mounted() {
            localStorage.removeItem('access_token')

            setTimeout(() => {
                this.$router.push('Login')
            }, 5000)

        }
    }
</script>

<style scoped>

</style>