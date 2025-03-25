const sql = require('mssql');

// Configuración básica directa
const config = {
  user: 'sa',
  password: 'adrdev1995.',
  server: ' 127.0.0.1',
  database: 'CRUDRNER',
  options: {
    trustServerCertificate: true,
    encrypt: false,
    connectionTimeout: 30000, // Aumentar tiempo de espera a 30 segundos
    requestTimeout: 30000
  },
  port: 1433
};

async function testConnection() {
  try {
    console.log('Intentando conectar...');
    await sql.connect(config);
    console.log('Conexión exitosa!');
    
    // Cerrar la conexión
    await sql.close();
  } catch (err) {
    console.error('Error de conexión:', err);
  }
}

testConnection();