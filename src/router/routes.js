import Default from '@/layouts/default'
import Dashboard from '@/layouts/dashboard'
import SignIn from '@/layouts/signIn'

const Routes = [
  {
    path: '/',
    name: 'Default',
    showInMenu: false,
    component: Default
  },
  {
    path: '/signin',
    name: 'SignIn',
    showInMenu: false,
    component: SignIn
  },
  {
    icon: 'el-icon-menu',
    label: '工作台',
    name: 'Dashboard',
    path: '/dashboard',
    auth: ['admin', 'customer'],
    showInMenu: true,
    component: Dashboard,
    children: [
      {
        label: '工作台',
        path: 'welcome',
        auth: ['admin', 'customer'],
        name: 'Welcome',
        showInMenu: true,
        component: () => import('@/views/welcome')
      }]
  },
  {
    icon: 'el-icon-edit-outline',
    label: '版本',
    name: 'FormPage',
    path: '/dashboard',
    auth: ['admin', 'customer'],
    showInMenu: true,
    component: Dashboard,
    children: [
      {
        label: '版本',
        path: 'basic-form',
        auth: ['admin', 'customer'],
        name: 'BasicForm',
        showInMenu: true,
        component: () => import('@/views/version')
      }
    ]
  }
]

export default Routes
