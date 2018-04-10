<template>
  <div class="container home">
    <h1 class="title"> {{ $t('titles.home') }} </h1>
    <div class="card">
      <input class="search form-control" type="text" v-model="search" v-on:input="executeSearch(search)" v-bind:placeholder="$t('home.search-hint')"/>

      <h4 v-if="search.length < 2" class="table-title recently-viewed"> {{ $t('home.recent-groups') }} </h4>
      <p v-if="search.length < 2 && !recentGroups.length" class="no-recently-viewed"> {{ $t('home.no-recent-groups') }} </p>
      <table v-if="search.length < 2 && recentGroups.length" class="table table-hover">
        <tbody>
          <tr class="empty-row">&nbsp;</tr>
          <tr v-for="recentGroup in recentGroups">
            <td><router-link v-bind:to="{ name: 'Group', params: { group: recentGroup.name }}"> {{ recentGroup.name }} - <i> {{ recentGroup.course_name }} </i></router-link></td>
          </tr>
        </tbody>
      </table>

      <h4 v-if="search.length < 2" class="table-title recently-viewed"> {{ $t('home.recent-teachers') }} </h4>
      <p v-if="search.length < 2 && !recentTeachers.length" class="no-recently-viewed"> {{ $t('home.no-recent-teachers') }} </p>
      <table v-if="search.length < 2 && recentTeachers.length" class="table table-hover">
        <tbody>
          <tr class="empty-row">&nbsp;</tr>
          <tr v-for="recentTeacher in recentTeachers">
            <td><router-link v-bind:to="{ name: 'Teacher', params: { teacher: recentTeacher.code }}"> {{ recentTeacher.code }} - <i> {{ recentTeacher.fullname }} </i></router-link></td>
          </tr>
        </tbody>
      </table>

      <h4 v-if="filteredGroups.length" class="table-title"> {{ $tc('titles.group', 2) }} </h4>
      <table v-if="filteredGroups.length" class="table table-hover">
        <tbody>
          <tr class="empty-row">&nbsp;</tr>
          <tr v-for="group in filteredGroups">
            <td><router-link v-bind:to="{ name: 'Group', params: { group: group.name }}"> {{ group.name }} - <i> {{ group.course_name }} </i> </router-link></td>
          </tr>
        </tbody>
      </table>

      <h4 v-if="filteredCourses.length" class="table-title"> {{ $tc('titles.course', 2) }} </h4>
      <table v-if="filteredCourses.length" class="table table-hover">
        <tbody>
          <tr class="empty-row">&nbsp;</tr>
          <tr v-for="course in filteredCourses">
            <td><router-link v-bind:to="{ name: 'GroupsAcademyCourse', params: { academy: course.academy, course: course.id }}"> {{ course.name }} </router-link></td>
          </tr>
          </tbody>
      </table>

      <h4 v-if="filteredStudents.length" class="table-title"> {{ $tc('titles.student', 2) }} </h4>
      <table v-if="filteredStudents.length" class="table table-hover">
        <tbody>
          <tr class="empty-row">&nbsp;</tr>
          <tr v-for="student in filteredStudents">
            <td><router-link v-bind:to="{ name: 'Group', params: { group: student.group }}"> {{ student.student }} - <i> {{ student.group }} </i></router-link></td>
          </tr>
        </tbody>
      </table>

      <h4 v-if="filteredTeachers.length" class="table-title"> {{ $tc('titles.teacher', 2) }} </h4>
      <table v-if="filteredTeachers.length" class="table table-hover">
        <tbody>
          <tr class="empty-row">&nbsp;</tr>
          <tr v-for="teacher in filteredTeachers">
            <td><router-link v-bind:to="{ name: 'Teacher', params: { teacher: teacher.code }}"> {{ teacher.code }} - <i> {{ teacher.fullname }} </i></router-link></td>
          </tr>
        </tbody>
      </table>

      <h4 v-if="filteredAcademies.length" class="table-title"> {{ $tc('titles.academy', 2) }} </h4>
      <table v-if="filteredAcademies.length" class="table table-hover">
        <tbody>
          <tr class="empty-row">&nbsp;</tr>
          <tr v-for="academy in filteredAcademies">
            <td><router-link v-bind:to="{ name: 'GroupsAcademy', params: { academy: academy.code }}"> {{ academy.code }} - <i> {{ academy.name }} </i></router-link></td>
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
        academies: [],
        recentGroups: [],
        recentTeachers: []
    }
  },

  mounted: function () {
    this.readCookies();
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
    readCookies: function() {
      if (Cookies.getJSON('recentlyViewed') !== undefined) {
        var cookieJSON = Cookies.getJSON('recentlyViewed');

        this.recentGroups = [];
        for (var i = 0; i < cookieJSON.groups.length; i++) {
          this.recentGroups.push(cookieJSON.groups[i]);
        }

        this.recentTeachers = [];
        for (var i = 0; i < cookieJSON.teachers.length; i++) {
          this.recentTeachers.push(cookieJSON.teachers[i]);
        }
      }
    },
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

h4.recently-viewed {
  margin-top: 10px;
}

p.no-recently-viewed {
  padding: .75rem;
  font-size: 18px;
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