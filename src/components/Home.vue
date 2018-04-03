<template>
  <div class="container home">
    <div class="card">
      <router-link v-bind:to="{ name: 'Groups' }">Ga naar klassenoverzicht</router-link>
      <br>
      <router-link v-bind:to="{ name: 'Teachers' }">Ga naar docentenoverzicht</router-link>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Home'
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

.entry-note {
  font-style: italic;
}

.entry-teacher {
  font-style: normal;
  float: right;
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
