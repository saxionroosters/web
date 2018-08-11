<template>
    <v-flex row wrap>
        <h1 class="title">{{ $t('titles.settings') }}</h1>
        <v-divider class="divider spacer"></v-divider>
        <h2>Account</h2>
        <v-divider class="divider spacer"></v-divider>
        <h2>Opgeslagen roosters</h2>
        <v-divider class="divider spacer"></v-divider>
        <h2>Ingelogde apparaten</h2>
    </v-flex>
</template>

<script>
export default {
  name: 'Settings',
  data: function() {
    return {
        loader: null,
        loading: false,
        email: ''
    }
  },

  mounted: function () {
    if (!Cookies.get('token') || Cookies.get('token') == "undefined" || Cookies.get('token') === undefined) {
      this.$router.push({ name: 'Login'});
    }
  },

  watch: {
    '$route' (to, from) {

    }
  },

  methods: {
    login: function() {
        this.loader = 'loading';
        this.loading = true;

        var data = {};
        data.email = this.email;

        if (data.email.length == 0) {
          this.loader = null;
          this.loading = false;
          alert("No email adress entered!");
        } else {
          $.ajax({
            method: 'POST',
            data: data,
            dataType: 'json',
            url: 'http://api.saxionroosters.nl/v1/accounts/requestCode',
            error: function (request, status, error) {
              if (error == 'Not Found') {
                  alert('No account registered with given email');
              }
              this.loader = null;
              this.loading = false;
              return;
            }.bind(this)
          }).then((response) => {
            if (response.response == 'success') {
                this.$router.push({ name: 'Verify', params: { email: this.email }})
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

.flex:not(.flex-items) {
  padding: 30px;
}

.flex-items {
    padding-top: 10px;
    padding-bottom: 20px;
}

.overflow {
    overflow: visible;
    white-space: normal;
    text-overflow: unset;
    height: initial;
}

.spacer {
    margin-top: 30px;
    margin-bottom: 20px;
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