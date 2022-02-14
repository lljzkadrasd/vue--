import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import first from '@/components/first'
import second from '@/components/second'
import three from '@/components/three'
import three1 from '@/components/three1'
import three2 from '@/components/three2'
import detail from '@/components/detail'
import one from '@/components/one'


import StorageCaseLogin from '@/components/StorageCaseLogin'
import StorageCaseSecond from '@/components/StorageCaseSecond'
import Home from '@/components/Home'
import UserManages from '../components/UserManages' 
import CustManages from '../components/CustManages'
import BoxManages from '../components/BoxManages'
import BoxManages2 from '../components/BoxManages2'
import ViewManages from '../components/ViewManages'
import GoodsManages from '../components/GoodsManages'
import AdManages from '../components/AdManages'

import example from '../components/example'
import PhoneLogin from '../components/PhoneLogin'
import PhoneRegister from '../components/PhoneRegister'







Vue.use(Router)

export default new Router({
  mode:"hash",
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/example',
      name:'example',
      component:example
    },
    {
      path:'/PhoneLogin',
      name:'PhoneLogin',
      component:PhoneLogin
    },
    {
      path:'/PhoneRegister',
      name:'PhoneRegister',
      component:PhoneRegister
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children:[
        {
          path:'/userManages',
          name:'userManages',
          component:UserManages
        },
        { 
          path:'/custManages',
          name:'custManages',
          component:CustManages  
        },
        {
          path:'/boxManages',
          name:'boxManages',
          component:BoxManages
        },
        {
          path:'/boxManages2',
          name:'boxManages2',
          component:BoxManages2
        },
        {
          path:'/viewManages',
          name:'viewManages',
          component:ViewManages,
        },
        {
          path:'/goodsManages',
          name:'goodsManages',
          component:GoodsManages,
        },
        {
          path:'/adManages',
          name:'adManages',
          component:AdManages,
        },
      ]
    },
    {
      path: '/storagecaselogin',
      name: 'storagecaselogin',
      component: StorageCaseLogin
    },
    {
      path: '/storagecasesecond',
      name: 'storagecasesecond',
      component: StorageCaseSecond
    },
    {
      path: '/one',
      name: 'one',
      component: one
    },
    {
      path:'/first',
      name:'first',
      component: first
    },
    {
      path:'/second',
      name:'second',
      component: second
    },{
      path:'/three',
      name:'three',
      component: three,
      children:[
        {
          path:'three1',
          component: three1,
        },
        {
          path:'three2',
          component: three2
        },
        {
          path:'/',
          redirect: "three1",
        },
        {
          path:'/detail/:id',
          name:"detail",
          component:detail
    
        },



      ]
    }
  ]
})
