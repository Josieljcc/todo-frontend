import { Route, Routes } from 'react-router';
import { AuthPage } from '../modules/auth/pages';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/login" element={<AuthPage />} />
    </Routes>
  );
}
