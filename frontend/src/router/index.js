import { createRouter, createWebHistory } from 'vue-router';
import ItemList from '../views/ItemList.vue';
import CreateItem from '../views/CreateItem.vue';
import EditItem from '../views/EditItem.vue';

const routes = [
  {
    path: '/',
    name: 'item-list',
    component: ItemList
  },
  {
    path: '/create-item',
    name: 'create-item',
    component: CreateItem
  },
  {
    path: '/edit-item/:id',
    name: 'edit-item',
    component: EditItem
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
