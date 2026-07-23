import React from 'react';

interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Componente reutilizável para injetar dados estruturados (Schema.org / JSON-LD) nas páginas.
 * Ajuda a otimizar a indexação por mecanismos de busca (SEO) e motores de IA (GEO).
 */
export default function JsonLd({ data }: JsonLdProps) {
  // Garante que o schema básico está presente
  const formattedData = {
    '@context': 'https://schema.org',
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(formattedData) }}
    />
  );
}
