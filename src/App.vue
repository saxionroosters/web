<template>
  <v-app id="app">
      <v-toolbar color="theme-primary" dark extended flat v-bind:class="{'dev': checkIfDev()}">
        <router-link tag="v-toolbar-title" v-bind:to="{ name: 'Home' }" class="white--text logo"><span>saxion</span>roosters</router-link>

        <v-spacer></v-spacer>

        <v-btn icon style="margin-left: 25px;">
          <v-icon>search</v-icon>
        </v-btn>
        <v-menu bottom left>
            <v-btn slot="activator" icon>
              <v-icon>more_vert</v-icon>
            </v-btn>

            <v-list style="min-width: 150px;">
              <router-link tag="v-list-tile" v-bind:to="{ name: 'Home' }">
                <v-list-tile-title>{{ $t('titles.about') }}</v-list-tile-title>
              </router-link>

              <router-link tag="v-list-tile" v-bind:to="{ name: 'Home' }">
                <v-list-tile-title>{{ $t('titles.apps') }}</v-list-tile-title>
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
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: function() {
    return {
    }
  },
  mounted: function () {
    
  },
  methods: {
    checkIfDev: function(){
      if (window.location.hostname.indexOf("dev") > -1 || window.location.hostname.indexOf("beta") > -1) {
        console.log("INFO: This is a beta or dev build of saxionroosters.nl")
        return true;
      } else {
        return false;
      }
    },
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

<style lang="scss">
  /** loaded from sass file **/
</style>
