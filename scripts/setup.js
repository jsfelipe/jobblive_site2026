const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

let PORT = 3030;

// Caminhos dos arquivos de configuração
const ENV_PATH = path.resolve(process.cwd(), '.env');
const ENV_EXAMPLE_PATH = path.resolve(process.cwd(), '.env.example');
const SEO_PATH = path.resolve(process.cwd(), 'app/config/seo.json');
const CONTACTS_PATH = path.resolve(process.cwd(), 'app/config/contacts.json');
const THEME_PATH = path.resolve(process.cwd(), 'app/config/theme.json');
const GLOBALS_CSS_PATH = path.resolve(process.cwd(), 'app/globals.css');
const DESIGN_SYSTEM_PATH = path.resolve(process.cwd(), 'design-system.md');
const APP_DIR = path.resolve(process.cwd(), 'app');

// 1. Função para escanear rotas estáticas na pasta app/
function getStaticRoutes(dir, baseRoute = '') {
    const routes = [];
    const ignoreDirs = ['api', 'components', 'config', 'lib'];
    const folderName = path.basename(dir);

    if (ignoreDirs.includes(folderName)) {
        return [];
    }

    if (!fs.existsSync(dir)) return [];
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            const isRouteGroup = file.startsWith('(') && file.endsWith(')');
            const nextBaseRoute = isRouteGroup ? baseRoute : `${baseRoute}/${file}`;
            routes.push(...getStaticRoutes(fullPath, nextBaseRoute));
        } else if (file.match(/^page\.(tsx|ts|jsx|js)$/)) {
            routes.push(baseRoute === '' ? '/' : baseRoute);
        }
    }

    return routes;
}

// 2. Função para parsear arquivo .env
function parseEnv(filePath) {
    if (!fs.existsSync(filePath)) return {};
    const content = fs.readFileSync(filePath, 'utf-8');
    const config = {};
    content.split(/\r?\n/).forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
            const index = trimmed.indexOf('=');
            if (index !== -1) {
                const key = trimmed.substring(0, index).trim();
                const value = trimmed.substring(index + 1).trim();
                config[key] = value;
            }
        }
    });
    return config;
}

// 3. Função para gerar conteúdo do arquivo .env
function stringifyEnv(config) {
    return `# =========================================================================
# CONFIGURAÇÕES DE PRODUÇÃO / CLIENTE (GERADO AUTOMATICAMENTE VIA SETUP WIZARD)
# =========================================================================

# Nome do projeto / cliente (usado na navbar, rodapé, títulos de páginas, etc.)
NEXT_PUBLIC_PROJECT_NAME=${config.NEXT_PUBLIC_PROJECT_NAME || ''}

# URL Oficial do site (usado para gerar sitemap.xml e robots.txt)
NEXT_PUBLIC_SITE_URL=${config.NEXT_PUBLIC_SITE_URL || ''}

# Google Search Console (ID de verificação da Meta Tag, ex: "google-site-verification")
NEXT_PUBLIC_GSC_VERIFICATION_ID=${config.NEXT_PUBLIC_GSC_VERIFICATION_ID || ''}

# Google Tag Manager (ID do contêiner, ex: GTM-XXXXXX)
NEXT_PUBLIC_GTM_ID=${config.NEXT_PUBLIC_GTM_ID || ''}

# Meta Pixel (Facebook Pixel ID, ex: 1234567890)
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=${config.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || ''}

# LinkedIn Insight Tag (Partner ID, ex: 98765)
NEXT_PUBLIC_LINKEDIN_PARTNER_ID=${config.NEXT_PUBLIC_LINKEDIN_PARTNER_ID || ''}

# CMS (Opcional - Ativar apenas se integrar com Sanity posteriormente)
NEXT_PUBLIC_SANITY_PROJECT_ID=${config.NEXT_PUBLIC_SANITY_PROJECT_ID || ''}
NEXT_PUBLIC_SANITY_DATASET=${config.NEXT_PUBLIC_SANITY_DATASET || 'production'}
`;
}

// Helper para gerar link do WhatsApp limpando a formatação do número
function formatWhatsappLink(number) {
    if (!number) return '';
    let clean = number.replace(/\D/g, ''); // Remove tudo que não for dígito
    if (clean.length === 10 || clean.length === 11) {
        clean = '55' + clean; // Se for número BR sem DDI, adiciona 55
    }
    return `https://wa.me/${clean}`;
}

// Helper para salvar arquivos recebidos em formato Base64
function saveBase64File(base64Data, originalName, defaultSubdir = 'public/assets/img') {
    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
        throw new Error('Formato base64 inválido');
    }
    const fileBuffer = Buffer.from(matches[2], 'base64');

    // Obter extensão do arquivo
    const mimeType = matches[1];
    let ext = '.png';
    if (mimeType === 'image/svg+xml') ext = '.svg';
    else if (mimeType === 'image/jpeg') ext = '.jpg';
    else if (mimeType === 'image/gif') ext = '.gif';
    else if (mimeType === 'image/x-icon') ext = '.ico';
    else if (mimeType === 'image/webp') ext = '.webp';
    else {
        const origExt = path.extname(originalName);
        if (origExt) ext = origExt;
    }

    // Gerar um nome de arquivo seguro
    const nameWithoutExt = path.basename(originalName, path.extname(originalName))
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, '');
    const filename = `${nameWithoutExt}${ext}`;

    const targetDir = path.resolve(process.cwd(), defaultSubdir);
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    const targetPath = path.join(targetDir, filename);
    fs.writeFileSync(targetPath, fileBuffer);

    // Retorna o caminho relativo que o Next.js usará no frontend (começando com /assets/img/)
    return `/assets/img/${filename}`;
}

