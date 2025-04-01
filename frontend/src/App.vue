<template>
  <div class="app-container">
    <!-- Header -->
    <header class="header">
      <h1 class="title">Gestión de Ítems</h1>
      <button class="btn btn-create" @click="showCreateForm = true">
        <i class="fas fa-plus"></i> Agregar Ítem
      </button>
    </header>

    <!-- Formulario para agregar/editar ítem -->
    <div v-if="showCreateForm" class="form-container">
      <div class="form-card">
        <div class="card-header">
          <h4>{{ isEditing ? 'Editar' : 'Agregar' }} Ítem</h4>
        </div>
        <div class="card-body">
          <form @submit.prevent="saveItem">
            <div class="form-group">
              <label for="name">Nombre</label>
              <input
                v-model="currentItem.name"
                type="text"
                id="name"
                class="form-control"
                placeholder="Ingresa el nombre del ítem"
                required
              />
            </div>
            <div class="form-group">
              <label for="description">Descripción</label>
              <textarea
                v-model="currentItem.description"
                id="description"
                class="form-control"
                rows="3"
                placeholder="Ingresa la descripción del ítem"
                required
              ></textarea>
            </div>
            <div class="form-buttons">
              <button type="submit" class="btn btn-submit">
                <i class="fas" :class="isEditing ? 'fa-edit' : 'fa-plus'"></i>
                {{ isEditing ? 'Guardar Cambios' : 'Crear Ítem' }}
              </button>
              <button type="button" @click="cancelCreate" class="btn btn-cancel">
                <i class="fas fa-times"></i> Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Lista de ítems -->
    <div v-if="items.length > 0" class="items-container">
      <div class="item-card" v-for="item in items" :key="item.id">
        <div class="card-body">
          <h5 class="item-title">{{ item.name }}</h5>
          <p class="item-description">{{ item.description }}</p>
        </div>
        <div class="card-footer">
          <button class="btn btn-edit" @click="editItem(item)">
            <i class="fas fa-edit"></i> Editar
          </button>
          <button class="btn btn-delete" @click="deleteItem(item.id)">
            <i class="fas fa-trash"></i> Eliminar
          </button>
        </div>
      </div>
    </div>
    <div v-else class="empty-state">
      <p>No hay ítems disponibles. ¡Agrega uno nuevo!</p>
    </div>

    <!-- Notificaciones -->
    <div v-if="alertMessage" class="notification" :class="alertClass">
      <i :class="alertIcon"></i> {{ alertMessage }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      items: [],
      showCreateForm: false,
      currentItem: {
        id: null,
        name: '',
        description: '',
      },
      isEditing: false,
      alertMessage: '',
      alertClass: '',
      alertIcon: '',
    };
  },
  methods: {
    async fetchItems() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/items/');
        this.items = response.data;
      } catch (error) {
        this.showAlert('Hubo un error al obtener los ítems.', 'error', 'fas fa-exclamation-circle');
      }
    },
    async saveItem() {
      try {
        if (this.isEditing) {
          await axios.put(`http://127.0.0.1:8000/api/items/${this.currentItem.id}/`, this.currentItem);
          this.showAlert('Ítem actualizado correctamente.', 'success', 'fas fa-check-circle');
        } else {
          await axios.post('http://127.0.0.1:8000/api/items/', this.currentItem);
          this.showAlert('Ítem creado correctamente.', 'success', 'fas fa-check-circle');
        }
        this.resetForm();
        this.fetchItems();
      } catch (error) {
        this.showAlert('Hubo un error al guardar el ítem.', 'error', 'fas fa-exclamation-circle');
      }
    },
    editItem(item) {
      this.isEditing = true;
      this.showCreateForm = true;
      this.currentItem = { ...item };
    },
    async deleteItem(id) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/items/${id}/`);
        this.showAlert('Ítem eliminado correctamente.', 'success', 'fas fa-trash');
        this.fetchItems();
      } catch (error) {
        this.showAlert('Hubo un error al eliminar el ítem.', 'error', 'fas fa-exclamation-circle');
      }
    },
    cancelCreate() {
      this.resetForm();
    },
    resetForm() {
      this.showCreateForm = false;
      this.currentItem = { id: null, name: '', description: '' };
      this.isEditing = false;
    },
    showAlert(message, type, icon) {
      this.alertMessage = message;
      this.alertClass = `alert-${type}`;
      this.alertIcon = icon;
      setTimeout(() => {
        this.alertMessage = '';
      }, 5000);
    },
  },
  mounted() {
    this.fetchItems();
  },
};
</script>

<style scoped>
.app-container {
  background-color: #f4f4f9;
  min-height: 100vh;
  color: #333;
  font-family: 'Roboto', sans-serif;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.title {
  font-size: 2.5rem;
  color: #0d47a1;
}

.btn-create {
  background-color: #1976d2;
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
}

.btn-create:hover {
  background-color: #1565c0;
}

.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.form-card {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  border-radius: 5px;
  border: 1px solid #ddd;
  padding: 10px;
  width: 100%;
  background-color: #f9f9f9;
  color: #333;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.btn-submit {
  background-color: #66bb6a;
  color: white;
  font-weight: bold;
  padding: 12px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  width: 100%;
}

.btn-submit:hover {
  background-color: #4caf50;
}

.btn-cancel {
  background-color: #f44336;
  color: white;
  padding: 12px 20px;
  border-radius: 5px;
  width: 100%;
  transition: background-color 0.3s ease;
}

.btn-cancel:hover {
  background-color: #d32f2f;
}

.items-container {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  margin-top: 40px;
}

.item-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.item-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.item-title {
  color: #1976d2;
  font-size: 1.25rem;
}

.item-description {
  color: #777;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 10px;
}

.btn-edit, .btn-delete {
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}

.btn-edit {
  background-color: #ffa500;
  color: white;
}

.btn-edit:hover {
  background-color: #ff7f00;
}

.btn-delete {
  background-color: #f44336;
  color: white;
}

.btn-delete:hover {
  background-color: #d32f2f;
}

.empty-state {
  text-align: center;
  color: #888;
  font-size: 1.25rem;
  margin-top: 40px;
}

.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 999;
}

.alert-success {
  border-left: 5px solid #66bb6a;
}

.alert-error {
  border-left: 5px solid #f44336;
}

.notification i {
  font-size: 1.5rem;
}

.notification p {
  margin: 0;
  font-size: 1rem;
}
</style>
