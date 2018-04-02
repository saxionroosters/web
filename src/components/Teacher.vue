<template>
  <div class="container">
    <h1 class="title" v-if="teacher[0]">{{ teacher[0].code }}
      <span class="subtitle">{{ teacher[0].fullname }}</span>
      <span class="navigation">
        <button v-on:click="getSchedule(teacher[0].code, currentWeek - 1)" type="button" class="btn btn-success bmd-btn-icon">
          <i class="material-icons">chevron_left</i>
        </button>
        <span class="week" v-if="week[0]">Week {{ week[0].week }} </span>
        <button v-on:click="getSchedule(teacher[0].code, currentWeek + 1)" type="button" class="btn btn-success bmd-btn-icon">
          <i class="material-icons">chevron_right</i>
        </button>
      </span>
    </h1>

    <div class="card day-card" v-for="day in schedule">
      <div class="card-body">
        <h4> {{ day.date.date }} </h4>
        <div class="alert alert-info" role="alert" v-if="day.date.holiday"> {{ day.date.holiday }} </div>

        <div class="day">
          <div class="alert alert-secondary" role="alert" v-if="!day.entries.length && !day.date.holiday">Geen lessen</div>
          <table class="table" v-for="entry in day.entries">
            <tbody>
                <tr class="entry-row-1">
                  <td rowspan="3" class="entry-time"> {{ entry.start }} - {{ entry.end }} </td>
                  <td colspan="4" class="entry-name"> {{ entry.name }} <span class="entry-room"><a v-if="entry.rooms.length" data-toggle="collapse" v-bind:href="'#rooms-' + entry.date + entry.start + entry.end"> {{ entry.rooms.length }} lokalen</a><span v-if="!entry.rooms.length"> {{ entry.room }} </span></span>
                  </td>
                </tr>
                <tr v-if="entry.rooms.length" class="collapse" v-bind:id="'rooms-' + entry.date + entry.start + entry.end">
                  <td colspan="4">
                    <span class="entry-room" v-for="room in entry.rooms"> {{ room }}</span> 
                  </td>
                </tr>
                <tr class="entry-row-2">
                  <td colspan="4" class="entry-note"> {{ entry.note }} <span class="entry-teacher" v-if="entry.teachers.length"><a data-toggle="collapse" v-bind:href="'#teachers-' + entry.date + entry.start + entry.end"> {{ entry.teachers.length }} docenten</a></span></td>
                </tr>
                <tr v-if="entry.teachers.length" class="collapse" v-bind:id="'teachers-' + entry.date + entry.start + entry.end">
                  <td colspan="4">
                    <span class="entry-teacher" v-for="teacher in entry.teachers"> {{ teacher }}</span> 
                  </td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div v-for="day in schedule">
  <div v-for="entry in day.entries" class="modal fade" v-bind:id="entry.code" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"> {{ entry.name }} </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
  </div>

  </div>

</template>

<script>
export default {
  name: 'Teacher',
  data: function() {
    return {
        schedule: [],
        teacher: [],
        week: [],
        currentWeek: 0
    }
  },

  mounted: function () {
    if (this.$route.params.week === undefined) {
      this.getSchedule(this.$route.params.teacher, 0);
    } else {
      this.getSchedule(this.$route.params.teacher, this.$route.params.week);
    }
  },

  watch: {
    '$route' (to, from) {
      if (this.$route.params.week === undefined) {
        this.getSchedule(this.$route.params.teacher, 0);
      } else {
        this.getSchedule(this.$route.params.teacher, this.$route.params.week);
      }
    }
  },

  methods: {
    getSchedule: function(teacher, week) {
      this.currentWeek = week;

      console.log("Getting schedule");
      $.ajax({
        method: 'GET',
        dataType: 'jsonp',
        url: 'http://api.roosters.saxion.nl/v2/teachers/schedule.json?teacher=' + teacher + '&week=' + week
      }).then((response) => {
        if(response.error) {
          console.err("There was an error " + response.error);
        } else {
          var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

          this.schedule = [];
          for (var i = 0; i < response.days.length; i++) {
            response.days[i].date.date = new Date(response.days[i].date.date).toLocaleDateString("nl-NL", options);

            for (var j = 0; j < response.days[i].entries.length; j++) {
              response.days[i].entries[j].teachers = [];
              response.days[i].entries[j].rooms = [];

              if (response.days[i].entries[j].teachername !== null && response.days[i].entries[j].teachername !== "") {
                if (response.days[i].entries[j].teachername.indexOf(",") != -1) {
                  response.days[i].entries[j].teachers = response.days[i].entries[j].teachername.split(", ");
                } else if (response.days[i].entries[j].teachername.indexOf("|") != -1) {
                  response.days[i].entries[j].teachers = response.days[i].entries[j].teachername.split("|");
                }
              }

              if (response.days[i].entries[j].room !== null && response.days[i].entries[j].room !== "") {
                if (response.days[i].entries[j].room.indexOf(",") != -1) {
                  response.days[i].entries[j].rooms = response.days[i].entries[j].room.split(", ");
                } else if (response.days[i].entries[j].room.indexOf("|") != -1) {
                  response.days[i].entries[j].rooms = response.days[i].entries[j].room.split("|");
                }
              }
            }

            this.schedule.push(response.days[i]);
          }
          console.log(this.schedule);

          this.teacher.push(response.subject.teacher);
          this.week = [];
          this.week.push(response.week);
        }
      }).catch(function (err) {
        console.error(err);
      });
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

h1.title {
  font-weight: bold;
  margin-bottom: 20px;
}

h1.title span.subtitle {
  font-weight: normal;
  font-size: 26px;
  color: #737373;
  margin-left: 15px;
}

h1.title span.navigation {
  float: right;
}

h1.title span.navigation button {
  margin-top: 9px;
}

h1.title span.navigation span.week {
  font-size: 16px;
  padding-right: 5px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

div.container {
  margin-top: 20px;
}

tr {
  width: 100%;
}

td {
  border: none;
  padding-top: 10px;
  padding-bottom: 0px;
}

table {
  border-top: 2px solid #f3f3f3;
  margin-bottom: 10px;
}

.day-card {
  margin-bottom: 15px;
}

.day-card h4 {
  margin-bottom: 20px;
}

.entry-time {
  width: 120px;
  font-weight: 600;
}

.entry-room {
  float: right;
  font-weight: 600;
}

.collapse .entry-room {
  margin-left: 7px;
}

.collapsing .entry-room {
  margin-left: 7px;
}

.entry-note {
  font-style: italic;
}

.entry-teacher {
  font-style: normal;
  float: right;
}

.collapse .entry-teacher {
  margin-left: 7px;
}

.collapsing .entry-teacher {
  margin-left: 7px;
}

@media only screen and (max-width: 767px) {
  h1.title {
    padding-left: 10px;
    padding-right: 10px;
  }
  
  h1.title span.subtitle {
    display: none;
  }

  .container {
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
}
</style>