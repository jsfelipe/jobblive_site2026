'use client';

import { useRef } from 'react';
import { CurrencyDollar, FileText, UploadSimple } from '@phosphor-icons/react';
import { useScroll, useSpring } from 'motion/react';
import { IAConciliacaoWorkflow } from './IAConciliacaoWorkflow';
import { IAOrcamentoWorkflow } from './IAOrcamentoWorkflow';
import { IAImportacaoWorkflow } from './IAImportacaoWorkflow';

export function IAStickyFeatures() {
  // Observador de rolagem Card 1 (Conciliação Bancária)
  // Anima nos primeiros 100vh (0.333 da trilha de 300vh). O Card 2 só começa a subir APÓS isso!
  const section1Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: scrollYProgress1 } = useScroll({
    target: section1Ref,
    offset: ['start start', '0.333 start']
  });
  const smoothProgress1 = useSpring(scrollYProgress1, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001
  });

  // Observador de rolagem Card 2 (Criação de Orçamentos)
  // Anima nos primeiros 100vh em que fixa no topo. O Card 3 só começa a subir APÓS isso!
  const section2Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: scrollYProgress2 } = useScroll({
    target: section2Ref,
    offset: ['start start', '0.333 start']
  });
  const smoothProgress2 = useSpring(scrollYProgress2, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001
  });

  // Observador de rolagem Card 3 (Importação de Orçamentos)
  // Anima nos primeiros 100vh em que fixa no topo. A seção seguinte só sobe APÓS isso!
  const section3Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: scrollYProgress3 } = useScroll({
    target: section3Ref,
    offset: ['start start', '0.333 start']
  });
  const smoothProgress3 = useSpring(scrollYProgress3, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001
  });

  return (
    <div className="relative w-full bg-background">
      {/* ─── CARD 1: Conciliação bancária com IA ─── */}
      <div ref={section1Ref} className="relative w-full h-auto lg:h-[300vh] z-10">
        <section className="relative lg:sticky top-0 min-h-screen lg:h-screen w-full bg-white border-t border-b border-foreground/10 text-foreground flex items-center shadow-xs justify-center py-16 sm:py-20 lg:py-12 px-4 sm:px-6 lg:px-8">
          <div className="container-custom max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Lado Esquerdo: Texto */}
            <div className="flex flex-col items-start">
              <p className="text-overline tracking-widest uppercase mb-4">
                Financeiro
              </p>

              <h2 className="text-3xl md:text-4xl text-foreground font-display mb-4 leading-tight font-normal">
                Conciliação bancária <span className="text-foreground/70">com IA</span>
              </h2>

              <p className="text-foreground/70 leading-relaxed text-[16px] max-w-xl mb-6">
                Informe a conta, o período ou importe o OFX e deixe a análise começar. O JobbLive compara o extrato com os lançamentos, indica o que pode ser conciliado, o que parece taxa bancária e o que precisa de atenção. Itens com alta confiança já vêm destacados para você revisar o lote e confirmar.
              </p>

              <div className="text-foreground text-[17px] leading-snug border-l-2 border-primary-500 pl-4 mt-2">
                <p>Menos conferência linha a linha.</p>
                <p><span className="text-primary-500 font-semibold">Mais fechamento</span> no prazo.</p>
              </div>
            </div>

            {/* Lado Direito: Workflow Animado via Scroll */}
            <div className="w-full flex justify-center lg:justify-end">
              <IAConciliacaoWorkflow progress={smoothProgress1} />
            </div>
          </div>
        </section>
      </div>

      {/* ─── CARD 2: Crie orçamentos com IA ─── */}
      <div ref={section2Ref} className="relative w-full h-auto lg:h-[300vh] mt-0 lg:-mt-[100vh] z-20">
        <section className="relative lg:sticky top-0 min-h-screen lg:h-screen w-full bg-secondary-50 flex items-center justify-center py-16 sm:py-20 lg:py-12 px-4 sm:px-6 lg:px-8 shadow-[0_-15px_40px_rgba(0,0,0,0.05)] border-t border-foreground/10">
          <div className="container-custom max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Lado Esquerdo: Workflow Animado via Scroll */}
            <div className="w-full flex justify-center lg:justify-start order-2 lg:order-1">
              <IAOrcamentoWorkflow progress={smoothProgress2} />
            </div>

            {/* Lado Direito: Texto */}
            <div className="flex flex-col items-start order-1 lg:order-2">
              <p className="text-overline tracking-widest uppercase mb-4">
                Orçamentos
              </p>

              <h2 className="text-3xl md:text-4xl text-foreground font-display mb-4 leading-tight font-normal">
                Crie orçamentos <span className="text-foreground/70">com IA</span>
              </h2>

              <p className="text-foreground/70 leading-relaxed text-[16px] max-w-xl mb-6">
                Cole o briefing, o e-mail da agência ou peça uma cópia de um orçamento existente. A IA interpreta o pedido, identifica cliente, serviço e modelo, e monta grupos e itens a partir do catálogo da empresa. Você revisa o rascunho, ajusta o que for preciso e grava a proposta no fluxo que o time já conhece.
              </p>

              <div className="text-foreground text-[17px] leading-snug border-l-2 border-primary-500 pl-4 mt-2">
                <p>Da conversa comercial</p>
                <p><span className="text-primary-500 font-semibold">ao orçamento</span> estruturado.</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ─── CARD 3: Importe orçamentos com ajuda da IA ─── */}
      <div ref={section3Ref} className="relative w-full h-auto lg:h-[300vh] mt-0 lg:-mt-[100vh] z-30">
        <section className="relative lg:sticky top-0 min-h-screen lg:h-screen w-full bg-white flex items-center justify-center py-16 sm:py-20 lg:py-12 px-4 sm:px-6 lg:px-8 shadow-[0_-15px_40px_rgba(0,0,0,0.05)] border-t border-foreground/10">
          <div className="container-custom max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Lado Esquerdo: Texto */}
            <div className="flex flex-col items-start">
              <p className="text-overline tracking-widest uppercase mb-4">
                Importação de Orçamentos
              </p>

              <h2 className="text-3xl md:text-4xl text-foreground font-display mb-4 leading-tight font-normal">
                Importe orçamentos <span className="text-foreground/70">com ajuda da IA</span>
              </h2>

              <p className="text-foreground/70 leading-relaxed text-[16px] max-w-xl mb-6">
                Trouxe a planilha de outro sistema ou de um modelo da agência? Na importação, a IA relaciona automaticamente grupo, subgrupo, item, valor, descrição e dados de cabeçalho — cliente, agência e serviço. Você valida o mapeamento e grava.
              </p>

              <div className="text-foreground text-[17px] leading-snug border-l-2 border-primary-500 pl-4 mt-2">
                <p>A planilha deixa de ser um quebra-cabeça</p>
                <p>e vira orçamento <span className="text-primary-500 font-semibold">pronto para revisão e envio</span>.</p>
              </div>
            </div>

            {/* Lado Direito: Workflow Animado via Scroll */}
            <div className="w-full flex justify-center lg:justify-end">
              <IAImportacaoWorkflow progress={smoothProgress3} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
