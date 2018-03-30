<template>
  <div id="app">
    <nav class="navbar navbar-dark navbar-expand-md" style="background-color: #4CAF50;">
      <div class="container">
      <router-link class="navbar-brand" to="/">Roosters</router-link>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/">Klassen</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/">Docenten</router-link>
          </li>
        </ul>
      </div>
      </div>
    </nav>

    <div class="wrapper">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
