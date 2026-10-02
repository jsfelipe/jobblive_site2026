'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface OrbitWordConfig {
  text: string;
  className: string;
  initialAngleDeg: number;
}

interface OrbitIconConfig {
  src: string;
  alt: string;
  width: number;
  height: number;
  initialAngleDeg: number;
}

const ORBIT_WORDS: OrbitWordConfig[] = [
  {
    text: 'memória',
    className: 'font-serif italic text-foreground/45 text-[15px] sm:text-[18px]',
    initialAngleDeg: -110,
  },
  {
    text: 'prompt',
    className: 'font-sans font-normal text-foreground/50 text-[18px] sm:text-[23px] tracking-wide',
    initialAngleDeg: -155,
  },
  {
    text: 'Inteligência Artificial',
    className: 'font-sans text-foreground/40 text-[12px] sm:text-[14px] tracking-normal',
    initialAngleDeg: -200,
  },
  {
    text: 'Financeiro',
    className: 'font-serif italic text-foreground/50 text-[18px] sm:text-[23px]',
    initialAngleDeg: -245,
  },
  {
    text: 'API',
    className: 'font-sans font-medium text-foreground/45 text-[16px] sm:text-[20px] tracking-wider',
    initialAngleDeg: -285,
  },
  {
    text: 'contexto',
    className: 'font-serif italic text-foreground/40 text-[15px] sm:text-[18px]',
    initialAngleDeg: -325,
  },
  {
    text: 'mcp',
    className: 'font-mono text-foreground/40 text-[14px] sm:text-[16px] tracking-widest',
    initialAngleDeg: -370,
  },
  {
    text: 'Comercial',
    className: 'font-serif italic text-foreground/45 text-[16px] sm:text-[20px]',
    initialAngleDeg: -415,
  },
];

const ORBIT_ICONS: OrbitIconConfig[] = [
  {
    src: '/images/icon/openIA.png',
    alt: 'OpenAI',
    width: 252,
    height: 252,
    initialAngleDeg: -30,
  },
  {
    src: '/images/icon/gemini.png',
    alt: 'Gemini',
    width: 295,
    height: 295,
    initialAngleDeg: -90,
  },
  {
    src: '/images/icon/cursor.png',
    alt: 'Cursor',
    width: 242,
    height: 242,
    initialAngleDeg: -150,
  },
  {
    src: '/images/icon/claude.png',
    alt: 'Claude',
    width: 298,
    height: 298,
    initialAngleDeg: -210,
  },
  {
    src: '/images/icon/mcp.png',
    alt: 'MCP',
    width: 230,
    height: 230,
    initialAngleDeg: -270,
  },
  {
    src: '/images/icon/api.png',
    alt: 'API',
    width: 268,
    height: 268,
    initialAngleDeg: -330,
  },
];

