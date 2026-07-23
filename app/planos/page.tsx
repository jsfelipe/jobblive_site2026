import React from "react";
import Metadata from "next";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/layout/Footer";
import PageHeader from "../components/ui/PageHeader";
import PlanosCards from "../components/sections/PlanosCards";
import PlanosIncluso from "../components/sections/PlanosIncluso";
import PlanosImplantacao from "../components/sections/PlanosImplantacao";
import FaqAccordion from "../components/ui/FaqAccordion";
import CTA from "../components/sections/CTA";
import JsonLd from "../components/seo/JsonLd";
import { getMetadataForPath } from "../lib/seo";

export const metadata = getMetadataForPath("/planos");

const faqItems = [
  {
    question: "Quais são os pré-requisitos para implantar o Jobb Live na minha agência?",
    answerJsx: (
      <span>
        O Jobb Live é 100% online na nuvem, não necessitando de nenhuma instalação técnica.
        Você precisará apenas de acesso à internet banda larga e um computador ou dispositivo móvel com navegador web atualizado.
      </span>
    ),
  },
  {
    question: "Como pode ser feito o pagamento da assinatura?",
    answerJsx: (
      <span>
        Os pagamentos podem ser efetuados via cartão de crédito ou boleto bancário.
        Todos os pagamentos são realizados de forma antecipada (mensal ou anualmente).
        Você acompanha todas as faturas e comprovantes diretamente no painel da sua conta.
      </span>
    ),
  },
  {
    question: "Na minha empresa, 5 pessoas irão utilizar o sistema. Qual seria o valor?",
    answerJsx: (
      <span>
        Para uma agência com 5 usuários no plano mensal, o valor é de (5 x R$ 70,00) = R$ 350,00 ao mês.
        No plano anual com 18% de desconto, o valor equivale a (5 x R$ 57,00) = R$ 285,00 ao mês.
        Você pode adicionar novos usuários à sua conta sempre que a equipe crescer.
      </span>
    ),
  },
  {
    question: "Qual é o espaço disponível para armazenar arquivos no sistema?",
    answerJsx: (
      <span>
        Ao criar sua conta no Jobb Live, sua agência recebe 5GB de armazenamento grátis para anexos em tarefas e projetos,
        compartilhados entre todos os usuários. Caso necessite de mais espaço, é possível contratar pacotes adicionais a qualquer momento.
      </span>
    ),
  },
  {
    question: "Como é a segurança das informações e backups no Jobb Live?",
    answerJsx: (
      <span>
        O sistema conta com criptografia de ponta a ponta através de certificação SSL de 256 bits (a mesma tecnologia utilizada por bancos).
        A infraestrutura é hospedada no Google Cloud e realizamos backups diários automáticos. Além disso, você pode gerar um backup navegável da sua conta quando desejar.
      </span>
    ),
  },
  {
    question: "Como funciona o período de teste grátis por 7 dias?",
    answerJsx: (
      <span>
        Você pode experimentar todos os módulos do Jobb Live gratuitamente por 7 dias, sem compromisso e sem precisar cadastrar cartão de crédito.
        Basta criar sua conta e começar a organizar os projetos e o financeiro da sua agência imediatamente.
      </span>
    ),
  },
  {
    question: "Caso eu deseje cancelar a assinatura, como funciona?",
    answerJsx: (
      <span>
        Nossos termos são transparentes e sem letras miúdas. Você paga enquanto utilizar o sistema.
        Se em algum momento não quiser manter os serviços, você mesmo pode cancelar a renovação automática nas configurações do seu plano no próprio painel.
      </span>
    ),
  },
  {
    question: "Como funcionam os treinamentos e o suporte para a minha equipe?",
    answerJsx: (
      <span>
        Sua agência tem acesso gratuito à nossa Central de Ajuda com tutoriais detalhados e suporte especializado por chat e e-mail.
        Também oferecemos a opção de <strong>Implantação Orientada</strong> com um consultor dedicado para acelerar o onboarding da sua equipe.
      </span>
    ),
  },
];

export default function PlanosPage() {
  const jsonLdData = {
    "@type": "FAQPage",
    name: "Planos e Preços | Jobb Live",
    description: "Conheça os planos e preços das soluções em sistema de gestão Jobb Live.",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: typeof item.answerJsx === "string" ? item.answerJsx : item.question,
      },
    })),
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-foreground">
      <Navbar />
      
      <main className="flex-1 bg-white">
        {/* Injeção de Dados Estruturados (SEO + GEO) */}
        <JsonLd data={jsonLdData} />

        {/* Cabeçalho da Página */}
        <PageHeader
          title="Planos e Preços"
          description="Escolha a opção ideal para transformar a gestão, a operação e o financeiro da sua agência."
        />

        {/* Seção 1: Cards dos Planos (Anual x Mensal + Switch) */}
        <PlanosCards />

        {/* Seção 2: Incluso em Todos os Planos */}
        <PlanosIncluso />

        {/* Seção 3: Implantação Orientada */}
        <PlanosImplantacao />

        {/* Seção 4: FAQ (Perguntas Frequentes sobre Planos e Preços) */}
        <section className="w-full bg-white py-16 md:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-medium text-foreground text-pretty">
                Principais dúvidas sobre os planos e preços Jobb Live
              </h2>
              <p className="mt-3 text-body-md text-foreground/70 font-sans text-pretty">
                Tire suas dúvidas sobre contratação, pagamentos, licenças e segurança antes de começar.
              </p>
            </div>

            <FaqAccordion items={faqItems} />
          </div>
        </section>

        {/* Seção 5: CTA Final de Conversão */}
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
