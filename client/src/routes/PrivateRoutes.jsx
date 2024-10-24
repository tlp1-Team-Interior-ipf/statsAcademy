import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ChatPage from "../pages/ChatPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProfilePage from "../pages/ProfilePage";
import { PrivateRoute } from './PrivateRoute';

export const PrivateRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={
        <PrivateRoute>
          <HomePage />
        </PrivateRoute>
      }
    />
    <Route
      path="/chat"
      element={
        <PrivateRoute>
          <ChatPage />
        </PrivateRoute>
      }
    />
        <Route
      path="/profile"
      element={
        <PrivateRoute>
          <ProfilePage />
        </PrivateRoute>
      }
    />
    <Route
      path="*"
      element={<NotFoundPage />} // Ruta para la página de error 404
    />
  </Routes>
);