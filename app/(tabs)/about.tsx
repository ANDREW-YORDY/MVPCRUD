// Pantalla de la aplicación.

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';

/**
 * Pantalla de información sobre la aplicación
 */
export default function AboutPage() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>MVPCRUD</Text>
        <Text style={styles.version}>Versión 1.0.0</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acerca de esta aplicación</Text>
          <Text style={styles.paragraph}>
            Esta aplicación es un proyecto CRUD (Crear, Leer, Actualizar, Eliminar) 
            desarrollado con React Native Expo Router y conectado a SQL Server.
          </Text>
          <Text style={styles.paragraph}>
            Permite gestionar usuarios con sus respectivas identificaciones 
            y nombres, almacenando la información en una base de datos SQL Server.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tecnologías utilizadas</Text>
          <Text style={styles.listItem}>• React Native</Text>
          <Text style={styles.listItem}>• Expo Router</Text>
          <Text style={styles.listItem}>• TypeScript</Text>
          <Text style={styles.listItem}>• SQL Server</Text>
          <Text style={styles.listItem}>• Express.js</Text>
          <Text style={styles.listItem}>• Axios</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Arquitectura</Text>
          <Text style={styles.paragraph}>
            La aplicación utiliza una arquitectura de monorepo, con frontend 
            y backend separados para mayor escalabilidad y mantenibilidad.
          </Text>
          <Text style={styles.paragraph}>
            El frontend está construido con React Native Expo Router para 
            navegación y UI, mientras que el backend utiliza Express.js para 
            la API REST conectada a SQL Server.
          </Text>
        </View>
        
        <Text style={styles.footer}>
          Desarrollado como proyecto de práctica - {new Date().getFullYear()}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#007AFF',
  },
  version: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 12,
  },
  listItem: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 6,
    paddingLeft: 8,
  },
  link: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  footer: {
    marginTop: 20,
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
});