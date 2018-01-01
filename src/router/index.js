import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import BookAdmin from '@/components/BookAdmin'
import BookList from '@/components/BookList'
import User from '@/components/User'
import Control from '@/components/Control'
import UserList from '@/components/UserList'
import ShopBooks from '@/components/ShopBooks'
import OrderList from '@/components/OrderList'
import PublishList from '@/components/PublishList'
import BookSearch from '@/components/BookSearch'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/bookAdmin',
      name: 'BookAdmin',
      component: BookAdmin
    },
    {
      path: '/books',
      component: BookList,
      children : [{
        path : 'commonBooks',
        component : resolve => require(['../components/CommonBooks.vue'],resolve),
      },
      {
        path : '/',
        component : resolve => require(['../components/CommonBooks.vue'],resolve),
      },
      {
        path : 'lockBooks',
        component : resolve => require(['../components/LockBooks.vue'],resolve),
      },
      ]
    },
    {
      path: '/user',
      component: User,
    },
    {
      path: '/control',
      component: Control,
      children : [{
        path : 'bookAdmin',
        component : resolve => require(['../components/BookAdmin.vue'],resolve),
      },
      {
      path : 'publishAdmin',
      component : resolve => require(['../components/PublishAdmin.vue'],resolve),
      },
      {
        path : '/',
        component : resolve => require(['../components/BookAdmin.vue'],resolve),
      },
      ]
    },
    {
      path:'/userlist',
      component: UserList
    },
    {
      path:'/shopbooks',
      component: ShopBooks
    },
    {
      path:'/publisherlist',
      component:PublishList
    },
    {
      path:'/orderlist',
      component: OrderList
    },
    {
      path:'/booksearch',
      component: BookSearch
    }
  ]
})
