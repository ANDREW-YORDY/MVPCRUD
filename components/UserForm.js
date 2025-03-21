// Ruta: MVPCRUD/components/UserForm.js

import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useUserContext } from '../context/UserContext';
import Colors from '../constants/Colors';

// Componente de formulario reutilizable para crear o editar usuarios
const UserForm = ({ user = null, isEditing = false }) => {
  // Accedemos al contexto de usuarios
  const { addUser, editUser, loading } = useUserContext();
  
  // Estados locales para los campos del formulario
  const [numIdentificacion, setNumIdentificacion] = useState('');
  const [userName, setUserName] = useState('');
  
  // Estados para manejar errores de validación
  const [errors, setErrors] = useState({});

  // Si estamos en modo edición, cargamos los datos del usuario
  useEffect(() => {
    if (isEditing && user) {
      setNumIdentificacion(user.NUMIDENTIFICACIONUSER.toString());
      setUserName(user.USERNAME);
    }
  }, [isEditing, user]);

  // Función para validar el formulario
  const validateForm = () => {
    const newErrors = {};
    
    if (!numIdentificacion.trim()) {
      newErrors.numIdentificacion = 'El número de identificación es requerido';
    } else if (!/^\d+$/.test(numIdentificacion)) {
      newErrors.numIdentificacion = 'Solo se permiten números';
    }
    
    if (!userName.trim()) {
      newErrors.userName = 'El nombre de usuario es requerido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async () => {
    // Validamos el formulario antes de proceder
    if (!validateForm()) return;
    
    try {
      const userData = {
        numIdentificacionUser: numIdentificacion,
        userName: userName
      };

      if (isEditing) {
        // Si estamos editando, actualizamos el usuario existente
        await editUser(user.ID, userData);
      } else {
        // Si no, creamos un nuevo usuario
        await addUser(userData);
      }
      
      // Redirigimos a la pantalla principal
      router.replace('/');
    } catch (error) {
      console.error('Error al procesar el formulario:', error);
      alert('Ocurrió un error. Por favor intenta nuevamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isEditing ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
      </Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Número de Identificación:</Text>
        <TextInput
          style={[styles.input, errors.numIdentificacion && styles.inputError]}
          value={numIdentificacion}
          onChangeText={setNumIdentificacion}
          placeholder="Ingrese número de identificación"
          keyboardType="numeric"
        />
        {errors.numIdentificacion && (
          <Text style={styles.errorText}>{errors.numIdentificacion}</Text>
        )}
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre de Usuario:</Text>
        <TextInput
          style={[styles.input, errors.userName && styles.inputError]}
          value={userName}
          onChangeText={setUserName}
          placeholder="Ingrese nombre de usuario"
        />
        {errors.userName && (
          <Text style={styles.errorText}>{errors.userName}</Text>
        )}
      </View>
      
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {isEditing ? 'Actualizar' : 'Guardar'}
          </Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => router.back()}
        disabled={loading}
      >
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos del componente
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: Colors.primary,
    fontSize: 16,
  },
});

export default UserForm;