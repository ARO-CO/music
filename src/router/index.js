import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/itemMusic/:id',
    name: 'ItemMusic',
    component: ()=> import ("@/views/ItemMusic")
  },
  {
    path: '/search',
    name: 'Search',
    component: ()=> import ("@/views/Search")
  },
  {
    path: '/login',
    name: 'Login',
    component: ()=> import ("@/views/Login")
  },
  {
    path: '/infoUser',
    name: 'InfoUser',
    component: ()=> import ("@/views/InfoUser"),
    beforeEnter:(to,from,next)=>{
      if(store.state.isLogin || store.state.token || localStorage.getItem('token')){
        next()
      }else{
        next('/login')
      }
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to,from)=>{
//   if(to.path == '/login'){
//     store.state.isFooterMusic=false
//   }else{
//     store.state.isFooterMusic=true
//   }
// })
export default router
