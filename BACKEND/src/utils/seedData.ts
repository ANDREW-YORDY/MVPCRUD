// Script de prueba para datos quemados.

import { connectDB, sql } from '../config/db';

/**
 * Script para insertar datos de prueba en la base de datos
 */
const seedDatabase = async (): Promise<void> => {
  try {
    const pool = await connectDB();
    
    // Verificar si la tabla existe
    const tableCheck = await pool.request().query(`
      IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Users')
      SELECT 1 AS TableExists
      ELSE
      SELECT 0 AS TableExists
    `);
    
    // Si la tabla no existe, la creamos
    if (tableCheck.recordset[0].TableExists === 0) {
      console.log('Creando tabla Users...');
      await pool.request().query(`
        CREATE TABLE Users (
          ID INT IDENTITY(1,1) PRIMARY KEY,
          NUMIDENTIFICACIONUSER CHAR(50) NOT NULL,
          USERNAME CHAR(100) NOT NULL,
          DATECREATE DATETIME2 DEFAULT GETDATE()
        )
      `);
      console.log('Tabla Users creada correctamente');
    }
    
    // Insertar datos de prueba
    console.log('Insertando datos de prueba...');
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM Users WHERE NUMIDENTIFICACIONUSER = '1234567890')
      INSERT INTO Users (NUMIDENTIFICACIONUSER, USERNAME, DATECREATE)
      VALUES ('1234567890', 'Usuario de Prueba 1', GETDATE())
    `);
    
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM Users WHERE NUMIDENTIFICACIONUSER = '0987654321')
      INSERT INTO Users (NUMIDENTIFICACIONUSER, USERNAME, DATECREATE)
      VALUES ('0987654321', 'Usuario de Prueba 2', GETDATE())
    `);
    
    console.log('Datos de prueba insertados correctamente');
    
    // Verificar que se insertaron los datos
    const result = await pool.request().query('SELECT * FROM Users');
    console.log('Datos en la tabla Users:');
    console.table(result.recordset);
    
    process.exit(0);
  } catch (error) {
    console.error('Error al sembrar datos de prueba:', error);
    process.exit(1);
  }
};

// Ejecutar la función
seedDatabase();