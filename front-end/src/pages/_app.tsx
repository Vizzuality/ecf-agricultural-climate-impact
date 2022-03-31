import { QueryClient, QueryClientProvider } from 'react-query';
import { OverlayProvider } from '@react-aria/overlays';
import { AppContextProvider } from 'utils/app-context';

import type { AppProps } from 'next/app';

import 'styles/globals.css';

const queryClient = new QueryClient();

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <OverlayProvider>
    <AppContextProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </AppContextProvider>
  </OverlayProvider>
);

export default MyApp;
