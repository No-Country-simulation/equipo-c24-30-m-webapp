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

function App() {
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
