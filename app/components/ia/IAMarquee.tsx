'use client';

interface IAItem {
  name: string;
  src: string;
}

// Logotipos estritamente da pasta public/images/Logotipos
const AI_LOGOS: IAItem[] = [
  {
    name: 'ChatGPT',
    src: '/images/Logotipos/ChatGPT.svg',
  },
  {
    name: 'Claude AI',
    src: '/images/Logotipos/Claude_AI.webp',
  },
  {
    name: 'Gemini',
    src: '/images/Logotipos/Gemini.webp',
  },
  {
    name: 'Perplexity',
    src: '/images/Logotipos/perplexity.svg',
  },
];

export function IAMarquee() {
  // Repete a lista para um efeito contínuo, uniforme e infinito no marquee
  const repeatedLogos = [...AI_LOGOS, ...AI_LOGOS, ...AI_LOGOS, ...AI_LOGOS];

  return (
    <div className="w-full mt-10 mb-2 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-marquee-infinite hover:[animation-play-state:paused] items-center py-4">
        {repeatedLogos.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="flex items-center justify-center px-10 sm:px-14 shrink-0 transition-opacity duration-300 opacity-80 hover:opacity-100"
            title={item.name}
          >
            <img
              src={item.src}
              alt={item.name}
              className="h-10 sm:h-12 w-auto max-w-[140px] object-contain select-none pointer-events-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
