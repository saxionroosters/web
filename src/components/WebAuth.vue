<template>

</template>
<script>
    export default {
        name: 'Web authenticate',
        mounted() {

            let token = this.$route.query.access_token;
            if (token !== undefined) {
                // Save token
                localStorage.setItem('access_token', token);

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