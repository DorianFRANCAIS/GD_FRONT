import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import Layout from "../container/Layout/Layout";
import { DefaultSeo } from "next-seo";
import AuthProvider from "../context/AuthProvider";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import { withData } from "../helpers/restrictions";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider context={pageProps}>
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

App.getInitialProps = async ({ Component, ctx }: { Component: any, ctx : any }) => {
  let pageProps = {}
  const { query, pathname, asPath, res } = ctx
  const { user, isLoggedIn, token } = await withData(ctx);
  const tokenCookie = token;

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  let isProtectedRoute = [
    `/dashboard/[[...tab]]`,
    // `/configurator`
  ].includes(pathname);

  if (!isLoggedIn && isProtectedRoute && res) {
    res.writeHead(302, {
      Location: `${process.env.LOCAL_FRONT_SERVER}/login?next=${asPath}`,
    });
    res.end();
  }

  return { pageProps, query, pathname, user, isLoggedIn, tokenCookie };
}
