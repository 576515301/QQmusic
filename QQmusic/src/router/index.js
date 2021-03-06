import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import Recommend from '@/pages/recommend'
import Rank from '@/pages/rank'
import Search from '@/pages/search'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:"/home"
    },
    {
      path: '/home',
      redirect:"/recommend",
      name: 'Home',
      component: Home,
      children:[
        {
          path: '/recommend',
          name: 'Recommend',
          component: Recommend
        },
        {
          path: '/rank',
          name: 'Rank',
          component: Rank
        },
        {
          path: '/search',
          name: 'Search',
          component: Search
        }
      ]
    },

  ]
})
