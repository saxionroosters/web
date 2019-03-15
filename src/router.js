import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Group from '@/components/schedule/Group'
import Groups from '@/components/schedule/Groups'
import Teacher from '@/components/schedule/Teacher'
import Teachers from '@/components/schedule/Teachers'
import AppAuth from '@/components/auth/AppAuth'
import WebAuth from '@/components/auth/WebAuth'
import Login from '@/components/auth/Login'
import Logout from '@/components/auth/Logout'
import Schedule from '@/components/schedule/Schedule'
import AuthManager from './managers/AuthManager'

Vue.use(Router)

let router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
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
            component: Login,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/logout',
            name: 'Logout',
            component: Logout,
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
            name: 'WebAuth',
            component: WebAuth,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/schedule',
            name: 'Schedule',
            component: Schedule,
            meta: {
                requiresAuth: true
            }
        }
    ]
})


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!AuthManager.isLoggedIn()) {
            next({
                path: '/login',
                params: {nextUrl: to.fullPath}
            })
        } else {
            next()
        }
    } else {
        // Just skip..
        next()
    }
})

export default router;
