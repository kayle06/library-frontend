import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Book from '../views/Book.vue'
import Borrow from '../views/Borrow.vue'
import Analysis from '../views/Analysis.vue'
import System from "@/views/System.vue";


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Main,
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: Home
            },
            {
                path: '/user',
                component: User
            },
            {
                path: '/book',
                component: Book
            },
            {
                path: '/borrow',
                component: Borrow
            },
            {
                path: '/analysis',
                component: Analysis
            },
            {
                path: '/system',
                 component: System
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
