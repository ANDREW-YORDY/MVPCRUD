// Ruta: MVPCRUD-Backend/server.js

// Importamos los módulos necesarios
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');
require('dotenv').config();

// Inicializamos la aplicación Express
const app = express();

// Configuración de middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de la conexión a SQL Server
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true, // Para conexiones Azure
    trustServerCertificate: true, // Cambiar a false en producción
  },
};

// Función para conectar a la base de datos
async function connectDB() {
  try {
    await sql.connect(dbConfig);
    console.log('Conexión exitosa a SQL Server');
  } catch (error) {
    console.error('Error al conectar a SQL Server:', error);
    process.exit(1);
  }
}

// Conectamos a la base de datos al iniciar el servidor
connectDB();

// Definimos las rutas de la API

// GET - Obtener todos los usuarios
app.get('/api/users', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM Users ORDER BY ID DESC`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).send('Error del servidor');
  }
});

// GET - Obtener un usuario por ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await sql.query`SELECT * FROM Users WHERE ID = ${id}`;
    
    if (result.recordset.length === 0) {
      return res.status(404).send('Usuario no encontrado');
    }
    
    res.json(result.recordset[0]);
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    res.status(500).send('Error del servidor');
  }
});

// POST - Crear un nuevo usuario
app.post('/api/users', async (req, res) => {
  try {
    const { numIdentificacionUser, userName } = req.body;
    
    // Validamos que se proporcionen los datos requeridos
    if (!numIdentificacionUser || !userName) {
      return res.status(400).send('Se requieren todos los campos');
    }
    
    // Fecha actual para dateCreate
    const dateCreate = new Date().toISOString();
    
    // Insertamos el nuevo usuario
    const result = await sql.query`
      INSERT INTO Users (NUMIDENTIFICACIONUSER, USERNAME, DATECREATE)
      OUTPUT INSERTED.ID
      VALUES (${numIdentificacionUser}, ${userName}, ${dateCreate})
    `;
    
    // Obtenemos el ID del nuevo usuario insertado
    const newUserId = result.recordset[0].ID;
    
    res.status(201).json({ 
      id: newUserId,
      numIdentificacionUser,
      userName,
      dateCreate
    });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).send('Error del servidor');
  }
});

// PUT - Actualizar un usuario existente
app.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { numIdentificacionUser, userName } = req.body;
    
    // Validamos que se proporcionen los datos requeridos
    if (!numIdentificacionUser || !userName) {
      return res.status(400).send('Se requieren todos los campos');
    }
    
    // Actualizamos el usuario
    const result = await sql.query`
      UPDATE Users
      SET NUMIDENTIFICACIONUSER = ${numIdentificacionUser}, USERNAME = ${userName}
      OUTPUT INSERTED.*
      WHERE ID = ${id}
    `;
    
    if (result.recordset.length === 0) {
      return res.status(404).send('Usuario no encontrado');
    }
    
    res.json(result.recordset[0]);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).send('Error del servidor');
  }
});

// DELETE - Eliminar un usuario
app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificamos si el usuario existe antes de eliminarlo
    const checkResult = await sql.query`SELECT ID FROM Users WHERE ID = ${id}`;
    
    if (checkResult.recordset.length === 0) {
      return res.status(404).send('Usuario no encontrado');
    }
    
    // Eliminamos el usuario
    await sql.query`DELETE FROM Users WHERE ID = ${id}`;
    
    res.status(200).send('Usuario eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).send('Error del servidor');
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});