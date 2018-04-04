<template>
  <div id="app">
    <header>
      <nav class="navbar navbar-dark navbar-expand-md fixed-top" style="background-color: #4CAF50;">
        <div class="container">
        <router-link class="navbar-brand" v-bind:to="{ name: 'Home' }">Roosters</router-link>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" v-bind:to="{ name: 'Home' }">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" v-bind:to="{ name: 'Groups' }">Klassen</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" v-bind:to="{ name: 'Teachers' }">Docenten</router-link>
            </li>
          </ul>
        </div>
        </div>
      </nav>
    </header>

    <div class="main-wrapper">
      <main role="main">
        <router-view/>
      </main>
    </div>

    <footer class="footer text-muted">
      <div class="container">
        <ul class="footer-links">
          <li><a href="https://github.com/wesselperik/saxionroosters">Project op GitHub</a></li>
          <li><a href="mailto:info@wesselperik.com">Contacteer ontwikkelaar</a></li>
        </ul>
        <p>&copy; 2018 <a href="https://github.com/wesselperik" target="_blank">Wessel Perik</a>. Code vrijgegeven onder de <a rel="license" href="https://github.com/wesselperik/saxionroosters/blob/master/LICENSE" target="_blank">MIT</a> licentie.</p>
        <p>De informatie op deze site komt direct vanuit de offici&euml;le <a href="http://api.roosters.saxion.nl/" target="_blank">Saxion Roosters API</a>.<br> Er kunnen geen rechten ontleend worden aan deze informatie.</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html, body {
  height: 100%;
}

main {
  overflow: auto;
  padding-bottom: 175px;
  margin-bottom: 20px;
}

#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.main-wrapper {
  min-height: 100%;
  margin-top: 60px;
}

.footer {
  position: relative;
  margin-top: -175px;
  height: 175px;
  clear: both;
  padding: 2rem 0;
  font-size: 85%;
  text-align: center;
  background-color: #f7f7f7;
}

.footer a {
  font-weight: 500;
  color: #464a4c;
}

.footer .footer-links {
  padding-left: 0;
  margin-bottom: 1rem;
}

.footer .footer-links a {
  padding: 7px;
}

.footer .footer-links li {
  display: inline-block;
}
</style>
