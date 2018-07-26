<template>
  <v-app id="app">
      <v-toolbar color="saxionroosters" dark extended flat>
        <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->

        <!-- <v-toolbar-title class="ml-0 pl-3">
          <span class="hidden-sm-and-down">Saxion Roosters</span>
        </v-toolbar-title> -->
        <router-link tag="v-toolbar-title" v-bind:to="{ name: 'Home' }" class="white--text">Saxion Roosters</router-link>
        <!-- <v-toolbar-title slot="extension" class="white--text">Title</v-toolbar-title> -->

        <v-spacer class="hidden-sm-and-down"></v-spacer>

        <router-link tag="v-btn" v-bind:to="{ name: 'Login' }" class="btn--depressed black--text white" v-if="!loggedIn">
          {{ $t('titles.login') }}
        </router-link>

        <v-menu :nudge-width="100" v-if="loggedIn">
          <v-toolbar-title slot="activator">
            <span v-if="selectedItem">{{ selectedItem }}</span>
            <span v-if="!selectedItem">Schedules</span>
            <v-icon dark>arrow_drop_down</v-icon>
          </v-toolbar-title>

          <v-list>
            <router-link @click="selectedItem = item" tag="v-list-tile" v-bind:to="{ name: 'Group', params: { group: item }}" v-for="item in items" :key="item">
              <v-list-tile-title v-text="item"></v-list-tile-title>
            </router-link>
            <v-divider></v-divider>
            <router-link @click="selectedItem = ''" tag="v-list-tile" v-bind:to="{ name: 'Home' }">
              <v-list-tile-title style="font-size: 14px; font-weight: 500; color: #989898;">Manage schedules...</v-list-tile-title>
            </router-link>
          </v-list>
        </v-menu>

        <v-btn icon style="margin-left: 25px;">
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>settings</v-icon>
        </v-btn>
        <v-menu bottom left>
            <v-btn slot="activator" icon>
              <v-icon>more_vert</v-icon>
            </v-btn>

            <v-list>
              <router-link tag="v-list-tile" v-bind:to="{ name: 'Home' }">
                <v-list-tile-title>{{ $t('titles.about') }}</v-list-tile-title>
              </router-link>
              <router-link tag="v-list-tile" v-bind:to="{ name: 'Home' }">
                <v-list-tile-title>{{ $t('titles.apps') }}</v-list-tile-title>
              </router-link>
              <v-divider></v-divider>
              <router-link tag="v-list-tile" v-if="!loggedIn" v-bind:to="{ name: 'Login' }">
                <v-list-tile-title>{{ $t('titles.login') }}</v-list-tile-title>
              </router-link>
              <router-link tag="v-list-tile" v-if="loggedIn" v-on:click.native="logout" to="/">
                <v-list-tile-title>{{ $t('titles.logout') }}</v-list-tile-title>
              </router-link>
            </v-list>
          </v-menu>
      </v-toolbar>

      <v-layout row pb-2 style="margin-top: -55px;">
      <v-flex xs12 md10 lg8 offset-xs0 offset-md1 offset-lg2>
        <v-card class="card--flex-toolbar">
          <router-view/>
        </v-card>
      </v-flex>
    </v-layout>
    <v-footer height="auto" color="footer-color">
        <v-layout justify-center row wrap>
          <v-btn flat round v-on:click="changeLanguage">{{ $t('footer.change-language') }}</v-btn>
          <v-btn flat round :href="'https://github.com/saxionroosters/web'" v-html="$t('footer.project-github')"></v-btn>
          <v-btn flat round :href="'mailto:wessel@perik.me'" v-html="$t('footer.contact')"></v-btn>
          <v-flex footer-color py-3 text-xs-center xs12 v-html="$t('footer.copyright') + ' ' + $t('footer.license') + '<br><br>' + $t('footer.disclaimer')"></v-flex>
        </v-layout>
      </v-footer>
    <!-- <v-card flat>
      <v-toolbar color="white" light flat>
        <router-link tag="v-toolbar-title" class="btn btn--flat" v-bind:to="{ name: 'Home' }"><img class="toolbar-logo" src="./assets/navbar-logo.png"/></router-link>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <router-link tag="v-btn" class="btn btn--flat" v-bind:to="{ name: 'Home' }"> {{ $t('titles.home') }} </router-link>
          <router-link tag="v-btn" class="btn btn--flat" v-bind:to="{ name: 'Groups' }"> {{ $tc('titles.group', 2) }} </router-link>
          <router-link tag="v-btn" class="btn btn--flat" v-bind:to="{ name: 'Teachers' }"> {{ $tc('titles.teacher', 2) }} </router-link>
        </v-toolbar-items>
      </v-toolbar>
      <v-layout row pb-2>
        <v-flex xs10 offset-xs1>
          <router-view/>
        </v-flex>
      </v-layout>
    </v-card>
    <v-bottom-nav :value="true" absolute color="transparent" class="hidden-md-and-up">
      <v-btn flat color="green" value="campaigns" to="/campaigns">
        <span>Campagnes</span>
        <v-icon>flag</v-icon>
      </v-btn>
      <v-btn flat color="green" value="questions" to="/questions">
        <span>Vragen</span>
        <v-icon>check</v-icon>
      </v-btn>
      <v-btn flat color="green" value="places" to="/places">
        <span>Plaatsen</span>
        <v-icon>place</v-icon>
      </v-btn>
      <v-btn flat color="green" value="categories" to="/categories">
        <span>Categorieën</span>
        <v-icon>star</v-icon>
      </v-btn>
    </v-bottom-nav> -->
  </v-app>

  <!--
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
  </div> -->
