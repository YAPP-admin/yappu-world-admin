import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { RouteSetup } from './routes/RouteSetup.tsx';
import { GlobalStyle } from './styles/global.ts';

const queryClient = new QueryClient();

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <BrowserRouter>
        <RouteSetup />
        <ToastContainer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
