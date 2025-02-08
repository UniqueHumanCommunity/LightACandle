import { useEffect } from 'react';
import MiniKit from '@worldcoin/minikit-js';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    MiniKit.install();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;