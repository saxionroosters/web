<template>
  <div class="container">
    <h1 class="title"> Klassen 
      <span class="subtitle" v-if="academies.length">Kies een academie</span>
      <span class="subtitle" v-if="courses.length"> {{ selectedAcademy }} </span>
      <span class="subtitle" v-if="groups.length"> {{ selectedCourse }} </span>
    </h1>

    <div class="card academies-card">
      <div class="card-body">

        <table class="table table-hover">
          <tbody>
            <tr v-if="academies.length" v-for="academy in academies">
              <td v-on:click="selectedAcademy = academy.name"><router-link v-bind:to="{ name: 'GroupsAcademy', params: { academy: academy.code }}"><b> {{ academy.code }} </b> - {{ academy.name }} </router-link></td>
            </tr>
            <tr v-if="courses.length" v-for="course in courses">
              <td v-on:click="selectedCourse = course.name"><router-link v-bind:to="{ name: 'GroupsAcademyCourse', params: { academy: course.academy, course: course.id }}"> {{ course.name }} </router-link></td>
            </tr>
            <tr v-if="groups.length" v-for="group in groups">
              <td><router-link v-bind:to="{ name: 'Group', params: { group: group.name }}"> {{ group.name }} </router-link></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Groups',
  data: function() {
    return {
        academies: [],
        courses: [],
        groups: [],
        selectedAcademy: "",
        selectedCourse: ""
    }
  },

  mounted: function () {
    if (this.$route.params.academy === undefined && this.$route.params.course === undefined) {
      this.getAcademies();
    } else if (this.$route.params.course === undefined) {
      this.getCourses(this.$route.params.academy);
    } else {
      this.getGroups(this.$route.params.course);
    }
  },

  watch: {
    '$route' (to, from) {
      if (this.$route.params.academy === undefined && this.$route.params.course === undefined) {
        this.getAcademies();
      } else if (this.$route.params.course === undefined) {
        this.getCourses(this.$route.params.academy);
      } else {
        this.getGroups(this.$route.params.course);
      }
    }
  },

  methods: {
    getAcademies: function() {
      console.log("Getting academies");
      $.ajax({
        method: 'GET',
        dataType: 'jsonp',
        url: 'http://api.roosters.saxion.nl/v2/academies/list.json'
      }).then((response) => {
        if(response.error) {
          console.err("There was an error " + response.error);
        } else {
          this.academies = [];
          this.courses = [];
          this.groups = [];
          for (var i = 0; i < response.academies.length; i++) {
            this.academies.push(response.academies[i]);
          }
        }
      }).catch(function (err) {
        console.error(err);
      });
    },
    getCourses: function(academy) {
      console.log("Getting courses");
      $.ajax({
        method: 'GET',
        dataType: 'jsonp',
        url: 'http://api.roosters.saxion.nl/v2/courses/list.json?academy=' + academy
      }).then((response) => {
        if(response.error) {
          console.err("There was an error " + response.error);
        } else {
          this.academies = [];
          this.courses = [];
          this.groups = [];
          for (var i = 0; i < response.courses.length; i++) {
            this.courses.push(response.courses[i]);
          }
        }
      }).catch(function (err) {
        console.error(err);
      });
    },
    getGroups: function(course) {
      console.log("Getting groups");
      $.ajax({
        method: 'GET',
        dataType: 'jsonp',
        url: 'http://api.roosters.saxion.nl/v2/groups/list.json?course=' + course
      }).then((response) => {
        if(response.error) {
          console.err("There was an error " + response.error);
        } else {
          this.academies = [];
          this.courses = [];
          this.groups = [];
          for (var i = 0; i < response.groups.length; i++) {
            this.groups.push(response.groups[i]);
          }
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

@media only screen and (max-width: 767px) {
  h1.title span.subtitle {
    display: none;
  }
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

td {
  font-size: 18px;
  padding: 0px;
}

td a {
  color: inherit;
  display: block;
  padding: .75rem;
}

td a:hover {
  text-decoration: none;
}
</style>