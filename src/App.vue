<template>
  <div id="app">
    <header>
      <nav class="navbar navbar-light navbar-expand-md fixed-top" style="background-color: #4CAF50;">
        <div class="paper-container ml-auto">
          <a class="drawer-toggle" href="#" id="drawer-toggle"><i class="material-icons">menu</i></a>
          <router-link class="navbar-brand" v-bind:to="{ name: 'Home' }"><span>saxion</span>roosters</router-link>

          <div class="navbar-menu">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <router-link class="nav-link" v-bind:to="{ name: 'Groups' }"> {{ $tc('titles.group', 2) }} </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" v-bind:to="{ name: 'Teachers' }"> {{ $tc('titles.teacher', 2) }} </router-link>
              </li>
            </ul>
          </div>

          <img class="navbar-paper" src="./assets/navbar-logo.png" />
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
          <li><a v-on:click="changeLanguage" href=""> {{ $t('footer.change-language') }} </a></li>
          <li v-html="$t('footer.project-github')"></li>
          <li v-html="$t('footer.contact')"></li>
        </ul>
        <p v-html="$t('footer.copyright') + ' ' + $t('footer.license')"></p>
        <p v-html="$t('footer.disclaimer')"></p>
      </div>
    </footer>

    <div class="drawer" id="drawer">
        <div class="content">
            <div class="header">
                <img class="image" src="./assets/drawer-logo.png" />
            </div>
            <ul class="menu">
                <router-link class="item" tag="li" v-bind:to="{ name: 'Home' }"><i class="material-icons">home</i><span>{{ $t('titles.home') }}</span></router-link>
                <router-link class="item" tag="li" v-bind:to="{ name: 'Groups' }"><i class="material-icons">people</i><span>{{ $tc('titles.group', 2) }}</span></router-link>
                <router-link class="item" tag="li" v-bind:to="{ name: 'Teachers' }"><i class="material-icons">school</i><span>{{ $tc('titles.teacher', 2) }}</span></router-link>
                <li class="item subheader linebreak"></li>
                <router-link class="item" tag="li" v-on:click.native="changeLanguage" to="#">{{ $t('drawer_footer.change-language') }}</router-link>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    changeLanguage: function() {
      if (Cookies.get('locale') !== undefined) {
        if (Cookies.get('locale') === "nl") {
          Cookies.set('locale', 'en');
        } else {
          Cookies.set('locale', 'nl');
        }
      } else {
        Cookies.set('locale', 'nl');
      }
      location.reload();
    }
  }
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

.navbar {
  padding: 0px;
  background: 
  linear-gradient( to bottom, 
  #4caf50 0%, #4caf50 33.3%, 
  #8bc34a 33.3%, #8bc34a 66.6%, 
  #cddc39 66.6%, #cddc39) bottom no-repeat;
  background-size: 100%;
}

.navbar .navbar-nav {
  margin-top: 8px;
  margin-bottom: 8px;
}

.navbar .navbar-menu {
  background: #FFFFFF;
  padding: 0px 0px 0px 50px;
}

.navbar .navbar-menu .nav-link {
  font-family: 'Product Sans', 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 18px;
  text-transform: lowercase;
}

.navbar-paper {
  width: 60px;
}

.navbar-brand {
  font-family: 'Product Sans', 'Avenir', Helvetica, Arial, sans-serif;
  background: #FFFFFF;
  line-height: 45px;
  height: 60px;
  font-size: 30px;
  padding-bottom: 10px;
  padding-left: 20px;
  margin-right: 0px; 
  color: #a2a2a2 !important;
}

.navbar-brand span {
  color: #6e6e6e !important;
  font-weight: 600;
}

.navbar .drawer-toggle {
  display: none;
  color: #6e6e6e;
  background: #FFFFFF;
  width: 60px !important;
  height: 60px !important;
}

.navbar .drawer-toggle i {
  padding: 17px;
}

.paper-container {
  display: contents;
  background: #FFFFFF;
}

@media only screen and (max-width: 767px) {
  .navbar {
    justify-content: unset;
  }
  .navbar-menu {
    display: none;
  }
  .navbar .drawer-toggle {
    display: block;
  }
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

.drawer .content {
  height: 100%;
  position: relative;
  overflow-y: auto;
}
.drawer .content .header {
  height: 144px;
  background: rgba(0, 0, 0, 0.12);
  position: relative;
  padding-bottom: 1px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
.drawer .content .header .image {
  height: 144px;
  padding-bottom: 1px;
  display: block;
  margin: auto;
}
.drawer .content ul.menu {
  padding: 8px 0;
  list-style: none;
  margin: 0;
}
.drawer .content ul.menu li.item {
  display: block;
  font-size: 14px;
  font-weight: bold;
  height: 48px;
  line-height: 48px;
  padding-left: 16px;
  color: rgba(0, 0, 0, 0.6);
  position: relative;
}
.drawer .content ul.menu li.item:hover {
  cursor: pointer;
}
.drawer .content ul.menu li.item i {
  font-size: 24px;
  height: 48px;
  line-height: 48px;
  color: rgba(0, 0, 0, 0.6);
  position: relative;
}
.drawer .content ul.menu li.item span {
  position: absolute;
  margin-left: 20px;
  margin-top: 2px;
  color: rgba(0, 0, 0, 0.87);
}
.drawer .content ul.menu li.item.subheader {
  color: rgba(0, 0, 0, 0.54);
  padding-left: 16px;
  margin-top: 8px;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}
.drawer .content ul.menu li.item.subheader:after {
  content: none;
}

.drawer .content ul.menu li.item.subheader.linebreak {
  color: rgba(0, 0, 0, 0.54);
  height: 1px;
  margin-top: 8px;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}
.drawer .content ul.menu li.item:active {
  background: rgba(0, 0, 0, 0.12);
}
</style>
