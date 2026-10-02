'use client';

import { motion } from 'motion/react';
import { 
  Check, 
  Code2, 
  Sparkles, 
  Database, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';

export function IAAPIWorkflow() {
  return (
    <div className="relative w-full max-w-[460px] mx-auto flex flex-col items-center justify-start select-none py-2">
      
      {/* ─── CARD 1: TOPO (Requisição da API / Endpoint Seguro) ─── */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-[400px] rounded-2xl bg-transparent border border-white/25 p-4 relative z-20 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/90 shrink-0">
            <Code2 size={18} strokeWidth={1.5} />
          </div>
          <div>
            <div className="text-[13px] text-white font-medium tracking-tight">
              POST /v2/ai/context
            </div>
            <div className="text-[11px] text-white/50 mt-0.5">
              API REST • Autenticação OAuth 2.0
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[10px] text-white/80 shrink-0">
          <Sparkles size={11} className="text-[#FF7A45]" />
          <span>Endpoint</span>
        </div>
      </motion.div>

      {/* ─── LINHAS DE CONEXÃO SUPERIORES COM SVG ─── */}
      <div className="relative w-full h-[58px] flex items-center justify-center z-10">
        <svg className="w-full h-full" viewBox="0 0 420 58" fill="none" preserveAspectRatio="none">
          {/* Ramificação Esquerda */}
          <motion.path
            d="M 210,0 L 210,18 C 210,30 110,30 110,42 L 110,58"
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth="1.25"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          />
          {/* Ramificação Direita */}
          <motion.path
            d="M 210,0 L 210,18 C 210,30 310,30 310,42 L 310,58"
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth="1.25"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          />

          {/* Pulso de luz animado */}
          <motion.path
            d="M 210,0 L 210,18 C 210,30 110,30 110,42 L 110,58"
            stroke="rgba(255, 255, 255, 0.85)"
            strokeWidth="1.5"
            strokeDasharray="14 100"
            initial={{ strokeDashoffset: 114 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
          />

          <circle cx="210" cy="18" r="2.5" fill="transparent" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1.2" />
        </svg>

        {/* Badges Flutuantes nos ramos */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="absolute top-[22px] left-[70px] -translate-y-1/2 px-2 py-0.5 rounded-md bg-transparent border border-white/20 text-[9px] text-white/70"
        >
          Contexto ERP
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="absolute top-[22px] right-[70px] -translate-y-1/2 px-2 py-0.5 rounded-md bg-transparent border border-white/20 text-[9px] text-white/70"
        >
          Permissões
        </motion.div>
      </div>

      {/* ─── NÓS DO MEIO: 2 CARDS PARALELOS (CONTEXTO & SEGURANÇA) ─── */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5 relative z-20"
      >
        {/* CARD ESQUERDO: Dados e Contexto do ERP */}
        <div className="rounded-2xl bg-transparent border border-white/25 p-4 flex flex-col justify-between relative">
          <div className="flex items-start justify-between mb-3">
            <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/80">
              <Database size={16} strokeWidth={1.8} />
            </div>
            <span className="text-[9px] font-medium text-emerald-400 bg-emerald-500/15 border border-emerald-500/25 px-2 py-0.5 rounded-full">
              JobbLive
            </span>
          </div>

          <div>
            <div className="text-[13px] font-medium tracking-tight text-white">
              Dados da Operação
            </div>
            <div className="text-[11px] text-white/50 mt-1 leading-snug">
              Projetos, orçamentos, faturas e fornecedores
            </div>
          </div>

          {/* Cursor IA Agent Flutuante */}
          <motion.div
            initial={{ opacity: 0, x: 20, y: -15 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="absolute -top-3 -right-2 pointer-events-none z-30 flex items-center gap-1.5 bg-[#0d0e11] border border-white/30 text-white text-[10px] font-medium py-1 px-2.5 rounded-full shadow-2xl"
          >
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none" className="text-white">
              <path d="M1 1L8.5 4.5L5 6L3.5 10.5L1 1Z" fill="currentColor" stroke="currentColor" strokeWidth="0.8" />
            </svg>
            <span>IA Agent</span>
          </motion.div>
        </div>

        {/* CARD DIREITO: Segurança & Escopos */}
        <div className="rounded-2xl bg-transparent border border-white/25 p-4 flex flex-col justify-between relative">
          <div className="flex items-start justify-between mb-3">
            <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/70">
              <ShieldCheck size={16} strokeWidth={1.5} />
            </div>
            <span className="text-[9px] text-amber-300 bg-amber-400/15 border border-amber-400/25 px-2 py-0.5 rounded-full">
              Escopo Ativo
            </span>
          </div>

          <div>
            <div className="text-[13px] text-white/90 font-medium tracking-tight">
              Regras & Permissões
            </div>
            <div className="text-[11px] text-white/50 mt-1 leading-snug">
              Controle estrito por usuário e política da produtora
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── LINHAS DE CONEXÃO INFERIORES COM CONVERGÊNCIA ─── */}
      <div className="relative w-full h-[54px] flex items-center justify-center z-10">
        <svg className="w-full h-full" viewBox="0 0 420 54" fill="none" preserveAspectRatio="none">
          {/* Linha saindo do card esquerdo até o centro */}
          <motion.path
            d="M 110,0 L 110,16 C 110,28 210,28 210,40 L 210,54"
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth="1.25"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.65 }}
          />
          {/* Linha saindo do card direito até o centro */}
          <motion.path
            d="M 310,0 L 310,16 C 310,28 210,28 210,40 L 210,54"
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth="1.25"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.65 }}
          />

          <circle cx="110" cy="0" r="2" fill="transparent" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" />
          <circle cx="310" cy="0" r="2" fill="transparent" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" />
          <circle cx="210" cy="40" r="2.5" fill="transparent" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.2" />
        </svg>

        {/* Badge Central de Validação */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-md bg-transparent border border-white/30 flex items-center justify-center text-white shadow-lg z-20"
        >
          <Check size={13} strokeWidth={2.5} className="text-emerald-400" />
        </motion.div>
      </div>

      {/* ─── CARD 4: RESULTADO FINAL (Contexto Integrado à IA) ─── */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.85 }}
        className="w-full max-w-[400px] rounded-2xl bg-transparent border border-white/25 p-3.5 px-4.5 flex items-center justify-between relative z-20"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/90">
            <CheckCircle2 size={16} strokeWidth={1.5} className="text-emerald-400" />
          </div>
          <div>
            <div className="text-[13px] text-white font-medium tracking-tight">
              Contexto do ERP Integrado
            </div>
            <div className="text-[11px] text-white/50 mt-0.5">
              Automação segura executada com sucesso
            </div>
          </div>
        </div>

        {/* Badge de Conclusão */}
        <div className="text-[10px] text-emerald-300 flex items-center gap-1.5 bg-emerald-500/15 px-2.5 py-1 rounded-full border border-emerald-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Ativo</span>
        </div>
      </motion.div>
    </div>
  );
}
