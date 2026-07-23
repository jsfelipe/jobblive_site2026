"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface SegmentHeroProps {
  name: string;
  heroTitle: string;
  heroSubtitle: string;
  whatsappLink: string;
}

export default function SegmentHero({ name, heroTitle, heroSubtitle, whatsappLink }: SegmentHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.6 } });
    
    tl.fromTo(".seg-badge", { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4 })
      .fromTo(".seg-title", { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.25")
      .fromTo(".seg-subtitle", { y: 15, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.3")
      .fromTo(".seg-buttons", { y: 10, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.3");
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative overflow-hidden lg:h-[90vh] pt-32 pb-20 md:pt-40 md:pb-28 bg-white flex flex-col items-center justify-center">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="seg-badge opacity-0 inline-flex items-center rounded-full border border-primary-500 bg-primary-50 px-4 py-1.5 text-xs text-primary-600 mb-6 font-display font-medium text-pretty">
          JobbLive para {name}
        </div>

        {/* Headline */}
        <h1 className="seg-title opacity-0 text-3xl md:text-5xl lg:text-6xl max-w-4xl text-foreground text-pretty tracking-tightest leading-tightest mb-6">
          {heroTitle}
        </h1>

        {/* Subtítulo */}
        <p className="seg-subtitle opacity-0 text-body-lg text-foreground/70 max-w-2xl text-pretty mb-10 leading-relaxed">
          {heroSubtitle}
        </p>

        {/* Botões de Ação */}
        <div className="seg-buttons opacity-0 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link href="/teste-gratis" target="_blank" rel="noopener noreferrer" className="btn-primary btn-lg w-full sm:w-auto px-8 font-normal text-center flex items-center justify-center">
            Começar teste de 7 dias
          </Link>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-secondary btn-lg w-full sm:w-auto px-8 font-normal text-center bg-white hover:bg-secondary-50 flex items-center justify-center">
            Agendar demonstração
          </a>
        </div>
      </div>
    </section>
  );
}
