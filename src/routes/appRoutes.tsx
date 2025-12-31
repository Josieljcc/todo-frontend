import { Route, Routes, Navigate } from 'react-router';
import { AuthPage } from '../modules/auth/pages';
import { TasksPage } from '../modules/tasks/pages';
import { AppLayout } from '../layouts';
import { ProtectedRoute } from '../components/ProtectedRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />
      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <AppLayout>
              <TasksPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/tasks" replace />} />
    </Routes>
  );
}
