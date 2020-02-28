
const routes = [
  {
    path: '/:token?',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '/lastHours', component: () => import('pages/LastHours.vue') },
      { path: '/transducer/:id', component: () => import('pages/Transducer.vue') },
      { path: '/about', component: () => import('pages/About.vue') },
      { path: '', component: () => import('pages/Index.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
