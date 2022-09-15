import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/layout/layout";
import Notification from "../components/ui/notification";
import { NotificationContextProvider } from "../store/notification-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Next Event</title>
          <meta name='description' content='NextJS Events' />
          <meta
            name='viewport'
            content='initial-scail=1.0, width=device-width'
          />
        </Head>
        <Component {...pageProps} />;
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
