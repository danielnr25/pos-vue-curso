import { createRouter, createWebHistory } from 'vue-router'
import Shopview from '@/views/ShopView.vue'
import AdminLayouts from '@/views/admin/AdminLayouts.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop',
      component: Shopview
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminLayouts,
      children : [
         {
            path: 'productos',
            name: 'productos',
            component: () => import('@/views/admin/ProductosView.vue'),
         },
         {
            path: 'productos/nuevo',
            name: 'new-producto',
            component: () => import('@/views/admin/NewProductoView.vue'),
         },
         {
            path: 'productos/editar/:id',
            name: 'edit-product',
            component: () => import('@/views/admin/EditProductoView.vue')
         },
         {
            path: 'ventas',
            name: 'ventas',
            component: () => import('@/views/admin/VentasView.vue'),
         },
         
      ]
    },
   
  ]
})

export default router
