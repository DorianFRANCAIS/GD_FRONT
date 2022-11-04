import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {

    render(): JSX.Element {
        
        return (
            <Html>
                <Head>
                    {/* Paste here some custom fonts or use font balise of nextjs */}
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