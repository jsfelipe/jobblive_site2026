"use client";

import React, { useRef } from "react";
import Link from "next/link";
import contactsData from "../../config/contacts.json";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}


export default function CTA() {
  const whatsappLink = contactsData.whatsappLink || "#";
  const testeLink = "/teste-gratis";
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo([".cta-title", ".cta-subtitle", ".cta-btn"],
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".cta-title",
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="cta w-full bg-primary-500 py-16 md:py-24 overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-6">

          {/* Título */}
          <h2 className="cta-title opacity-0 text-pretty leading-tight tracking-tightest text-white font-display max-w-3xl">
            Comece a organizar sua agência ainda hoje.
          </h2>

          {/* Subtítulo */}
          <p className="cta-subtitle opacity-0 text-lg text-white/80 text-pretty">
            Teste grátis ou fale com um dos nossos consultores!
          </p>

          {/* Botões */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
            {/* Botão Primário Escuro */}
            <Link
              href={testeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn opacity-0 btn btn-dark btn-lg px-8 text-center flex items-center justify-center"
            >
              Teste grátis por 7 dias
            </Link>

            {/* Botão Ghost Claro */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn opacity-0 btn btn-lg px-8 bg-white/20 text-white hover:bg-white/30 transition-colors duration-150 text-center flex items-center justify-center"
            >
              Falar com um consultor
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
