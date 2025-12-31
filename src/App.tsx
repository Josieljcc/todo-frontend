import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/Toaster';
import { AppRoutes } from './routes';

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
      <Toaster />
    </QueryClientProvider>
  );
};

export default App;
