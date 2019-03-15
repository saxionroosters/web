<template>
    <v-container id="week_holder" >

        <v-flex row wrap v-if="this.scheduleWeek == null">
            <v-flex xs-12 class="text-xs-center">
                <v-progress-circular
                        :size="70"
                        :width="7"
                        color="primary"
                        indeterminate

                ></v-progress-circular>
            </v-flex>
        </v-flex>
        <!--TODO: make this better -->
        <ScheduleWeekDay v-else v-bind:day="day" v-for="day in this.scheduleWeek.days"/>
    </v-container>
</template>

<script>

    import ScheduleWeekDay from './Items/ScheduleWeekDay'
    import ScheduleManager from '../../managers/ScheduleManager'
    import ScheduleIdentity from "../../models/ScheduleIdentity";

    export default {
        name: "Schedule",
        components: {ScheduleWeekDay},
        mounted() {

            let groupId = this.$route.query.group
            let teacherId = this.$route.query.teacher
            let weekOffset = this.$route.query.week

            this.scheduleIdentity = new ScheduleIdentity(groupId, teacherId)
            if (groupId == null && teacherId == null) {
                // Fatal error, no schedule id given
            } else {
                // Load schedule
                new ScheduleManager().getScheduleWeek(this.scheduleIdentity, weekOffset, (scheduleWeek) => {
                    this.scheduleWeek = scheduleWeek
                })
            }
        },
        data() {
            return {
                scheduleWeek: null
            }
        }


    }
</script>

<style scoped lang="scss">
</style>