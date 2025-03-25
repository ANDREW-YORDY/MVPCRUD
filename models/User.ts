// Configuración de modelos para el Frontend.


// Definir la interfaz del modelo de Usuario
export interface User {
    id?: number;
    numIdentificacionUser: string;
    userName: string;
    dateCreate?: string; // Usamos string para fechas en frontend
  }
  
  // Clase de utilidad para el modelo Usuario
  export class UserModel {
    /**
     * Formatea una fecha a formato localizado
     * @param dateString Fecha en formato string ISO
     * @returns Fecha formateada
     */
    static formatDate(dateString?: string): string {
      if (!dateString) return '';
      return new Date(dateString).toLocaleString();
    }
    
    /**
     * Valida si los datos del usuario son válidos
     * @param user Datos del usuario
     * @returns Objeto con resultado y mensaje de error
     */
    static validate(user: Partial<User>): { isValid: boolean; message?: string } {
      if (!user.numIdentificacionUser || user.numIdentificacionUser.trim() === '') {
        return { isValid: false, message: 'El número de identificación es obligatorio' };
      }
      
      if (!user.userName || user.userName.trim() === '') {
        return { isValid: false, message: 'El nombre de usuario es obligatorio' };
      }
      
      return { isValid: true };
    }
  }
  