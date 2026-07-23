# Diretrizes de Desenvolvimento — Antigravity & Gemini

Este arquivo serve como guia de orientação de contexto para o agente de IA (**Antigravity + Gemini**) durante o desenvolvimento neste repositório.

## Stack Tecnológico do Projeto

- **Framework:** Next.js 16 (App Router)
- **Biblioteca Base:** React 19 (Server Components por padrão)
- **Estilização:** Tailwind CSS v4 (Configurações via `@theme` no CSS)
- **Linguagem:** TypeScript (Tipagem forte obrigatória, sem uso de `any`)
- **Rastreamento:** Componente personalizado de Analytics (GTM, Meta Pixel, LinkedIn Tag)

---

## Comandos Úteis do Projeto

Para gerenciar o ciclo de vida da aplicação, utilize os seguintes comandos do `npm`:

- `npm run dev` — Inicia o servidor de desenvolvimento local
- `npm run build` — Compila a aplicação para produção (valida tipos e rotas)
- `npm run start` — Executa o servidor de produção compilado localmente
- `npm run lint` — Valida a formatação e boas práticas de código com ESLint

---

## Princípios de Desenvolvimento (Do's & Don'ts)

### O que Fazer (Do's)
- **Comunicação:** Fale com o usuário **sempre em português do Brasil**.
- **Tipografia:** Use as fontes dinâmicas injetadas pelo setup no elemento `html`. O corpo de texto utiliza `var(--font-sans)` (mapeada para `var(--font-body)`) e os títulos utilizam `var(--font-display)` (mapeada para `var(--font-title)`).
- **Semântica:** Use elementos semânticos HTML5 (`<main>`, `<section>`, `<article>`, `<table>`) para otimizar a legibilidade por mecanismos de busca e bots de IA (GEO).
- **Dados Estruturados:** Sempre adicione Schemas do tipo JSON-LD (`<JsonLd>`) para páginas principais de negócios, produtos e FAQs.
- **Rastreamento:** Garanta que o componente `<Analytics />` esteja encapsulado em `<Suspense>` no [layout.tsx](file:///c:/Users/Diogo/Documents/AI/modelo/app/layout.tsx) para evitar erros de hidratação.
- **Ícones:** Utilize preferencialmente a biblioteca **Phosphor Icons**.

### O que Não Fazer (Don'ts)
- **JavaScript desnecessário:** Não utilize a diretiva `"use client"` sem necessidade. Mantenha os componentes como Server Components para maior performance.
- **Valores Arbitrários:** Evite usar classes arbitrárias ou cores hardcoded em HEX. Utilize as classes do Tailwind v4 e defina customizações globais de tema exclusivamente no [globals.css](file:///c:/Users/Diogo/Documents/AI/modelo/app/globals.css).
- **Shadows e Borders:** Conforme a convenção minimalista do template, evite aplicar sombras (`shadow`) ou bordas excessivas em botões/cards, exceto se estritamente instruído no `design-system.md`.
