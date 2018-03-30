import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Group from '@/components/Group'
import Teacher from '@/components/Teacher'

Vue.use(Router)

export default new Router({
	  mode: 'history',
	  routes: [
	    {
	      path: '/',
	      name: 'Home',
	      component: Home
	    },
	    {
	      path: '/group/:group',
	      name: 'Group',
	      component: Group
	    },
	    {
	      path: '/group/:group/:week',
	      name: 'Group',
	      component: Group
	    },
	    {
	      path: '/teacher/:teacher',
	      name: 'Teacher',
	      component: Teacher
	    },
	    {
	      path: '/teacher/:teacher/:week',
	      name: 'Teacher',
	      component: Teacher
	    }
	  ]
})
