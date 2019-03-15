<template>
    <v-container style="max-width: 600px;">
        <v-timeline dense clipped>

            <v-timeline-item
                    class="mb-3"
                    color="grey"
                    icon-color="grey lighten-2"
                    small>
                <v-layout justify-space-between>
                    <v-flex xs7>This order was archived.</v-flex>
                    <v-flex xs5 text-xs-right>15:26 EDT</v-flex>
                </v-layout>
            </v-timeline-item>

        </v-timeline>
    </v-container>
</template>

<script>
    import ScheduleWeekDayItem from './ScheduleWeekDayItem'
    import ScheduleManager from '../../../managers/ScheduleManager'
    import ScheduleIdentity from "../../../models/ScheduleIdentity";

    export default {
        name: "ScheduleWeekDay",
        components: {ScheduleWeekDayItem},
        data() {
            return {
                schedule: {}
            }
        },
        mounted() {
            new ScheduleManager().getSchedule(new ScheduleIdentity('EHI2VSB'))

        },
        methods: {
            loadSchedule: function () {

            }
        }

    }
</script>

<style scoped>

</style>