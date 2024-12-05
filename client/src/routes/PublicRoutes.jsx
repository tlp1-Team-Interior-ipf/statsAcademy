import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import SignInPage from "../pages/SignInPage";
import LogInPage from '../pages/LogInPage';
import NotFoundPage from '../pages/NotFoundPage';

export const PublicRoutes = () => (
  <Routes>
    <Route index element={<LandingPage />} />
    <Route path="/login" element={<LogInPage />} />
    <Route path="/signin" element={<SignInPage />} />
    <Route path="*" element={<NotFoundPage />} /> {/* Ruta para manejar 404 */}
  </Routes>
);