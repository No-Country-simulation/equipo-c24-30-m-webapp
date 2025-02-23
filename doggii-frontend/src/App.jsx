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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/options-forms' element={<OptionsForms />} />
        <Route path='/form-adopter' element={<FormAdopter />} />
        <Route element={<PlatformLayout/>}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/perfil' element={<Profile />} />
          <Route path='/mascotas' element={<Pets />} />
          <Route path='/solicitudes' element={<Applications />} />
          <Route path='/formulario' element={<AdoptionForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
