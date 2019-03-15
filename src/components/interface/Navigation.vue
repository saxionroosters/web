<template>
    <div>
        <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.mdAndUp" app v-model="drawer">
        <v-list>
            <v-list-tile @click="" :key="settings">
                <v-list-tile-action>
                <v-icon>settings</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                <v-list-tile-title>
                    Instellingen
                </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
        </v-navigation-drawer>
        <Toolbar :drawer.sync="drawer"></Toolbar>
    </div>
</template>
<script>
import Toolbar from './Toolbar.vue'

export default {
    components: {
        Toolbar
    },
    data () {
        return {
            drawer: null
        }
    }
}
</script>
<style lang="scss">
    /** loaded from scss folder **/
</style>

