// Pantalla de la aplicación.

import React, { useState } from 'react';
import { View, StyleSheet, Alert, Text, ScrollView } from 'react-native';
import { User } from '../models/User';
import { UserService } from '../services/api';
import UserForm from '../components/UserForm';
import { useRouter } from 'expo-router';

/**
 * Pantalla para crear nuevos usuarios
 */
export default function CreateUserPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  /**
   * Maneja el envío del formulario
   * @param userData Datos del usuario a crear
   */
  const handleSubmit = async (userData: User) => {
    try {
      setLoading(true);
      await UserService.create(userData);
      Alert.alert('Éxito', 'Usuario creado correctamente', [
        {
          text: 'Ver usuarios',
          onPress: () => router.push('/'),
        },
      ]);
    } catch (error) {
      console.error('Error al crear usuario:', error);
      Alert.alert('Error', 'No se pudo crear el usuario. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Navega hacia atrás
   */
  const handleCancel = () => {
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Crear Nuevo Usuario</Text>
        <Text style={styles.description}>
          Completa el formulario para agregar un nuevo usuario a la base de datos.
        </Text>
        
        <View style={styles.formContainer}>
          <UserForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </View>
        
        {loading && (
          <View style={styles.loadingOverlay}>
            <Text style={styles.loadingText}>Guardando...</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});