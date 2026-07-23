import React from "react";
import Link from "next/link";
import Navbar from "../components/ui/Navbar";
import { getMetadataForPath } from "../lib/seo";

// Consome os metadados dinâmicos para a rota "/sobre" vindos do seo.json
export const metadata = getMetadataForPath("/sobre");

export default function SobrePage() {
  const brandName = process.env.NEXT_PUBLIC_PROJECT_NAME || "Jobb Live";

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Menu de Navegação Superior */}
      <Navbar />

      {/* Conteúdo Principal */}
      <main className="flex-1 flex flex-col justify-center">
        <section className="full py-10 md:py-12 lg:py-13 flex items-center min-h-[calc(100vh-80px)] relative overflow-hidden">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 z-10 flex flex-col justify-center text-center items-center gap-4">
            {/* Tag superior / Categoria */}
            <span className="text-overline text-primary tracking-widest mb-1">
              ✨ Sobre Nós
            </span>

            {/* Título Principal */}
            <h1 className="text-pretty text-foreground leading-tightest max-w-3xl tracking-tightest">
              Nossa História e Missão
            </h1>
            <p className="text-body-xl text-pretty text-foreground/80 max-w-2xl mt-2 leading-spacious">
              Esta é uma página dedicada a apresentar a essência da nossa marca. Aqui validamos a automação, a centralização de metadados de SEO e a aplicação fiel das regras do Design System do cliente.
            </p>

            <div className="mt-8">
              <Link href="/" className="btn-primary btn-lg">
                Voltar para a Home
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Minimalista */}
      <footer className="full py-6 border-t border-foreground/10 bg-background text-2xs text-foreground/60">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-2xs text-foreground/60">
            &copy; {new Date().getFullYear()} {brandName}. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            <a href="#" className="link-cta text-2xs">Termos de Uso</a>
            <a href="#" className="link-cta text-2xs">Política de Privacidade</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

