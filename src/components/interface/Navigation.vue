<template>
    <div>
        <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.mdAndUp" app v-model="drawer">
            <v-list>
                <v-subheader >Saved schedules</v-subheader>
                <v-list-tile v-for="identity in this.scheduleIdentities" @click="openSchedule(identity)"
                             v-bind:key="identity.getName()">
                    <v-list-tile-action>
                        <v-icon></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{identity.getName()}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-divider inset></v-divider>
                <v-subheader >Other</v-subheader>
                <v-list-tile @click="openSettings">
                    <v-list-tile-action>
                        <v-icon>settings</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Instellingen</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

            </v-list>
        </v-navigation-drawer>
        <Toolbar :drawer.sync="drawer"></Toolbar>
    </div>
</template>
<script>
    import Toolbar from './Toolbar.vue'
    import ScheduleDataManager from '../../managers/ScheduleDataManager'
    import ScheduleIdentity from '../../models/ScheduleIdentity'

    export default {
        components: {
            Toolbar
        },
        data() {
            return {
                drawer: null,
                scheduleIdentities: []
            }
        },
        methods: {
            openSettings: function () {

            },
            openSchedule: function (sender) {
                let query = {}
                if (sender.isTeacher()) {
                    query["teacher"] = sender.teacherId
                } else {
                    query["group"] = sender.groupId
                }

                this.$router.push({name: "Schedule", query: query});

            }
        },
        mounted() {
            this.scheduleIdentities = ScheduleDataManager.getSavedScheduleIdentities()
        }


    }
</script>
<style lang="scss">
    /** loaded from scss folder **/
</style>

