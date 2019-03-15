<template>

</template>
<script>
    import AuthManager from '../../managers/AuthManager'
    export default {
        name: 'Web authenticate',
        mounted() {

            let token = this.$route.query.access_token;
            if (token !== undefined) {
                // Save token
                AuthManager.setAccessToken(token)

                // Redirect to home
                this.$router.push('/')
            }
            else{
                // Something went wrong lol
                alert('Something went wrong')
            }
        }
    }
</script>