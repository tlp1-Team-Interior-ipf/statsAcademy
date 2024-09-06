import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { AuthProvider } from '../context/authContext';

const AppRoutes = () => (
  <AuthProvider>
  <Router>
    <Routes>
      <Route path="/*" element={<PublicRoutes />} />
      <Route path="/home/*" element={<PrivateRoutes />} />
    </Routes>
  </Router>
</AuthProvider>
);

export default AppRoutes;