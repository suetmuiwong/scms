import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: false }

export default {
  path: '/projects',
  name: 'projects',
  meta,
  redirect: { path: '/projects/list' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'list', name: `${pre}list`, component: _import('system/projects/list'), meta: { ...meta, title: '我的项目' } },
    { path: 'add', name: `${pre}add`, component: _import('system/projects/add'), meta: { ...meta, title: '新建项目' } },
    { path: 'edit', name: `${pre}edit`, component: _import('system/projects/edit'), meta: { ...meta, title: '编辑项目' } }
  ])('projects-')
}
