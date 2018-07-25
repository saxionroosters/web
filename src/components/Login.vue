<template>
    <v-flex text-xs-center row wrap>
        <h1 class="title">Login</h1>
        <v-text-field box color="black" v-model="email" name="email" id="email" type="email" label="Email adress" append-icon="mail"></v-text-field>
        <v-btn large :loading="loading" :disabled="loading" color="saxionroosters" class="white--text" @click.native="login()">Submit</v-btn>
        <v-divider class="divider spacer"></v-divider>
        <h2>No account?</h2>
        <p>Register an account by just entering your email adress. Registering an account has some great benefits:</p>
        <v-layout row>
            <v-flex xs12 md10 lg8 offset-xs0 offset-md1 offset-lg2 class="flex-items">
                <v-list two-line>
                    <v-list-tile>
                        <v-list-tile-action>
                            <v-icon>today</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title class="overflow">add your own events to your schedule</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>
                    <v-list-tile>
                        <v-list-tile-action>
                            <v-icon>sync</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title class="overflow">sync your events and saved schedules across all your devices</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-flex>
        </v-layout>
        <p>Logging in doesn't require any passwords, just your email adress.<br>
        We will send you an email with a verification code each time you log in to a new device.</p>
        <router-link tag="v-btn" class="btn btn--large btn--flat" v-bind:to="{ name: 'Register' }">Register my account</router-link>
    </v-flex>
</template>

<script>
export default {
  name: 'Login',
  data: function() {
    return {
        loader: null,
        loading: false,
        email: ''
    }
  },

  mounted: function () {

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
h1, h2 {
  font-family: 'Nunito', 'Avenir Next', 'Avenir', Arial, Helvetica, sans-serif;
  font-weight: 400;
}

h1.title {
  font-weight: 900;
  font-size: 2.6em !important;
  margin-bottom: 20px;
}

h2 {
  font-weight: 600;
  font-size: 1.8em !important;
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