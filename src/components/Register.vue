<template>
    <v-flex text-xs-center row wrap>
        <h1 class="title">{{ $t('titles.register') }}</h1>
        <p v-html="$t('register.register-info')"></p>
        <v-text-field box v-model="email" name="email" id="email" color="black" :label="$t('login.email-hint')" append-icon="mail"></v-text-field>
        <router-link tag="v-btn" class="btn btn--large btn--flat" v-bind:to="{ name: 'Login' }">{{ $t('register.button-back-to-login') }}</router-link>
        <v-btn large :loading="loading" :disabled="loading" color="saxionroosters" class="white--text" @click.native="register()">{{ $t('register.button-submit') }}</v-btn> 
    </v-flex>
</template>

<script>
export default {
  name: 'Register',
  data: function() {
    return {
        loader: null,
        loading: false,
        email: ''
    }
  },

  mounted: function () {
    if (Cookies.get('token') && Cookies.get('token') != "undefined" && Cookies.get('token') !== undefined) {
      this.$router.push({ name: 'Home'});
    }
  },

  methods: {
    register: function() {
        this.loader = 'loading';
        this.loading = true;

        var data = {};
        data.email = this.email;

        if (data.email.length == 0) {
          alert("No email entered!");
        } else {
          $.ajax({
            method: 'POST',
            data: data,
            dataType: 'json',
            url: 'http://api.saxionroosters.nl/v1/accounts/register',
            error: function (request, status, error) {
              console.log(status + ' | ' + error);
              if (error == 'Internal Server Error') {
                  alert('An error occured whilst registering your account');
              }
              this.loader = null;
              this.loading = false;
              return;
            }.bind(this)
          }).then((response) => {
            console.log(response);
            if (response.email != null) {
              alert('Account successfully registered! You can sign in now.')
              this.$router.push({ name: 'Login'});
            }
            this.loader = null;
            this.loading = false;
          });
        }
    }
  }
}
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