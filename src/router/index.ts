import { createRouter, createWebHistory } from 'vue-router';
import MasterView from '../views/MasterView.vue';
const routes = [
  {
    path: '/',
    name: 'MasterView',
    component: MasterView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;