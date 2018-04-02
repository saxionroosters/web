import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Group from '@/components/Group'
import Groups from '@/components/Groups'
import Teacher from '@/components/Teacher'
import Teachers from '@/components/Teachers'

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
	      name: 'GroupWeek',
	      component: Group
	    },
	    {
	      path: '/groups/',
	      name: 'Groups',
	      component: Groups
	    },
	    {
	      path: '/groups/:academy',
	      name: 'GroupsAcademy',
	      component: Groups
	    },
	    {
	      path: '/groups/:academy/:course',
	      name: 'GroupsAcademyCourse',
	      component: Groups
	    },
	    {
	      path: '/teacher/:teacher',
	      name: 'Teacher',
	      component: Teacher
	    },
	    {
	      path: '/teacher/:teacher/:week',
	      name: 'TeacherWeek',
	      component: Teacher
	    },
	    {
	      path: '/teachers/',
	      name: 'Teachers',
	      component: Teachers
	    },
	    {
	      path: '/teachers/:academy',
	      name: 'TeachersAcademy',
	      component: Teachers
	    }
	  ]
})
