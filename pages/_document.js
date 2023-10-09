import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta name='description' content='Poem Game PWA - Play Now' />
        <link rel='manifest' href='/manifest.json' />
        <link rel='apple-touch-icon' href='/icon-192x192.png' />
        <meta name='theme-color' content='#4f46e5' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
