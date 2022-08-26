/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', keepAlive: false }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/home/about'),
        meta: { title: '关于我', keepAlive: false }
      },
      {
        path: '/selectSearch',
        name: 'SelectSearch',
        component: () => import('@/views/selectSearch'),
        meta: { title: '关于我', keepAlive: false }
      }
    ]
  },
  {
    path: '/pullLoad',
    name: 'PullLoad',
    component: () => import('@/views/pullLoad'),
    meta: { title: '下拉加载', keepAlive: false }
  }
]
