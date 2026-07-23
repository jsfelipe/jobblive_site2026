// src/lib/tracking/pixel.ts
import { WindowWithDataLayer } from "./types";

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

export const pageview = () => {
    const win = window as unknown as WindowWithDataLayer;
    if (win.fbq) {
        win.fbq("track", "PageView");
    }
};

export const event = (name: string, options = {}) => {
    const win = window as unknown as WindowWithDataLayer;
    if (win.fbq) {
        win.fbq("track", name, options);
    }
};