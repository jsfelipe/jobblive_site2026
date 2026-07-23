---
trigger: always_on
---

# Design System

## Objective

This design system was created to ensure:

- Visual consistency
- Scalability
- Fast implementation
- Accessibility
- Premium aesthetics
- Responsive behavior
- High performance

The visual language must feel:

- Premium
- Minimal
- Modern
- Spacious
- Elegant
- Conversion-focused

---

# Core Design Principles

Always prioritize:

1. Clarity
2. Hierarchy
3. Consistency
4. Simplicity
5. Accessibility
6. Performance
7. Scalability

---

# Layout System

## Container

Use a centralized responsive container.


<div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">


---

# Tailwind CSS v4 Rules

Tailwind CSS v4 não utiliza o arquivo `tailwind.config.js`. Todo o tema e tokens são definidos diretamente no CSS utilizando variáveis nativas e a diretiva `@theme`.

### 1. Definindo Cores e Customizações do Tema

Para adicionar novas cores de marca ou tokens customizados, edite o [globals.css] usando a diretiva `@theme`:

```css
@import "tailwindcss";

@theme {
  --color-primary-50: #f0fdf4;
  --color-primary-500: #22c55e;
  --color-primary-950: #052e16;
  
  --font-sans: var(--font-geist-sans), sans-serif;
  --font-mono: var(--font-geist-mono), monospace;
}
```

### 2. Evite Estilos inline e HEX Hardcoded
- Nunca use mix-blens-overlay nas imagens.
- Não use style interno, sempre externo.
- Não use cores HEX nos arquivos TSX (ex: `bg-[#ff0000]`). Sempre defina a cor no `@theme` em [globals.css] e use a classe utilitária do Tailwind (ex: `bg-primary-500`).
- Utilize espaçamentos padrão do Tailwind (`p-4`, `m-6`, `gap-8`) para manter o ritmo vertical consistente.