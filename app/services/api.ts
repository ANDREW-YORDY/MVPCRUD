/**
 * Módulo de servicios para la comunicación con el backend.
 * Contiene la configuración de axios y las funciones para interactuar con la API.
 */
import axios, { AxiosResponse } from 'axios';
import { User } from '../models/User';

// URL base de la API - REEMPLAZA ESTA URL CON LA DE TU SERVIDOR BACKEND
const API_URL = 'http://192.168.1.X:3000/api'; // Usa tu dirección IP local y puerto del servidor

// Configura la instancia de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Funciones para interactuar con la API

/**
 * Obtiene todos los usuarios de la base de datos.
 * @returns Una promesa que resuelve a un array de usuarios.
 */
export const getUsers = async (): Promise<User[]> => {
  try {
    const response: AxiosResponse<User[]> = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

/**
 * Obtiene un usuario por su ID.
 * @param id - El ID del usuario a obtener.
 * @returns Una promesa que resuelve al usuario encontrado.
 */
export const getUserById = async (id: number): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener usuario con ID ${id}:`, error);
    throw error;
  }
};

/**
 * Crea un nuevo usuario en la base de datos.
 * @param user - Los datos del usuario a crear.
 * @returns Una promesa que resuelve al usuario creado.
 */
export const createUser = async (user: Omit<User, 'id' | 'dateCreate'>): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await api.post('/users', user);
    return response.data;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
};

/**
 * Actualiza un usuario existente en la base de datos.
 * @param id - El ID del usuario a actualizar.
 * @param user - Los datos actualizados del usuario.
 * @returns Una promesa que resuelve al usuario actualizado.
 */
export const updateUser = async (id: number, user: Partial<User>): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await api.put(`/users/${id}`, user);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar usuario con ID ${id}:`, error);
    throw error;
  }
};

/**
 * Elimina un usuario de la base de datos.
 * @param id - El ID del usuario a eliminar.
 * @returns Una promesa que resuelve a true si la eliminación fue exitosa.
 */
export const deleteUser = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`/users/${id}`);
    return true;
  } catch (error) {
    console.error(`Error al eliminar usuario con ID ${id}:`, error);
    throw error;
  }
};