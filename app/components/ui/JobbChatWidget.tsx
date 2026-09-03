'use client';

import { useEffect, useRef } from 'react';
import { ChatCircle } from '@phosphor-icons/react';

const GUEST_ID_KEY = 'jobblive_chat_guest_id';
const PORTAL_TOKEN_KEY = 'jobblive_chat_portal_token';
const WIDGET_ASSET_V = '20260903-visitor-name';
const SITE_ORIGEM = 'jobblive';

function normalizeApiBase(url: string): string {
  const value = url.replace(/\/$/, '');
  if (!/\/api$/i.test(value)) {
    return `${value}/api`;
  }
  return value;
}

function getApiBase(): string {
  const raw = process.env.NEXT_PUBLIC_JOBBADMIN_API_URL || '';
  if (!raw) {
    throw new Error('NEXT_PUBLIC_JOBBADMIN_API_URL não configurada.');
  }
  return normalizeApiBase(String(raw));
}

function getOrigin(): string {
  return getApiBase().replace(/\/api\/?$/i, '');
}

function ensureGuestId(): string {
  let id = localStorage.getItem(GUEST_ID_KEY);
  if (!id) {
    id = `${Date.now()}${Math.floor(Math.random() * 1e6)}`;
    localStorage.setItem(GUEST_ID_KEY, id);
  }
  return id;
}

async function bootstrapSiteToken(refresh = false): Promise<string> {
  if (!refresh) {
    const cached = sessionStorage.getItem(PORTAL_TOKEN_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as { token?: string; expiresAt?: number };
        if (parsed.token && parsed.expiresAt && parsed.expiresAt > Date.now()) {
          return parsed.token;
        }
      } catch {
        /* ignore */
      }
    }
  }

  const apiBase = getApiBase();
  const guestId = ensureGuestId();
  const res = await fetch(`${apiBase}/chat/site/bootstrap`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ guest_id: guestId, origem: SITE_ORIGEM }),
  });
  const data = await res.json();
  if (!res.ok || !data.portal_token) {
    throw new Error(data.error || 'Falha ao iniciar chat.');
  }
  const ttlMs = Math.max(60, Number(data.expires_in || 14400) - 60) * 1000;
  sessionStorage.setItem(
    PORTAL_TOKEN_KEY,
    JSON.stringify({ token: data.portal_token, expiresAt: Date.now() + ttlMs }),
  );
  return String(data.portal_token);
}

function loadStylesheet(href: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`link[data-jobb-chat-widget][href="${href}"]`);
    if (existing) {
      resolve();
      return;
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.setAttribute('data-jobb-chat-widget', '1');
    link.onload = () => resolve();
    link.onerror = () => reject(new Error('Falha ao carregar CSS do chat.'));
    document.head.appendChild(link);
  });
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-jobb-chat-widget][src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.setAttribute('data-jobb-chat-widget', '1');
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Falha ao carregar chat.'));
    document.head.appendChild(script);
  });
}

function getWidgetAssetUrls() {
  const origin = getOrigin();
  return {
    jsUrl: `${origin}/chat-widget/chat-widget.v1.js?v=${WIDGET_ASSET_V}`,
    cssUrl: `${origin}/chat-widget/chat-widget.v1.css?v=${WIDGET_ASSET_V}`,
  };
}

let assetsPromise: Promise<void> | null = null;

function ensureWidgetAssets(): Promise<void> {
  if (!assetsPromise) {
    const { jsUrl, cssUrl } = getWidgetAssetUrls();
    assetsPromise = loadStylesheet(cssUrl)
      .then(() => loadScript(jsUrl))
      .catch((err) => {
        assetsPromise = null;
        throw err;
      });
  }
  return assetsPromise;
}

function mountWidgetInstance(): { open: () => void } {
  if (!window.JobbChatWidget?.mount) {
    throw new Error('Widget de chat não disponível.');
  }
  const { cssUrl } = getWidgetAssetUrls();
  return window.JobbChatWidget.mount({
    apiBase: getApiBase(),
    cssUrl,
    mode: 'site',
    hideFab: true,
    tokenProvider: (refresh?: boolean) => bootstrapSiteToken(!!refresh),
  });
}

export default function JobbChatWidget() {
  const instanceRef = useRef<{ open: () => void } | null>(null);
  const openingRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    ensureWidgetAssets()
      .then(() => {
        if (cancelled || instanceRef.current) {
          return;
        }
        instanceRef.current = mountWidgetInstance();
      })
      .catch(() => {
        /* retry no clique */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const onOpen = () => {
    void (async () => {
      if (openingRef.current) {
        return;
      }
      openingRef.current = true;
      try {
        if (!instanceRef.current) {
          await ensureWidgetAssets();
          instanceRef.current = mountWidgetInstance();
        }
        instanceRef.current.open();
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Falha ao abrir o chat.';
        console.error('[JobbChat]', message, err);
        window.alert(
          `${message}\n\nVerifique se a API JobbAdmin está configurada (NEXT_PUBLIC_JOBBADMIN_API_URL).`,
        );
      } finally {
        openingRef.current = false;
      }
    })();
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000]">
      <button
        type="button"
        onClick={onOpen}
        aria-label="Abrir chat"
        className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#14ba65] to-[#10db39] text-white shadow-lg transition-transform duration-500 hover:scale-110 hover:ring-4 hover:ring-white/45"
      >
        <ChatCircle size={40} weight="fill" aria-hidden="true" />
      </button>
    </div>
  );
}

declare global {
  interface Window {
    JobbChatWidget?: {
      mount: (options: Record<string, unknown>) => {
        open: (opts?: unknown) => void;
        close: () => void;
        destroy: () => void;
      };
    };
  }
}
