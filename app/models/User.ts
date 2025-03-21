/**
 * Modelo que representa un usuario en nuestra aplicación.
 * Corresponde a la tabla de usuarios en SQL Server.
 */
export interface User {
    id?: number;               // ID del registro, opcional porque al crear un usuario nuevo no tendrá ID asignado
    numIdentificacionUser: string; // Número de identificación del usuario
    userName: string;          // Nombre del usuario
    dateCreate?: string;       // Fecha de creación, opcional porque se genera automáticamente en SQL Server
  }