// Ruta: MVPCRUD/components/UserItem.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useUserContext } from '../context/UserContext';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

// Componente para mostrar un usuario individual en la lista
const UserItem = ({ user }) => {
  // Accedemos al contexto de usuarios
  const { removeUser, confirmDelete } = useUserContext();
  
  // Formateamos la fecha para mostrarla
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Función para manejar la edición de un usuario
  const handleEdit = () => {
    // Navegamos a la pantalla de edición pasando el ID del usuario
    router.push({
      pathname: '/edit',
      params: { id: user.ID }
    });
  };
  
  // Función para manejar la eliminación de un usuario
  const handleDelete = async () => {
    // Mostramos diálogo de confirmación antes de eliminar
    const confirmed = await confirmDelete(user.ID, user.USERNAME);
    if (confirmed) {
      try {
        await removeUser(user.ID);
      } catch (error) {
        // El error ya se maneja en el contexto
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{user.USERNAME}</Text>
        <Text style={styles.id}>ID: {user.NUMIDENTIFICACIONUSER}</Text>
        <Text style={styles.date}>
          Creado: {formatDate(user.DATECREATE)}
        </Text>
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]}
          onPress={handleEdit}
        >
          <Ionicons name="pencil" size={20} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Ionicons name="trash" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Estilos del componente
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: Colors.text,
  },
  id: {
    fontSize: 14,
    color: Colors.darkGray,
    marginBottom: 3,
  },
  date: {
    fontSize: 12,
    color: Colors.gray,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: Colors.secondary,
  },
  deleteButton: {
    backgroundColor: Colors.danger,
  },
});

export default UserItem;