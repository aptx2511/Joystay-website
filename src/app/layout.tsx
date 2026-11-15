import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { LangProvider } from "@/lib/lang-context";
import JoyBotWidget from "@/components/chat/JoyBotWidget";
import { SettingsProvider } from "@/lib/settings-context";
import { getSiteSettings } from "@/lib/sanity-data";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const GTM_ID      = process.env.NEXT_PUBLIC_GTM_ID      ?? "";
const GA_ID       = process.env.NEXT_PUBLIC_GA_ID       ?? "";
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID ?? "";
const CLARITY_ID  = process.env.NEXT_PUBLIC_CLARITY_ID  ?? "";
// Mã xác minh Google Search Console (công khai, không phải bí mật)
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Joystay Vietnam — The Art of Stay",
    template: "%s | Joystay Vietnam",
  },
  description:
    "Boutique Homestay & Serviced Apartments in District 3, Ho Chi Minh City. 6 uniquely designed rooms. Self check-in 24/7. Book direct, no platform fees.",
  keywords: ["boutique homestay", "District 3", "Ho Chi Minh City", "Saigon", "serviced apartment", "self checkin"],
  ...(GSC_VERIFICATION ? { verification: { google: GSC_VERIFICATION } } : {}),
  openGraph: {
    siteName: "Joystay Vietnam",
    url: SITE_URL,
    title: "Joystay Vietnam — The Art of Stay",
    description: "6 artistically designed rooms in the heart of District 3, Saigon.",
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <head>
        {/* ── Google Tag Manager ── */}
        {GTM_ID && (
          <Script id="gtm-script" strategy="beforeInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
      </head>
      <body className="antialiased">
        {/* ── GTM noscript fallback ── */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0" width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <SettingsProvider value={settings}>
          <LangProvider>{children}</LangProvider>
        </SettingsProvider>
        <JoyBotWidget />
      </body>

      {/* ── Google Analytics 4 (direct — ensures GA4 detection) ── */}
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      {/* ── Facebook Pixel ── */}
      {FB_PIXEL_ID && (
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* ── Microsoft Clarity (heatmap + session recording) ── */}
      {CLARITY_ID && (
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </Script>
      )}
    </html>
  );
}
