<template>
  <div class="container">
    <h1 class="title"> Docenten 
      <span class="subtitle" v-if="academies.length">Kies een academie</span>
      <span class="subtitle" v-if="teachers.length"> {{ selectedAcademy }} </span>
    </h1>

    <div class="card academies-card">
      <div class="card-body">

        <table class="table table-hover">
          <tbody>
            <tr v-if="academies.length" v-for="academy in academies">
              <td v-on:click="selectedAcademy = academy.name"><router-link v-bind:to="{ name: 'TeachersAcademy', params: { academy: academy.code }}"><b> {{ academy.code }} </b> - {{ academy.name }} </router-link></td>
            </tr>
            <tr v-if="teachers.length" v-for="teacher in teachers">
              <td><router-link v-bind:to="{ name: 'Teacher', params: { teacher: teacher.code }}"><b> {{ teacher.code }} </b> - {{ teacher.fullname }} </router-link></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Teachers',
  data: function() {
    return {
        academies: [],
        teachers: [],
        selectedAcademy: ""
    }
  },

  mounted: function () {
    if (this.$route.params.academy === undefined) {
      this.getAcademies();
    } else {
      this.getTeachers(this.$route.params.academy);
    }
  },

  watch: {
    '$route' (to, from) {
      if (this.$route.params.academy === undefined) {
        this.getAcademies();
      } else {
        this.getTeachers(this.$route.params.academy);
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
          this.teachers = [];
          for (var i = 0; i < response.academies.length; i++) {
            this.academies.push(response.academies[i]);
          }
        }
      }).catch(function (err) {
        console.error(err);
      });
    },
    getTeachers: function(academy) {
      console.log("Getting teachers");
      $.ajax({
        method: 'GET',
        dataType: 'jsonp',
        url: 'http://api.roosters.saxion.nl/v2/teachers/list.json?academy=' + academy
      }).then((response) => {
        if(response.error) {
          console.err("There was an error " + response.error);
        } else {
          this.academies = [];
          this.teachers = [];
          for (var i = 0; i < response.teachers.length; i++) {
            this.teachers.push(response.teachers[i]);
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