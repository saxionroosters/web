import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueI18n)

const translations = {
  en: {
  	  "schedules": "Schedules",
  	  titles: {
  	  	"home": "Home",
      	"teacher": "Teacher | Teachers",
      	"group": "Group | Groups",
      	"schedule": "Schedule | Schedules"
  	  },
  	  subtitles: {
  	  	"choose-academy": "Choose an academy"
  	  },
  	  home: {
  	  	"search-hint": "Search for groups, teachers, courses, academies or students...",
  	  	"recent-groups": "Recently viewed groups",
  	  	"no-recent-groups": "No recently viewed groups.",
  	  	"recent-teachers": "Recently viewed teachers",
  	  	"no-recent-teachers": "No recently viewed teachers."
  	  },
  	  schedule: {
  	  	"teachers": "teachers",
  	  	"rooms": "rooms",
  	  	"no-classes": "No classes"
  	  },
      footer: {
      	"change-language": "Nederlands",
      	"project-github": "<a href='https://github.com/wesselperik/saxionroosters'>Project on GitHub</a>",
      	"contact": "<a href='mailto:wessel@perik.me'>Contact the developer</a>",
      	"copyright": "&copy; 2018 <a href='https://github.com/wesselperik' target='_blank'>Wessel Perik</a>.",
      	"license": "Code released under the <a rel='license' href='https://github.com/wesselperik/saxionroosters/blob/master/LICENSE' target='_blank'>MIT</a> license.",
      	"disclaimer": "The information on this site is directly fetched from the official <a href='http://api.roosters.saxion.nl/' target='_blank'>Saxion @:schedules API</a>.<br> No rights can be derived from this information."
      }
  },
  nl: {
	  "schedules": "Roosters",
	  titles: {
	  	"home": "Home",
		"teacher": "Docent | Docenten",
		"group": "Klas | Klassen",
		"schedule": "Rooster | Roosters"
	  },
	  subtitles: {
  	  	"choose-academy": "Kies een academie"
  	  },
  	  home: {
  	  	"search-hint": "Zoek op klas, docent, opleiding, academie of studentnummer...",
  	  	"recent-groups": "Recent bekeken klassen",
  	  	"no-recent-groups": "Geen recent bekeken klassen.",
  	  	"recent-teachers": "Recent bekeken docenten",
  	  	"no-recent-teachers": "Geen recent bekeken docenten."
  	  },
  	  schedule: {
  	  	"teachers": "docenten",
  	  	"rooms": "lokalen",
  	  	"no-classes": "Geen lessen"
  	  },
      footer: {
	  	"change-language": "English",
      	"project-github": "<a href='https://github.com/wesselperik/saxionroosters'>Project op GitHub</a>",
      	"contact": "<a href='mailto:wessel@perik.me'>Contacteer ontwikkelaar</a>",
      	"copyright": "&copy; 2018 <a href='https://github.com/wesselperik' target='_blank'>Wessel Perik</a>.",
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

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: Cookies.get('locale'),
  messages: translations
})

new Vue({
  i18n,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
