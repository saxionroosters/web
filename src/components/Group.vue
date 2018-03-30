<template>
  <div class="container">
    <h1 class="title">{{ group[0].name }}<span>{{ group[0].course_name }}</span></h1>

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
                  <td colspan="4" class="entry-name"> {{ entry.name }} <span class="entry-room"> {{ entry.room }} </span></td>
                </tr>
                <tr class="entry-row-2">
                  <td colspan="4" class="entry-note"> {{ entry.note }} <span class="entry-teacher"><a v-bind:href="'/teacher/' + entry.teachers"> {{ entry.teachername }} </a></span></td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Group',
  data: function() {
    return {
        schedule: [],
        group: []
    }
  },

  mounted: function () {
    if (this.$route.params.week === undefined) {
      this.getSchedule(this.$route.params.group, 0);
    } else {
      this.getSchedule(this.$route.params.group, this.$route.params.week);
    }
  },

  watch: {
    '$route' (to, from) {
      if (this.$route.params.week === undefined) {
        this.getSchedule(this.$route.params.group, 0);
      } else {
        this.getSchedule(this.$route.params.group, this.$route.params.week);
      }
    }
  },

  methods: {
    getSchedule: function(group, week) {
      console.log("Getting schedule");
      $.ajax({
        method: 'GET',
        dataType: 'json',
        url: 'http://api.roosters.saxion.nl/v2/groups/schedule.json?group=' + group + '&week=' + week
      }).then((response) => {
        if(response.error) {
          console.err("There was an error " + response.error);
        } else {
          var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

          for (var i = 0; i < response.days.length; i++) {
            response.days[i].date.date = new Date(response.days[i].date.date).toLocaleDateString("nl-NL", options);
            this.schedule.push(response.days[i]);
          }
          this.group.push(response.subject.group);
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
h1.title span {
  font-weight: normal;
  font-size: 26px;
  color: #737373;
  margin-left: 15px;
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
.entry-note {
  font-style: italic;
}
.entry-teacher {
  font-style: normal;
  float: right;
}
</style>