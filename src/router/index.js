import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import BookAdmin from '@/components/BookAdmin'
import BookList from '@/components/BookList'
import User from '@/components/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
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
  ]
})
