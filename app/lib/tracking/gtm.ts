// src/lib/tracking/gtm.ts
import { TrackingEvent, WindowWithDataLayer } from "./types";

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const pageview = (url: string) => {
    const win = window as unknown as WindowWithDataLayer;
    if (typeof win.dataLayer !== "undefined") {
        win.dataLayer.push({
            event: "pageview",
            page: url,
        });
    }
};

export const event = ({ action, category, label, value, ...rest }: TrackingEvent) => {
    const win = window as unknown as WindowWithDataLayer;
    if (typeof win.dataLayer !== "undefined") {
        win.dataLayer.push({
            event: action,
            event_category: category,
            event_label: label,
            value: value,
            ...rest,
        });
    }
};