// Servicios para comunicación con la API | FRONTEND.

import axios from 'axios';
import { User } from '../models/User';

// URL base de la API (ajustar según corresponda)
const API_URL = 'http://localhost:5000/api';

/**
 * Servicio para manejar las operaciones de la API relacionadas con usuarios
 */
export const UserService = {
  /**
   * Obtiene todos los usuarios
   * @returns Lista de usuarios
   */
  async getAll(): Promise<User[]> {
    try {
      const response = await axios.get(`${API_URL}/users`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
  },
  
  /**
   * Obtiene un usuario por su ID
   * @param id ID del usuario
   * @returns Usuario encontrado
   */
  async getById(id: number): Promise<User> {
    try {
      const response = await axios.get(`${API_URL}/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener usuario con ID ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Crea un nuevo usuario
   * @param user Datos del usuario
   * @returns Usuario creado
   */
  async create(user: User): Promise<User> {
    try {
      const response = await axios.post(`${API_URL}/users`, user);
      return response.data;
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  },
  
  /**
   * Actualiza un usuario existente
   * @param id ID del usuario
   * @param user Datos actualizados
   * @returns Usuario actualizado
   */
  async update(id: number, user: Partial<User>): Promise<User> {
    try {
      const response = await axios.put(`${API_URL}/users/${id}`, user);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar usuario con ID ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Elimina un usuario
   * @param id ID del usuario
   * @returns Mensaje de confirmación
   */
  async delete(id: number): Promise<{ message: string }> {
    try {
      const response = await axios.delete(`${API_URL}/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar usuario con ID ${id}:`, error);
      throw error;
    }
  }
};