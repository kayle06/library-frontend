import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Book from '../views/Book.vue'
import Borrow from '../views/Borrow.vue'
import Role from "@/views/Role.vue"
import BorrowAnalysis from "@/views/BorrowAnalysis.vue"
import BookAnalysis from "@/views/BookAnalysis.vue"
import Category from "@/views/Category.vue";
import Return from "@/views/Return.vue";
import Reservation from "@/views/Reservation.vue";
import BookCirculation from "@/views/BookCirculation.vue";
import PopularBookAnalysis from "@/views/PopularBookAnalysis.vue";

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
                path: 'reservation',
                component: Reservation
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
                path: '/bookCirculation',
                component: BookCirculation
            },
            {
                path: '/popularBookAnalysis',
                component: PopularBookAnalysis
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
