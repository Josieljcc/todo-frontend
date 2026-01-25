import { QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Toaster } from './components/Toaster';
import { TaskFormProvider } from './contexts/TaskFormContext';
import { setNavigate } from './lib/navigation';
import { queryClient } from './lib/queryClient';
import { AppRoutes } from './routes';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return (
    <QueryClientProvider client={queryClient}>
      <TaskFormProvider>
        <AppRoutes />
        <Toaster />
      </TaskFormProvider>
    </QueryClientProvider>
  );
};

export default App;
