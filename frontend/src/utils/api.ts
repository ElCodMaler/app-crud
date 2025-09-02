import type { User } from "../types";

export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
  errors?: Record<string, string>;
}

export const AuthService = {
  register: async (data: User): Promise<ApiResponse> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user`, {
        method: 'POST',
        mode: 'cors', // Asegúrate de incluir esto
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer tu-token' // Si necesitas autenticación
        },
        credentials: 'include', // Para cookies si usas sesiones
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en el registro');
      }

      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  },
  get: async (): Promise<ApiResponse> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user`, {
        method: 'GET',
        mode: 'cors', // Asegúrate de incluir esto
        credentials: 'include', // Solo si usas cookies
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer tu-token' // Si necesitas autenticación
        }
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error de Entrada');
      }

      return response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  },
  update: async (data: User): Promise<ApiResponse> => {
    try{
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/${data.id}`, {
        method: 'PUT',
        mode: 'cors', // Asegúrate de incluir esto
        credentials: 'include', // Solo si usas cookies
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer tu-token' // Si necesitas autenticación
        }
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error de Entrada');
      }
      return response.json();
    } catch(error){
      console.error('Fetch error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  },
  delete: async (id: number): Promise<ApiResponse> => {
    try{
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/${id}`, {
        method: 'DELETE',
        mode: 'cors', // Asegúrate de incluir esto
        credentials: 'include', // Solo si usas cookies
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer tu-token' // Si necesitas autenticación
        }
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error de Entrada');
      }
      return response.json();
    } catch(error){
      console.error('Fetch error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }
};