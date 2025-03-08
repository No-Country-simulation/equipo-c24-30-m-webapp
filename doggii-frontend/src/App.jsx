import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useAuth } from './hooks/useAuth';

import Login from './pages/Login';
import OptionsForms from './pages/OptionsForms';
import FormAdopter from './pages/FormAdopter';
import FormShelter from './pages/FormShelter';
import PlatformLayout from './layouts/PlatformLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile/Profile';
import Pets from './pages/Pets/Pets';
import Applications from './pages/Applications/Applications';
import ApplicationDetail from './pages/Applications/ApplicationViews/AplicationDetail.jsx';
import AdoptionForm from './pages/AdoptionForm';
import Users from './pages/Users/Users';
import Reports from './pages/Reports/Reports';
import PetPost from './pages/Pets/PetPost/PetPost';
import PetDetails from './pages/Pets/PetDetails/PetDetails';
import PetEdit from './pages/Pets/PetEdit/PetEdit';
import LandingLayout from './layouts/LandingLayout';


function App() {
  useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/options-forms' element={<OptionsForms />} />
        <Route path='/form-adopter' element={<FormAdopter />} />
        <Route path='/form-shelter' element={<FormShelter />} />
        <Route element={<PlatformLayout/>}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/pets' element={<Pets />} />
          <Route path='/applications' element={<Applications />} />
          <Route path='/adoption-request/:id' element={<ApplicationDetail />} />
          <Route path='/adoption-form' element={<AdoptionForm />} />
          <Route path='/users' element={<Users />} />
          <Route path='/reports' element={<Reports />} />
          <Route path='/pets/post' element={<PetPost />} />
          <Route path='/pet/:id' element={<PetDetails />} />
          <Route path='/pet/edit/:id' element={<PetEdit />} />
        </Route>
        <Route path='/' element={<LandingLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
