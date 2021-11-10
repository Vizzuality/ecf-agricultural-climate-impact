import type { AppProps } from 'next/app';

import { OverlayProvider } from '@react-aria/overlays';

import 'styles/globals.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <OverlayProvider>
    <Component {...pageProps} />
  </OverlayProvider>
);

export default MyApp;
