import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress' // progress bar
NProgress.configure({ showSpinner: false })
import { BasicLayout, BasicMenuLayout, BasicLayoutVisualizaton } from '@/layouts'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    meta: { title: '经济大脑' },
    name: 'home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/cy',
    component: BasicLayout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        meta: { title: '产业概况' },
        name: 'gongyeIndex',
        component: () => import('@/views/index/index.vue')
      },
      {
        path: 'chanye',
        meta: { title: '产业全景' },
        name: 'chanye',
        component: () => import('@/views/chanye/index.vue')
      }
    ]
  },
  {
    path: '/jinji',
    component: BasicMenuLayout,
    children: [
      {
        path: 'index',
        meta: { title: '经济运行' },
        name: 'run',
        component: () => import('@/views/xiantao/index.vue')
      },
      {
        path: 'detail/:id',
        meta: { title: '主要经济指标' },
        name: 'xiantaoDetail',
        component: () => import('@/views/xiantao/detail.vue')
      }
    ]
  },
  {
    path: '/visualization',
    component: BasicLayoutVisualizaton,
    redirect: '/visualization/cockpit',
    children: [
      /**
       * 新增的
       */
      {
        path: 'park',
        meta: { title: '园区' },
        name: 'park',
        component: () => import('@/views/visualization/park/index.vue')
      },
      {
        path: 'land',
        meta: { title: '土地' },
        name: 'land',
        component: () => import('@/views/visualization/land/index.vue')
      },
      {
        path: 'parkDetail',
        meta: { title: '园区详情' },
        name: 'parkDetail',
        component: () => import('@/views/visualization/park/detail.vue')
      },
      {
        path: 'building',
        meta: { title: '楼宇' },
        name: 'building',
        component: () => import('@/views/visualization/building/index.vue')
      },
      {
        path: 'cockpit',
        meta: { title: '主要经济指标概览' },
        name: 'cockpit',
        component: () => import('@/views/visualization/jiashicang/index.vue')
      },
      {
        path: 'project',
        meta: { title: '重点项目' },
        name: 'project',
        component: () => import('@/views/visualization/project/index.vue')
      },
      {
        path: 'detail/:id',
        meta: { title: '重点项目详情' },
        name: 'projectDetail',
        component: () => import('@/views/visualization/project/detail.vue')
      },
      {
        path: 'compare',
        meta: { title: '市州比对' },
        name: 'compare',
        component: () => import('@/views/visualization/compare/index.vue')
      },
      {
        path: 'upload',
        meta: { title: '数据上传' },
        name: 'upload',
        component: () => import('@/views/visualization/upload/index.vue')
      }
    ]
  },
  {
    path: '/demo',
    component: () => import('@/views/demo/index.vue')
  },
  {
    path: '/404',
    component: () => import('@/views/exception/404.vue')
  },
  // {
  //   path: '/demo/index',
  //   meta: { title: '赤壁市产业经济大数据平台' },
  //   name: 'demo-index',
  //   component: () => import('@/views/demo/index/index.vue')
  // },
  // {
  //   path: '/demo/detail',
  //   meta: { title: '企业信息' },
  //   name: 'detail',
  //   component: () => import('@/views/demo/detail/index.vue')
  // },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((_to, _from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

export default router
