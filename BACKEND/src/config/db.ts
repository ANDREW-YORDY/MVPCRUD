// Configuración de la conexión a SQL Server.

import sql from 'mssql';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Configuración de la conexión
const dbConfig: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_DATABASE,
  // port: parseInt(process.env.DB_PORT || '1433', 10),
  options: {
    encrypt: false, // Cambiado a false para conexiones locales // true: Para conexiones Azure
    trustServerCertificate: true, // Cambiar a false en producción
    enableArithAbort: true,
    // connectionTimeout: 30000, // Aumentar tiempo de espera
    requestTimeout: 30000,
    instanceName: process.env.DB_INSTANCE // Usa el nombre de instancia desde .env
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

/**
 * Función para conectar a SQL Server
 * @returns Pool de conexión
 */
const connectDB = async (): Promise<sql.ConnectionPool> => {
  try {
    // Imprime la configuración para depuración (quitar en producción)
    console.log('Intentando conectar con la siguiente configuración:');
    const debugConfig = { ...dbConfig };
    debugConfig.password = '****'; // Ocultar contraseña en logs
    console.log(JSON.stringify(debugConfig, null, 2));
    
    const pool = await sql.connect(dbConfig);
    console.log('Conexión exitosa a SQL Server');
    return pool;
  } catch (error) {
    console.error('Error al conectar a SQL Server:', error);
    throw error;
  }
};

/**
 * Función para verificar la conexión sin intentar operaciones
 * Útil para pruebas
 */
const testConnection = async (): Promise<boolean> => {
  try {
    const pool = await connectDB();
    const result = await pool.request().query('SELECT 1 as testConnection');
    console.log('Test de conexión exitoso:', result.recordset);
    await pool.close();
    return true;
  } catch (error) {
    console.error('Test de conexión fallido:', error);
    return false;
  }
};

export { connectDB, sql, testConnection };