import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { RouteSetup } from './routes/RouteSetup.tsx';
import { GlobalStyle } from './styles/global.ts';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <BrowserRouter>
        <RouteSetup />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
