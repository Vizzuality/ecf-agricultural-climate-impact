import type { AppProps } from 'next/app';

import { OverlayProvider } from '@react-aria/overlays';
import { AppContextProvider } from 'utils/app-context';

import 'styles/globals.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <OverlayProvider>
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  </OverlayProvider>
);

export default MyApp;
