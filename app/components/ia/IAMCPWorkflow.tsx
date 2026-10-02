'use client';

import { motion, useTransform, MotionValue } from 'motion/react';
import { 
  Check, 
  Terminal, 
  Sparkles, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';

interface IAMCPWorkflowProps {
  progress?: MotionValue<number>;
}

export function IAMCPWorkflow({ progress }: IAMCPWorkflowProps) {
  const isScrollDriven = !!progress;

  // ─── 1. CARD TOPO (Scroll Transform) ───
  const card1Y = progress ? useTransform(progress, [0.02, 0.28], [135, 0]) : 0;
  const card1Opacity = progress ? useTransform(progress, [0, 0.08], [0.6, 1]) : 1;
  const card1Scale = progress ? useTransform(progress, [0.02, 0.28], [1.02, 1]) : 1;

  // ─── 2. LINHAS SUPERIORES (Scroll Transform) ───
  const linesTopLength = progress ? useTransform(progress, [0.18, 0.38], [0, 1]) : 1;
  const linesTopOpacity = progress ? useTransform(progress, [0.18, 0.26], [0, 1]) : 1;

  // ─── 3. CARDS DO MEIO (Scroll Transform) ───
  const middleCardsY = progress ? useTransform(progress, [0.28, 0.50], [55, 0]) : 0;
  const middleCardsOpacity = progress ? useTransform(progress, [0.28, 0.46], [0, 1]) : 1;
  const middleCardsFilter = progress ? useTransform(progress, [0.28, 0.46], ['blur(6px)', 'blur(0px)']) : 'blur(0px)';

  // ─── 4. CURSOR IA (Scroll Transform) ───
  const cursorOpacity = progress ? useTransform(progress, [0.44, 0.52], [0, 1]) : 1;
  const cursorX = progress ? useTransform(progress, [0.44, 0.58], [45, 0]) : 0;
  const cursorY = progress ? useTransform(progress, [0.44, 0.58], [-35, 0]) : 0;
  const cursorScale = progress ? useTransform(progress, [0.58, 0.62, 0.66], [1, 0.85, 1]) : 1;

  // ─── 5. LINHAS INFERIORES & CHECK CENTRAL (Scroll Transform) ───
  const linesBottomLength = progress ? useTransform(progress, [0.54, 0.72], [0, 1]) : 1;
  const linesBottomOpacity = progress ? useTransform(progress, [0.54, 0.62], [0, 1]) : 1;
  const checkBadgeScale = progress ? useTransform(progress, [0.64, 0.74], [0, 1]) : 1;
  const checkBadgeOpacity = progress ? useTransform(progress, [0.64, 0.72], [0, 1]) : 1;

  // ─── 6. CARD INFERIOR (Scroll Transform) ───
  const card4Y = progress ? useTransform(progress, [0.72, 0.90], [45, 0]) : 0;
  const card4Opacity = progress ? useTransform(progress, [0.72, 0.88], [0, 1]) : 1;
  const card4Filter = progress ? useTransform(progress, [0.72, 0.88], ['blur(6px)', 'blur(0px)']) : 'blur(0px)';

  return (
    /* Container 100% transparente, sem moldura, sem fundo pesado e sem bordas externas */
    <div className="relative w-full max-w-[560px] mx-auto min-h-[460px] flex flex-col items-center justify-start select-none py-2">
      
      {/* ─── CARD 1: TOPO (Cursor / Claude / VS Code & Prompt em Linguagem Natural) ─── */}
      <motion.div 
        style={isScrollDriven ? { y: card1Y, opacity: card1Opacity, scale: card1Scale } : undefined}
        initial={!isScrollDriven ? { opacity: 0, y: 20 } : undefined}
        whileInView={!isScrollDriven ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-[440px] rounded-none bg-white border border-foreground/10 p-4 relative z-20 flex flex-col"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary-50 border border-foreground/10 flex items-center justify-center text-foreground/80 shrink-0">
              <Terminal size={18} strokeWidth={1.5} />
            </div>
            <div>
              <div className="text-[14px] text-foreground font-medium tracking-tight">
                Fale com o JobbLive onde você trabalha
              </div>
              <div className="text-[11px] text-foreground/60 mt-0.5 tracking-wide uppercase">
                Cursor • Claude Desktop • VS Code
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-50 border border-foreground/10 text-[11px] text-foreground/70 shrink-0">
            <Sparkles size={12} className="text-[#FD183F]" />
            <span>MCP</span>
          </div>
        </div>

        {/* Prompts em Linguagem Natural */}
        <div className="mt-3 pt-2.5 border-t border-foreground/10 flex flex-col gap-1.5 text-[11px]">
          <div className="flex items-center justify-between">
            <span className="text-foreground italic font-normal">
              “Crie um lançamento para este projeto.”
            </span>
            <span className="text-[9px] text-[#FD183F] bg-[#FD183F]/10 px-2 py-0.5 rounded-full border border-[#FD183F]/20 shrink-0 font-medium">
              Prompt Ativo
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-foreground/50 truncate">
            <span>Outros:</span>
            <span className="truncate italic">“Liste fornecedores ativos” • “Abra acompanhamento financeiro”</span>
          </div>
        </div>
      </motion.div>

      {/* ─── LINHAS DE CONEXÃO SUPERIORES COM SVG ─── */}
      <div className="relative w-full h-[68px] flex items-center justify-center z-10">
        <svg className="w-full h-full" viewBox="0 0 460 68" fill="none" preserveAspectRatio="none">
          {/* Ramificação Esquerda */}
          <motion.path
            d="M 230,0 L 230,20 C 230,34 125,34 125,48 L 125,68"
            stroke="rgba(0, 0, 0, 0.15)"
            strokeWidth="1.25"
            style={isScrollDriven ? { pathLength: linesTopLength, opacity: linesTopOpacity } : undefined}
            initial={!isScrollDriven ? { pathLength: 0, opacity: 0 } : undefined}
            whileInView={!isScrollDriven ? { pathLength: 1, opacity: 1 } : undefined}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          />
          {/* Ramificação Direita */}
          <motion.path
            d="M 230,0 L 230,20 C 230,34 335,34 335,48 L 335,68"
            stroke="rgba(0, 0, 0, 0.15)"
            strokeWidth="1.25"
            style={isScrollDriven ? { pathLength: linesTopLength, opacity: linesTopOpacity } : undefined}
            initial={!isScrollDriven ? { pathLength: 0, opacity: 0 } : undefined}
            whileInView={!isScrollDriven ? { pathLength: 1, opacity: 1 } : undefined}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          />

          {/* Pulso de luz animado */}
          <motion.path
            d="M 230,0 L 230,20 C 230,34 125,34 125,48 L 125,68"
            stroke="rgba(255, 255, 255, 0.6)"
            strokeWidth="1.5"
            strokeDasharray="16 120"
            initial={{ strokeDashoffset: 136 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
            style={{ opacity: linesTopOpacity }}
          />

          <circle cx="230" cy="20" r="3" fill="transparent" stroke="rgba(0, 0, 0, 0.35)" strokeWidth="1.2" />
        </svg>

        {/* Badges Flutuantes nos ramos */}
        <motion.div 
          style={isScrollDriven ? { opacity: linesTopOpacity } : undefined}
          initial={!isScrollDriven ? { opacity: 0 } : undefined}
          whileInView={!isScrollDriven ? { opacity: 1 } : undefined}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="absolute top-[26px] left-[78px] -translate-y-1/2 px-2 py-0.5 rounded-md bg-transparent border border-foreground/10 text-[9px] text-foreground/70"
        >
          JOBBLIVE MCP
        </motion.div>
        <motion.div 
          style={isScrollDriven ? { opacity: linesTopOpacity } : undefined}
          initial={!isScrollDriven ? { opacity: 0 } : undefined}
          whileInView={!isScrollDriven ? { opacity: 1 } : undefined}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="absolute top-[26px] right-[78px] -translate-y-1/2 px-2 py-0.5 rounded-md bg-transparent border border-foreground/10 text-[9px] text-foreground/50"
        >
          API REST
        </motion.div>
      </div>

      {/* ─── NÓS DO MEIO: 2 CARDS PARALELOS (PROCESSAMENTO & API) ─── */}
      <motion.div 
        style={isScrollDriven ? { y: middleCardsY, opacity: middleCardsOpacity, filter: middleCardsFilter } : undefined}
        initial={!isScrollDriven ? { opacity: 0, y: 25 } : undefined}
        whileInView={!isScrollDriven ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-20"
      >
        {/* CARD ESQUERDO: Servidor MCP & Tool Execution */}
        <div className="rounded-none bg-white border border-foreground/10 p-5 flex flex-col justify-between relative">
          <div className="flex items-start justify-between mb-4">
            <div className="w-9 h-9 rounded-xl bg-secondary-50 border border-foreground/10 flex items-center justify-center text-foreground/80">
              <Cpu size={18} strokeWidth={1.8} />
            </div>
            <span className="text-[10px] font-medium text-emerald-400/90 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              tools/call
            </span>
          </div>

          <div>
            <div className="text-[15px] font-medium tracking-tight text-white">
              JOBBLIVE MCP
            </div>
            <div className="text-[12px] text-foreground/60 mt-1 leading-snug">
              Interpreta comandos em chamadas seguras de API
            </div>
          </div>

          {/* Cursor IA Agent Flutuante (no tom de laranja da marca) */}
          <motion.div
            style={isScrollDriven ? { opacity: cursorOpacity, x: cursorX, y: cursorY, scale: cursorScale } : undefined}
            initial={!isScrollDriven ? { opacity: 0, x: 25, y: -20 } : undefined}
            whileInView={!isScrollDriven ? { opacity: 1, x: 0, y: 0 } : undefined}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="absolute -top-3 -right-2 pointer-events-none z-30 flex items-center gap-1.5 bg-[#FD183F] border border-primary-400/50 text-white text-[10px] font-semibold py-1 px-2.5 rounded-full shadow-lg shadow-primary-500/30"
          >
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none" className="text-white">
              <path d="M1 1L8.5 4.5L5 6L3.5 10.5L1 1Z" fill="currentColor" stroke="currentColor" strokeWidth="0.8" />
            </svg>
            <span>IA Agent</span>
          </motion.div>
        </div>

        {/* CARD DIREITO: Autenticação da Conta & API Jobb */}
        <div className="rounded-none bg-white border border-foreground/10 p-5 flex flex-col justify-between relative">
          <div className="flex items-start justify-between mb-4">
            <div className="w-9 h-9 rounded-xl bg-secondary-50 border border-foreground/10 flex items-center justify-center text-foreground/70">
              <ShieldCheck size={17} strokeWidth={1.5} />
            </div>
            <span className="text-[10px] text-amber-400/80 bg-amber-400/10 border border-amber-400/15 px-2 py-0.5 rounded-full">
              Autenticado
            </span>
          </div>

          <div>
            <div className="text-[15px] text-foreground font-medium tracking-tight">
              API REST + Conta
            </div>
            <div className="text-[12px] text-foreground/60 mt-1 leading-snug">
              Autenticação segura com as permissões do seu usuário
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── LINHAS DE CONEXÃO INFERIORES COM CONVERGÊNCIA ─── */}
      <div className="relative w-full h-[60px] flex items-center justify-center z-10">
        <svg className="w-full h-full" viewBox="0 0 460 60" fill="none" preserveAspectRatio="none">
          {/* Linha saindo do card esquerdo até o centro */}
          <motion.path
            d="M 125,0 L 125,18 C 125,34 230,34 230,48 L 230,60"
            stroke="rgba(0, 0, 0, 0.15)"
            strokeWidth="1.25"
            style={isScrollDriven ? { pathLength: linesBottomLength, opacity: linesBottomOpacity } : undefined}
            initial={!isScrollDriven ? { pathLength: 0, opacity: 0 } : undefined}
            whileInView={!isScrollDriven ? { pathLength: 1, opacity: 1 } : undefined}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          />
          {/* Linha saindo do card direito até o centro */}
          <motion.path
            d="M 335,0 L 335,18 C 335,34 230,34 230,48 L 230,60"
            stroke="rgba(0, 0, 0, 0.15)"
            strokeWidth="1.25"
            style={isScrollDriven ? { pathLength: linesBottomLength, opacity: linesBottomOpacity } : undefined}
            initial={!isScrollDriven ? { pathLength: 0, opacity: 0 } : undefined}
            whileInView={!isScrollDriven ? { pathLength: 1, opacity: 1 } : undefined}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          />

          <circle cx="125" cy="0" r="2.5" fill="transparent" stroke="rgba(0, 0, 0, 0.25)" strokeWidth="1" />
          <circle cx="335" cy="0" r="2.5" fill="transparent" stroke="rgba(0, 0, 0, 0.25)" strokeWidth="1" />
          <circle cx="230" cy="48" r="3" fill="transparent" stroke="rgba(0, 0, 0, 0.35)" strokeWidth="1.2" />
        </svg>

        {/* Badge Central de Validação (no tom de laranja da marca) */}
        <motion.div 
          style={isScrollDriven ? { scale: checkBadgeScale, opacity: checkBadgeOpacity } : undefined}
          initial={!isScrollDriven ? { scale: 0, opacity: 0 } : undefined}
          whileInView={!isScrollDriven ? { scale: 1, opacity: 1 } : undefined}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-md bg-[#FD183F] border border-primary-400/50 flex items-center justify-center text-white  shadow-primary-500/35 z-20"
        >
          <Check size={13} strokeWidth={3} />
        </motion.div>
      </div>

      {/* ─── CARD 4: RESULTADO FINAL (Ação Executada no Jobb) ─── */}
      <motion.div 
        style={isScrollDriven ? { y: card4Y, opacity: card4Opacity, filter: card4Filter } : undefined}
        initial={!isScrollDriven ? { opacity: 0, y: 20 } : undefined}
        whileInView={!isScrollDriven ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.85 }}
        className="w-full max-w-[440px] rounded-none bg-white border border-foreground/10 p-4 px-5 flex items-center justify-between relative z-20  transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-secondary-50 border border-foreground/10 flex items-center justify-center text-foreground/80">
            <CheckCircle2 size={16} strokeWidth={1.5} />
          </div>
          <div>
            <div className="text-[13px] text-foreground font-medium tracking-tight">
              Lançamento Criado no Jobb
            </div>
            <div className="text-[11px] text-foreground/55 mt-0.5">
              Projeto Campanha • R$ 4.200,00 registrado
            </div>
          </div>
        </div>

        {/* Badge de Conclusão no tom de laranja da marca */}
        <div className="text-[11px] text-primary-500 flex items-center gap-1.5 bg-[#FD183F]/10 px-3 py-1 rounded-full border border-[#FD183F]/30">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FD183F]" />
          <span>Executado</span>
        </div>
      </motion.div>
    </div>
  );
}
