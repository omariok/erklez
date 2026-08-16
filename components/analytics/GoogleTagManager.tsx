"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { GTM_ID } from "@/lib/gtm";
import { CONSENT_CHANGE_EVENT, getConsent, type ConsentValue } from "@/lib/consent";

// Google Tag Manager — загружается только после явного согласия на аналитику
// (тот же механизм, что у Метрики, требование 152-ФЗ). Через GTM подключаются
// пиксели Авито, VK Рекламы и партнёрских сетей — без деплоя сайта.
export function GoogleTagManager() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    setAllowed(getConsent()?.analytics === true);
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<ConsentValue>).detail;
      setAllowed(detail?.analytics === true);
    };
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  }, []);

  if (!GTM_ID || !allowed) return null;

  return (
    <>
      <Script id="gtm" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}
