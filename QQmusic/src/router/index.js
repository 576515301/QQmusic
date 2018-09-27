import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import Recommend from '@/pages/recommend'

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
        }
      ]
    },

  ]
})
