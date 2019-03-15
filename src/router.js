import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Home from '@/components/Home'
import Group from '@/components/Group'
import Groups from '@/components/Groups'
import Teacher from '@/components/Teacher'
import Teachers from '@/components/Teachers'
import AppAuth from '@/components/AppAuth'
import WebAuth from '@/components/WebAuth'
import Login from '@/components/Login'

Vue.use(Router)

let router = new Router({
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
            component: Home,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
            ,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/group/:group',
            name: 'Group',
            component: Group,
            meta: {
                requiresAuth: true
            }

        },
        {
            path: '/group/:group/:week',
            name: 'GroupWeek',
            component: Group,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/groups/',
            name: 'Groups',
            component: Groups,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/groups/:academy',
            name: 'GroupsAcademy',
            component: Groups,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/groups/:academy/:course',
            name: 'GroupsAcademyCourse',
            component: Groups,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/teacher/:teacher',
            name: 'Teacher',
            component: Teacher,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/teacher/:teacher/:week',
            name: 'TeacherWeek',
            component: Teacher,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/teachers/',
            name: 'Teachers',
            component: Teachers,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/teachers/:academy',
            name: 'TeachersAcademy',
            component: Teachers,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/app-auth',
            name: 'AppAuth',
            component: AppAuth,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/web-auth',
            name: 'WevAuth',
            component: WebAuth,
            meta: {
                requiresAuth: false
            }
        }
    ]
})


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        let accessToken = localStorage.getItem('access_token')
        if (accessToken == null) {
            next({
                path: '/login',
                params: {nextUrl: to.fullPath}
            })
        } else {
            next()
        }
    }
    else {
        // Just skip..
        next()
    }
})

export default router;
