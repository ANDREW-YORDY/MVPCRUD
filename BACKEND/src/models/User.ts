// Modelo de Usuario.

// Definición de la interfaz para el modelo de Usuario
export interface User {
    id?: number;
    numIdentificacionUser: string;
    userName: string;
    dateCreate?: Date;
  }
  
  // Clase para manejar las operaciones de usuario
  export class UserModel {
    // Esta clase podría contener métodos específicos para manipular los datos
    // antes de ser enviados a la base de datos o después de ser recibidos
    
    /**
     * Transforma un objeto plano a un objeto de tipo User
     * @param data Datos del usuario
     * @returns Objeto User formateado
     */
    static format(data: any): User {
      return {
        id: data.ID,
        numIdentificacionUser: data.NUMIDENTIFICACIONUSER?.trim(),
        userName: data.USERNAME?.trim(),
        dateCreate: data.DATECREATE
      };
    }
  }