</template>

<script>
export default {
  name: 'App',
  data: function() {
    return {
      token: Cookies.get('token'),
      loggedIn: false,
      items: ['EHI2VSe', 'EHI2VSa', 'EHI3VSta'],
      selectedItem: 'EHI2VSe'
    }
  },
  mounted: function () {
    if (this.token && this.token != "undefined" && this.token !== undefined) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  },
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
    },
    logout: function() {
      console.log("logout...");
      if (Cookies.get('token') != '' && Cookies.get('token') != "undefined" && Cookies.get('token') !== undefined) {
        console.log("logging out...");
        $.ajax({
            method: 'POST',
            dataType: 'json',
            url: 'http://api.saxionroosters.nl/v1/accounts/logout?access_token=' + Cookies.get('token'),
            error: function (request, status, error) {
              // somehow the token is invalid, remove the cookie
              Cookies.set('token', undefined);
              return;
            }.bind(this)
          }).then((response) => {
            Cookies.set('token', undefined);
            location.reload();
          });
      } else {
        console.log("token: " + Cookies.get('token'));
      }
    }
  }
}
</script>

<style>
  p, li, label, footer, .list__tile__title {
    font-family: 'Nunito Sans', 'Avenir Next', 'Avenir', Arial, Helvetica, sans-serif !important;
  }

  footer a, footer button {
    font-weight: 600 !important;
  }

  h1, h2 {
    font-family: 'Nunito', 'Avenir Next', 'Avenir', Arial, Helvetica, sans-serif !important;
    font-weight: 600;
  }

  h1.title {
    font-weight: 900;
    font-size: 2.6em !important;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 1.8em !important;
    margin-bottom: 20px;
  }

  nav.toolbar .toolbar-logo {
    height: 50px;
    margin-left: 5px;
  }

  nav.toolbar .toolbar-logo:hover {
    cursor: pointer;
  }

  nav.toolbar .toolbar__content {
    height: 64px !important;
  }

  .saxionroosters {
    background-color: #8BC34A !important;
    border-color: #8BC34A !important;
  }

  .footer-color {
    background-color: rgb(245, 245, 245) !important;
    border-color: rgb(245, 245, 245) !important;
  }

  .toolbar__content {
    height: 64px !important;
  }

  .toolbar__title {
    font-family: 'Nunito Sans', 'Avenir Next', 'Avenir', Arial, Helvetica, sans-serif;
    font-weight: 600;
    font-size: 1.6em;
  }

  .toolbar__title:hover {
    cursor: pointer;
  }
/*
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
  background-color: #ffffff;
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

.card {
    border: 0;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.02), 0 3px 1px -2px rgba(0, 0, 0, 0.05), 0 1px 5px 1px rgba(0, 0, 0, 0.1);
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
*/
.footer {
  color: #5c5c5c !important;
}
.footer a {
  font-weight: 500;
  text-decoration: none;
  background-color: transparent;
  color: #464a4c;
}

.footer a:hover:not(.btn) {
  text-decoration: underline;
}
/*
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
} */
</style>
