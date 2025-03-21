// Ruta: MVPCRUD/context/UserContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../services/api';
import { Alert } from 'react-native';

// Creamos el contexto
const UserContext = createContext();

// Hook personalizado para acceder al contexto
export const useUserContext = () => useContext(UserContext);

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  // Estado para almacenar la lista de usuarios
  const [users, setUsers] = useState([]);
  // Estado para controlar si está cargando datos
  const [loading, setLoading] = useState(false);
  // Estado para almacenar errores
  const [error, setError] = useState(null);

  // Función para cargar todos los usuarios
  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error('Error al cargar usuarios:', err);
      setError('No se pudieron cargar los usuarios. Intenta nuevamente más tarde.');
    } finally {
      setLoading(false);
    }
  };

  // Función para añadir un nuevo usuario
  const addUser = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const newUser = await createUser(userData);
      // Actualizamos el estado añadiendo el nuevo usuario
      setUsers(prevUsers => [newUser, ...prevUsers]);
      return newUser;
    } catch (err) {
      console.error('Error al añadir usuario:', err);
      setError('No se pudo crear el usuario. Intenta nuevamente.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función para actualizar un usuario existente
  const editUser = async (id, userData) => {
    try {
      setLoading(true);
      setError(null);
      const updatedUser = await updateUser(id, userData);
      // Actualizamos el estado reemplazando el usuario modificado
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.ID === id ? updatedUser : user
        )
      );
      return updatedUser;
    } catch (err) {
      console.error(`Error al actualizar usuario con ID ${id}:`, err);
      setError('No se pudo actualizar el usuario. Intenta nuevamente.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar un usuario
  const removeUser = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await deleteUser(id);
      // Actualizamos el estado eliminando el usuario
      setUsers(prevUsers => prevUsers.filter(user => user.ID !== id));
    } catch (err) {
      console.error(`Error al eliminar usuario con ID ${id}:`, err);
      setError('No se pudo eliminar el usuario. Intenta nuevamente.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función para mostrar un diálogo de confirmación antes de eliminar
  const confirmDelete = (id, userName) => {
    return new Promise((resolve) => {
      Alert.alert(
        "Confirmar eliminación",
        `¿Estás seguro de que deseas eliminar al usuario ${userName}?`,
        [
          {
            text: "Cancelar",
            style: "cancel",
            onPress: () => resolve(false)
          },
          {
            text: "Eliminar",
            style: "destructive",
            onPress: () => resolve(true)
          }
        ]
      );
    });
  };

  // Cargamos los usuarios cuando se monta el componente
  useEffect(() => {
    loadUsers();
  }, []);

  // Valor del contexto que se proporcionará a los componentes hijos
  const value = {
    users,
    loading,
    error,
    loadUsers,
    addUser,
    editUser,
    removeUser,
    confirmDelete
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};