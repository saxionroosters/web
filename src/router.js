import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Home from '@/components/Home'
import Group from '@/components/Group'
import Groups from '@/components/Groups'
import Teacher from '@/components/Teacher'
import Teachers from '@/components/Teachers'
import AppAuth from '@/components/AppAuth'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
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
    },
    {
      path: '/app-auth',
      name: 'AppAuth',
      component: AppAuth
    }
  ]
})
