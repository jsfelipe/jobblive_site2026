'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { IAAPIWorkflow } from './IAAPIWorkflow';

export function IAAPIBanner() {
  return (
    <section className="cta w-full bg-primary-500 py-16 md:py-24 overflow-hidden relative">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
        >
          {/* Lado Esquerdo: Conteúdo Principal */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow */}
            <p className="text-overline text-white/80 tracking-widest uppercase mb-4">
              API JobbLive
            </p>

            {/* Título Principal */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white font-normal tracking-tightest leading-[1.15] mb-6">
              Integre, automatize e leve<br />o contexto do ERP para sua IA.
            </h2>

            {/* Textos explicativos */}
            <div className="space-y-3 text-white/90 text-[15px] sm:text-[16px] leading-relaxed max-w-xl mb-8">
              <p>
                Consulte a documentação da API para conectar sua plataforma, criar automações e desenvolver novos fluxos com os dados e permissões da sua operação.
              </p>
              <p className="text-white/80 text-[14px] sm:text-[15px]">
                Conecte com segurança. Automatize com contexto. Mantenha o controle.
              </p>
            </div>

            {/* Botão Acessar Documentação */}
            <a
              href="https://apiv2.sistemajobb.com.br/api/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg bg-white text-foreground hover:bg-secondary-50 text-center inline-flex items-center gap-2 group border-none shadow-sm"
            >
              <span>Acessar documentação da API</span>
              <ArrowRight size={16} className="text-foreground/70 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Lado Direito: Workflow em Nós Monocromático (Estilo Amperos) */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <IAAPIWorkflow />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
