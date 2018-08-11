<template>
    <v-flex text-xs-center row wrap>
        <h1 class="title">{{ $t('titles.verify') }}</h1>
        <p v-html="$t('verify.verification-info')"></p>
        <v-text-field box v-model="code" name="code" id="code" color="black" :label="$t('verify.verification-hint')" append-icon="lock"></v-text-field>
        <v-btn large :loading="loading" :disabled="loading" color="saxionroosters" class="white--text" @click.native="verify()">{{ $t('verify.button-submit') }}</v-btn> 
        <v-divider class="divider spacer"></v-divider>
        <h2>{{ $t('verify.no-email-received') }}</h2>
        <p v-html="$t('verify.no-email-info')"></p>
    </v-flex>
</template>

<script>
export default {
  name: 'Verify',
  data: function() {
    return {
        loader: null,
        loading: false,
        verified: false,
        email: '',
        url: '',
        code: ''
    }
  },

  mounted: function () {
    if (Cookies.get('token') && Cookies.get('token') != "undefined" && Cookies.get('token') !== undefined) {
      this.$router.push({ name: 'Home'});
    }

    if (this.$route.params.email === undefined) {
      this.$router.push({ name: 'Login' })
    } else {
      this.email = this.$route.params.email;
    }

    if (window.location.port != null || window.location.port != undefined) {
      this.url = window.location.hostname + ":" + window.location.port + window.location.pathname + "/" + this.email + "/";
    } else {
      this.url = window.location.hostname + window.location.pathname + "/" + this.email + "/";
    }

    console.log(window.location.hostname + window.location.pathname);
  },

  watch: {
    '$route' (to, from) {
      if (this.$route.params.email === undefined) {
        this.$router.push({ name: 'Login' })
      } else {
        this.email = this.$route.params.email;
      }
    }
  },

  methods: {
    verify: function() {
        this.loader = 'loading';
        this.loading = true;

        var data = {};
        data.email = this.email;
        data.code = this.code;

        if (data.code.length == 0) {
          alert("No verification code entered!");
        } else {
          $.ajax({
            method: 'POST',
            data: data,
            dataType: 'json',
            url: 'http://api.saxionroosters.nl/v1/accounts/verify',
            error: function (request, status, error) {
              console.log(status + ' | ' + error);
              if (error == 'Internal Server Error') {
                  alert('Verification code invalid!');
              }
              this.loader = null;
              this.loading = false;
              return;
            }.bind(this)
          }).then((response) => {
            console.log(response);
            if (response.confirmation.id != null) {
              Cookies.set('token', response.confirmation.id);
              Cookies.set('email', this.email);
              this.verified = true;
              // window.location = '/'
              var timer = new Promise((resolve, reject) => {
                  setTimeout(resolve, 5000);  // "resolve" is already a function, no need for another anonymous function here
              });
              var uri = "https://roosters.rest.saxion.nl/api/users/authenticate?originUrl=" + this.url;
              console.log("redirecting to " + uri + "...");
              window.location = uri;
              // var params = {};
              // params.originUrl = "http://saxionroosters.nl/verify/" + this.email + "/"
              // $.ajax({
              //   method: 'GET',
              //   data: params,
              //   dataType: 'json',
              //   url: 'https://roosters.rest.saxion.nl/api/users/authenticate',
              //   error: function (request, status, error) {
              //     console.log(status + ' | ' + error);
              //     return;
              //   }.bind(this)
              // }).then((res) => {
              //   console.log(res);
              // });
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