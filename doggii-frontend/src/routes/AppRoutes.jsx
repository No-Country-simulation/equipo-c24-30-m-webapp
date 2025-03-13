import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import ProtectedRoute from './ProtectedRoute';
import Login from '../pages/Auth/Login/Login';
import OptionsForms from '../pages/Auth/Registration/OptionsForms';
import FormAdopter from '../pages/Auth/Registration/FormAdopter';
import FormShelter from '../pages/Auth/Registration/FormShelter';
import PlatformLayout from '../layouts/PlatformLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import Profile from '../pages/Profile/Profile';
import Pets from '../pages/Pets/Pets';
import ShelterAdoptionForm from '../pages/AdoptionForm/ShelterForm/ShelterAdoptionForm';
import AdopterAdoptionForm from '../pages/AdoptionForm/AdopterForm/AdopterAdoptionForm';
import Applications from '../pages/Applications/Applications';
import ApplicationDetail from '../pages/Applications/ApplicationViews/AplicationDetail';
import Users from '../pages/Users/Users';
import PetPost from '../pages/Pets/PetPost/PetPost';
import PetDetails from '../pages/Pets/PetDetails/PetDetails';
import PetEdit from '../pages/Pets/PetEdit/PetEdit';
import LandingLayout from '../layouts/LandingLayout';
import ApplicationManage from '../pages/Applications/ApplicationViews/ApplicationManage';

function AppRoutes() {
  useAuth();
  
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/options-forms' element={<OptionsForms />} />
      <Route path='/form-adopter' element={<FormAdopter />} />
      <Route path='/form-shelter' element={<FormShelter />} />
      <Route element={
        <ProtectedRoute>
          <PlatformLayout/>
        </ProtectedRoute>
        }>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/pets' element={<Pets />} />
        <Route path='/adoption-form' element={<ShelterAdoptionForm />} />
        <Route path='/adoption-form/:id' element={<AdopterAdoptionForm />} />
        <Route path='/applications' element={<Applications />} />
        <Route path='/application-manage/:id' element={<ApplicationManage />} />
        <Route path='/adoption-request/:id' element={<ApplicationDetail />} />
        <Route path='/users' element={<Users />} />
        <Route path='/pets/post' element={<PetPost />} />
        <Route path='/pet/:id' element={<PetDetails />} />
        <Route path='/pet/edit/:id' element={<PetEdit />} />
      </Route>
      <Route path='/' element={<LandingLayout />} />
    </Routes>
  );
}

export default AppRoutes;