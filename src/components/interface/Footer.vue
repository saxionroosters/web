<template>
    <v-footer height="auto" color="footer-color">
        <v-layout justify-center row wrap>
            <v-btn flat round v-on:click="changeLanguage">{{ $t('footer.change-language') }}</v-btn>
            <v-btn
                    flat
                    round
                    :href="'https://github.com/saxionroosters/web'"
                    v-html="$t('footer.project-github')"
            ></v-btn>
            <v-btn flat round :href="'mailto:wessel@perik.me'" v-html="$t('footer.contact')"></v-btn>
            <v-flex
                    footer-color
                    py-3
                    text-xs-center
                    xs12
                    v-html="$t('footer.copyright') + ' ' + $t('footer.license') + '<br><br>' + $t('footer.disclaimer')"
            ></v-flex>
        </v-layout>
    </v-footer>
</template>

<script>
    export default {
        name: "Footer",
        methods: {
            changeLanguage: function() {
                // TODO: Change language
            }
        }
    }
</script>

<style scoped>

</style>