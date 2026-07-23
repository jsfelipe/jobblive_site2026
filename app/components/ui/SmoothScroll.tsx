"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // 1. Inicializa a instância do Lenis com as configurações personalizadas
    const lenis = new Lenis({
      duration: 1.5, // Duração da animação do scroll em segundos
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva de desaceleração suave (ease-out exponencial)
      orientation: "vertical",
      gestureOrientation: "vertical",
      wheelMultiplier: 1, // Multiplicador de sensibilidade da roda do mouse
      touchMultiplier: 2, // Multiplicador de sensibilidade para telas de toque
    });

    // 2. Cria o loop com requestAnimationFrame para atualizar o scroll suave frame a frame
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // 3. ResizeObserver para atualizar o Lenis em mudanças dinâmicas de altura (essencial para HMR e carregamento dinâmico)
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });

    if (document.body) {
      resizeObserver.observe(document.body);
    }

    // 4. Limpa os eventos, animações e destrói a instância ao desmontar o componente
    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, []);

  return <>{children}</>;
}
