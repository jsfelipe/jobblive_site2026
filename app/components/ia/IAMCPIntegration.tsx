'use client';

import { useRef } from 'react';
import { Cpu } from 'lucide-react';
import { useScroll, useSpring } from 'motion/react';
import { IAMCPWorkflow } from './IAMCPWorkflow';

export function IAMCPIntegration() {
  const sectionMCPRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionMCPRef,
    offset: ['start start', '0.5 start']
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001
  });

  return (
    <div ref={sectionMCPRef} className="relative w-full h-auto lg:h-[200vh] mt-0 lg:-mt-[100vh] z-40">
      <section className="relative lg:sticky top-0 min-h-screen lg:h-screen w-full bg-secondary-50 border-t border-foreground/10 text-foreground flex items-center justify-center py-16 sm:py-20 lg:py-12 px-4 sm:px-6 lg:px-8 shadow-[0_-30px_80px_rgba(0,0,0,0.06)]">
        <div className="container-custom max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Lado Esquerdo */}
          <div className="flex flex-col items-start">
            <p className="text-overline tracking-widest uppercase mb-4">
              Model Context Protocol
            </p>

            <h2 className="text-3xl md:text-4xl text-foreground font-display mb-4 leading-tight font-normal">
              Conecte o JobbLive <span className="text-foreground/70">à sua plataforma de IA</span>
            </h2>

            <p className="text-foreground/70 leading-relaxed text-[16px] max-w-xl mb-6">
              Além das telas do sistema, o JobbLive se conecta a assistentes de IA pelo Model Context Protocol (MCP). Em Cursor, Claude Desktop, VS Code e outros clientes compatíveis, você pede em linguagem natural: listar fornecedores, criar lançamento, consultar acompanhamento financeiro ou abrir projeto.
            </p>

            <div className="text-foreground text-[17px] leading-snug border-l-2 border-primary-500 pl-4 mt-2">
              <p>A conexão usa a mesma API REST do JobbLive,</p>
              <p><span className="text-primary-500 font-semibold">com autenticação</span> da sua conta.</p>
            </div>
          </div>

          {/* Lado Direito: Workflow Interativo MCP (Animado com Scroll) */}
          <div className="w-full flex justify-center lg:justify-end">
            <IAMCPWorkflow progress={smoothProgress} />
          </div>
        </div>
      </section>
    </div>
  );
}
