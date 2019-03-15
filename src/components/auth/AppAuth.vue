<template>
  <v-flex text-xs-center row wrap>
      <template v-if="this.$route.query.access_token !== undefined">
        <h1 class="title">{{$t('app_auth.title-success')}}</h1>
        <p>{{$t('app_auth.message-success')}}</p>
      </template>
      <template v-else>
        <h1 class="title">{{$t('app_auth.title-failure')}}</h1>
        <p>{{$t('app_auth.message-failure')}}</p>

      </template>

      <v-btn large :loading="loading" :disabled="loading" color="saxionroosters" class="white--text"
             @click.native="openApp()">{{ $t('app_auth.button-back-to-app') }}
      </v-btn>
  </v-flex>
</template>

<script>
  export default {
    name: 'AppAuth',

    methods: {
      openApp: function () {
        let token = this.$route.query.access_token
        let url = "saxionroosters://"
        if (token !== undefined) {
          url += "?access_token=" + token
        }
        window.location.replace(url)
      }
    },
    mounted() {
      if (this.$route.query.access_token !== undefined) {
        this.openApp()
      }
    }
  }


  // openApp()
</script>

<style scoped>
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

.flex {
  padding: 30px;
}

.spacer {
    margin-top: 30px;
    margin-bottom: 30px;
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
