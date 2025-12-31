import { Navigate, Route, Routes } from 'react-router';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { AppLayout } from '../layouts';
import { AuthPage } from '../modules/auth/pages';
import { SettingsPage } from '../modules/settings/pages';
import { TaskDetailPage, TasksPage } from '../modules/tasks/pages';

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
      <Route
        path="/tasks/:id"
        element={
          <ProtectedRoute>
            <AppLayout>
              <TaskDetailPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <AppLayout>
              <SettingsPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/tasks" replace />} />
    </Routes>
  );
}
