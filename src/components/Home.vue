<template>
  <div class="container home">
    <h1 class="title">Home</h1>
    <div class="card">
      <input class="search form-control" type="text" v-model="search" v-on:input="executeSearch(search)" placeholder="Zoek op klas, docent, opleiding, academie of studentnummer..."/>

      <h4 v-if="filteredGroups.length" class="table-title">Klassen</h4>
      <table v-if="filteredGroups.length" class="table table-hover">
        <tbody>
          <tr class="empty-row">&nbsp;</tr>
          <tr v-for="group in filteredGroups">
            <td><router-link v-bind:to="{ name: 'Group', params: { group: group.name }}"> {{ group.name }} </router-link></td>
          </tr>
        </tbody>
      </table>

      <h4 v-if="filteredCourses.length" class="table-title">Opleidingen</h4>
      <table v-if="filteredCourses.length" class="table table-hover">
        <tbody>
          <tr class="empty-row">&nbsp;</tr>
          <tr v-for="course in filteredCourses">
            <td><router-link v-bind:to="{ name: 'GroupsAcademyCourse', params: { academy: course.academy, course: course.id }}"> {{ course.name }} </router-link></td>
          </tr>
          </tbody>
      </table>
      <h4 v-if="filteredStudents.length" class="table-title">Studenten</h4>
      <table v-if="filteredStudents.length" class="table table-hover">
        <tbody>
          <tr class="empty-row">&nbsp;</tr>
          <tr v-for="student in filteredStudents">
            <td><router-link v-bind:to="{ name: 'Group', params: { group: student.group }}"><b> {{ student.student }} </b> - {{ student.group }} </router-link></td>
          </tr>
        </tbody>
      </table>
      <h4 v-if="filteredTeachers.length" class="table-title">Docenten</h4>
      <table v-if="filteredTeachers.length" class="table table-hover">
        <tbody>
          <tr class="empty-row">&nbsp;</tr>
          <tr v-for="teacher in filteredTeachers">
            <td><router-link v-bind:to="{ name: 'Teacher', params: { teacher: teacher.code }}"><b> {{ teacher.code }} </b> - {{ teacher.fullname }} </router-link></td>
          </tr>
        </tbody>
      </table>
      <h4 v-if="filteredAcademies.length" class="table-title">Academies</h4>
      <table v-if="filteredAcademies.length" class="table table-hover">
        <tbody>
          <tr class="empty-row">&nbsp;</tr>
          <tr v-for="academy in filteredAcademies">
            <td><router-link v-bind:to="{ name: 'GroupsAcademy', params: { academy: academy.code }}"><b> {{ academy.code }} </b> - {{ academy.name }} </router-link></td>
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
        groups: [],
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
    filteredGroups() {
      return this.groups.filter(group => {
        return group.name.toLowerCase().includes(this.search.toLowerCase())
      })
    },
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
        return teacher.fullname.toLowerCase().includes(this.search.toLowerCase()) || teacher.name.toLowerCase().includes(this.search.toLowerCase()) || teacher.code.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    filteredAcademies() {
      return this.academies.filter(academy => {
        return academy.name.toLowerCase().includes(this.search.toLowerCase()) || academy.code.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },

  methods: {
    executeSearch: function(query) {
      if (query.length > 1) {
        $.ajax({
          method: 'GET',
          dataType: 'jsonp',
          url: 'http://api.roosters.saxion.nl/v2/search.json?q=' + query
        }).then((response) => {
          if(response.error) {
            console.err("There was an error " + response.error);
          } else {
            this.groups = [];
            for (var i = 0; i < response.result.groups.length; i++) {
              this.groups.push(response.result.groups[i]);
            }

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
        this.groups = [];
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

h4.table-title {
  font-weight: 600;
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

div.card {
  padding: 20px;
}

tr.empty-row {
  height: 0px !important;
  font-size: 0px !important;
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

input.search {
  margin-bottom: 30px;
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