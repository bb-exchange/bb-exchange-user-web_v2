import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

const clarityCode = `(function (c, l, a, r, i, t, y) {
  c[a] =
    c[a] ||
    function () {
      (c[a].q = c[a].q || []).push(arguments);
    };
  t = l.createElement(r);
  t.async = 1;
  t.src = "https://www.clarity.ms/tag/" + i;
  y = l.getElementsByTagName(r)[0];
  y.parentNode.insertBefore(t, y);
})(window, document, "clarity", "script", "kwws1mc9br");`;

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/images/favicon_32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/images/favicon_16x16.png"
        />

        <Script id="ms-clarity" strategy="beforeInteractive">
          {clarityCode}
        </Script>
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script
          src="https://cdn.iamport.kr/v1/iamport.js"
          strategy="beforeInteractive"
        />
      </body>
    </Html>
  );
}
