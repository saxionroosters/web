<template>
  <div class="container">
    <h1 class="title" v-if="group[0]"> {{ group[0].name }} 
      <span class="subtitle">{{ group[0].course_name }}</span>
      <span class="navigation">
        <button v-on:click="getSchedule(group[0].name, currentWeek - 1)" type="button" class="btn btn-success bmd-btn-icon">
          <i class="material-icons">chevron_left</i>
        </button>
        <span class="week" v-if="week[0]">Week {{ week[0].week }} </span>
        <button v-on:click="getSchedule(group[0].name, currentWeek + 1)" type="button" class="btn btn-success bmd-btn-icon">
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
                  <td rowspan="3" class="entry-time"><span>{{ entry.start }}</span><br>{{ entry.end }}</td>
                  <td colspan="4" class="entry-name" v-if="locale === 'nl'">{{ entry.name }}<span class="entry-room" v-if="entry.room" v-bind:style="'color: ' + entry.building_color"><i class="material-icons">place</i>{{ entry.building }}, {{ entry.room }}</span></td>
                  <td colspan="4" class="entry-name" v-if="locale === 'en'">{{ entry.name_en }}<span class="entry-room" v-if="entry.room" v-bind:style="'color: ' + entry.building_color"><i class="material-icons">place</i>{{ entry.building }}, {{ entry.room }}</span></td>
                </tr>
                <tr class="entry-row-2">
                  <td colspan="4" class="entry-note"> {{ entry.note }} <span class="entry-teacher"><router-link v-bind:to="{ name: 'Teacher', params: { teacher: entry.teachers }}"> {{ entry.teachername }} </router-link></span>
                  </td>
                </tr>
                <tr class="entry-row-3">
                  <td colspan="4">
                    <span class="entry-teacher"><router-link v-bind:to="{ name: 'Teacher', params: { teacher: entry.teachers }}"> {{ entry.teachername }} </router-link></span>
                    <span class="entry-room" v-if="entry.room" v-bind:style="'color: ' + entry.building_color"><i class="material-icons">place</i>{{ entry.room }}</span>
                  </td>
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
        group: [],
        week: [],
        currentWeek: 0,
        locale: Cookies.get('locale')
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
      this.currentWeek = week;

      console.log("Getting schedule");
      $.ajax({
        method: 'GET',
        dataType: 'jsonp',
        url: 'http://api.roosters.saxion.nl/v2/groups/schedule.json?group=' + group + '&week=' + week
      }).then((response) => {
        if(response.error) {
          console.err("There was an error " + response.error);
        } else {
          var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

          this.schedule = [];
          for (var i = 0; i < response.days.length; i++) {
            var localeString = "";
            if (this.locale === "nl") {
              localeString = "nl-NL";
            } else {
              localeString = "en-US";
            }
            response.days[i].date.date = new Date(response.days[i].date.date).toLocaleDateString(localeString, options);

            for (var j = 0; j < response.days[i].entries.length; j++) {
              var building = "";
              var buildingColor = "";

              if (response.days[i].entries[j].room !== null) {
                var roomLetter = response.days[i].entries[j].room.charAt(0);

                if (roomLetter === 'F') {
                  building = "Forum";
                  buildingColor = "#673AB7";
                } else if (roomLetter === 'S') {
                  building = "Schierbeek";
                  buildingColor = "#3F51B5";
                } else if (roomLetter === 'W') {
                  building = "Wolvekamp";
                  buildingColor = "#2979FF";
                } else if (roomLetter === 'G') {
                  building = "Epy Drost";
                  buildingColor = "#2196F3";
                } else if (roomLetter === 'H') {
                  building = "Haanstra";
                  buildingColor = "#E91E63";
                } else if (roomLetter === 'E') {
                  building = "Elderink";
                  buildingColor = "#9C27B0";
                } else if (roomLetter === 'R') {
                  building = "Randstad";
                  buildingColor = "#4FC3F7";
                } else if (roomLetter === 'O') {
                  building = "Stork";
                  buildingColor = "#E53935";
                } else if (roomLetter === 'Q') {
                  building = "Hazemeyer";
                  buildingColor = "#FF5722";
                } else if (roomLetter === 'N') {
                  building = "Ainsworth";
                  buildingColor = "#FFB300";
                } else if (roomLetter === 'P') {
                  building = "Hofstede Crull";
                  buildingColor = "#FDD835";
                } else if (roomLetter === 'Z') {
                  building = "Alphons Ari&euml;s";
                  buildingColor = "#F8E71C";
                } else if (roomLetter === 'X') {
                  building = "Sociale Verzekeringsbank";
                  buildingColor = "#546E7A";
                } else if (roomLetter === 'A') {
                  building = "A-vleugel";
                  buildingColor = "#009688";
                } else if (roomLetter === 'B') {
                  building = "B-vleugel";
                  buildingColor = "#4CAF50";
                } else if (roomLetter === 'C') {
                  building = "C-vleugel";
                  buildingColor = "#8BC34A";
                } else if (roomLetter === 'D') {
                  building = "D-vleugel";
                  buildingColor = "#CDDC39";
                } else if (roomLetter === 'K') {
                  building = "Apeldoorn";
                  buildingColor = "#FF5722";
                }
              }

              response.days[i].entries[j].building = building;
              response.days[i].entries[j].building_color = buildingColor;
            }

            this.schedule.push(response.days[i]);
          }
          this.group.push(response.subject.group);
          this.week = [];
          this.week.push(response.week);

          this.updateCookies();
        }
      }).catch(function (err) {
        console.error(err);
      });
    },
    updateCookies() {
      if (Cookies.getJSON('recentlyViewed') === undefined) {
        // cookie not created
        Cookies.set('recentlyViewed', { groups: [], teachers: [] });
      }

      var cookieJSON = Cookies.getJSON('recentlyViewed');
      var found = false;

      for(var i = 0; i < cookieJSON.groups.length; i++) {
        if (cookieJSON.groups[i].name === this.group[0].name) {
          // move found group to first index
          var temp = cookieJSON.groups[i];
          cookieJSON.groups.splice(i, 1);
          cookieJSON.groups.unshift(temp);
          Cookies.set('recentlyViewed', cookieJSON);
          found = true;
        }
      }

      if (!found) {
        // group not found, add it to the cookie
        cookieJSON.groups.unshift(this.group[0]);
        if (cookieJSON.groups.length > 5) {
          cookieJSON.groups.pop();
        }
        Cookies.set('recentlyViewed', cookieJSON);
      }
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

tr.entry-row-3 {
  display: none;
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
  font-size: 1.25rem;
  text-align: center;
  color: #7b7b7b;
  padding-top: 10px;
}

.entry-time span {
  font-size: 1.4rem;
  color: #2c3e50;
}

.entry-name {
  font-size: 1.1rem;
  padding-top: 12px;
}

.entry-room {
  float: right;
  font-weight: 600;
  font-size: 0.9rem;
  padding-top: 3px;
}

.entry-room i {
  font-size: 1.2rem;
  vertical-align: top;
  margin-right: 3px;
}

.entry-note {
  font-style: italic;
}

.entry-teacher {
  font-style: normal;
  float: right;
}

.entry-teacher a {
  color: #7b7b7b;
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

  tr.entry-row-1 .entry-room {
    display: none;
  }

  tr.entry-row-1 .entry-time {
    padding-top: 20px;
  }

  tr.entry-row-2 .entry-teacher {
    display: none;
  }

  tr.entry-row-3 {
    display: table-row;
  }

  tr.entry-row-3 .entry-teacher {
    float: left;
  }

  tr.entry-row-3 .entry-room {
    padding-top: 0px;
  }
}
</style>