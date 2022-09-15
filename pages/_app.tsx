import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/layout/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>Next Event</title>
        <meta name='description' content='NextJS Events' />
        <meta name='viewport' content='initial-scail=1.0, width=device-width' />
      </Head>
      <Component {...pageProps} />;
    </Layout>
  );
}

export default MyApp;
