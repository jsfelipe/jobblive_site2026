// src/lib/tracking/index.ts
import * as gtm from "./gtm";
import * as pixel from "./pixel";
import * as linkedin from "./linkedin";
import { TrackingEvent } from "./types";

export const LINKEDIN_CONVERSION_IDS = {
    lead: 1234567, // ID real do LinkedIn
    contact_form: 1234568,
    ebook_download: 1234569,
};

export const trackPageview = (url: string) => {
    gtm.pageview(url);
    pixel.pageview();
    linkedin.pageview();
};

export const trackEvent = (eventData: TrackingEvent) => {
    gtm.event(eventData);
    if (eventData.action === "lead_form_submit") {
        pixel.event("Lead", { category: eventData.category });
        linkedin.trackConversion(LINKEDIN_CONVERSION_IDS.lead);
    }
};