function OrbitingWord({
  word,
  radius,
  duration = 48,
}: {
  word: OrbitWordConfig;
  radius: number;
  duration?: number;
}) {
  const initialRad = (word.initialAngleDeg * Math.PI) / 180;
  const steps = 60;

  // Sentido anti-horário em círculo exato: raio igual para x e y
  const x = Array.from({ length: steps + 1 }, (_, i) => {
    const progress = i / steps;
    const angle = initialRad - progress * 2 * Math.PI;
    return Math.cos(angle) * radius;
  });

  const y = Array.from({ length: steps + 1 }, (_, i) => {
    const progress = i / steps;
    const angle = initialRad - progress * 2 * Math.PI;
    return Math.sin(angle) * radius;
  });

  return (
    <motion.div
      key={`word-${radius}`}
      className="absolute left-1/2 top-1/2 z-10 pointer-events-none select-none"
      animate={{ x, y }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <span className={`block -translate-x-1/2 -translate-y-1/2 whitespace-nowrap  ${word.className}`}>
        {word.text}
      </span>
    </motion.div>
  );
}

function OrbitingIcon({
  icon,
  radius,
  scale = 1,
  duration = 75,
}: {
  icon: OrbitIconConfig;
  radius: number;
  scale?: number;
  duration?: number;
}) {
  const initialRad = (icon.initialAngleDeg * Math.PI) / 180;
  const steps = 60;

  // Sentido anti-horário em círculo exato passando pela frente (z-30)
  const x = Array.from({ length: steps + 1 }, (_, i) => {
    const progress = i / steps;
    const angle = initialRad - progress * 2 * Math.PI;
    return Math.cos(angle) * radius;
  });

  const y = Array.from({ length: steps + 1 }, (_, i) => {
    const progress = i / steps;
    const angle = initialRad - progress * 2 * Math.PI;
    return Math.sin(angle) * radius;
  });

  const currentWidth = Math.round(icon.width * scale);
  const currentHeight = Math.round(icon.height * scale);

  return (
    <motion.div
      key={`icon-${radius}-${scale}`}
      className="absolute left-1/2 top-1/2 z-30 pointer-events-none select-none"
      animate={{ x, y }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <div
        className="-translate-x-1/2 -translate-y-1/2 drop-shadow-[0_16px_36px_rgba(0,0,0,0.75)]"
        style={{
          width: `${currentWidth}px`,
          height: `${currentHeight}px`,
        }}
      >
        <img
          src={icon.src}
          alt={icon.alt}
          width={icon.width}
          height={icon.height}
          className="w-full h-full object-contain"
        />
      </div>
    </motion.div>
  );
}

export function IAHero() {
  const [wordRadius, setWordRadius] = useState(240);
  const [iconRadius, setIconRadius] = useState(160);
  const [iconScale, setIconScale] = useState(0.38);

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setWordRadius(140);
        setIconRadius(100);
        setIconScale(0.25);
      } else if (width < 1024) {
        setWordRadius(190);
        setIconRadius(130);
        setIconScale(0.32);
      } else {
        setWordRadius(240);
        setIconRadius(160);
        setIconScale(0.38);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div className="relative w-full max-w-[1400px] mx-auto min-h-[580px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center select-none py-12">
      {/* Hero Text Content */}
      <div className="relative z-20 lg:col-span-6 flex flex-col items-center lg:items-start justify-center text-center lg:text-left pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-center lg:items-start"
        >
          {/* Tag de destaque no padrão do site */}
          <p className="text-overline tracking-widest uppercase mb-4 text-center lg:text-left select-none">
            Inteligência Artificial no JobbLive
          </p>

          {/* Headline */}
          <h1 className="font-display text-[32px] sm:text-[40px] md:text-[50px] font-medium tracking-tight text-foreground leading-[1.12] mb-4 text-center lg:text-left">
            <span className="text-primary-500">JobbLive com IA:</span><br />
            mais agilidade no<br />
            financeiro e no comercial
          </h1>

          {/* Subheadline */}
          <p className="font-sans text-[14px] sm:text-[14px] md:text-[16px] text-foreground/70 leading-relaxed max-w-xl mb-6 text-center lg:text-left mx-auto lg:mx-0">
            A inteligência artificial entra no JobbLive para acelerar o que mais consome tempo no dia a dia: conferir extrato, montar proposta e trazer planilha de orçamento para dentro do sistema.
          </p>

          {/* Contact / CTA Button no padrão do site */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center lg:justify-start">
            <Link
              href="/teste-gratis"
              className="btn-primary btn-lg w-full sm:w-auto px-8 text-center flex items-center justify-center"
            >
              Teste e conheça o JobbLive
            </Link>
            <a
              href="https://wa.me/5581998504107?text=Ol%C3%A1!%20quero%20saber%20mais%20sobre%20o%20JobbLive!"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg w-full sm:w-auto px-8 bg-white text-foreground hover:bg-secondary-50 text-center flex items-center justify-center border border-foreground/10"
            >
              Agendar demo
            </a>
          </div>
          <p className="text-xs text-foreground/50 mt-3 text-center lg:text-left select-none">
            Sem cartão de crédito &nbsp;|&nbsp; Teste por 7 dias grátis
          </p>
        </motion.div>
      </div>

      {/* Hero Visual Right: Palavras em órbita por trás (z-10), Imagem fixa (z-20) e Ícones em órbita pela frente (z-30) */}
      <div className="relative z-10 lg:col-span-6 flex items-center justify-center min-h-[480px] sm:min-h-[520px] lg:min-h-[580px]">
        {/* Glow de fundo sutil */}
        <div className="absolute inset-0 bg-primary-500/10 blur-[100px] rounded-full pointer-events-none z-0" />

        {/* Camada das palavras orbitando em círculo exato (z-10, por trás do card bg-ia.png) */}
        <div className="absolute inset-0 flex items-center justify-center overflow-visible pointer-events-none z-10">
          {ORBIT_WORDS.map((word) => (
            <OrbitingWord
              key={word.text}
              word={word}
              radius={wordRadius}
              duration={48}
            />
          ))}
        </div>

        {/* Imagem fixa no centro (z-20, entre as palavras e os ícones) */}
        <div className="relative z-20 w-full px-2 select-none pointer-events-auto">
          <img
            src="/images/bg-ia.png"
            alt="Interface de IA Jobb"
            width={1208}
            height={242}
            className="w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
          />
        </div>

        {/* Camada dos ícones orbitando em círculo menor e mais próximo (z-30, passando pela FRENTE do card bg-ia.png) */}
        <div className="absolute inset-0 flex items-center justify-center overflow-visible pointer-events-none z-30">
          {ORBIT_ICONS.map((icon) => (
            <OrbitingIcon
              key={icon.alt}
              icon={icon}
              radius={iconRadius}
              scale={iconScale}
              duration={75}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
