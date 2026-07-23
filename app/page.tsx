import React from "react";
import Navbar from "./components/ui/Navbar";
import Hero from "./components/sections/Hero";
import Problemas from "./components/sections/Problemas";
import Solucao from "./components/sections/Solucao";
import GestaoAgil from "./components/sections/GestaoAgil";
import Modulos from "./components/sections/Modulos";
import Indicado from "./components/sections/Indicado";
import Depoimentos from "./components/sections/Depoimentos";
import CTA from "./components/sections/CTA";
import Footer from "./components/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Menu de Navegação Superior */}
      <Navbar />

      {/* Seção Principal (Main) */}
      <main className="flex-1 flex flex-col justify-center">
        
        {/* Hero Section */}
        <Hero />
        
        {/* Seção Problemas */}
        <Problemas />
        
        {/* Seção Solução */}
        <Solucao />

        {/* Seção Gestão Ágil */}
        <GestaoAgil />
        
        {/* Seção Módulos */}
        <Modulos />
        
        <Indicado />
        
        {/* Seção Depoimentos */}
        <Depoimentos />

        {/* Seção CTA Final */}
        <CTA />

      </main>

      <Footer />
    </div>
  );
}
