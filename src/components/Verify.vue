<template>
    <v-flex text-xs-center row wrap>
        <h1 class="title">Verification</h1>
        <p>We have sent you an email with a verification code. Please enter this (six-digit) code below.</p>
        <v-text-field box v-model="code" name="code" id="code" color="black" label="Verification code" append-icon="lock"></v-text-field>
        <v-btn large :loading="loading" :disabled="loading" color="saxionroosters" class="white--text" @click.native="verify()">Submit</v-btn> 
    </v-flex>
</template>

<script>
export default {
  name: 'Verify',
  data: function() {
    return {
        loader: null,
        loading: false,
        email: '',
        code: ''
    }
  },

  mounted: function () {
    console.log(this.$route.params.email);
    if (this.$route.params.email === undefined) {
      this.$router.push({ name: 'Login' })
    } else {
      this.email = this.$route.params.email;
    }
  },

  watch: {
    loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
    },
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
              alert(response.confirmation.id)
                // this.$router.push({ name: 'Verify' })
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