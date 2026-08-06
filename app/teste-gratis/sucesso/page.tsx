import React from "react";
import Link from "next/link";
import Image from "next/image";
import contactsData from "../../config/contacts.json";
import themeData from "../../config/theme.json";
import { getMetadataForPath } from "../../lib/seo";

export const metadata = getMetadataForPath("/teste-gratis/sucesso");

export default function TesteSucessoPage() {
  const whatsappLink = contactsData.whatsappLink || "https://wa.me/558194384020?text=Ol%C3%A1!%20quero%20saber%20mais%20sobre%20o%20JobbLive!";
  const supportEmail = contactsData.email || "contato@jobblive.com.br";
  const logoSrc = themeData.logoLight || "/assets/img/jobb-live-logotipo-light.svg";

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground justify-between">

      {/* Cabeçalho Minimalista */}
      <header className="py-6 px-4 md:px-8 flex justify-center border-b border-border-subtle ">
        <Link href="/" className="flex items-center justify-center hover:opacity-90 transition-opacity">
          <Image
            src={logoSrc}
            alt="JobbLive"
            width={120}
            height={36}
            className="h-8 md:h-9 w-auto object-contain"
            unoptimized
            priority
          />
        </Link>
      </header>

      {/* Conteúdo Central */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-20 bg-background">
        <div className="w-full max-w-lg bg-white p-8 md:p-12 rounded-2xl border border-border-subtle flex flex-col items-center text-center">

          {/* Ícone de Sucesso animado sutil */}
          <div className="w-16 h-16 bg-primary-50 text-primary-500 rounded-full flex items-center justify-center mb-6 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-8 h-8 text-primary-500"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          {/* Título */}
          <h1 className="text-2xl md:text-3xl font-display font-normal text-text-primary tracking-tightest leading-tight text-pretty mb-4">
            Quase lá! Seus dados foram enviados.
          </h1>

          {/* Descrição */}
          <p className="text-body-md text-text-secondary text-pretty leading-relaxed mb-6">
            Sua solicitação foi enviada com sucesso. Em breve, nossos consultores(as) irão disponibilizar o seu teste e entrar em contato para informar sobre nossa proposta comercial.
          </p>

          {/* Dica Importante */}
          <div className="bg-secondary-50 border border-secondary-100 rounded-lg p-4 mb-8 text-left w-full text-xs text-text-secondary flex gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-secondary-500 shrink-0 mt-0.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 111.085 1.085l-.04.022c-.22.1-.49.12-.73.037-.24-.083-.4-.275-.4-.52v-.058a.75.75 0 011.085-.688l-.02.04c-.1.22-.08.49.04.73.08.24.27.4.52.4h.058a.75.75 0 01.688-1.085z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 5.636a9 9 0 010 12.728m0 0l-1.414-1.414m1.414 1.414a9 9 0 11-12.728 0m0 0l1.414-1.414"
              />
            </svg>
            <div>
              <span className="font-semibold text-text-primary">Nota importante:</span> Fique atento ao seu e-mail e WhatsApp. Se preferir, fale conosco pelo e-mail <span className="underline">{supportEmail}</span>.
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
            <Link
              href="/"
              className="btn-primary w-full py-3 text-center text-body-md rounded-md font-normal bg-primary-500 text-white hover:bg-primary-400 select-none transition-colors duration-150 cursor-pointer"
            >
              Voltar ao início
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn w-full py-3 text-center text-body-md rounded-md font-normal bg-white text-secondary-900 border border-border-default hover:bg-secondary-50 select-none transition-colors duration-150 cursor-pointer"
            >
              Falar no WhatsApp
            </a>
          </div>

        </div>
      </main>

      {/* Rodapé Minimalista */}
      <footer className="py-6 text-center text-xs text-text-tertiary border-t border-border-subtle ">
        &copy; {new Date().getFullYear()} JobbLive. Todos os direitos reservados.
      </footer>

    </div>
  );
}
