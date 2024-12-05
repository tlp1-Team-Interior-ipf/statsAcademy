import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ChatPage from "../pages/ChatPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProfilePage from "../pages/ProgressPage";
import ToolsPage from "../pages/ToolsPage";
import CalendarPage from "../pages/CalendarPage";
import TodoAppPage from "../pages/TodoAppPage";
import ProgressPage from "../pages/ProgressPage";
import EvaluationPage from "../pages/EvaluatoryPage";
import InitialTestPage from "../pages/InitialTestPage";
import PeriodicalTestPage from '../pages/PeriodicalTestPage';
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
      path="/calendar"
      element={
        <PrivateRoute>
          <CalendarPage />
        </PrivateRoute>
      }
    />
    <Route
      path="/todoapp"
      element={
        <PrivateRoute>
          <TodoAppPage />
        </PrivateRoute>
      }
    />
    <Route
      path="/tools"
      element={
        <PrivateRoute>
          <ToolsPage />
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
      path="/progress"
      element={
        <PrivateRoute>
          <ProgressPage />
        </PrivateRoute>
      }
    />
    <Route
      path="/evaluation"
      element={
        <PrivateRoute>
          <EvaluationPage />
        </PrivateRoute>
      }
    />
    <Route
      path="/initialtest"
      element={
        <PrivateRoute>
          <InitialTestPage />
        </PrivateRoute>
      }
    />
    <Route
      path="/periodicaltest"
      element={
        <PrivateRoute>
          <PeriodicalTestPage />
        </PrivateRoute>
      }
    />
    <Route
      path="*"
      element={<NotFoundPage />} // Ruta para la página de error 404
    />
  </Routes>
);