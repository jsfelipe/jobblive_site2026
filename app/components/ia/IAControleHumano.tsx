'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Sparkle, Eye, CheckCircle } from '@phosphor-icons/react';

interface StepCard {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const STEPS: StepCard[] = [
  {
    step: '01',
    title: 'Sugere',
    description: 'Cruza dados, interpreta o contexto e prepara o próximo passo.',
    icon: <Sparkle className="w-6 h-6" />,
  },
  {
    step: '02',
    title: 'Você revisa',
    description: 'Itens importantes ficam visíveis para conferência e ajuste.',
    icon: <Eye className="w-6 h-6" />,
  },
  {
    step: '03',
    title: 'O JobbLive registra',
    description: 'Depois da confirmação, tudo segue no fluxo da operação.',
    icon: <CheckCircle className="w-6 h-6" />,
  },
];

export function IAControleHumano() {
  return (
    <section className="section-padding bg-background border-t border-foreground/5">
      <div className="container-custom max-w-6xl mx-auto">
        {/* Cabeçalho no padrão JobbLive */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="text-overline tracking-widest uppercase mb-4">
            Controle humano em cada etapa
          </p>

          <h2 className="text-3xl md:text-5xl text-foreground font-display text-pretty tracking-tightest leading-tightest mb-4">
            A IA acelera. <span className="text-primary-500">Sua equipe decide.</span>
          </h2>

          <p className="text-lg text-foreground/70 text-pretty mx-auto">
            Sem substituir o controle da equipe, a IA sugere, organiza e aponta o caminho.
          </p>
        </div>

        {/* Grade de Cards 100% no padrão do JobbLive (rounded-none, sem borda, sem sombra, sem hover) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-left">
          {STEPS.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white p-6 lg:p-8 rounded-none relative flex flex-col"
            >
              {/* Número do Card em fonte Sofia suave */}
              <div className="step-number font-sofia text-8xl text-foreground/10 leading-none mb-8 select-none" aria-hidden="true">
                {item.step}
              </div>

              {/* Ícone em vermelho primário */}
              <div className="text-primary-500 mb-4">
                {item.icon}
              </div>

              {/* Título */}
              <h3 className="text-body-lg text-foreground font-semibold mb-2">
                {item.title}
              </h3>

              {/* Descrição */}
              <p className="text-body-md text-foreground/60 text-pretty leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
