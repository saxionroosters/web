<template>
  <v-toolbar color="theme-primary" dark app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
    <v-toolbar-title class>
      <v-toolbar-side-icon @click.stop="$emit('update:drawer', !drawer)"></v-toolbar-side-icon>
      <span class="logo hidden-sm-and-down">
        <span>saxion</span>roosters
      </span>
    </v-toolbar-title>
    <v-spacer class="hidden-sm-and-down"></v-spacer>

    <v-autocomplete
      flat
      solo-inverted
      hide-no-data
      hide-selected
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      prepend-inner-icon="search"
      color="white"
      label="Search"
      zclass="toolbar-search"
      v-model="model"
      return-object
    ></v-autocomplete>

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

        <v-divider/>

        <router-link tag="v-list-tile" v-bind:to="{ name: 'Logout' }">
          <v-list-tile-title>{{ $t('titles.logout') }}</v-list-tile-title>
        </router-link>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>
<script>
import ScheduleManager from "../../managers/ScheduleManager";

export default {
  props: ["drawer"],
  // methods: {
  //   search: function(sender) {
  //     this.$router.replace({ name: "Search", params: { q: sender } });
  //   }
  // },
  data() {
    return {
      model: null,
      search: null,
      entries: [],
      isLoading: false
    };
  },
  mounted() {
    let searchParam = this.$route.query.q;
    if (searchParam != null) {
      this.searchQuery = searchParam;
    }8
  },
  computed: {
    items () {
      // TODO fix
      //return this.entries.groups.map(item => item.name);
    }
  },
  watch: {
      search (val) {
          if (this.isLoading || this.search.length <= 2) return;

          this.isLoading = true;

          new ScheduleManager().search(val, result => {
            this.entries = result.result;
            console.log(this.entries);
          });
      }
  }
};
</script>

<style lang="scss">
/** loaded from scss folder **/
</style>