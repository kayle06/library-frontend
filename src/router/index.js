import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Book from '../views/Book.vue'
import Borrow from '../views/Borrow.vue'
import Analysis from '../views/Analysis.vue'
import System from "@/views/System.vue"
import Role from "@/views/Role.vue"
import BorrowAnalysis from "@/views/BorrowAnalysis.vue"
import BookAnalysis from "@/views/BookAnalysis.vue"
import Category from "@/views/Category.vue";
import Return from "@/views/return.vue";
import Renew from "@/views/Renew.vue";

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
                path: 'book',
                component: Book
            },
            {
                path: 'borrow',
                component: Borrow
            },
            {
                path: 'return',
                component: Return
            },
            {
                path: 'renew',
                component: Renew
            },
            {
                path: 'category',
                component: Category
            },
            {
                path: '/borrowAnalysis',
                component: BorrowAnalysis
            },
            {
                path: '/bookAnalysis',
                component: BookAnalysis
            },
            {
                path: '/user',
                component: User
            },
            {
                path: '/role',
                component: Role
            },
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
