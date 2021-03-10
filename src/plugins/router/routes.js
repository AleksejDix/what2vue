import Home from '@/views/Home'
import authMiddleware from './../../middleware/auth'

export default [
  {
    path: '',
    component: Home,
    name: 'home',
  },
  {
    path: '/favorites',
    component: () => import('@/views/Favorites/'),
    name: 'favorites',
  },
  {
    path: '/movies/discover',
    component: () => import('@/views/Discover/'),
    name: 'discover',
  },
  {
    path: '/category/:id/',
    component: () => import('@/views/Category/'),
    name: 'category',
  },
  {
    path: '/movies/:id/',
    component: () => import('@/views/Movie/'),
    children: [
      {
        path: '',
        alias: 'cast',
        component: () => import('@/views/MovieCredits/'),
        name: 'cast',
      },
      {
        path: 'crew',
        component: () => import('@/views/MovieCredits/'),
        name: 'crew',
      },
    ],
  },
  {
    path: '/person/:id/',
    component: () => import('@/views/Person/'),
    name: 'person',
  },
  {
    path: '/profile',
    component: () => import('@/views/Profile/'),
    name: 'profile',
    meta: {
      middleware: authMiddleware,
    },
  },
  {
    path: '/dashboard',
    component: () => import('@/views/Dashboard/'),
    name: 'dashboard',
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/_404/'),
  },
  {
    path: '/*',
    redirect: '404',
  },
]
