import { AppProps } from 'next/app';
import { ToastProvider } from "react-toast-notifications";
import { Provider as NexAuthProvider } from 'next-auth/client';

import { Header } from '../components/Header';

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <NexAuthProvider session={pageProps.session}>
      <ToastProvider autoDismiss={true} autoDismissTimeout={2000}>
        <Header />
        <Component {...pageProps} />
      </ToastProvider>
    </NexAuthProvider>
  )
}

export default MyApp
