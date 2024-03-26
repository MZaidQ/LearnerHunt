import { Html, Head, Main, NextScript } from 'next/document'
const structureddataOrg= {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Learnerhunt",
  "alternateName": "Learnerhunt",
  "url": "https://www.learnerhunt.com/",
  "logo": "https://www.learnerhunt.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+918800756846",
    "contactType": "reservations",
    "contactOption": "TollFree",
    "areaServed": "IN",
    "availableLanguage": "en"
  },
  
  "sameAs": [
    "https://www.facebook.com/learnerhunt/",
    "https://twitter.com/learnerhunt",
    "https://www.instagram.com/learnerhunt/",
    "https://www.youtube.com/channel/UCz4ZKdDFvEfRfXU68FFk8_g",
    "https://in.linkedin.com/company/learnerhunt-com"
  ],
  
}
export default function Document() {
  return (
    <Html lang="en">
      <Head >
      {/* Google Tag Manager */}
      <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-NG6GCR97');
              `,
            }}
          />
          {/* Google Tag Manager (noscript) */}
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NG6GCR97" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
            }}
          />
          {/* End Google Tag Manager (noscript) */}
          {/* End Google Tag Manager */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structureddataOrg)}}/>
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
