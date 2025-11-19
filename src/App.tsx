import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { RouteSetup } from './routes/RouteSetup.tsx';
import { GlobalStyle } from './styles/global.ts';

const queryClient = new QueryClient();

import 'react-toastify/dist/ReactToastify.css';

const isDevtoolsEnabled =
  import.meta.env.MODE === 'development' ||
  import.meta.env.VITE_VERCEL_ENV === 'preview';

console.log(
  'MODE:',
  import.meta.env.MOD,
  ', ENV:',
  import.meta.env.VITE_VERCEL_ENV,
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <BrowserRouter>
        <RouteSetup />
        <ToastContainer />
        {isDevtoolsEnabled && <ReactQueryDevtools initialIsOpen={false} />}
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
