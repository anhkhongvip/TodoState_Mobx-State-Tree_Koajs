import '../styles/globals.css';
import { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider, rootStore } from '../mst/Root';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={rootStore}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
