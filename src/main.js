import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Vuetify from 'vuetify'
import VueAnalytics from 'vue-analytics'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './registerServiceWorker'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

Vue.use(VueI18n);
Vue.use(Vuetify);
Vue.use(VueAnalytics, {
	id: 'UA-118294891-1',
	router
});

Vue.prototype.$http = axios;

const translations = {
  en: {
		"schedules": "Schedules",
		"loggedin-as": "Logged in as",
  	titles: {
			"home": "Home",
			"teacher": "Teacher | Teachers",
			"group": "Group | Groups",
			"course": "Course | Courses",
			"student": "Student | Students",
			"academy": "Academy | Academies",
			"schedule": "Schedule | Schedules",
			"about": "About",
			"apps": "Apps",
			"login": "Sign in",
			"logout": "Sign out",
			"register": "Register",
			"verify": "Verification",
			"settings": "Settings"
  	},
  	subtitles: {
  	  "choose-academy": "Choose an academy"
  	},
  	home: {
  	  "search-hint": "Search for groups, teachers, courses, academies or students...",
  	  "recent-groups": "Recently viewed groups",
  	  "no-recent-groups": "No recently viewed groups.",
  	  "recent-teachers": "Recently viewed teachers",
			"no-recent-teachers": "No recently viewed teachers.",
			"coming-soon-title": "Coming soon!",
			"coming-soon-message": "Soon you will be able to view your schedules here, and sync them between your devices. Hold tight!"
  	},
  	schedule: {
  	  "teachers": "teachers",
  	  "rooms": "rooms",
  	  "no-classes": "No classes"
	  },
	  login: {
			"no-account": "No account?",
			"email-hint": "Email adress",
			"register-info-1": "Register an account by just entering your email adress. Registering an account has some great benefits:",
			"register-info-2": "Logging in doesn't require any passwords, just your email adress.<br>We will send you an email with a verification code each time you log in to a new device.",
			"register-benefit-1": "add your own events to your schedule",
			"register-benefit-2": "sync your events and saved schedules across all your devices",
			"button-submit": "Submit",
			"button-register": "Register"
	  },
    app_auth:{
      "button-back-to-app" : "Back to app",
      "title-success" : "Success",
      "message-success" : "You're logged in, get back to the app.",
      "title-failure" : "Something went wrong...",
      "message-failure" : "Please try again.",
    },
	  register: {
			"email-hint": "Email adress",
			"register-info": "We will send you an email with a verification code to register your account and this device.",
			"button-submit": "Submit",
			"button-back-to-login": "Back to login"
	  },
	  verify: {
			"verification-info": "We have sent you an email with a verification code. Please enter this (six-digit) code below.",
			"verification-hint": "Verification code",
			"no-email-received": "No email received?",
			"no-email-info": "Check if the email did not end up in your spam box by accident.<br>Is there no email? Wait for about 15 minutes, it occurs that the email is delivered with a delay.<br>Still no email? Try logging in again or <a href='mailto:wessel@perik.me'>contact the developer</a>.",
			"button-submit": "Submit"
	  },
	  drawer_footer: {
			"change-language": "Taal veranderen"
	  },
    footer: {
      "change-language": "Nederlands",
      "project-github": "Project on GitHub",
      "contact": "Contact the developer",
      "copyright": "&copy; 2019 <a href='https://github.com/wesselperik' target='_blank'>Wessel Perik</a> & <a href='https://github.com/bananapukeh' target='_blank'>Rutger Nijhuis</a>.",
      "license": "Code released under the <a rel='license' href='https://github.com/wesselperik/saxionroosters/blob/master/LICENSE' target='_blank'>MIT</a> license.",
      "disclaimer": "The information on this site is directly fetched from the official <a href='http://api.roosters.saxion.nl/' target='_blank'>Saxion @:schedules API</a>.<br> No rights can be derived from this information."
    }
  },
  nl: {
		"schedules": "Roosters",
		"loggedin-as": "Ingelogd als",
	  titles: {
	  	"home": "Home",
			"teacher": "Docent | Docenten",
			"group": "Klas | Klassen",
      "course": "Opleiding | Opleidingen",
      "student": "Student | Studenten",
      "academy": "Academie | Academies",
			"schedule": "Rooster | Roosters",
			"about": "Over deze site",
			"apps": "Apps",
			"login": "Inloggen",
			"logout": "Uitloggen",
			"register": "Registreren",
			"verify": "Verificatie",
			"settings": "Instellingen"
	  },
	  subtitles: {
  	  "choose-academy": "Kies een academie"
  	},
  	home: {
  	  "search-hint": "Zoek op klas, docent, opleiding, academie of studentnummer...",
  	  "recent-groups": "Recent bekeken klassen",
  	  "no-recent-groups": "Geen recent bekeken klassen.",
  	  "recent-teachers": "Recent bekeken docenten",
  	  "no-recent-teachers": "Geen recent bekeken docenten.",
			"coming-soon-title": "Coming soon!",
			"coming-soon-message": "Binnenkort kun je hier je roosters bekijken, en deze tussen al je apparaten synchroniseren. Nog even geduld!"
  	},
  	schedule: {
  	  "teachers": "docenten",
  	  "rooms": "lokalen",
  	  "no-classes": "Geen lessen"
	  },
	  login: {
			"no-account": "Nog geen account?",
			"email-hint": "Emailadres",
			"register-info-1": "Een account registreren kan met je emailadres. Met een account krijg je de beschikking tot een aantal handige functies:",
			"register-info-2": "Inloggen vereist geen wachtwoorden, alleen je emailadres.<br>We sturen je een email met een verificatiecode iedere keer dat je inlogd op een nieuw apparaat.",
			"register-benefit-1": "voeg je eigen afspraken toe aan je rooster",
			"register-benefit-2": "synchroniseer je afspraken en opgeslagen roosters met al je apparaten",
			"button-submit": "Ga verder",
			"button-register": "Registreren"
	  },
    app_auth:{
      "button-back-to-app" : "Terug naar app",
      "title-success" : "Gelukt",
      "message-success" : "Je bent ingelogd, je kan nu terug naar de app",
      "title-failure" : "Daar ging iets mis...",
      "message-failure" : "Probeer het opnieuw",
    },
	  register: {
			"email-hint": "Emailadres",
			"register-info": "We zullen je een email sturen met een verificatiecode om je account en dit apparaat te registreren.",
			"button-submit": "Ga verder",
			"button-back-to-login": "Terug naar inloggen"
	  },
	  verify: {
			"verification-info": "We hebben je een email gestuurd met een verificatiecode. Voer deze (zes-cijferige) code hieronder in.",
			"verification-hint": "Verificatiecode",
			"no-email-received": "Geen email ontvangen?",
			"no-email-info": "Check of de email niet per ongeluk in je spambox terecht is gekomen.<br>Staat hier geen email in? Wacht eerst een kwartier, het kan zijn dat de email vertraagd wordt afgeleverd.<br>Mocht je hierna nog geen email hebben, probeer het dan opnieuw of <a href='mailto:wessel@perik.me'>neem contact op met de ontwikkelaar</a>.",
			"button-submit": "Ga verder"
	  },
	  drawer_footer: {
			"change-language": "Change language"
	  },
    footer: {
	  	"change-language": "English",
      "project-github": "Project op GitHub",
      "contact": "Contacteer ontwikkelaar",
      "copyright": "&copy; 2019 <a href='https://github.com/wesselperik' target='_blank'>Wessel Perik</a> & <a href='https://github.com/bananapukeh' target='_blank'>Rutger Nijhuis</a>.",
      "license": "Code vrijgegeven onder de <a rel='license' href='https://github.com/wesselperik/saxionroosters/blob/master/LICENSE' target='_blank'>MIT</a> licentie.",
      "disclaimer": "De informatie op deze site komt direct vanuit de offici&euml;le <a href='http://api.roosters.saxion.nl/' target='_blank'>Saxion @:schedules API</a>.<br> Er kunnen geen rechten ontleend worden aan deze informatie."
    }
  }
}

if (Cookies.get('locale') === undefined) {
	if (location.hostname === "saxionroosters.nl") {
		Cookies.set('locale', 'nl');
	} else {
		Cookies.set('locale', 'en');
	}
} else {
	if (Cookies.get('locale') !== "en" && Cookies.get('locale') !== "nl") {
		Cookies.set('locale', 'nl');
	}
}

const i18n = new VueI18n({
  locale: Cookies.get('locale'),
  messages: translations
})

new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')
