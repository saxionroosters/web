<template>
    <v-flex text-xs-center row wrap>
        <h1 class="title">{{ $t('titles.register') }}</h1>
        <p v-html="$t('register.register-info')"></p>
        <v-text-field box color="black" :label="$t('login.email-hint')" append-icon="mail"></v-text-field>
        <router-link tag="v-btn" class="btn btn--large btn--flat" v-bind:to="{ name: 'Login' }">{{ $t('register.button-back-to-login') }}</router-link>
        <v-btn large :loading="loading" :disabled="loading" color="saxionroosters" class="white--text" @click.native="loader = 'loading'">{{ $t('register.button-submit') }}</v-btn> 
    </v-flex>
</template>

<script>
export default {
  name: 'Register',
  data: function() {
    return {
        loader: null,
        loading: false
    }
  },

  mounted: function () {

  },

  watch: {
    loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
    },
    '$route' (to, from) {

    }
  },

  methods: {
    
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

h1.title {
  font-family: 'Nunito', 'Avenir Next', 'Avenir', Arial, Helvetica, sans-serif;
  font-weight: 900;
  font-size: 2.6em !important;
  margin-bottom: 20px;
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

.flex {
  padding: 30px;
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