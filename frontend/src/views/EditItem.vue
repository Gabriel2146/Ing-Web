<template>
  <div>
    <h1>Edit Item</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="item.name" id="name" required />
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea v-model="item.description" id="description" required></textarea>
      </div>
      <div>
        <label for="price">Price:</label>
        <input type="number" v-model="item.price" id="price" required />
      </div>
      <button type="submit">Update Item</button>
    </form>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'EditItem',
  data() {
    return {
      item: {
        name: '',
        description: '',
        price: 0
      }
    };
  },
  created() {
    const itemId = this.$route.params.id;
    api.get(`items/${itemId}/`)
      .then(response => {
        this.item = response.data;
      })
      .catch(error => {
        console.error('Error fetching item:', error);
      });
  },
  methods: {
    submitForm() {
      const itemId = this.$route.params.id;
      api.put(`items/${itemId}/`, this.item)
        .then(() => {
          this.$router.push({ name: 'item-list' });
        })
        .catch(error => {
          console.error('Error updating item:', error);
        });
    }
  }
};
</script>

<style scoped>
/* Estilos personalizados para la vista */
</style>
