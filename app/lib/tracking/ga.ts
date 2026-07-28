import { WindowWithDataLayer } from "./types";

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const pageview = (url: string) => {
    const win = window as unknown as WindowWithDataLayer;
    if (win.gtag && GA_ID) {
        win.gtag("config", GA_ID, { page_path: url });
    }
};

export const event = ({
    action,
    category,
    label,
    value,
}: {
    action: string;
    category: string;
    label?: string;
    value?: number;
}) => {
    const win = window as unknown as WindowWithDataLayer;
    if (win.gtag && GA_ID) {
        win.gtag("event", action, {
            event_category: category,
            event_label: label,
            value,
        });
    }
};
