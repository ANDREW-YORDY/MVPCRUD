// Controlador de Usuario

import { Request, Response } from 'express';
import { connectDB, sql } from '../config/db';
import { User, UserModel } from '../models/User';

/**
 * Controlador para gestionar todas las operaciones relacionadas con usuarios
 */
export class UserController {
  
  /**
   * Obtiene todos los usuarios
   * @param req Solicitud HTTP
   * @param res Respuesta HTTP
   */
  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const pool = await connectDB();
      const result = await pool.request().query('SELECT * FROM Users');
      
      // Transformar los resultados al formato de nuestro modelo
      const users = result.recordset.map(user => UserModel.format(user));
      
      res.json(users);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  }

  /**
   * Obtiene un usuario por su ID
   * @param req Solicitud HTTP con parámetro id
   * @param res Respuesta HTTP
   */
  static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const pool = await connectDB();
      
      const result = await pool
        .request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM Users WHERE ID = @id');
      
      if (result.recordset.length === 0) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }
      
      const user = UserModel.format(result.recordset[0]);
      res.json(user);
    } catch (error) {
      console.error('Error al obtener usuario por ID:', error);
      res.status(500).json({ error: 'Error al obtener usuario' });
    }
  }

  /**
   * Crea un nuevo usuario
   * @param req Solicitud HTTP con datos del usuario en el body
   * @param res Respuesta HTTP
   */
  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { numIdentificacionUser, userName } = req.body as User;
      
      // Validaciones básicas
      if (!numIdentificacionUser || !userName) {
        res.status(400).json({ error: 'Los campos numIdentificacionUser y userName son obligatorios' });
        return;
      }
      
      const pool = await connectDB();
      
      // La fecha se genera automáticamente en SQL Server con GETDATE()
      const result = await pool
        .request()
        .input('numId', sql.VarChar(50), numIdentificacionUser)
        .input('userName', sql.VarChar(100), userName)
        .query(`
          INSERT INTO Users (NUMIDENTIFICACIONUSER, USERNAME, DATECREATE)
          OUTPUT INSERTED.*
          VALUES (@numId, @userName, GETDATE())
        `);
      
      const newUser = UserModel.format(result.recordset[0]);
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).json({ error: 'Error al crear usuario' });
    }
  }

  /**
   * Actualiza un usuario existente
   * @param req Solicitud HTTP con parámetro id y datos a actualizar
   * @param res Respuesta HTTP
   */
  static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { numIdentificacionUser, userName } = req.body as User;
      
      // Validaciones básicas
      if (!numIdentificacionUser && !userName) {
        res.status(400).json({ error: 'Debe proporcionar al menos un campo para actualizar' });
        return;
      }
      
      const pool = await connectDB();
      
      // Construir consulta dinámica según los campos proporcionados
      let query = 'UPDATE Users SET ';
      const inputs: any[] = [];
      
      if (numIdentificacionUser) {
        query += 'NUMIDENTIFICACIONUSER = @numId';
        inputs.push({ name: 'numId', type: sql.VarChar(50), value: numIdentificacionUser });
      }
      
      if (userName) {
        if (inputs.length > 0) query += ', ';
        query += 'USERNAME = @userName';
        inputs.push({ name: 'userName', type: sql.VarChar(100), value: userName });
      }
      
      query += ' OUTPUT INSERTED.* WHERE ID = @id';
      
      // Crear la solicitud con los parámetros
      const request = pool.request();
      inputs.forEach(input => {
        request.input(input.name, input.type, input.value);
      });
      request.input('id', sql.Int, id);
      
      const result = await request.query(query);
      
      if (result.recordset.length === 0) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }
      
      const updatedUser = UserModel.format(result.recordset[0]);
      res.json(updatedUser);
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(500).json({ error: 'Error al actualizar usuario' });
    }
  }

  /**
   * Elimina un usuario por su ID
   * @param req Solicitud HTTP con parámetro id
   * @param res Respuesta HTTP
   */
  static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const pool = await connectDB();
      
      // Primero verificamos si el usuario existe
      const checkResult = await pool
        .request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM Users WHERE ID = @id');
      
      if (checkResult.recordset.length === 0) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }
      
      // Si existe, lo eliminamos
      await pool
        .request()
        .input('id', sql.Int, id)
        .query('DELETE FROM Users WHERE ID = @id');
      
      res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      res.status(500).json({ error: 'Error al eliminar usuario' });
    }
  }
}