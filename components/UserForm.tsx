// Componente reutilizable.

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Button, Text, Alert } from 'react-native';
import { User, UserModel } from '../models/User';

interface UserFormProps {
  user?: User;
  onSubmit: (user: User) => void;
  onCancel: () => void;
}

/**
 * Componente de formulario para crear o editar usuarios
 */
const UserForm: React.FC<UserFormProps> = ({ user, onSubmit, onCancel }) => {
  // Estado del formulario
  const [formData, setFormData] = useState<User>({
    numIdentificacionUser: '',
    userName: '',
  });
  
  // Estado para errores de validación
  const [errors, setErrors] = useState<{
    numIdentificacionUser?: string;
    userName?: string;
  }>({});
  
  // Cargar datos si se está editando un usuario
  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);
  
  /**
   * Maneja cambios en los campos del formulario
   * @param field Campo a actualizar
   * @param value Nuevo valor
   */
  const handleChange = (field: keyof User, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpia el error cuando el usuario comienza a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };
  
  /**
   * Valida el formulario antes de enviar
   * @returns true si es válido, false si hay errores
   */
  const validateForm = (): boolean => {
    const validation = UserModel.validate(formData);
    
    if (!validation.isValid) {
      // Identificar qué campo tiene el error
      if (validation.message?.includes('identificación')) {
        setErrors({ numIdentificacionUser: validation.message });
      } else if (validation.message?.includes('nombre')) {
        setErrors({ userName: validation.message });
      } else {
        Alert.alert('Error', validation.message);
      }
      return false;
    }
    
    return true;
  };
  
  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user ? 'Editar Usuario' : 'Nuevo Usuario'}</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Número de Identificación:</Text>
        <TextInput
          style={[styles.input, errors.numIdentificacionUser ? styles.inputError : null]}
          value={formData.numIdentificacionUser}
          onChangeText={(value) => handleChange('numIdentificacionUser', value)}
          placeholder="Ingrese número de identificación"
        />
        {errors.numIdentificacionUser && (
          <Text style={styles.errorText}>{errors.numIdentificacionUser}</Text>
        )}
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre de Usuario:</Text>
        <TextInput
          style={[styles.input, errors.userName ? styles.inputError : null]}
          value={formData.userName}
          onChangeText={(value) => handleChange('userName', value)}
          placeholder="Ingrese nombre de usuario"
        />
        {errors.userName && (
          <Text style={styles.errorText}>{errors.userName}</Text>
        )}
      </View>
      
      <View style={styles.buttonContainer}>
        <Button title="Cancelar" onPress={onCancel} color="#888" />
        <Button title={user ? 'Actualizar' : 'Guardar'} onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
});

export default UserForm;