// Helpers de manipulação de cores para gerar escala cromática 50-900
function hexToRgb(hex) {
    try {
        hex = hex.replace(/^#/, '');
        if (hex.length === 3) {
            hex = hex.split('').map(char => char + char).join('');
        }
        const num = parseInt(hex, 16);
        if (isNaN(num)) return null;
        return {
            r: (num >> 16) & 255,
            g: (num >> 8) & 255,
            b: num & 255
        };
    } catch (e) {
        return null;
    }
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function mixColors(rgb1, rgb2, weight) {
    const r = Math.round(rgb1.r * (1 - weight) + rgb2.r * weight);
    const g = Math.round(rgb1.g * (1 - weight) + rgb2.g * weight);
    const b = Math.round(rgb1.b * (1 - weight) + rgb2.b * weight);
    return rgbToHex(r, g, b);
}

function generateColorScale(hexColor, fallback = '#8b5cf6') {
    let rgb = hexToRgb(hexColor);
    if (!rgb) {
        rgb = hexToRgb(fallback) || { r: 139, g: 92, b: 246 };
    }
    
    const white = { r: 255, g: 255, b: 255 };
    const black = { r: 0, g: 0, b: 0 };
    
    return {
        50: mixColors(rgb, white, 0.93),
        100: mixColors(rgb, white, 0.82),
        200: mixColors(rgb, white, 0.65),
        300: mixColors(rgb, white, 0.45),
        400: mixColors(rgb, white, 0.20),
        500: rgbToHex(rgb.r, rgb.g, rgb.b),
        600: mixColors(rgb, black, 0.15),
        700: mixColors(rgb, black, 0.30),
        800: mixColors(rgb, black, 0.48),
        900: mixColors(rgb, black, 0.65)
    };
}

function getContrastColor(hexColor) {
    const rgb = hexToRgb(hexColor);
    if (!rgb) return '#ffffff';
    // Luminância relativa
    const a = [rgb.r, rgb.g, rgb.b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    const luminance = a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    return luminance > 0.45 ? '#09090b' : '#ffffff';
}

// Helper para gerar o arquivo CSS globals.css dinâmico com o tema do Tailwind v4
function generateGlobalsCSS(theme) {
    const primaryScale = generateColorScale(theme.primaryColor, '#c5f264');
    const secondaryScale = generateColorScale(theme.secondaryColor, '#30b300');
    const primaryContrast = getContrastColor(theme.primaryColor);
    const secondaryContrast = getContrastColor(theme.secondaryColor);

    return `@import "tailwindcss";

/* ─────────────────────────────────────────────────────────────────────────
   Configurações de Cores e Fontes Dinâmicas (Setup)
   ───────────────────────────────────────────────────────────────────────── */
:root {
  --background: ${theme.backgroundColor};
  --foreground: ${theme.foregroundColor};
  --primary: ${primaryScale[500]};
  --primary-50: ${primaryScale[50]};
  --primary-100: ${primaryScale[100]};
  --primary-200: ${primaryScale[200]};
  --primary-300: ${primaryScale[300]};
  --primary-400: ${primaryScale[400]};
  --primary-500: ${primaryScale[500]};
  --primary-600: ${primaryScale[600]};
  --primary-700: ${primaryScale[700]};
  --primary-800: ${primaryScale[800]};
  --primary-900: ${primaryScale[900]};
  --primary-contrast: ${primaryContrast};

  --secondary: ${secondaryScale[500]};
  --secondary-50: ${secondaryScale[50]};
  --secondary-100: ${secondaryScale[100]};
  --secondary-200: ${secondaryScale[200]};
  --secondary-300: ${secondaryScale[300]};
  --secondary-400: ${secondaryScale[400]};
  --secondary-500: ${secondaryScale[500]};
  --secondary-600: ${secondaryScale[600]};
  --secondary-700: ${secondaryScale[700]};
  --secondary-800: ${secondaryScale[800]};
  --secondary-900: ${secondaryScale[900]};
  --secondary-contrast: ${secondaryContrast};
}

@theme {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-50: var(--primary-50);
  --color-primary-100: var(--primary-100);
  --color-primary-200: var(--primary-200);
  --color-primary-300: var(--primary-300);
  --color-primary-400: var(--primary-400);
  --color-primary-500: var(--primary-500);
  --color-primary-600: var(--primary-600);
  --color-primary-700: var(--primary-700);
  --color-primary-800: var(--primary-800);
  --color-primary-900: var(--primary-900);
  --color-primary-contrast: var(--primary-contrast);

  --color-secondary: var(--secondary);
  --color-secondary-50: var(--secondary-50);
  --color-secondary-100: var(--secondary-100);
  --color-secondary-200: var(--secondary-200);
  --color-secondary-300: var(--secondary-300);
  --color-secondary-400: var(--secondary-400);
  --color-secondary-500: var(--secondary-500);
  --color-secondary-600: var(--secondary-600);
  --color-secondary-700: var(--secondary-700);
  --color-secondary-800: var(--secondary-800);
  --color-secondary-900: var(--secondary-900);
  --color-secondary-contrast: var(--secondary-contrast);
  
  --font-sans: var(--font-body), sans-serif;
  --font-display: var(--font-title), sans-serif;

  /* Button Heights */
  --btn-sm-height: 32px;
  --btn-md-height: 40px;
  --btn-lg-height: 48px;

  /* Button Padding X */
  --btn-sm-px: 12px;
  --btn-md-px: 16px;
  --btn-lg-px: 24px;

  /* Button Padding Y */
  --btn-sm-py: 6px;
  --btn-md-py: 8px;
  --btn-lg-py: 12px;

  /* Icon Sizes */
  --icon-xs: 16px;
  --icon-sm: 20px;
  --icon-md: 24px;
  --icon-lg: 32px;

  /* Icon Spacing */
  --icon-gap-sm: 8px;
  --icon-gap-md: 12px;

  /* Tamanhos de fonte (12px → 128px) */
  --text-2xs: 0.75rem;
  --text-xs: 0.875rem;
  --text-sm: 1rem;
  --text-md: 1.125rem;
  --text-lg: 1.25rem;
  --text-xl: 1.5rem;
  --text-2xl: 1.75rem;
  --text-3xl: 2rem;
  --text-4xl: 2.25rem;
  --text-5xl: 2.5rem;
  --text-6xl: 3rem;
  --text-7xl: 3.5rem;
  --text-8xl: 4rem;
  --text-9xl: 4.5rem;
  --text-10xl: 5rem;
  --text-11xl: 6rem;
  --text-12xl: 7rem;
  --text-display: 8rem;

  /* Pesos de fonte */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
  --font-weight-black: 900;

  /* Letter spacing */
  --tracking-tightest: -0.03em;
  --tracking-tighter: -0.025em;
  --tracking-tight: -0.02em;
  --tracking-snug: -0.015em;
  --tracking-normal: 0em;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;

  /* Line height */
  --leading-none: 1;
  --leading-tightest: 1.05;
  --leading-tight: 1.1;
  --leading-snug: 1.15;
  --leading-normal: 1.2;
  --leading-relaxed: 1.3;
  --leading-loose: 1.4;
  --leading-body: 1.5;
  --leading-reading: 1.6;
  --leading-spacious: 1.7;

  /* Border radius */
  --radius-none: 0px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;

  /* Border width */
  --border-width-DEFAULT: 1px;
  --border-width-medium: 1.5px;
  --border-width-thick: 2px;

  /* Max width */
  --max-w-none: none;
  --max-w-full: 100%;
  --max-w-screen: 100vw;
  --max-w-prose: 65ch;
  --max-w-site: 1440px;

  /* Breakpoints */
  --breakpoint-sm: 480px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1440px;
  --breakpoint-3xl: 1920px;

  /* Animação do Marquee */
  --animate-marquee: marquee 35s linear infinite;

  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
}

/* ─────────────────────────────────────────────────────────────────────────
   Base — resets e defaults globais
   ───────────────────────────────────────────────────────────────────────── */
@layer base {
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    font-family: var(--font-sans);
    color: var(--color-foreground);
    background-color: var(--color-background);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection {
    background-color: var(--color-primary);
    color: var(--color-background);
  }

  html, body {
    scroll-behavior: smooth;
    text-rendering: optimizeSpeed;
    background-color: var(--color-background);
    color: var(--color-foreground);
  }

  /* Headings canônicos */
  h1 {
    font-family: var(--font-display);
    font-size: var(--text-5xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--leading-tightest);
    letter-spacing: var(--tracking-tightest);
    color: var(--color-foreground);
  }

  @media (min-width: 768px) {
    h1 { font-size: var(--text-7xl); }
  }

  @media (min-width: 1440px) {
    h1 { font-size: var(--text-9xl); }
  }

  h2 {
    font-family: var(--font-display);
    font-size: var(--text-3xl);
    font-weight: var(--font-weight-extrabold);
    line-height: var(--leading-tight);
    letter-spacing: var(--tracking-tighter);
    color: var(--color-foreground);
  }

  @media (min-width: 768px) {
    h2 { font-size: var(--text-5xl); }
  }

  @media (min-width: 1440px) {
    h2 { font-size: var(--text-7xl); }
  }

  h3 {
    font-family: var(--font-display);
    font-size: var(--text-2xl);
    font-weight: var(--font-weight-extrabold);
    line-height: var(--leading-snug);
    letter-spacing: var(--tracking-tight);
    color: var(--color-foreground);
  }

  @media (min-width: 768px) {
    h3 { font-size: var(--text-4xl); }
  }

  @media (min-width: 1440px) {
    h3 { font-size: var(--text-5xl); }
  }

  h4 {
    font-family: var(--font-display);
    font-size: var(--text-xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--leading-normal);
    letter-spacing: var(--tracking-snug);
    color: var(--color-foreground);
  }

  @media (min-width: 768px) {
    h4 { font-size: var(--text-2xl); }
  }

  h5 {
    font-family: var(--font-display);
    font-size: var(--text-md);
    font-weight: var(--font-weight-bold);
    line-height: var(--leading-relaxed);
    letter-spacing: var(--tracking-snug);
    color: var(--color-foreground);
  }

  @media (min-width: 768px) {
    h5 { font-size: var(--text-lg); }
  }

  h6 {
    font-family: var(--font-display);
    font-size: var(--text-sm);
    font-weight: var(--font-weight-semibold);
    line-height: var(--leading-loose);
    letter-spacing: var(--tracking-normal);
    color: color-mix(in srgb, var(--color-foreground) 70%, transparent);
  }

  p {
    font-family: var(--font-sans);
    font-size: var(--text-sm);
    font-weight: var(--font-weight-normal);
    line-height: var(--leading-spacious);
    color: color-mix(in srgb, var(--color-foreground) 80%, transparent);
  }

  a {
    color: var(--color-primary-500);
    text-decoration: none;
    text-underline-offset: 3px;
    transition: color 150ms;
  }

  a:hover, a:active {
    color: var(--color-primary-400);
  }

  input, textarea, select {
    font-family: var(--font-sans);
    font-size: var(--text-sm);
    color: var(--color-foreground);
    background-color: color-mix(in srgb, var(--color-foreground) 5%, transparent);
    border: 1px solid color-mix(in srgb, var(--color-foreground) 15%, transparent);
    border-radius: var(--radius-md);
    padding: 8px 24px;
    width: 100%;
    transition: border-color 150ms;
    outline: none;
  }

  input::placeholder, textarea::placeholder {
    color: color-mix(in srgb, var(--color-foreground) 40%, transparent);
  }

  input:hover, textarea:hover, select:hover {
    border-color: color-mix(in srgb, var(--color-foreground) 30%, transparent);
  }

  input:focus, textarea:focus, select:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-primary) 20%, transparent);
  }

  input:disabled, textarea:disabled, select:disabled {
    background-color: color-mix(in srgb, var(--color-foreground) 10%, transparent);
    color: color-mix(in srgb, var(--color-foreground) 30%, transparent);
    cursor: not-allowed;
    border-color: color-mix(in srgb, var(--color-foreground) 10%, transparent);
  }

  ul, ol { padding-left: 20px; }
}

/* ─────────────────────────────────────────────────────────────────────────
   @utility — Utilitários customizados do design system
   ───────────────────────────────────────────────────────────────────────── */
/* Margem lateral de segurança padrão em layouts/containers no mobile é sempre de 24px (px-6) */
@utility container-site {
  width: 100%;
  max-width: var(--max-w-site);
  margin-inline: auto;
  padding-inline: 24px;
}

@utility container {
  width: 100%;
  max-width: var(--max-w-site);
  margin-inline: auto;
  padding-inline: 24px;
}

@utility full { width: 100%; }

/* ─────────────────────────────────────────────────────────────────────────
   Componentes do Design System (Flexíveis a Cores Dinâmicas)
   ───────────────────────────────────────────────────────────────────────── */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-weight: var(--font-weight-normal);
    line-height: 1;
    cursor: pointer;
    border-radius: var(--radius-md);
    border: none;
    transition: all 150ms;
  }

  .btn:disabled { cursor: not-allowed; }

  /* Primário */
  .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-weight: var(--font-weight-normal);
    line-height: 1;
    cursor: pointer;
    border-radius: var(--radius-md);
    border: none;
    transition: all 150ms;
    font-size: var(--text-base);
    padding: var(--btn-md-py) var(--btn-md-px);
    height: var(--btn-md-height);
    background-color: var(--color-primary-500);
    color: var(--color-primary-contrast);
  }

  .btn-primary:hover:not(:disabled) {
    background-color: var(--color-primary-400);
    transform: translateY(-1px);
  }

  .btn-primary:active:not(:disabled) {
    background-color: var(--color-primary-600);
    transform: translateY(0);
  }

  .btn-primary:disabled {
    background-color: var(--color-primary-200);
    color: var(--color-primary-800);
    cursor: not-allowed;
  }

  /* Secundário (outline de marca) */
  .btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-weight: var(--font-weight-normal);
    line-height: 1;
    cursor: pointer;
    border-radius: var(--radius-md);
    transition: all 150ms;
    font-size: var(--text-base);
    padding: var(--btn-md-py) var(--btn-md-px);
    height: var(--btn-md-height);
    background-color: transparent;
    color: var(--color-primary-500);
    border: 1.5px solid var(--color-primary-500);
  }

  .btn-secondary:hover:not(:disabled) {
    background-color: var(--color-primary-50);
    color: var(--color-primary-600);
    border-color: var(--color-primary-600);
  }

  .btn-secondary:disabled {
    color: var(--color-primary-200);
    border-color: var(--color-primary-200);
    cursor: not-allowed;
  }

  /* Ghost */
  .btn-ghost {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-weight: var(--font-weight-normal);
    line-height: 1;
    cursor: pointer;
    border-radius: var(--radius-md);
    transition: all 150ms;
    font-size: var(--text-base);
    padding: var(--btn-md-py) var(--btn-md-px);
    height: var(--btn-md-height);
    background-color: transparent;
    color: var(--color-foreground);
    border: 1px solid color-mix(in srgb, var(--color-foreground) 20%, transparent);
  }

  .btn-ghost:hover:not(:disabled) {
    background-color: color-mix(in srgb, var(--color-foreground) 8%, transparent);
    border-color: color-mix(in srgb, var(--color-foreground) 40%, transparent);
  }

  .btn-ghost:disabled {
    color: color-mix(in srgb, var(--color-foreground) 30%, transparent);
    border-color: color-mix(in srgb, var(--color-foreground) 15%, transparent);
    cursor: not-allowed;
  }

  /* Dark */
  .btn-dark {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-weight: var(--font-weight-normal);
    line-height: 1;
    cursor: pointer;
    border-radius: var(--radius-md);
    border: none;
    transition: all 150ms;
    font-size: var(--text-base);
    padding: var(--btn-md-py) var(--btn-md-px);
    height: var(--btn-md-height);
    background-color: var(--color-foreground);
    color: var(--color-background);
  }

  .btn-dark:hover:not(:disabled) { opacity: 0.9; }

  /* Tamanhos */
  .btn-sm {
    font-size: var(--text-sm);
    padding: var(--btn-sm-py) var(--btn-sm-px);
    height: var(--btn-sm-height);
  }

  .btn-md {
    font-size: var(--text-base);
    padding: var(--btn-md-py) var(--btn-md-px);
    height: var(--btn-md-height);
  }

  .btn-lg {
    font-size: var(--text-lg);
    padding: var(--btn-lg-py) var(--btn-lg-px);
    height: var(--btn-lg-height);
  }

  .btn-xl {
    font-size: var(--text-xl);
    padding: 16px 40px;
    height: 56px;
  }

  /* Headings h1-h3 classes */
  .h1-light, .h1-normal, .h1-semibold, .h1-bold, .h1-extrabold {
    font-family: var(--font-display);
    font-size: var(--text-5xl);
    line-height: var(--leading-tightest);
    letter-spacing: var(--tracking-tightest);
    color: var(--color-foreground);
  }
  @media (min-width: 768px) {
    .h1-light, .h1-normal, .h1-semibold, .h1-bold, .h1-extrabold { font-size: var(--text-7xl); }
  }
  @media (min-width: 1440px) {
    .h1-light, .h1-normal, .h1-semibold, .h1-bold, .h1-extrabold { font-size: var(--text-9xl); }
  }

  .h1-bold { font-weight: 700; }
  .h1-extrabold { font-weight: 800; }

  .text-body-xl { font-size: var(--text-lg); font-weight: 400; line-height: var(--leading-spacious); }
  .text-body-lg { font-size: var(--text-md); font-weight: 400; line-height: var(--leading-spacious); }
  .text-body-md { font-size: var(--text-sm); font-weight: 400; line-height: var(--leading-spacious); }
  .text-body-sm { font-size: var(--text-xs); font-weight: 400; line-height: var(--leading-reading); color: color-mix(in srgb, var(--color-foreground) 70%, transparent); }
  .text-caption { font-size: var(--text-2xs); font-weight: 500; line-height: var(--leading-body); color: color-mix(in srgb, var(--color-foreground) 60%, transparent); }
  .text-overline { font-size: var(--text-2xs); font-weight: 700; line-height: var(--leading-body); letter-spacing: var(--tracking-widest); color: color-mix(in srgb, var(--color-foreground) 60%, transparent); text-transform: uppercase; }

  /* LINKS */
  .link-nav {
    color: var(--color-foreground);
    text-decoration: none;
    font-weight: var(--font-weight-normal);
    transition: color 150ms;
  }
  .link-nav:hover { color: var(--color-primary); }
  .link-nav-active { color: var(--color-primary); font-weight: var(--font-weight-normal); text-decoration: none; }
  
  .link-cta {
    color: var(--color-foreground);
    text-decoration: none;
    font-weight: var(--font-weight-normal);
    transition: color 150ms;
  }
  .link-cta:hover {
    color: var(--color-primary);
  }

  /* BORDAS */
  .border-brand { border: 1px solid var(--color-primary); }
  .border-brand-emphasis { border: 1.5px solid var(--color-primary); }
  .border-base { border: 1px solid color-mix(in srgb, var(--color-foreground) 15%, transparent); }

  /* BACKGROUNDS */
  .bg-surface { background-color: color-mix(in srgb, var(--color-foreground) 3%, transparent); }
  .bg-surface-subtle { background-color: color-mix(in srgb, var(--color-foreground) 6%, transparent); }
  .bg-surface-muted { background-color: color-mix(in srgb, var(--color-foreground) 10%, transparent); }
  .bg-brand-full { background-color: var(--color-primary); }
  .bg-brand-subtle { background-color: color-mix(in srgb, var(--color-primary) 10%, transparent); }

/* Animações */
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-left {
  from {
    opacity: 0;
    transform: translateX(24px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fade-right {
  from {
    opacity: 0;
    transform: translateX(-24px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Animações disparadas por Scroll (Scroll Reveal) */
.reveal-fade-up {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}

.reveal-fade-up.active {
  opacity: 1;
  transform: translateY(0);
}

.reveal-fade-in {
  opacity: 0;
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity;
}

.reveal-fade-in.active {
  opacity: 1;
}

.reveal-fade-right {
  opacity: 0;
  transform: translateX(-24px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}

.reveal-fade-right.active {
  opacity: 1;
  transform: translateX(0);
}

.reveal-fade-left {
  opacity: 0;
  transform: translateX(24px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}

.reveal-fade-left.active {
  opacity: 1;
  transform: translateX(0);
}

/* Classes de Animações CSS com Delay e Scroll Observer */
.hero-animate-fade-up {
  animation: fade-up 0.7s ease both;
}

.animate-fade-up {
  opacity: 0;
  will-change: transform, opacity;
}

.animate-fade-up.active {
  animation: fade-up 0.7s ease both;
}

.animate-fade-left {
  opacity: 0;
  will-change: transform, opacity;
}

.animate-fade-left.active {
  animation: fade-left 0.7s ease both;
}

.animate-fade-right {
  opacity: 0;
  will-change: transform, opacity;
}

.animate-fade-right.active {
  animation: fade-right 0.7s ease both;
}

.animate-fade-in {
  opacity: 0;
  will-change: opacity;
}

.animate-fade-in.active {
  animation: fade-up 0.45s ease both;
}

/* Delays de Transição / Animação */
.delay-1 { animation-delay: 80ms; }
.delay-2 { animation-delay: 160ms; }
.delay-3 { animation-delay: 240ms; }
.delay-4 { animation-delay: 320ms; }
.delay-5 { animation-delay: 400ms; }
.delay-6 { animation-delay: 480ms; }
.delay-7 { animation-delay: 560ms; }
.delay-8 { animation-delay: 640ms; }
.delay-9 { animation-delay: 720ms; }
.delay-10 { animation-delay: 800ms; }

.stagger-1 { animation-delay: 80ms; }
.stagger-2 { animation-delay: 160ms; }
.stagger-3 { animation-delay: 240ms; }
.stagger-4 { animation-delay: 320ms; }
.stagger-5 { animation-delay: 400ms; }

/* Delays específicos do Scroll Reveal */
.reveal-delay-100 { transition-delay: 100ms !important; }
.reveal-delay-150 { transition-delay: 150ms !important; }
.reveal-delay-200 { transition-delay: 200ms !important; }
.reveal-delay-250 { transition-delay: 250ms !important; }
.reveal-delay-300 { transition-delay: 300ms !important; }
.reveal-delay-400 { transition-delay: 400ms !important; }
.reveal-delay-500 { transition-delay: 500ms !important; }

/* Animação do Background Hero */
.hero-animation {
  object-position: center;
  scale: 1.08;
  translate: 0 0;
  filter: brightness(100%);
  animation: heroMotion 4.5s ease-in-out infinite;
  will-change: scale, translate, filter, rotate;
}

@keyframes heroMotion {
  0% {
    scale: 1.02;
    translate: 0 0;
    filter: brightness(100%);
    rotate: 0deg;
  }
  50% {
    scale: 1.14;
    translate: -25px -10px;
    filter: brightness(114%);
    rotate: 3deg;
  }
  100% {
    scale: 1.02;
    translate: 0 0;
    filter: brightness(100%);
  }
}

.hero-bg-gradient {
  background:
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--color-background) 82%, transparent) 0%,
      color-mix(in srgb, var(--color-background) 64%, transparent) 48%,
      var(--color-background) 100%
    );
}

.fade-up {
  opacity: 0;
  transform: translateY(12px);
  transition: all 0.5s ease;
}
.fade-up.active {
  opacity: 1;
  transform: translateY(0);
}
.fade-right {
  opacity: 0;
  transform: translateX(-100px);
  transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}
.fade-right.active {
  opacity: 1;
  transform: translateX(0);
}

.animate-marquee:hover {
  animation-play-state: paused !important;
}

@media (prefers-reduced-motion: reduce) {
  .animate-fade-up,
  .animate-fade-left,
  .animate-fade-right,
  .animate-fade-in,
  .hero-animate-fade-up,
  .reveal-fade-up,
  .reveal-fade-left,
  .reveal-fade-right,
  .reveal-fade-in {
    animation: none !important;
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}

/* Scrollbar Global */
html {
  scrollbar-width: regular;
  scrollbar-color: var(--color-primary-500) var(--color-background);
}
html::-webkit-scrollbar { width: 12px; height: 10px; }
html::-webkit-scrollbar-track { background: var(--color-background); }
html::-webkit-scrollbar-thumb {
  background: var(--color-primary-500);
  border-radius: 9999px;
  border: 3px solid var(--color-background);
}
html::-webkit-scrollbar-thumb:hover { background: var(--color-primary-400); }

`;
}

// Helper para gerar o markdown de documentação do Design System do Cliente
function generateDesignSystemMarkdown(theme) {
    const primaryScale = generateColorScale(theme.primaryColor, '#c5f264');
    const secondaryScale = generateColorScale(theme.secondaryColor, '#30b300');

    return `# DESIGN_SYSTEM.md - Diretrizes do Design System do Cliente

Este documento foi gerado automaticamente pelo Assistente de Setup para servir como especificação visual da marca e estilo do cliente para desenvolvedores e agentes.

## 0. Escopo
- **Superfícies cobertas**: Componentes do site Next.js, botões, cartões, gradientes e blocos de conteúdo da landing page.
- **Fora do escopo**: Painéis administrativos de terceiros.

## 1. Princípios de Design
* **Consistência em Primeiro Lugar**: Nunca insira cores hexadecimais no código TSX de forma rígida (ex: \`bg-[#ff0000]\`). Use sempre as classes do Tailwind baseadas nos tokens (ex: \`bg-primary\`).
* **Hierarquia e Contraste**: Garantir que as cores de texto (\`text-foreground\`) possuam contraste WCAG AA sobre o fundo (\`bg-background\`).
* **Tipografia Leve e Elegante**: Todos os botões, links e menus de navegação devem **sempre** utilizar o peso de fonte regular (\`font-normal\`), promovendo uma estética limpa, moderna e sofisticada.
* **Estilo Limpo e Espaçoso**: Margens generosas (\`gap-8\`, \`py-20\`) e cantos arredondados de forma harmoniosa.
* **Sem Efeitos de Blob**: Nunca crie ou utilize efeitos de fundo do tipo "blob" (formas orgânicas coloridas desfocadas e animadas no fundo), pois afetam a performance do site e a clareza visual dos textos.

## 2. Plataformas & Restrições do Projeto
- **Tipo de App**: SPA / Landing Page Corporativa (Next.js App Router).
- **Frameworks**: React 19 + Next.js 16 + Tailwind CSS v4.
- **Temas**: Suporte a personalização de cores do cliente via variáveis CSS no \`globals.css\`.

---

## 3. Tokens de Design (Cores e Fontes Atuais do Cliente)

### 3.1 Fonte de Verdade dos Tokens
- **Configurações em JSON**: [\`app/config/theme.json\`](file:///c:/Users/Diogo/Documents/AI/modelo/app/config/theme.json)
- **Folha de Estilos**: [\`app/globals.css\`](file:///c:/Users/Diogo/Documents/AI/modelo/app/globals.css)

### 3.2 Cores de Marca

#### Cor Primária: \`${theme.primaryColor}\` (Escala de tons ancorada no 500)

| Classe Tailwind | Hex | Uso sugerido |
|---|---|---|
| \`bg-primary-50\` / \`text-primary-50\` | \`${primaryScale[50]}\` | Fundos levíssimos, hover states sutis |
| \`bg-primary-100\` | \`${primaryScale[100]}\` | Fills de badges, highlights |
| \`bg-primary-200\` | \`${primaryScale[200]}\` | Estados desabilitados com tom de marca |
| \`bg-primary-300\` | \`${primaryScale[300]}\` | Ícones secundários, bordas suaves |
| \`bg-primary-400\` | \`${primaryScale[400]}\` | Hover de botão primário |
| **\`bg-primary-500\`** | **\`${primaryScale[500]}\`** | **COR PRINCIPAL — botões, links, destaques** |
| \`bg-primary-600\` | \`${primaryScale[600]}\` | Active/pressed de botão primário |
| \`bg-primary-700\` | \`${primaryScale[700]}\` | Texto de erro em fundos claros |
| \`bg-primary-800\` | \`${primaryScale[800]}\` | Texto sobre fundo primary-100/200 |
| \`bg-primary-900\` | \`${primaryScale[900]}\` | Texto de alta ênfase em contexto de marca |

#### Cor Secundária: \`${theme.secondaryColor}\` (Escala de tons ancorada no 500)

| Classe Tailwind | Hex | Uso sugerido |
|---|---|---|
| \`bg-secondary-50\` / \`text-secondary-50\` | \`${secondaryScale[50]}\` | Fundos levíssimos, hover states sutis |
| \`bg-secondary-100\` | \`${secondaryScale[100]}\` | Fills de badges, highlights |
| \`bg-secondary-200\` | \`${secondaryScale[200]}\` | Estados desabilitados com tom de marca |
| \`bg-secondary-300\` | \`${secondaryScale[300]}\` | Ícones secundários, bordas suaves |
| \`bg-secondary-400\` | \`${secondaryScale[400]}\` | Hover de botão secundário |
| **\`bg-secondary-500\`** | **\`${secondaryScale[500]}\`** | **COR SECUNDÁRIA — destaques, badges, estados** |
| \`bg-secondary-600\` | \`${secondaryScale[600]}\` | Active/pressed de botão secundário |
| \`bg-secondary-700\` | \`${secondaryScale[700]}\` | Texto em fundos claros |
| \`bg-secondary-800\` | \`${secondaryScale[800]}\` | Texto sobre fundo secondary-100/200 |
| \`bg-secondary-900\` | \`${secondaryScale[900]}\` | Texto de alta ênfase em contexto secundário |

#### Outras Cores
- **Foreground (Texto)**: \`${theme.foregroundColor}\` (Uso com Tailwind: \`text-foreground\`)
- **Background (Fundo)**: \`${theme.backgroundColor}\` (Uso com Tailwind: \`bg-background\`)

### 3.3 Tipografia (Carregada via Google Fonts no layout.tsx)
- **Títulos (H1, H2, H3, etc.)**: Font Family \`"${theme.titleFont}"\` (Mapeada para a classe Tailwind \`font-display\`)
- **Corpo e Parágrafos**: Font Family \`"${theme.bodyFont}"\` (Mapeada para a classe Tailwind \`font-sans\`)
- **Peso de Fontes (Regra Estrita)**: Links, menus de navegação e botões usam sempre o peso **regular** (\`font-normal\` / 400). Nunca devem usar negrito (bold ou semibold).

---

## 4. Diretrizes de Espaçamentos (Grid Base de 8px)

Todos os espaçamentos no globals.css e no design system do site utilizam a escala base de 8px:

| Classe Tailwind | px | Uso sugerido |
|---|---|---|
| \`gap-1\` / \`p-1\` | 8px | Margem interna mínima, gap ícone-texto |
| \`gap-2\` / \`p-2\` | 16px | Distância entre elementos pequenos, padding de badges |
| \`gap-3\` / \`p-3\` | 24px | Padding de cartões (cards), gap entre inputs |
| \`gap-4\` / \`p-4\` | 32px | Distância entre cards grandes, padding mobile |
| \`gap-6\` / \`p-6\` | 48px | Altura de cabeçalhos de seções, padding de navbar |
| \`py-8\` | 64px | Espaçamento vertical padrão de seções (mobile) |
| \`py-10\` | 80px | Espaçamento vertical padrão de seções (tablet) |
| \`py-13\` | 104px | Espaçamento vertical padrão de seções (desktop/hero) |

---

## 5. Botões & Links (Classes e Modificadores)

### 5.1 Classes de Botões
* **Primário**: \`.btn-primary\` (Fundo primário, texto de alto contraste dinâmico).
* **Secundário**: \`.btn-secondary\` (Sem fundo, contorno de 1.5px na cor primária, texto primário).
* **Ghost**: \`.btn-ghost\` (Sem fundo, contorno sutil neutro, texto foreground).
* **Dark**: \`.btn-dark\` (Fundo foreground, texto background).

*Todos os botões usam a classe utilitária \`rounded-md\` (cantos de 8px) e peso de fonte \`font-normal\` (400) obrigatoriamente.*

### 5.2 Modificadores de Tamanho
* **Pequeno (32px)**: \`.btn-sm\`
* **Médio (40px)**: \`.btn-md\`
* **Grande (48px)**: \`.btn-lg\`

### 5.3 Classes de Links
* **Navegação**: \`.link-nav\` (Tom cinza/texto padrão, muda para primário no hover).
* **Navegação Ativo**: \`.link-nav-active\` (Cor primária).
* **CTA Textual**: \`.link-cta\` (Formatado exatamente igual a \`.link-nav\`, conforme convenção do layout).

---

## 6. Responsividade & Breakpoints (Mobile-First)

| Prefixo Tailwind | Min-width | Dispositivo Alvo |
|---|---|---|
| *(sem prefixo)* | 0px | Dispositivos mobile padrão |
| \`md:\` | 768px | Tablets em modo retrato |
| \`lg:\` | 1024px | Laptops e tablets horizontais |
| \`xl:\` | 1280px | Monitores de computador comuns |
| \`2xl:\` | 1440px | Monitores wide de alta resolução |

### Layouts Padrão Recomendados:
* **Container**: \`<div className="container-site">\` (Alinhado ao centro com espaçamento dinâmico).
* **Heading H1**: \`text-5xl md:text-7xl lg:text-9xl\`
* **Heading H2**: \`text-3xl md:text-5xl lg:text-7xl\`
* **Heading H3**: \`text-2xl md:text-4xl lg:text-5xl\`

---

## 7. Diretrizes de Acessibilidade
- **Focos Visíveis**: Qualquer botão ou link interativo deve possuir estados focáveis claros (ex: \`focus:ring-2 focus:ring-primary\`).
- **Navegação via Teclado**: Todo o site deve ser navegável via tecla TAB.
`;
}

// Servidor local de Setup
const server = http.createServer((req, res) => {
    // Rota GET / - Serve o painel HTML
    if (req.method === 'GET' && req.url === '/') {
        // Obter dados atuais do .env
        let envData = parseEnv(ENV_PATH);
        if (Object.keys(envData).length === 0) {
            envData = parseEnv(ENV_EXAMPLE_PATH);
        }

        // Obter dados atuais do seo.json
        let seoData = {};
        if (fs.existsSync(SEO_PATH)) {
            try {
                seoData = JSON.parse(fs.readFileSync(SEO_PATH, 'utf-8'));
            } catch (e) {
                console.error("Erro ao ler seo.json:", e);
            }
        }

        // Obter dados atuais do contacts.json
        let contactsData = {
            whatsapp: '',
            phone: '',
            email: '',
            instagram: '',
            linkedin: '',
            facebook: '',
            tiktok: '',
            youtube: '',
            address: ''
        };
        if (fs.existsSync(CONTACTS_PATH)) {
            try {
                contactsData = { ...contactsData, ...JSON.parse(fs.readFileSync(CONTACTS_PATH, 'utf-8')) };
            } catch (e) {
                console.error("Erro ao ler contacts.json:", e);
            }
        }

        // Obter dados atuais do theme.json (Design System)
        let themeData = {
            primaryColor: '#8b5cf6',
            secondaryColor: '#ec4899',
            foregroundColor: '#f8fafc',
            backgroundColor: '#080c14',
            titleFont: 'Outfit',
            bodyFont: 'Outfit',
            logoLight: '',
            logoDark: '',
            favicon: '/favicon.ico'
        };
        if (fs.existsSync(THEME_PATH)) {
            try {
                themeData = { ...themeData, ...JSON.parse(fs.readFileSync(THEME_PATH, 'utf-8')) };
            } catch (e) {
                console.error("Erro ao ler theme.json:", e);
            }
        }

        // Descobrir rotas do projeto
        const physicalRoutes = getStaticRoutes(APP_DIR);
        if (!physicalRoutes.includes('/')) {
            physicalRoutes.push('/');
        }

        // Ordena as rotas para manter a index ("/") sempre em primeiro e "/links" sempre em último
        physicalRoutes.sort((a, b) => {
            if (a === '/') return -1;
            if (b === '/') return 1;
            if (a === '/links') return 1;
            if (b === '/links') return -1;
            return a.localeCompare(b);
        });

        // Preparar objeto de SEO consolidado com fallbacks
        const pageSeoList = physicalRoutes.map(route => {
            const current = seoData[route] || {};
            return {
                route,
                title: current.title || '',
                description: current.description || '',
                keywords: Array.isArray(current.keywords) ? current.keywords.join(', ') : ''
            };
        });

        // HTML & CSS do painel
        const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Assistente de Setup - Template Next.js</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-color: #080c14;
            --card-bg: #0f172a;
            --border-color: #1e293b;
            --text-primary: #f8fafc;
            --text-secondary: #94a3b8;
            --accent-purple: #8b5cf6;
            --accent-purple-hover: #7c3aed;
            --accent-pink: #ec4899;
            --accent-green: #10b981;
            --input-bg: #1e293b;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Outfit', sans-serif;
        }

        body {
            background-color: var(--bg-color);
            color: var(--text-primary);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 40px 20px;
        }

        .container {
            width: 100%;
            max-width: 1300px;
            background: rgba(15, 23, 42, 0.6);
            backdrop-filter: blur(16px);
            border: 1px solid var(--border-color);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }

        header {
            text-align: center;
            margin-bottom: 30px;
        }

        header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            background: linear-gradient(to right, var(--accent-purple), var(--accent-pink));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 10px;
        }

        header p {
            color: var(--text-secondary);
            font-size: 1rem;
        }

        /* Abas Principais (Top Level) */
        .main-tabs-header {
            display: flex;
            border-bottom: 1px solid var(--border-color);
            margin-bottom: 30px;
            gap: 10px;
            overflow-x: auto;
        }

        .main-tab-btn {
            background: none;
            border: none;
            color: var(--text-secondary);
            padding: 12px 20px;
            font-size: 1.05rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            white-space: nowrap;
            border-bottom: 3px solid transparent;
            border-radius: 6px 6px 0 0;
        }

        .main-tab-btn:hover {
            color: var(--text-primary);
            background: rgba(255, 255, 255, 0.02);
        }

        .main-tab-btn.active {
            color: var(--accent-purple);
            border-bottom-color: var(--accent-purple);
            background: rgba(139, 92, 246, 0.08);
        }

        .main-tab-content {
            display: none;
            animation: fadeIn 0.35s ease-in-out;
        }

        .main-tab-content.active {
            display: block;
        }

        .section-title {
            font-size: 1.4rem;
            font-weight: 700;
            margin-bottom: 24px;
            color: var(--text-primary);
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .section-title::after {
            content: '';
            flex: 1;
            height: 1px;
            background: var(--border-color);
        }

        .grid-inputs {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }

        @media (max-width: 768px) {
            .grid-inputs {
                grid-template-columns: 1fr;
            }
        }

        .grid-3-cols {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 20px;
        }

        @media (max-width: 1024px) {
            .grid-3-cols {
                grid-template-columns: 1fr 1fr;
            }
        }

        @media (max-width: 768px) {
            .grid-3-cols {
                grid-template-columns: 1fr;
            }
        }

        .input-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .input-group.full-width {
            grid-column: span 2;
        }

        @media (max-width: 768px) {
            .input-group.full-width {
                grid-column: span 1;
            }
        }

        label {
            font-size: 0.9rem;
            font-weight: 500;
            color: var(--text-secondary);
        }

        input, textarea, select {
            background-color: var(--input-bg);
            border: 1px solid var(--border-color);
            border-radius: 10px;
            color: var(--text-primary);
            padding: 12px 16px;
            font-size: 0.95rem;
            transition: all 0.2s ease-in-out;
        }

        input:focus, textarea:focus, select:focus {
            outline: none;
            border-color: var(--accent-purple);
            box-shadow: 0 0 10px rgba(139, 92, 246, 0.2);
        }

        textarea {
            resize: vertical;
            min-height: 100px;
        }

        /* Controle de Cores (Design System) */
        .color-picker-wrapper {
            display: flex;
            gap: 10px;
            width: 100%;
        }

        .color-picker-wrapper input[type="color"] {
            padding: 0;
            width: 50px;
            height: 46px;
            border-radius: 10px;
            cursor: pointer;
            background: none;
            overflow: hidden;
            border: 1px solid var(--border-color);
        }

        .color-picker-wrapper input[type="text"] {
            flex: 1;
        }

        /* Sub-abas de SEO por página */
        .seo-tabs-container {
            border: 1px solid var(--border-color);
            border-radius: 12px;
            overflow: hidden;
            background: #0d121f;
            margin-bottom: 10px;
        }

        .seo-tabs-header {
            display: flex;
            background: #111827;
            border-bottom: 1px solid var(--border-color);
            overflow-x: auto;
        }

        .seo-tab-btn {
            background: none;
            border: none;
            color: var(--text-secondary);
            padding: 14px 20px;
            font-size: 0.95rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            white-space: nowrap;
            border-bottom: 2px solid transparent;
        }

        .seo-tab-btn:hover {
            color: var(--text-primary);
            background: rgba(255, 255, 255, 0.02);
        }

        .seo-tab-btn.active {
            color: var(--accent-purple);
            border-bottom-color: var(--accent-purple);
            background: rgba(139, 92, 246, 0.05);
        }

        .seo-tab-content {
            display: none;
            padding: 24px;
            animation: fadeIn 0.3s ease-in-out;
        }

        .seo-tab-content.active {
            display: block;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .actions {
            margin-top: 40px;
            display: flex;
            justify-content: flex-end;
        }

        .btn-save {
            background: linear-gradient(to right, var(--accent-purple), var(--accent-purple-hover));
            color: white;
            border: none;
            border-radius: 10px;
            padding: 14px 32px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
        }

        .btn-save:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
        }

        .btn-save:active {
            transform: translateY(0);
        }

        /* Toast de status */
        .toast {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: var(--accent-green);
            color: white;
            padding: 16px 24px;
            border-radius: 10px;
            font-weight: 500;
            box-shadow: 0 10px 20px rgba(0,0,0,0.3);
            display: none;
            animation: slideIn 0.3s ease-out;
            z-index: 1000;
        }

        @keyframes slideIn {
            from { transform: translateX(100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Assistente de Setup</h1>
            <p>Configure de forma rápida e visual a identidade, metadados e contatos do seu template.</p>
        </header>

        <!-- NAVEGAÇÃO DE ABAS PRINCIPAIS -->
        <div class="main-tabs-header">
            <button type="button" class="main-tab-btn active" onclick="switchMainTab(event, 'tab-geral')">Geral & Rastreamento</button>
            <button type="button" class="main-tab-btn" onclick="switchMainTab(event, 'tab-contatos')">Contatos & Redes Sociais</button>
            <button type="button" class="main-tab-btn" onclick="switchMainTab(event, 'tab-seo')">Otimização de Páginas</button>
            <button type="button" class="main-tab-btn" onclick="switchMainTab(event, 'tab-design')">Design System</button>
        </div>

        <form id="setupForm">
            
            <!-- ABA 1: GERAL & RASTREAMENTO -->
            <div id="tab-geral" class="main-tab-content active">
                <div class="section-title">Parâmetros Gerais e Servidores (.env)</div>
                <div class="grid-inputs">
                    <div class="input-group">
                        <label for="NEXT_PUBLIC_PROJECT_NAME">Nome do Projeto</label>
                        <input type="text" id="NEXT_PUBLIC_PROJECT_NAME" name="NEXT_PUBLIC_PROJECT_NAME" placeholder="Nome do Cliente / Projeto" value="${envData.NEXT_PUBLIC_PROJECT_NAME || ''}" required>
                    </div>

                    <div class="input-group">
                        <label for="NEXT_PUBLIC_SITE_URL">URL Oficial do Site</label>
                        <input type="url" id="NEXT_PUBLIC_SITE_URL" name="NEXT_PUBLIC_SITE_URL" placeholder="https://nome-do-cliente.com.br" value="${envData.NEXT_PUBLIC_SITE_URL || ''}" required>
                    </div>
                    
                    <div class="input-group">
                        <label for="NEXT_PUBLIC_GTM_ID">Google Tag Manager (ID)</label>
                        <input type="text" id="NEXT_PUBLIC_GTM_ID" name="NEXT_PUBLIC_GTM_ID" placeholder="GTM-XXXXXX" value="${envData.NEXT_PUBLIC_GTM_ID || ''}">
                    </div>

                    <div class="input-group">
                        <label for="NEXT_PUBLIC_FACEBOOK_PIXEL_ID">Meta Pixel (Facebook ID)</label>
                        <input type="text" id="NEXT_PUBLIC_FACEBOOK_PIXEL_ID" name="NEXT_PUBLIC_FACEBOOK_PIXEL_ID" placeholder="1234567890" value="${envData.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || ''}">
                    </div>

                    <div class="input-group">
                        <label for="NEXT_PUBLIC_LINKEDIN_PARTNER_ID">LinkedIn Insight (Partner ID)</label>
                        <input type="text" id="NEXT_PUBLIC_LINKEDIN_PARTNER_ID" name="NEXT_PUBLIC_LINKEDIN_PARTNER_ID" placeholder="98765" value="${envData.NEXT_PUBLIC_LINKEDIN_PARTNER_ID || ''}">
                    </div>

                    <div class="input-group">
                        <label for="NEXT_PUBLIC_GSC_VERIFICATION_ID">Google Search Console (ID de Verificação)</label>
                        <input type="text" id="NEXT_PUBLIC_GSC_VERIFICATION_ID" name="NEXT_PUBLIC_GSC_VERIFICATION_ID" placeholder="gsc_id_aqui" value="${envData.NEXT_PUBLIC_GSC_VERIFICATION_ID || ''}">
                    </div>

                    <div class="input-group">
                        <label for="NEXT_PUBLIC_SANITY_PROJECT_ID">Sanity Project ID (Opcional)</label>
                        <input type="text" id="NEXT_PUBLIC_SANITY_PROJECT_ID" name="NEXT_PUBLIC_SANITY_PROJECT_ID" placeholder="seu-projeto-sanity" value="${envData.NEXT_PUBLIC_SANITY_PROJECT_ID || ''}">
                    </div>

                    <div class="input-group">
                        <label for="NEXT_PUBLIC_SANITY_DATASET">Sanity Dataset (Opcional)</label>
                        <input type="text" id="NEXT_PUBLIC_SANITY_DATASET" name="NEXT_PUBLIC_SANITY_DATASET" placeholder="production" value="${envData.NEXT_PUBLIC_SANITY_DATASET || 'production'}">
                    </div>
                </div>
            </div>

            <!-- ABA 2: CONTATOS & REDES SOCIAIS -->
            <div id="tab-contatos" class="main-tab-content">
                <div class="section-title">Contatos e Mídias de Divulgação (contacts.json)</div>
                <div class="grid-inputs">
                    <div class="input-group">
                        <label for="whatsapp">WhatsApp (Somente números, ex: 11988887777)</label>
                        <input type="text" id="whatsapp" name="whatsapp" placeholder="Ex: 11988887777" value="${contactsData.whatsapp || ''}">
                    </div>

                    <div class="input-group">
                        <label for="phone">Telefone (Exibição formatada, ex: (11) 98888-7777)</label>
                        <input type="text" id="phone" name="phone" placeholder="Ex: (11) 98888-7777" value="${contactsData.phone || ''}">
                    </div>

                    <div class="input-group">
                        <label for="email">E-mail de Contato</label>
                        <input type="email" id="email" name="email" placeholder="contato@cliente.com.br" value="${contactsData.email || ''}">
                    </div>

                    <div class="input-group">
                        <label for="instagram">URL do Instagram</label>
                        <input type="url" id="instagram" name="instagram" placeholder="https://instagram.com/perfil" value="${contactsData.instagram || ''}">
                    </div>

                    <div class="input-group">
                        <label for="linkedin">URL do LinkedIn</label>
                        <input type="url" id="linkedin" name="linkedin" placeholder="https://linkedin.com/in/perfil" value="${contactsData.linkedin || ''}">
                    </div>

                    <div class="input-group">
                        <label for="facebook">URL do Facebook</label>
                        <input type="url" id="facebook" name="facebook" placeholder="https://facebook.com/perfil" value="${contactsData.facebook || ''}">
                    </div>

                    <div class="input-group">
                        <label for="tiktok">URL do TikTok</label>
                        <input type="url" id="tiktok" name="tiktok" placeholder="https://tiktok.com/@perfil" value="${contactsData.tiktok || ''}">
                    </div>

                    <div class="input-group">
                        <label for="youtube">URL do YouTube</label>
                        <input type="url" id="youtube" name="youtube" placeholder="https://youtube.com/@canal" value="${contactsData.youtube || ''}">
                    </div>

                    <div class="input-group full-width">
                        <label for="address">Endereço Completo</label>
                        <input type="text" id="address" name="address" placeholder="Ex: Av. Paulista, 1000 - Bela Vista, São Paulo - SP" value="${contactsData.address || ''}">
                    </div>
                </div>
            </div>

            <!-- ABA 3: OTIMIZAÇÃO DE PÁGINAS -->
            <div id="tab-seo" class="main-tab-content">
                <div class="section-title">Otimização de Metadados e SEO (seo.json)</div>
                
                <div class="seo-tabs-container">
                    <div class="seo-tabs-header">
                        ${pageSeoList.map((item, idx) => `
                            <button type="button" class="seo-tab-btn ${idx === 0 ? 'active' : ''}" onclick="switchSeoTab(event, 'seo-tab-${idx}')">
                                ${item.route}
                            </button>
                        `).join('')}
                    </div>

                    ${pageSeoList.map((item, idx) => `
                        <div id="seo-tab-${idx}" class="seo-tab-content ${idx === 0 ? 'active' : ''}">
                            <input type="hidden" name="seo_routes" value="${item.route}">
                            <div class="grid-inputs">
                                <div class="input-group full-width">
                                    <label>Meta Title (Título da Aba)</label>
                                    <input type="text" name="seo_title_${item.route}" placeholder="Ex: Título da Página | Nome da Empresa" value="${item.title}">
                                </div>
                                <div class="input-group full-width">
                                    <label>Meta Description (Descrição nos buscadores)</label>
                                    <textarea name="seo_description_${item.route}" placeholder="Breve resumo sobre a página...">${item.description}</textarea>
                                </div>
                                <div class="input-group full-width">
                                    <label>Keywords (Palavras-chave separadas por vírgula)</label>
                                    <input type="text" name="seo_keywords_${item.route}" placeholder="Ex: gestao, marketing, landing page" value="${item.keywords}">
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- ABA 4: DESIGN SYSTEM -->
            <div id="tab-design" class="main-tab-content">
                <div class="section-title">Identidade Visual e Tipografia (theme.json)</div>
                <div class="grid-inputs">
                    <!-- Cor Primária -->
                    <div class="input-group">
                        <label for="primaryColor">Cor Primária (Elementos principais e botões)</label>
                        <div class="color-picker-wrapper">
                            <input type="color" id="primaryColorPicker" value="${themeData.primaryColor}" oninput="syncColorInput('primaryColor', this.value)">
                            <input type="text" id="primaryColor" name="primaryColor" placeholder="#8b5cf6" value="${themeData.primaryColor}" oninput="syncColorPicker('primaryColorPicker', this.value)">
                        </div>
                    </div>

                    <!-- Cor Secundária -->
                    <div class="input-group">
                        <label for="secondaryColor">Cor Secundária (Destaques e hovers)</label>
                        <div class="color-picker-wrapper">
                            <input type="color" id="secondaryColorPicker" value="${themeData.secondaryColor}" oninput="syncColorInput('secondaryColor', this.value)">
                            <input type="text" id="secondaryColor" name="secondaryColor" placeholder="#ec4899" value="${themeData.secondaryColor}" oninput="syncColorPicker('secondaryColorPicker', this.value)">
                        </div>
                    </div>

                    <!-- Foreground -->
                    <div class="input-group">
                        <label for="foregroundColor">Cor do Texto (Foreground)</label>
                        <div class="color-picker-wrapper">
                            <input type="color" id="foregroundColorPicker" value="${themeData.foregroundColor}" oninput="syncColorInput('foregroundColor', this.value)">
                            <input type="text" id="foregroundColor" name="foregroundColor" placeholder="#f8fafc" value="${themeData.foregroundColor}" oninput="syncColorPicker('foregroundColorPicker', this.value)">
                        </div>
                    </div>

                    <!-- Background -->
                    <div class="input-group">
                        <label for="backgroundColor">Cor de Fundo (Background)</label>
                        <div class="color-picker-wrapper">
                            <input type="color" id="backgroundColorPicker" value="${themeData.backgroundColor}" oninput="syncColorInput('backgroundColor', this.value)">
                            <input type="text" id="backgroundColor" name="backgroundColor" placeholder="#080c14" value="${themeData.backgroundColor}" oninput="syncColorPicker('backgroundColorPicker', this.value)">
                        </div>
                    </div>

                    <!-- Fonte do Título -->
                    <div class="input-group">
                        <label for="titleFont">Tipografia de Títulos (H1, H2, H3)</label>
                        <input type="text" id="titleFont" name="titleFont" list="google-fonts" placeholder="Ex: Outfit, Inter, Montserrat" value="${themeData.titleFont || 'Outfit'}">
                    </div>

                    <!-- Fonte do Corpo -->
                    <div class="input-group">
                        <label for="bodyFont">Tipografia de Texto (Parágrafos e botões)</label>
                        <input type="text" id="bodyFont" name="bodyFont" list="google-fonts" placeholder="Ex: Outfit, Inter, Roboto" value="${themeData.bodyFont || 'Outfit'}">
                    </div>

                    <datalist id="google-fonts">
                        <option value="Inter">
                        <option value="Outfit">
                        <option value="Figtree">
                        <option value="Montserrat">
                        <option value="Poppins">
                        <option value="Roboto">
                        <option value="Open Sans">
                        <option value="Lato">
                        <option value="Playfair Display">
                        <option value="Nunito">
                        <option value="Merriweather">
                        <option value="Raleway">
                        <option value="Ubuntu">
                        <option value="Lora">
                        <option value="Oswald">
                        <option value="Quicksand">
                        <option value="DM Sans">
                        <option value="Manrope">
                        <option value="Plus Jakarta Sans">
                        <option value="Urbanist">
                        <option value="Sora">
                        <option value="Syne">
                    </datalist>
                </div>

                <div class="section-title" style="margin-top: 30px;">Imagens e Ícones</div>
                <div class="grid-3-cols">
                    <!-- Logotipo Light -->
                    <div class="input-group">
                        <label for="logoLightFile">Logotipo Light (Para fundos escuros - PNG, SVG, WEBP)</label>
                        <div class="logo-preview-wrapper" id="logoLightPreviewWrapper" style="${themeData.logoLight ? '' : 'display:none;'}">
                            <img src="${themeData.logoLight || ''}" id="logoLightPreview" style="max-height: 50px; background: #080c14; padding: 5px; border-radius: 5px; margin-bottom: 8px; display: block;" />
                        </div>
                        <input type="file" id="logoLightFile" accept="image/*" onchange="previewImage(this, 'logoLightPreview', 'logoLightPreviewWrapper')">
                        <input type="hidden" id="logoLight" name="logoLight" value="${themeData.logoLight || ''}">
                    </div>

                    <!-- Logotipo Dark -->
                    <div class="input-group">
                        <label for="logoDarkFile">Logotipo Dark (Para fundos claros - PNG, SVG, WEBP)</label>
                        <div class="logo-preview-wrapper" id="logoDarkPreviewWrapper" style="${themeData.logoDark ? '' : 'display:none;'}">
                            <img src="${themeData.logoDark || ''}" id="logoDarkPreview" style="max-height: 50px; background: #ffffff; padding: 5px; border-radius: 5px; margin-bottom: 8px; display: block;" />
                        </div>
                        <input type="file" id="logoDarkFile" accept="image/*" onchange="previewImage(this, 'logoDarkPreview', 'logoDarkPreviewWrapper')">
                        <input type="hidden" id="logoDark" name="logoDark" value="${themeData.logoDark || ''}">
                    </div>

                    <!-- Favicon -->
                    <div class="input-group">
                        <label for="faviconFile">Favicon (Ícone do site - ICO, PNG, SVG)</label>
                        <div class="logo-preview-wrapper" id="faviconPreviewWrapper" style="${themeData.favicon ? '' : 'display:none;'}">
                            <img src="${themeData.favicon || ''}" id="faviconPreview" style="max-height: 32px; background: #ffffff; padding: 4px; border-radius: 4px; margin-bottom: 8px; display: block;" />
                        </div>
                        <input type="file" id="faviconFile" accept="image/x-icon,image/png,image/svg+xml" onchange="previewImage(this, 'faviconPreview', 'faviconPreviewWrapper')">
                        <input type="hidden" id="favicon" name="favicon" value="${themeData.favicon || '/favicon.ico'}">
                    </div>
                </div>
            </div>

            <div class="actions">
                <button type="submit" class="btn-save">Salvar Configurações</button>
            </div>
        </form>
    </div>

    <div id="successToast" class="toast">✓ Configurações salvas com sucesso!</div>

    <script>
        // Helpers para visualização e processamento de upload de imagens
        function previewImage(input, previewId, wrapperId) {
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById(previewId).src = e.target.result;
                    document.getElementById(wrapperId).style.display = 'block';
                };
                reader.readAsDataURL(input.files[0]);
            }
        }

        function fileToBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        }

        // Alteração de abas principais
        function switchMainTab(evt, tabId) {
            const tabContents = document.getElementsByClassName('main-tab-content');
            for (let i = 0; i < tabContents.length; i++) {
                tabContents[i].classList.remove('active');
            }

            const tabBtns = document.getElementsByClassName('main-tab-btn');
            for (let i = 0; i < tabBtns.length; i++) {
                tabBtns[i].classList.remove('active');
            }

            document.getElementById(tabId).classList.add('active');
            evt.currentTarget.classList.add('active');
        }

        // Alteração de abas de SEO por página
        function switchSeoTab(evt, tabId) {
            const tabContents = document.getElementsByClassName('seo-tab-content');
            for (let i = 0; i < tabContents.length; i++) {
                tabContents[i].classList.remove('active');
            }

            const tabBtns = document.getElementsByClassName('seo-tab-btn');
            for (let i = 0; i < tabBtns.length; i++) {
                tabBtns[i].classList.remove('active');
            }

            document.getElementById(tabId).classList.add('active');
            evt.currentTarget.classList.add('active');
        }

        // Sincronizar input type color para input text
        function syncColorInput(inputId, val) {
            document.getElementById(inputId).value = val;
        }

        // Sincronizar input text para input type color (se for hex válido de 7 chars)
        function syncColorPicker(pickerId, val) {
            if (val.match(/^#[0-9A-Fa-f]{6}$/)) {
                document.getElementById(pickerId).value = val;
            }
        }

        document.getElementById('setupForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = {
                env: {},
                contacts: {},
                seo: {},
                theme: {}
            };

            // Processar campos .env
            const envKeys = [
                'NEXT_PUBLIC_PROJECT_NAME',
                'NEXT_PUBLIC_SITE_URL',
                'NEXT_PUBLIC_GSC_VERIFICATION_ID',
                'NEXT_PUBLIC_GTM_ID',
                'NEXT_PUBLIC_FACEBOOK_PIXEL_ID',
                'NEXT_PUBLIC_LINKEDIN_PARTNER_ID',
                'NEXT_PUBLIC_SANITY_PROJECT_ID',
                'NEXT_PUBLIC_SANITY_DATASET'
            ];
            envKeys.forEach(key => {
                data.env[key] = formData.get(key);
            });

            // Processar contatos
            const contactKeys = ['whatsapp', 'phone', 'email', 'instagram', 'linkedin', 'facebook', 'tiktok', 'youtube', 'address'];
            contactKeys.forEach(key => {
                data.contacts[key] = formData.get(key) || '';
            });

            // Processar campos de SEO dinâmicos
            const routes = formData.getAll('seo_routes');
            routes.forEach(route => {
                const title = formData.get('seo_title_' + route);
                const description = formData.get('seo_description_' + route);
                const rawKeywords = formData.get('seo_keywords_' + route) || '';
                
                const keywords = rawKeywords.split(',')
                    .map(k => k.trim())
                    .filter(k => k !== '');

                data.seo[route] = {
                    title,
                    description,
                    keywords
                };
            });

            // Processar design system
            const themeKeys = ['primaryColor', 'secondaryColor', 'foregroundColor', 'backgroundColor', 'titleFont', 'bodyFont', 'logoLight', 'logoDark', 'favicon'];
            themeKeys.forEach(key => {
                data.theme[key] = formData.get(key) || '';
            });

            // Processar uploads de arquivos se selecionados
            const logoLightFile = document.getElementById('logoLightFile').files[0];
            const logoDarkFile = document.getElementById('logoDarkFile').files[0];
            const faviconFile = document.getElementById('faviconFile').files[0];

            if (logoLightFile) {
                data.theme.logoLightBase64 = await fileToBase64(logoLightFile);
                data.theme.logoLightName = logoLightFile.name;
            }
            if (logoDarkFile) {
                data.theme.logoDarkBase64 = await fileToBase64(logoDarkFile);
                data.theme.logoDarkName = logoDarkFile.name;
            }
            if (faviconFile) {
                data.theme.faviconBase64 = await fileToBase64(faviconFile);
                data.theme.faviconName = faviconFile.name;
            }

            try {
                const response = await fetch('/api/save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    const toast = document.getElementById('successToast');
                    toast.style.display = 'block';
                    setTimeout(() => {
                        toast.style.display = 'none';
                    }, 4000);
                } else {
                    alert('Falha ao salvar as configurações.');
                }
            } catch (err) {
                console.error(err);
                alert('Erro ao enviar a requisição.');
            }
        });
    </script>
</body>
</html>`;

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(html);
    }
    // Rota POST /api/save - Salva nos arquivos .env, seo.json, contacts.json, theme.json, globals.css e design-system.md
    else if (req.method === 'POST' && req.url === '/api/save') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const payload = JSON.parse(body);

                // 1. Gravar no arquivo .env
                const envContent = stringifyEnv(payload.env);
                fs.writeFileSync(ENV_PATH, envContent, 'utf-8');

                // 2. Gravar no arquivo seo.json
                fs.writeFileSync(SEO_PATH, JSON.stringify(payload.seo, null, 2), 'utf-8');

                // 3. Processar link do WhatsApp e gravar no arquivo contacts.json
                const contacts = { ...payload.contacts };
                contacts.whatsappLink = formatWhatsappLink(contacts.whatsapp);

                // Garantir diretório config existe
                const configDir = path.dirname(CONTACTS_PATH);
                if (!fs.existsSync(configDir)) {
                    fs.mkdirSync(configDir, { recursive: true });
                }
                fs.writeFileSync(CONTACTS_PATH, JSON.stringify(contacts, null, 2), 'utf-8');

                // 4. Gravar no arquivo theme.json (Design System)
                const theme = { ...payload.theme };

                if (theme.logoLightBase64) {
                    try {
                        theme.logoLight = saveBase64File(theme.logoLightBase64, theme.logoLightName || 'logo-light.svg');
                    } catch (e) {
                        console.error('Erro ao salvar logoLight:', e);
                    }
                }
                if (theme.logoDarkBase64) {
                    try {
                        theme.logoDark = saveBase64File(theme.logoDarkBase64, theme.logoDarkName || 'logo-dark.svg');
                    } catch (e) {
                        console.error('Erro ao salvar logoDark:', e);
                    }
                }
                if (theme.faviconBase64) {
                    try {
                        const matches = theme.faviconBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
                        if (matches && matches.length === 3) {
                            const mimeType = matches[1];
                            let filename = 'favicon.ico';
                            
                            if (mimeType === 'image/svg+xml') {
                                filename = 'icon.svg';
                            } else if (mimeType === 'image/png') {
                                filename = 'icon.png';
                            } else if (mimeType === 'image/jpeg') {
                                filename = 'icon.jpg';
                            }

                            // Limpar ícones antigos para evitar conflitos no Next.js
                            const possibleIcons = ['favicon.ico', 'icon.png', 'icon.svg', 'icon.jpg'];
                            possibleIcons.forEach(icon => {
                                const oldPath = path.resolve(process.cwd(), `app/${icon}`);
                                if (fs.existsSync(oldPath)) {
                                    fs.unlinkSync(oldPath);
                                }
                            });

                            const fileBuffer = Buffer.from(matches[2], 'base64');
                            const targetPath = path.resolve(process.cwd(), `app/${filename}`);
                            fs.writeFileSync(targetPath, fileBuffer);
                            theme.favicon = `/${filename}`;
                        }
                    } catch (e) {
                        console.error('Erro ao salvar favicon:', e);
                    }
                }

                // Deletar propriedades auxiliares temporárias
                delete theme.logoLightBase64;
                delete theme.logoLightName;
                delete theme.logoDarkBase64;
                delete theme.logoDarkName;
                delete theme.faviconBase64;
                delete theme.faviconName;

                fs.writeFileSync(THEME_PATH, JSON.stringify(theme, null, 2), 'utf-8');

                // 5. Atualizar o globals.css dinamicamente com o tema do Tailwind v4
                const cssContent = generateGlobalsCSS(theme);
                fs.writeFileSync(GLOBALS_CSS_PATH, cssContent, 'utf-8');

                // 6. Atualizar a documentação do design-system.md na raiz do projeto
                const dsMarkdownContent = generateDesignSystemMarkdown(theme);
                fs.writeFileSync(DESIGN_SYSTEM_PATH, dsMarkdownContent, 'utf-8');

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
                console.log('Wizard de Setup: Configurações, globals.css e design-system.md gravados com sucesso!');
            } catch (err) {
                console.error("Erro ao processar salvamento:", err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Erro interno do servidor ao salvar.' }));
            }
        });
    } else {
        let filePath = '';
        if (req.url === '/favicon.ico') {
            filePath = path.resolve(process.cwd(), 'app/favicon.ico');
        } else if (req.url.startsWith('/assets/')) {
            filePath = path.resolve(process.cwd(), 'public' + req.url);
        }

        if (filePath && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath).toLowerCase();
            let contentType = 'application/octet-stream';
            if (ext === '.svg') contentType = 'image/svg+xml';
            else if (ext === '.png') contentType = 'image/png';
            else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
            else if (ext === '.ico') contentType = 'image/x-icon';
            else if (ext === '.webp') contentType = 'image/webp';

            res.writeHead(200, { 'Content-Type': contentType });
            fs.createReadStream(filePath).pipe(res);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Rota não encontrada');
        }
    }
});

// Inicializar Servidor de forma resiliente a conflitos de porta
server.once('listening', () => {
    const url = `http://localhost:${PORT}`;
    console.log(`\n==================================================`);
    console.log(`🚀 Assistente de Setup iniciado na porta ${PORT}`);
    console.log(`👉 Acesse: ${url}`);
    console.log(`==================================================\n`);

    // Abre o navegador automaticamente
    let startCmd;
    if (process.platform === 'win32') {
        startCmd = `start ${url}`;
    } else if (process.platform === 'darwin') {
        startCmd = `open ${url}`;
    } else {
        startCmd = `xdg-open ${url}`;
    }

    exec(startCmd, (err) => {
        if (err) {
            console.log(`Não foi possível abrir o navegador automaticamente. Por favor, acesse manualmente: ${url}`);
        }
    });
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`Porta ${PORT} já está em uso. Tentando a porta ${PORT + 1}...`);
        PORT++;
        server.listen(PORT);
    } else {
        console.error('Erro no servidor:', err);
    }
});

server.listen(PORT);
