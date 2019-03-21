<template>

    <v-app id="app">
        <Navigation/>

        <v-content>
            <v-layout row pb-2>
                <v-flex xs12 md10 lg8 offset-xs0 offset-md1 offset-lg2>
                    <v-card class="card--flex-toolbar">
                        <router-view/>
                    </v-card>
                </v-flex>
            </v-layout>

            <Footer/>
        </v-content>
    </v-app>
</template>

<script>
    import Navigation from "./components/interface/Navigation.vue";
    import Footer from './components/interface/Footer'
    import firebase from 'firebase/app'

    // Initialize Firebase
    let config = {
        apiKey: "AIzaSyALCynj2Zvwv-NvkGB_MWwhJWYn3CFN3ZQ",
        authDomain: "saxion-rooster.firebaseapp.com",
        databaseURL: "https://saxion-rooster.firebaseio.com",
        projectId: "saxion-rooster",
        storageBucket: "saxion-rooster.appspot.com",
        messagingSenderId: "103332887108"
    };
    firebase.initializeApp(config);

    export default {
        name: "App",
        components: {
            Navigation,
            Footer
        },
        data: function () {
            return {};
        },
        mounted: function () {
        },
        methods: {
            checkIfDev: function () {
                if (window.location.hostname.indexOf("dev") > -1 || window.location.hostname.indexOf("beta") > -1) {
                    console.log("INFO: This is a beta or dev build of saxionroosters.nl");
                    return true;
                } else {
                    return false;
                }
            },
            changeLanguage: function () {
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
            logout: function () {
                this.$router.push("/logout");
            }
        }
    };
</script>

<style lang="scss">
    /** loaded from sass file **/
</style>
