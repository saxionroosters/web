<template>

</template>
<script>
    export default {
        name: 'Web authenticate',
        mounted() {

            let token = this.$route.query.access_token;
            if (token !== undefined) {
                // Save token
                Cookies.set('access_token', token);
            }
            else{
                // Something went wrong lol
                alert('Something went wrong')
            }
        }
    }
</script>