import React, { Suspense } from "react";
import FormTesteGratis from "./FormTesteGratis";
import { getMetadataForPath } from "../lib/seo";
import Image from "next/image";

export const metadata = getMetadataForPath("/teste-gratis");

export default function TesteGratisPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground justify-center py-8 md:py-12 lg:py-16">
      <main className="w-full flex-1 flex items-center justify-center">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">

            {/* Lado Esquerdo - Info / Benefícios (escuro/destacado) */}
            <div className="lg:col-span-5 bg-secondary-900 text-white p-8 md:p-12 rounded-none relative overflow-hidden flex flex-col justify-between min-h-[420px] lg:min-h-[580px]">

              {/* Imagem de Fundo sutil */}
              <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <Image
                  src="/assets/img/bg-hero.png"
                  alt=""
                  fill
                  className="object-cover"
                  priority
                  aria-hidden="true"
                />
              </div>

              {/* Gradiente sutil para legibilidade */}
              <div className="absolute inset-0 z-0 bg-gradient-to-t from-secondary-950 via-secondary-900/90 to-secondary-900/60 pointer-events-none" aria-hidden="true" />

              <div className="relative z-10 flex flex-col gap-8">
                {/* Logotipo Dark */}
                <div className="w-[90px] h-auto self-start">
                  <Image
                    src="/assets/img/jobb-live-logotipo-dark.svg"
                    alt="Jobb Live"
                    width={92}
                    height={28}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Título de impacto */}
                <div className="flex flex-col gap-4">
                  <h1 className="text-3xl md:text-4xl text-white tracking-tightest leading-tight text-pretty font-display font-normal">
                    Vamos começar seu período de testes!
                  </h1>
                  <p className="text-white/70 text-body-md text-pretty">
                    Aproveite 7 dias grátis para conhecer o software de gestão que vai transformar a rotina da sua agência ou produtora.
                  </p>
                </div>

                {/* Lista de Benefícios */}
                <ul className="flex flex-col gap-4 mt-2">
                  <li className="flex items-start gap-3">
                    <span className="flex items-center justify-center bg-primary-500/10 text-primary-400 p-1 rounded-full shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    <span className="text-white/90 text-body-md">Sem necessidade de cartão de crédito</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex items-center justify-center bg-primary-500/10 text-primary-400 p-1 rounded-full shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    <span className="text-white/90 text-body-md">Acesso completo a todas as funcionalidades</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex items-center justify-center bg-primary-500/10 text-primary-400 p-1 rounded-full shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    <span className="text-white/90 text-body-md">Configuração simples em menos de 2 minutos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex items-center justify-center bg-primary-500/10 text-primary-400 p-1 rounded-full shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    <span className="text-white/90 text-body-md">Suporte humanizado em português</span>
                  </li>
                </ul>
              </div>

              <div className="relative z-10 pt-8 border-t border-white/10 text-white/40 text-xs">
                Ao iniciar seu teste, você concorda com nossos termos de uso e política de privacidade.
              </div>
            </div>

            {/* Lado Direito - Formulário */}
            <div className="lg:col-span-7 bg-white p-6 md:p-10 rounded-none flex flex-col justify-center">
              <Suspense fallback={
                <div className="flex flex-col gap-6 animate-pulse">
                  <div className="h-8 bg-secondary-100 rounded w-1/3"></div>
                  <div className="h-4 bg-secondary-100 rounded w-2/3"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="h-10 bg-secondary-100 rounded"></div>
                    <div className="h-10 bg-secondary-100 rounded"></div>
                  </div>
                  <div className="h-10 bg-secondary-100 rounded"></div>
                  <div className="h-32 bg-secondary-100 rounded"></div>
                  <div className="h-12 bg-secondary-100 rounded w-full"></div>
                </div>
              }>
                <FormFormulárioWrapper />
              </Suspense>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

// Wrapper auxiliar para garantir o boundary de Suspense em volta do hook searchParams do cliente
function FormFormulárioWrapper() {
  return <FormTesteGratis />;
}
