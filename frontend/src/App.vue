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
          await axios.post('http://127.0.0.1:8000
