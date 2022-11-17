import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core';
import Layout from '../container/Layout/Layout';
import { DefaultSeo } from 'next-seo';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light"
        }}
      >
        <Layout>
          <DefaultSeo 
            title="CanineProject"
            titleTemplate="%s | CanineProject"
            description="CanineProject website"
            openGraph={{
              type: "website",
              url: "https://www.cannineproject.net/",
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
    </>
  )
}
