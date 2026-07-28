"use client";

import Script from "next/script";
import { useEffect } from "react";
import { trackPageVisit } from "@/lib/pinterest-events";

interface PinterestTagProps {
  pageName?: string;
}

export default function PinterestTag({ pageName }: PinterestTagProps) {
  const tagId = process.env.NEXT_PUBLIC_PINTEREST_TAG_ID;

  if (!tagId) return null;

  return (
    <>
      <Script
        id="pinterest-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(e){if(!window.pintrk){window.pintrk = function () {
            window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
              n=window.pintrk;n.queue=[],n.version="3.0";var
              t=document.createElement("script");t.async=!0,t.src=e;var
              r=document.getElementsByTagName("script")[0];
              r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
            pintrk('load', '${tagId}');
            pintrk('page');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://ct.pinterest.com/v3/?event=init&tid=${tagId}&noscript=1`}
        />
      </noscript>
      <PinterestPageVisit pageName={pageName} />
    </>
  );
}

function PinterestPageVisit({ pageName }: { pageName?: string }) {
  useEffect(() => {
    trackPageVisit(pageName);
  }, [pageName]);

  return null;
}
