"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { YM_ID } from "@/lib/metrika";
import { CONSENT_CHANGE_EVENT, getConsent, type ConsentValue } from "@/lib/consent";

// Счётчик Яндекс.Метрики.
// Подключается только при двух условиях: задан NEXT_PUBLIC_YM_ID и пользователь
// дал согласие на аналитические cookie (см. lib/consent — требование ФЗ-156).
// До согласия ни один скрипт Метрики не грузится.
export function YandexMetrika() {
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

  if (!YM_ID || !allowed) return null;

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
          ym(${YM_ID}, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });
        `}
      </Script>
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${YM_ID}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
