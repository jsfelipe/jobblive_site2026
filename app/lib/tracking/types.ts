
export type TrackingEvent = {
    action: string;
    category: string;
    label?: string;
    value?: number;
    [key: string]: unknown;
};

export interface WindowWithDataLayer extends Window {
    dataLayer: unknown[];
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    _lintrk?: (action: string, params: unknown) => void;
}