<template>
  <div class="container home">
    <div class="card">
      <input class="search form-control" type="text" v-model="search" v-on:input="executeSearch(search)" placeholder="Zoek op klas, docent, opleiding of studentnummer..."/>

      <table class="table">
          <tbody>
            <tr v-for="course in filteredCourses">
              <td> {{ course.name }} </td>
            </tr>
          </tbody>
        </table>
        <hr>
        <table class="table">
          <tbody>
            <tr v-for="student in filteredStudents">
              <td> {{ student.student }} </td>
            </tr>
          </tbody>
        </table>
        <hr>
        <table class="table">
          <tbody>
            <tr v-for="teacher in filteredTeachers">
              <td> {{ teacher.fullname }} </td>
            </tr>
          </tbody>
        </table>
        <hr>
        <table class="table">
          <tbody>
            <tr v-for="academy in filteredAcademies">
              <td> {{ academy.name }} </td>
            </tr>
          </tbody>
        </table>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Home',
  data: function() {
    return {
        search: '',
        courses: [],
        students: [],
        teachers: [],
        academies: []
    }
  },

  mounted: function () {
      this.executeSearch(this.search.toLowerCase());
  },

  computed: {
    filteredCourses() {
      return this.courses.filter(course => {
        return course.name.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    filteredStudents() {
      return this.students.filter(student => {
        return student.student.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    filteredTeachers() {
      return this.teachers.filter(teacher => {
        return teacher.fullname.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    filteredAcademies() {
      return this.academies.filter(academy => {
        return academy.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },

  methods: {
    executeSearch: function(query) {
      console.log("Searching");
      if (query.length > 2) {
        $.ajax({
          method: 'GET',
          dataType: 'jsonp',
          url: 'http://api.roosters.saxion.nl/v2/search.json?q=' + query
        }).then((response) => {
          if(response.error) {
            console.err("There was an error " + response.error);
          } else {
            this.courses = [];
            for (var i = 0; i < response.result.courses.length; i++) {
              this.courses.push(response.result.courses[i]);
            }

            this.students = [];
            for (var i = 0; i < response.result.students.length; i++) {
              this.students.push(response.result.students[i]);
            }

            this.teachers = [];
            for (var i = 0; i < response.result.teachers.length; i++) {
              this.teachers.push(response.result.teachers[i]);
            }

            this.academies = [];
            for (var i = 0; i < response.result.academies.length; i++) {
              this.academies.push(response.result.academies[i]);
            }
          }
        }).catch(function (err) {
          console.error(err);
        });
      } else {
        this.courses = [];
        this.students = [];
        this.teachers = [];
        this.academies = [];
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

td {
  border: none;
  padding-top: 10px;
  padding-bottom: 0px;
  min-width: 100%;
}

table {
  border-top: 2px solid #f3f3f3;
  margin-bottom: 10px;
}

.card {
  padding: 20px;
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
