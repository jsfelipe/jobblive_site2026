---
trigger: always_on
---

# SEO + GEO Rules

## Objective

Todas as páginas devem ser otimizadas para:

- Otimização de Mecanismos de Busca (SEO tradicional)
- Otimização para Motores de Busca por IA (GEO - Generative Engine Optimization)
- Descoberta por IAs (SearchGPT, Perplexity, Gemini, ChatGPT)
- Snippets enriquecidos (Rich snippets)
- Relevância local e contextual
- Clareza semântica e estruturação de fatos

---

# Core Principles

Sempre priorize:

1. **Semântica HTML5 estrita:** Use `<main>`, `<article>`, `<section>`, `<header>`, `<footer>`, `<aside>`, e `<table>` de forma correta.
2. **Dados Estruturados (JSON-LD):** Adicione Schemas ricos para que rastreadores de IA entendam a entidade descrita (Organização, Produto, FAQ, Evento).
3. **Escritura Baseada em Fatos e Citações:** Motores de IA priorizam citações, dados concretos, listas organizadas e tabelas de comparação.
4. **Respostas Diretas (FAQs):** Responda às principais dúvidas de forma concisa e utilize o Schema FAQPage.

---

# Metadata & Next.js Rules

Cada página deve declarar metadados dinamicamente ou estáticos usando a API de metadados do Next.js:

```typescript
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Título Otimizado (Keyword principal) | Nome da Marca',
  description: 'Descrição persuasiva e informativa contendo palavras-chave secundárias. Máximo de 160 caracteres.',
  alternates: {
    canonical: 'https://site.com.br/rota',
  },
  openGraph: {
    title: '...',
    description: '...',
    images: [{ url: '/og-image.jpg' }],
  }
}
```

---

# GEO (Generative Engine Optimization) Guidelines

Para que os LLMs citem o site em suas respostas:

1. **Adicione um componente JSON-LD:** Sempre renderize dados estruturados no cabeçalho ou corpo da página (ex: `<JsonLd data={...} />`).
2. **Apresente Fatos Estruturados:** Prefira colocar estatísticas, valores e especificações em listas ordenadas ou tabelas do que apenas em parágrafos de texto longos.
3. **Seção de FAQ Semântica:** Adicione uma seção de perguntas e respostas claras. As perguntas devem refletir as consultas exatas que os usuários fariam em motores de pesquisa conversacionais (ex: "Como funciona a contratação do serviço X?").
4. **IA-Bots no `robots.ts`:** Mantenha os robôs de busca de IA (como `GPTBot`, `ClaudeBot`, `Applebot-Extended`, `Google-Extended`) autorizados a rastrear os arquivos públicos, a menos que o projeto determine o contrário.