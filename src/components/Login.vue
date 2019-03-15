<template>
    <v-flex text-xs-center row wrap>
        <h1 class="title">Login</h1>
        <p>You need to login with your school account to view your schedule.</p>

        <v-btn class="primary" large round v-on:click="login">Login</v-btn>
    </v-flex>
</template>


<script>
    export default {
        name: 'Login',
        mounted: () => {

        },
        methods: {
            login: function () {
                let baseUrl = 'http://localhost:8080' // TODO: get base url from env or something
                let redirectPage = '/web-auth'
                let encoded = encodeURI(baseUrl+redirectPage)
                window.location = 'https://roosters.rest.saxion.nl/api/users/authenticate?originUrl=' + encoded
            }
        }

    }
</script>