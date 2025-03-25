// Pantalla de la aplicación.

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { User } from '../models/User';
import { UserService } from '../services/api';
import UserForm from '../components/UserForm';

/**
 * Pantalla para editar un usuario existente
 */
export default function EditUserPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos del usuario
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!id) {
          setError('ID de usuario no proporcionado');
          setLoading(false);
          return;
        }

        const userData = await UserService.getById(Number(id));
        setUser(userData);
      } catch (err) {
        console.error('Error al cargar usuario:', err);
        setError('No se pudo cargar la información del usuario');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = async (userData: User) => {
    try {
      setSaving(true);
      
      if (!id) {
        throw new Error('ID no proporcionado');
      }
      
      await UserService.update(Number(id), userData);
      Alert.alert('Éxito', 'Usuario actualizado correctamente', [
        {
          text: 'Volver a la lista',
          onPress: () => router.back(),
        },
      ]);
    } catch (err) {
      console.error('Error al actualizar usuario:', err);
      Alert.alert('Error', 'No se pudo actualizar el usuario');
    } finally {
      setSaving(false);
    }
  };

  /**
   * Navega hacia atrás
   */
  const handleCancel = () => {
    router.back();
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Cargando información del usuario...</Text>
      </View>
    );
  }

  if (error || !user) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error || 'No se pudo cargar el usuario'}</Text>
        <Text 
          style={styles.backLink}
          onPress={() => router.back()}
        >
          Volver a la lista
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Editar Usuario</Text>
        <Text style={styles.subtitle}>ID: {user.id}</Text>
        
        <View style={styles.formContainer}>
          <UserForm
            user={user}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </View>
        
        {saving && (
          <View style={styles.loadingOverlay}>
            <Text style={styles.loadingText}>Guardando cambios...</Text>
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
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
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 16,
  },
  backLink: {
    fontSize: 16,
    color: '#007AFF',
    textDecorationLine: 'underline',
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
});