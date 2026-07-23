// src/lib/tracking/linkedin.ts
import { WindowWithDataLayer } from "./types";

export const LINKEDIN_PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;

export const pageview = () => {
    const win = window as unknown as WindowWithDataLayer;
    if (win._lintrk) {
        win._lintrk("track", { conversion_id: LINKEDIN_PARTNER_ID });
    }
};

// Para conversões específicas (ex: download de ebook, contato)
export const trackConversion = (conversionId: string | number) => {
    const win = window as unknown as WindowWithDataLayer;
    if (win._lintrk) {
        win._lintrk("track", { conversion_id: conversionId });
    }
};