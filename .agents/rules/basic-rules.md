---
trigger: always_on
---

This project is a high-performance website boilerplate built with:

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Motion (only when necessary)
- CSS-first animations
- SEO-first architecture
- GEO-ready structure
- Scalable component system

The goal is to create premium, scalable, accessible and high-converting websites with clean code and minimal technical debt.

---

# Core Principles

## Always prioritize:

1. Performance
2. Accessibility
3. SEO
4. Maintainability
5. Scalability
6. Clean UI
7. Reusability
8. Mobile-first development

---

# Tech Stack Rules

## Framework

- Use Next.js App Router
- Use Server Components by default
- Only use Client Components when interaction is necessary
- Avoid unnecessary `"use client"`

## Language

- Use TypeScript everywhere
- Never use `any`
- Always type props and functions

## Styling

- Use Tailwind CSS
- Avoid inline styles
- Avoid CSS modules unless absolutely necessary
- Prefer utility classes
- Use CSS variables for design tokens

## Others

- The assets are located in the folder @/public/assets/
- The site must be optimized for accessibility according to WCAG
- The site must be optimized for security
- Use the map feature whenever there is a list of items
- When there are buttons or links, the hover effect should be one value above or below the scale in the color palette. e.g., bg-primary-500 hover: bg-primary-400
- ALWAYS USE NEXT'S NATIVE RESOURCES WHEN NECESSARY, SUCH AS Image, Link, Route, etc...


## O QUE FAZER

- Sempre que criar uma nova section verifique a pasta assets/img para pegar as imagens usadas na section.
- Sempre use a biblioteca de icones da Phosphor icons.
- Sempre use o nome da imagem no alt.
- Sempre adicione a classe "text-pretty" nos títulos e paragrafos para evitar os textos com viuvas.
- Sempre atualizar os arquivos robots.ts, sitemap.ts e sitemap.xml sempre que uma nova página for criada.
- <a> e <span> dentro do <p> devem ter o mesmo font-size do body.
- Links na navbar sempre devem estar ativo na página atual.
- Na versão mobile a navbar deve ocupar todo o width e height, com o logotipo a esquerda/topo e o botão de fechar na direita/topo, seguido dos links abaixo e alinhados a esquerda.
- Todos os ícones em blocos de contato/informativos (como WhatsApp, E-mail, Endereço, etc.) devem seguir o padrão de cor primária da marca (text-primary ou .contact-icon) de forma consistente.
- Seguir rigorosamente design-system.md


## O QUE NÃO FAZER

- Nunca usar valores arbitrários
- Nunca usar HEX hardcoded
- Não usar shadow
- Não usar o efeito blob
- Não usar border em botões/cards
- Não sobrescrever o design system