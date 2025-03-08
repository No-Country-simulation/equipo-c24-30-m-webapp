import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { setUserInfo } from '../redux/slices/userSlice';
import { loginSuccess } from '../redux/slices/authSlice';
import userServices from '../services/userServices';

export const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('accessToken');
      
      if (!token) return;

      try {
        // Verificar si el token ha expirado
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          localStorage.removeItem('accessToken');
          delete axios.defaults.headers.common['Authorization'];
          return;
        }

        // Configurar axios con el token válido
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Obtener datos del usuario usando userServices
        try {
          const response = await userServices.getUser(decodedToken.id, decodedToken.role.toLowerCase());
          
          if (response.success) {
            dispatch(setUserInfo({
              ...response.payload,
              _id: decodedToken.id
            }));
            dispatch(loginSuccess(token));
          }
        } catch (error) {
          console.error('Error al recuperar datos del usuario:', error);
          localStorage.removeItem('accessToken');
          delete axios.defaults.headers.common['Authorization'];
        }
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        localStorage.removeItem('accessToken');
        delete axios.defaults.headers.common['Authorization'];
      }
    };

    initializeAuth();
  }, [dispatch]);
};