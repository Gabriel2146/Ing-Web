<template>
  <div class="app-container">
    <div class="header">
      <h1 class="title">Gestión de Ítems</h1>
      <button class="btn btn-create" @click="showCreateForm = true">
        <i class="fas fa-plus"></i> Agregar Ítem
      </button>
    </div>

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
    <div class="items-container">
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
  background-color: #f4f7fc;
  min-height: 100vh;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.title {
  font-size: 3rem;
  color: #6c63ff;
  margin-bottom: 20px;
}

.btn-create {
  background: linear-gradient(135deg, #6c63ff, #00bcd4);
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
  transition: background 0.3s ease;
}

.btn-create:hover {
  background: linear-gradient(135deg, #00bcd4, #6c63ff);
}

.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 100%;
  max-width: 500px;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  border-radius: 5px;
  border: 1px solid #ddd;
  padding: 10px;
  width: 100%;
}

.form-buttons {
  display: flex;
  gap: 10px;
}

.btn-submit {
  background-color: #4caf50;
  color: white;
  font-weight: bold;
  width: 100%;
  padding: 12px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background-color: #45a049;
}

.btn-cancel {
  background-color: #f44336;
  color: white;
  width: 100%;
  padding: 12px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.btn-cancel:hover {
  background-color: #d32f2f;
}

.items-container {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

.item-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.item-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.item-title {
  color: #333;
  font-size: 1.25rem;
}

.item-description {
  color: #555;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  gap: 10px;
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

.notification {
  padding: 15px;
  border-radius: 5px;
  margin-top: 20px;
  text-align: center;
}

.alert-success {
  background-color: #4caf50;
  color: white;
}

.alert-error {
  background-color: #f44336;
  color: white;
}

.alert-icon {
  margin-right: 10px;
}
</style>
