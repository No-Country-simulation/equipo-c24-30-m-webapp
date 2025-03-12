import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { setUserInfo } from '../redux/slices/userSlice';
import { loginSuccess } from '../redux/slices/authSlice';
import userServices from '../services/userServices';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const checkAuth = async () => {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      // Si no hay token y no estamos en una ruta pública, redirigir al login
      const publicRoutes = ['/', '/login', '/options-forms', '/form-adopter', '/form-shelter'];
      if (!publicRoutes.includes(location.pathname)) {
        navigate('/login', { state: { from: location } });
      }
      return;
    }

    try {
      // Verificar si el token ha expirado
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('accessToken');
        delete axios.defaults.headers.common['Authorization'];
        // Redirigir al login manteniendo la ruta actual
        navigate('/login', { state: { from: location } });
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
        // Redirigir al login manteniendo la ruta actual
        navigate('/login', { state: { from: location } });
      }
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      localStorage.removeItem('accessToken');
      delete axios.defaults.headers.common['Authorization'];
      // Redirigir al login manteniendo la ruta actual
      navigate('/login', { state: { from: location } });
    }
  };

  useEffect(() => {
    // Verificar autenticación al montar el componente y cuando cambia la ruta
    checkAuth();

    // Verificar autenticación cada 5 minutos (300000 ms)
    const interval = setInterval(checkAuth, 300000);

    // Limpiar intervalo al desmontar
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
};