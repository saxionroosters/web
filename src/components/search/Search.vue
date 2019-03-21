<template>
  <v-layout row>
    <v-flex>
      <v-list two-line>
        <template v-if="this.results.groups.length > 0">
          <v-subheader>Groepen</v-subheader>
          <v-divider></v-divider>
          <v-list-tile v-for="group in this.results.groups" ripple @click="openGroup(group.name)">
            <v-list-tile-content>
              <v-list-tile-title v-html="group.name"></v-list-tile-title>
              <v-list-tile-sub-title v-html="group.course_name"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>

        <template v-if="this.results.teachers.length > 0">
          <v-subheader>Leraren</v-subheader>
          <v-divider></v-divider>
          <v-list-tile
            v-for="teacher in this.results.teachers"
            ripple
            @click="openTeacher(teacher.code)"
          >
            <v-list-tile-content>
              <v-list-tile-title v-html="teacher.fullname"></v-list-tile-title>
              <v-list-tile-sub-title v-html="teacher.code"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
import ScheduleManager from "../../managers/ScheduleManager";

export default {
  name: "Search",
  data() {
    return {
      results: null
    };
  },
  mounted() {
    let searchQuery = this.$route.query.q;
    new ScheduleManager().search(searchQuery, result => {
      this.results = result.result;
      console.log(this.results);
    });
  },
  methods: {
    openGroup: function(groupId) {
      this.$router.push({ name: "Schedule", query: { group: groupId } });
    },
    openTeacher: function(teacherId) {
      this.$router.push({ name: "Schedule", query: { teacher: teacherId } });
    }
  }
};
</script>

<style scoped>
</style>