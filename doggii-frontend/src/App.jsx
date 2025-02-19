import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './features/auth/Login';
import PlatformLayout from './layouts/PlatformLayout';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/login' element={<Login />} />
        <Route element={<PlatformLayout/>}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
