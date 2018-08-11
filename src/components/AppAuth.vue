<template>
  <v-flex text-xs-center row wrap>
    <div class="container">
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
    </div>
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
