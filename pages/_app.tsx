import type { AppProps } from "next/app";
import Layout from "../components/layout/layout";
import Notification from "../components/ui/notification";
import { NotificationContextProvider } from "../store/notification-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
