<template>
    <v-toolbar color="theme-primary" dark app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
        <v-toolbar-title class>
            <v-toolbar-side-icon @click.stop="$emit('update:drawer', !drawer)"></v-toolbar-side-icon>
            <span class="logo hidden-sm-and-down">
        <span>saxion</span>roosters
      </span>
        </v-toolbar-title>
        <v-spacer class="hidden-sm-and-down"></v-spacer>

        <v-text-field flat solo-inverted prepend-inner-icon="search"
                      label="Search"
                      zclass="toolbar-search"
                      v-model="this.searchQuery"

        ></v-text-field>

        <v-menu bottom left>
            <v-btn slot="activator" icon>
                <v-icon>more_vert</v-icon>
            </v-btn>

            <v-list style="min-width: 150px;">
                <router-link tag="v-list-tile" v-bind:to="{ name: 'Home' }">
                    <v-list-tile-title>{{ $t('titles.about') }}</v-list-tile-title>
                </router-link>

                <router-link tag="v-list-tile" v-bind:to="{ name: 'Home' }">
                    <v-list-tile-title>{{ $t('titles.apps') }}</v-list-tile-title>
                </router-link>

                <v-divider/>

                <router-link tag="v-list-tile" v-bind:to="{ name: 'Logout' }">
                    <v-list-tile-title>{{ $t('titles.logout') }}</v-list-tile-title>
                </router-link>
            </v-list>
        </v-menu>
    </v-toolbar>
</template>
<script>
    export default {
        props: ["drawer"],
        methods: {
            search: function (sender) {
                this.$router.replace({name: 'Search', params: {q: sender}})
            }

        },
        data() {
            return {
                searchQuery: null
            }
        },
        mounted() {
            let searchParam = this.$route.query.q;
            if (searchParam != null) {
                this.searchQuery = searchParam
            }
        },
    }
</script>

<style lang="scss">
    /** loaded from scss folder **/
</style>