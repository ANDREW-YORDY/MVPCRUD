// Ruta: MVPCRUD/services/api.js

// Importamos axios para realizar peticiones HTTP
import axios from 'axios';
// Importamos la URL de la API desde las variables de entorno
import { API_URL } from '@env';

// Creamos una instancia de axios con la URL base de nuestra API
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // Tiempo máximo de espera para las peticiones (10 segundos)
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Función para obtener todos los usuarios
export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

// Función para obtener un usuario por su ID
export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener usuario con ID ${id}:`, error);
    throw error;
  }
};

// Función para crear un nuevo usuario
export const createUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
};

// Función para actualizar un usuario existente
export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar usuario con ID ${id}:`, error);
    throw error;
  }
};

// Función para eliminar un usuario
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar usuario con ID ${id}:`, error);
    throw error;
  }
};

export default api;