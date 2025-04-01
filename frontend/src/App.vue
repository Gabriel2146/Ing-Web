<template>
  <div id="app">
    <h1>CRUD con Vue.js y Django</h1>
    <div>
      <input v-model="newItem.name" placeholder="Nombre del Ítem" />
      <input v-model="newItem.description" placeholder="Descripción del Ítem" />
      <button @click="addItem">Agregar Ítem</button>
    </div>

    <h2>Lista de Ítems</h2>
    <ul>
      <li v-for="item in items" :key="item.id">
        <strong>{{ item.name }}</strong>
        <p>{{ item.description }}</p>
        <button @click="editItem(item)">Editar</button>
        <button @click="deleteItem(item.id)">Eliminar</button>
      </li>
    </ul>

    <div v-if="editingItem">
      <h3>Editar Ítem</h3>
      <input v-model="editingItem.name" placeholder="Nuevo Nombre" />
      <input v-model="editingItem.description" placeholder="Nueva Descripción" />
      <button @click="updateItem">Actualizar</button>
      <button @click="cancelEdit">Cancelar</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      items: [],
      newItem: {
        name: '',
        description: ''
      },
      editingItem: null
    };
  },
  mounted() {
    this.fetchItems();
  },
  methods: {
    // Obtener la lista de ítems desde la API
    async fetchItems() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/items/');
        this.items = response.data;
      } catch (error) {
        console.error('Hubo un error al obtener los ítems:', error);
      }
    },

    // Crear un nuevo ítem
    async addItem() {
      if (!this.newItem.name || !this.newItem.description) {
        alert('Por favor complete todos los campos.');
        return;
      }

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/items/', this.newItem);
        this.items.push(response.data);
        this.newItem.name = '';
        this.newItem.description = '';
      } catch (error) {
        console.error('Hubo un error al agregar el ítem:', error);
      }
    },

    // Editar un ítem (selecciona un ítem para editar)
    editItem(item) {
      this.editingItem = { ...item };
    },

    // Actualizar un ítem existente
    async updateItem() {
      try {
        const response = await axios.put(`http://127.0.0.1:8000/api/items/${this.editingItem.id}/`, this.editingItem);
        const index = this.items.findIndex(item => item.id === this.editingItem.id);
        this.items[index] = response.data;
        this.editingItem = null;
      } catch (error) {
        console.error('Hubo un error al actualizar el ítem:', error);
      }
    },

    // Eliminar un ítem
    async deleteItem(id) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/items/${id}/`);
        this.items = this.items.filter(item => item.id !== id);
      } catch (error) {
        console.error('Hubo un error al eliminar el ítem:', error);
      }
    },

    // Cancelar la edición de un ítem
    cancelEdit() {
      this.editingItem = null;
    }
  }
};
</script>

<style scoped>
#app {
  text-align: center;
}

input {
  margin: 10px;
  padding: 5px;
}

button {
  padding: 8px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

h2 {
  margin-top: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
}

button {
  margin: 5px;
}

h3 {
  margin-top: 20px;
}
</style>
