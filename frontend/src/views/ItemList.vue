<template>
  <div>
    <h1>Item List</h1>
    <ul>
      <li v-for="item in items" :key="item.id">
        <p>{{ item.name }} - {{ item.price }}</p>
        <button @click="editItem(item.id)">Edit</button>
        <button @click="deleteItem(item.id)">Delete</button>
      </li>
    </ul>
    <button @click="createItem">Create New Item</button>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'ItemList',
  data() {
    return {
      items: []
    };
  },
  created() {
    this.fetchItems();
  },
  methods: {
    fetchItems() {
      api.get('items/')
        .then(response => {
          this.items = response.data;
        })
        .catch(error => {
          console.error('Error fetching items:', error);
        });
    },
    editItem(id) {
      this.$router.push({ name: 'edit-item', params: { id: id } });
    },
    deleteItem(id) {
      api.delete(`items/${id}/`)
        .then(() => {
          this.fetchItems(); // Recargar la lista después de eliminar
        })
        .catch(error => {
          console.error('Error deleting item:', error);
        });
    },
    createItem() {
      this.$router.push({ name: 'create-item' });
    }
  }
};
</script>

<style scoped>
/* Estilos personalizados para la vista */
</style>
