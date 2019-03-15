<template>
    <v-timeline-item
            class="mb-3"
            color="grey"
            icon-color="grey lighten-2"
            small>
        <v-layout justify-space-between>
            <v-flex xs7>{{this.item.name}}</v-flex>
            <v-flex xs5 text-xs-right>{{this.item.start}} - {{this.item.end}}</v-flex>
        </v-layout>
    </v-timeline-item>
</template>

<script>


    export default {
        name: "ScheduleWeekDayItem",
        data() {
            return {
                timeline: []
            }
        },
        props: ['item']
    }
</script>

<style scoped>

</style>