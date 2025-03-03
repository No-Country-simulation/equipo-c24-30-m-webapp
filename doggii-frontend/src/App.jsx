import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import PlatformLayout from './layouts/PlatformLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile/Profile';
import Pets from './pages/Pets/Pets';
import Applications from './pages/Applications/Applications';
import AdoptionForm from './pages/AdoptionForm';
import OptionsForms from './pages/OptionsForms';
import FormAdopter from './pages/FormAdopter';
import FormShelter from './pages/FormShelter';
import Users from './pages/Users/Users';
import Reports from './pages/Reports/Reports';
import LandingLayout from './layouts/LandingLayout';
/*import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { setUserInfo } from './redux/slices/userSlice';
import { loginSuccess } from './redux/slices/authSlice';*/

function App() {
  /*const dispatch = useDispatch();

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
        
        // Obtener el rol del token y llamar al endpoint correspondiente
        const userRole = decodedToken.role.toLowerCase();
        let endpoint;
        
        switch(userRole) {
          case 'adopter':
            endpoint = '/api/adopter/' + decodedToken.id;
            break;
          case 'shelter':
            endpoint = '/api/shelter/' + decodedToken.id;
            break;
          case 'admin':
            endpoint = '/api/admin/' + decodedToken.id;
            break;
          default:
            throw new Error('Rol de usuario no válido');
        }
        
        const response = await axios.get(import.meta.env.VITE_BACKEND_URI + endpoint);
        
        console.log('Respuesta del backend:', response.data);
        
        if (response.data.success) {
          dispatch(setUserInfo(response.data.payload));
          dispatch(loginSuccess(token));
        }
      } catch (error) {
        console.error('Error al recuperar la sesión:', error);
        localStorage.removeItem('accessToken');
        delete axios.defaults.headers.common['Authorization'];
      }
    };

    initializeAuth();
  }, [dispatch]);*/

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/options-forms' element={<OptionsForms />} />
        <Route path='/form-adopter' element={<FormAdopter />} />
        <Route path='/form-shelter' element={<FormShelter />} />
        <Route element={<PlatformLayout/>}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/pets' element={<Pets />} />
          <Route path='/applications' element={<Applications />} />
          <Route path='/adoption-form' element={<AdoptionForm />} />
          <Route path='/users' element={<Users />} />
          <Route path='/reports' element={<Reports />} />
        </Route>
        <Route path='/' element={<LandingLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
