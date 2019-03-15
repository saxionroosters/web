<template>
  <v-app id="app">
    <Navigation></Navigation>

    <v-content>
      <v-layout row pb-2>
        <v-flex xs12 md10 lg8 offset-xs0 offset-md1 offset-lg2>
          <v-card class="card--flex-toolbar">
            <router-view/>
          </v-card>
        </v-flex>
      </v-layout>
      <v-footer height="auto" color="footer-color">
        <v-layout justify-center row wrap>
          <v-btn flat round v-on:click="changeLanguage">{{ $t('footer.change-language') }}</v-btn>
          <v-btn
            flat
            round
            :href="'https://github.com/saxionroosters/web'"
            v-html="$t('footer.project-github')"
          ></v-btn>
          <v-btn flat round :href="'mailto:wessel@perik.me'" v-html="$t('footer.contact')"></v-btn>
          <v-flex
            footer-color
            py-3
            text-xs-center
            xs12
            v-html="$t('footer.copyright') + ' ' + $t('footer.license') + '<br><br>' + $t('footer.disclaimer')"
          ></v-flex>
        </v-layout>
      </v-footer>
    </v-content>
  </v-app>
</template>

<script>
import Navigation from "./components/interface/Navigation.vue";

export default {
  name: "App",
  components: {
    Navigation
  },
  data: function() {
    return {};
  },
  mounted: function() {},
  methods: {
    checkIfDev: function() {
      if (window.location.hostname.indexOf("dev") > -1 || window.location.hostname.indexOf("beta") > -1) {
        console.log("INFO: This is a beta or dev build of saxionroosters.nl");
        return true;
      } else {
        return false;
      }
    },
    changeLanguage: function() {
      if (Cookies.get("locale") !== undefined) {
        if (Cookies.get("locale") === "nl") {
          Cookies.set("locale", "en");
        } else {
          Cookies.set("locale", "nl");
        }
      } else {
        Cookies.set("locale", "nl");
      }
      location.reload();
    },
    logout: function() {
      this.$router.push("/logout");
    }
  }
};
</script>

<style lang="scss">
/** loaded from sass file **/
</style>
