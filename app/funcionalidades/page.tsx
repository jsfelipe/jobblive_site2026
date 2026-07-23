import React from "react";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/layout/Footer";
import PageHeader from "../components/ui/PageHeader";
import FuncionalidadesContent from "../components/funcionalidades/FuncionalidadesContent";
import { getMetadataForPath } from "../lib/seo";

export const metadata = getMetadataForPath("/funcionalidades");

export default function FuncionalidadesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-foreground">
      <Navbar />

      <main className="flex-1 bg-white">
        <PageHeader
          overline="Recursos do Sistema"
          title="Funcionalidades do JobbLive"
          description="Tudo o que sua agência precisa para gerenciar campanhas, orçamentos, tarefas e financeiro integrado — do briefing ao pagamento do fornecedor."
        />

        <FuncionalidadesContent />
      </main>

      <Footer />
    </div>
  );
}
