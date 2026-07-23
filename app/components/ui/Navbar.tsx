"use client";

import React, { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import contactsData from "../../config/contacts.json";
import themeData from "../../config/theme.json";

import { List, X } from "@phosphor-icons/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const brandName = process.env.NEXT_PUBLIC_PROJECT_NAME || "Jobb";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Funcionalidades", href: "/funcionalidades" },
    { name: "Planos", href: "/planos" },
    { name: "Dúvidas", href: "/duvidas" },
    { name: "Blog", href: "/blog" },
    { name: "Ajuda", href: "/ajuda" },
  ];


  return (
    <header
      className={`w-full z-50 transition-all duration-300 ${
        scrolled
          ? "fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md border-b border-foreground/10"
          : "absolute top-0 left-0 right-0 bg-transparent"
      } animate-fade-down delay-400`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Logotipo */}
        <Link href="/" className="font-display text-xl md:text-2xl font-black text-foreground tracking-tighter hover:opacity-90 transition-opacity flex items-center">
          {themeData.logoLight ? (
            <Image
              src={themeData.logoLight}
              alt={brandName}
              width={120}
              height={36}
              className="h-8 md:h-9 w-auto object-contain"
              unoptimized
              priority
            />
          ) : (
            <>
              {brandName}<span className="text-primary">.</span>
            </>
          )}
        </Link>

        {/* Links de navegação desktop */}
        <nav className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive
                    ? "link-nav link-nav-active text-sm text-primary font-normal"
                    : "link-nav text-sm text-foreground/80 hover:text-primary transition-colors"
                }
              >
                {link.name}
              </Link>
            );
          })}
          <a
            href="/teste-gratis"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-sm ml-2"
          >
            Teste Grátis
          </a>
        </nav>

        {/* Botão Hambúrguer Mobile */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors focus:outline-none"
          aria-label="Abrir menu"
        >
          <List size={24} />
        </button>
      </div>

      {/* Navbar Mobile Full-Screen */}
      {isOpen && (
        <div className="fixed inset-0 w-screen h-screen bg-background z-50 flex flex-col p-4 md:hidden">
          {/* Topo do Menu Mobile */}
          <div className="flex items-center justify-between w-full h-16 border-b border-foreground/10">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="font-display text-xl font-black text-foreground tracking-tighter flex items-center"
            >
              {themeData.logoLight ? (
                <Image
                  src={themeData.logoLight}
                  alt={brandName}
                  width={105}
                  height={28}
                  className="h-7 w-auto object-contain"
                  unoptimized
                  priority
                />
              ) : (
                <>
                  {brandName}<span className="text-primary">.</span>
                </>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-foreground hover:text-primary transition-colors focus:outline-none"
              aria-label="Fechar menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Links Mobile alinhados à esquerda e espaçados */}
          <nav className="flex flex-col gap-6 mt-8 px-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={
                    isActive
                      ? "text-xl font-normal text-primary"
                      : "text-xl font-normal text-foreground/90 hover:text-primary transition-colors"
                  }
                >
                  {link.name}
                </Link>
              );
            })}

            <hr className="border-foreground/10 my-2" />

            <a
              href="/teste-gratis"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="btn-primary btn-lg w-full text-center mt-2"
            >
              Teste Grátis
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
