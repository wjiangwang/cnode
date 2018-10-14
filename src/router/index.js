import Vue from 'vue'
import Router from 'vue-router'
import mainarticle from '../components/mainarticle'
import postList from '../components/postList'
import userInfo from '../components/userInfo'
import sideBar from '../components/sideBar'
Vue.use(Router)

export default new Router({
  routes: [
    {
      name:'homeLink',
      path: '/',
      components:{
        main:postList
      }

    },
    {
      name:'articleLink',
      path: '/topic/:id&author=:name',
      components:{
        main:mainarticle,
        sideBar:sideBar
      }

    },
    {
      name:'user_info',
      path: '/user/:name',
      components:{
        main:userInfo
      }

    }
  ]
})
