import Document, { Html, Head, Main, NextScript } from "next/document"
import { createGetInitialProps } from '@mantine/next'

const getInitialProps = createGetInitialProps()

class MyDocument extends Document {

    static getInitialProps = getInitialProps

    render(): JSX.Element {
        
        return (
            <Html>
                <Head>
                    <link rel="shortcut icon" href="/dogIcon.png"/> 
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument