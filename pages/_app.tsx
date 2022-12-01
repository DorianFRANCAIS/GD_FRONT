import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import Layout from "../container/Layout/Layout";
import { DefaultSeo } from "next-seo";
import AuthProvider from "../context/AuthProvider";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
        }}
      >
        <Layout>
          <DefaultSeo
            title="CanineProject"
            titleTemplate="%s | CanineProject"
            description="CanineProject website"
            openGraph={{
              type: "website",
              url: "https://www.cannineproject.fr/",
              site_name: "CanineProject",
            }}
            twitter={{
              handle: "@handle",
              site: "@site",
              cardType: "summary_large_image",
            }}
          />
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </AuthProvider>
  );
}
