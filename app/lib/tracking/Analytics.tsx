// src/lib/tracking/Analytics.tsx
'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { GTM_ID, pageview as gtmPageview } from './gtm'
import { FB_PIXEL_ID, pageview as pixelPageview } from './pixel'
import { LINKEDIN_PARTNER_ID, pageview as linkedinPageview } from './linkedin'

export default function Analytics() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        if (pathname) {
            const queryString = searchParams.toString()
            const url = queryString ? `${pathname}?${queryString}` : pathname
            gtmPageview(url)
            pixelPageview()
            linkedinPageview()
        }
    }, [pathname, searchParams])

    return (
        <>
            {/* GTM Script */}
            {GTM_ID && (
                <Script
                    id="gtm-script"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer', '${GTM_ID}');
            `,
                    }}
                />
            )}

            {/* FB Pixel Script */}
            {FB_PIXEL_ID && (
                <Script
                    id="fb-pixel"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
            `,
                    }}
                />
            )}
            {/* LinkedIn Insight Tag Script */}
            {LINKEDIN_PARTNER_ID && (
                <Script
                    id="linkedin-script"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
              (function(){
                var s = document.getElementsByTagName('script')[0];
                var b = document.createElement('script');
                b.type = 'text/javascript';
                b.async = true;
                b.src = 'https://snap.licdn.com/li/apt/v1/tracker.js';
                s.parentNode.insertBefore(b, s);
              })();
              _linkedin_data_partner_id = '${LINKEDIN_PARTNER_ID}';
            `,
                    }}
                />
            )}

        </>
    )
}
