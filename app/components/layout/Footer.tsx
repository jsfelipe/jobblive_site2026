import React from "react";
import Image from "next/image";
import Link from "next/link";
import BackToTopButton from "../ui/BackToTopButton";
import contactsData from "../../config/contacts.json";
import themeData from "../../config/theme.json";

const currentYear = new Date().getFullYear();

import { InstagramLogo, LinkedinLogo, YoutubeLogo } from "@phosphor-icons/react/dist/ssr";




const navLinks = [
  { name: "Home", href: "/", external: false },
  { name: "Funcionalidades", href: "/funcionalidades", external: false },
  { name: "Planos", href: "/planos", external: false },
  { name: "Dúvidas", href: "/duvidas", external: false },
  { name: "Ajuda", href: contactsData.whatsappLink || "https://wa.me/5581998504107", external: true },
  { name: "Blog", href: "https://blog.jobblive.com.br/", external: true },
  { name: "Termos de uso", href: "/termos-de-uso", external: false },
  { name: "Política de Privacidade", href: "/politica-de-privacidade", external: false },
];

const socialLinks = [
  { name: "Instagram", href: contactsData.instagram, icon: <InstagramLogo className="w-4 h-4" /> },
  { name: "Linkedin", href: contactsData.linkedin, icon: <LinkedinLogo className="w-4 h-4" /> },
  { name: "Youtube", href: contactsData.youtube, icon: <YoutubeLogo className="w-4 h-4" /> },
];

export default function Footer() {
  const brandName = process.env.NEXT_PUBLIC_PROJECT_NAME || "JobbLive";

  return (
    <footer className="w-full bg-background overflow-hidden relative">
      {/* Imagem de Fundo */}
      <Image
        src="/assets/img/bg-rodape.png"
        alt=""
        fill
        className="object-cover object-center"
        style={{ position: 'absolute', inset: 0 }}
        priority={false}
        aria-hidden="true"
      />

      {/* Divisória topo */}
      <div className="border-t border-foreground/10 relative z-10" />

      {/* Área Superior: Logo + Tagline + Badges */}
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 text-center md:text-left">

          {/* Esquerda: Logo + Tagline */}
          <div className="flex flex-col items-center md:items-start gap-4 max-w-xs">
            <Link href="/" aria-label={`Página inicial do ${brandName}`}>
              <Image
                src={themeData.logoLight}
                alt={`Logotipo ${brandName}`}
                width={140}
                height={42}
                className="h-9 w-auto object-contain"
                priority={false}
              />
            </Link>
            <p className="text-body-md text-foreground/60 text-center md:text-left text-pretty leading-relaxed max-w-[280px]">
              O sistema que conecta financeiro, projetos e operação, para agências crescerem com controle.
            </p>
          </div>

          {/* Direita: Segurança e Hospedagem */}
          <div className="flex flex-col items-center md:items-end gap-4 w-full md:w-auto">
            <p className="text-body-md text-foreground/50 text-center md:text-right text-pretty max-w-[200px] leading-relaxed">
              Estamos hospedados na aws e protegidos pela LGPD.
            </p>
            <div className="flex items-center justify-center md:justify-end gap-3">
              {/* AWS */}
              <Image
                src="/assets/img/aws.svg"
                alt="Amazon Web Services"
                width={48}
                height={28}
                className="h-7 w-auto object-contain"
              />

              {/* LGPD */}
              <Image
                src="/assets/img/lgpd.svg"
                alt="Protegido pela LGPD"
                width={64}
                height={28}
                className="h-7 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Área de Links */}
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 py-6 relative z-10 border-t border-foreground/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Links de Navegação */}
          <nav aria-label="Links do rodapé">
            <ul className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2 pl-0 list-none">
              {navLinks.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-foreground/60 hover:text-primary-500 transition-colors duration-150"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-xs text-foreground/60 hover:text-primary-500 transition-colors duration-150"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Redes Sociais e Voltar ao Topo */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <nav aria-label="Redes sociais">
              <ul className="flex flex-wrap items-center justify-center md:justify-start gap-4 pl-0 list-none">
                {socialLinks.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="flex items-center gap-1.5 text-xs text-foreground/60 hover:text-primary-500 transition-colors duration-150"
                    >
                      {social.icon}
                      <span>{social.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <BackToTopButton />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 py-4 relative z-10 text-center md:text-left border-t border-foreground/10">
        <p className="text-caption text-foreground/40">
          © {currentYear} – {brandName}. Todos os Direitos Reservados.
        </p>
      </div>
    </footer>
  );
}
