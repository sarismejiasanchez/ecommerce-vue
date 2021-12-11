import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import Car from '../views/Car.vue';
import Seller from '../views/Seller.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/car',
    name: 'Car',
    component: Car
  },
  {
    path: '/seller',
    name: 'Seller',
    component: Seller
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
