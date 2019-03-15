<template>
    <v-container style="max-width: 600px;">
        <h2>{{this.day.date.day}} - {{this.day.date.date}}</h2>
        <v-timeline dense clipped>
            <ScheduleWeekDayItem v-for="item in this.day.entries" v-bind:item="item"/>
        </v-timeline>
    </v-container>
</template>

<script>
    import ScheduleWeekDayItem from './ScheduleWeekDayItem'


    export default {
        name: "ScheduleWeekDay",
        components: {ScheduleWeekDayItem},
        props: ['day'],
        mounted() {

        },
        methods: {
            loadSchedule: function () {

            }
        }

    }
</script>

<style scoped>

</style>