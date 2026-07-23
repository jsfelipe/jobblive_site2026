import React from "react";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/layout/Footer";
import PageHeader from "../components/ui/PageHeader";
import { getMetadataForPath } from "../lib/seo";

export const metadata = getMetadataForPath("/termos-de-uso");

export default function TermosDeUsoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-foreground">
      <Navbar />
      
      <main className="flex-1 bg-white">
        {/* Cabeçalho da Página */}
        <PageHeader 
          title="Termos de Uso" 
          description="Leia com atenção os termos que regem nossa relação. Antes de usar o Jobb é importante que você leia e concorde com estes termos." 
        />

        <div className="mx-auto w-full max-w-4xl px-4 md:px-6 lg:px-8 py-20 md:py-28">
          {/* Documento de Termos de Uso */}
          <article className="text-left">
            <p className="text-body-md text-foreground/80 mb-6 leading-relaxed text-pretty">
              Ao efetuar seu cadastro para utilização dos serviços, ou aceitar estes termos, você concorda com os termos, sem modificações.
            </p>

            <h2 className="text-xl md:text-2xl font-display font-normal text-foreground mt-8 mb-4 tracking-tight text-pretty">
              Contrato de Licença de Usuário Final
            </h2>
            
            {/* Quadro de Informações das Partes */}
            <div className="bg-secondary-50 rounded-lg p-6 mb-8 border-l-4 border-primary-500">
              <h3 className="text-md font-display font-semibold text-foreground mb-3">
                Partes do Contrato
              </h3>
              <p className="text-body-sm text-foreground/80 mb-2 leading-relaxed">
                <strong className="font-semibold text-foreground">Licenciado:</strong> Pessoa física ou jurídica (o <strong className="font-semibold text-foreground">“LICENCIADO”</strong>) que efetua o cadastro no sistema.
              </p>
              <p className="text-body-sm text-foreground/80 leading-relaxed">
                <strong className="font-semibold text-foreground">Licenciante:</strong> Unity Brasil Tecnologia da Informação Ltda, inscrita no CNPJ sob nº 06.013.344/0001-11, com sede na Rua Capitão Zuzinha, 22 – sala 408, Boa Viagem, Recife/PE, CEP: 51030-420 - Brasil (a <strong className="font-semibold text-foreground">“LICENCIANTE”</strong>).
              </p>
            </div>

            <p className="text-body-md text-foreground/80 mb-4 leading-relaxed text-pretty">
              Este Contrato de Licença de Usuário Final é um acordo legal entre o <strong className="font-semibold text-foreground">LICENCIADO</strong> e a <strong className="font-semibold text-foreground">LICENCIANTE</strong> para uso do programa de computador denominado <strong className="font-semibold text-foreground">Sistema JobbLive</strong>, disponibilizado neste ato pela LICENCIANTE (o <strong className="font-semibold text-foreground">“SOFTWARE”</strong>), pelo prazo determinado pelo LICENCIADO no ato do licenciamento do SOFTWARE, o que inclui o programa de computador e pode incluir os meios físicos associados, quaisquer materiais impressos, e qualquer documentação “online” ou eletrônica.
            </p>
            <p className="text-body-md text-foreground/80 mb-4 leading-relaxed text-pretty">
              Ao utilizar o SOFTWARE, mesmo que parcial ou a título de teste, o licenciado estará vinculado a este contrato, concordando com os mesmos, principalmente <strong className="font-semibold text-foreground text-primary-600">CONSENTINDO COM O ACESSO, COLETA, ARMAZENAMENTO, TRATAMENTO E TÉCNICAS DE PROTEÇÃO ÀS INFORMAÇÕES</strong> do LICENCIADO para a integral execução das funcionalidades ofertadas pelo SOFTWARE.
            </p>
            <p className="text-body-md text-foreground/80 mb-8 leading-relaxed text-pretty">
              Em caso de discordância dos termos aqui apresentados, a utilização do SOFTWARE deve ser imediatamente interrompida.
            </p>

            <h2 className="text-xl md:text-2xl font-display font-normal text-foreground mt-10 mb-4 tracking-tight text-pretty">
              1. Propriedade do software
            </h2>
            <p className="text-body-md text-foreground/80 mb-4 leading-relaxed text-pretty">
              O presente software (sistema) foi desenvolvido e criado pela empresa <strong className="font-semibold text-foreground">LICENCIANTE</strong>, e todos os seus direitos pertencem à mesma.
            </p>
            <p className="text-body-md text-foreground/80 mb-6 leading-relaxed text-pretty">
              O LICENCIADO não adquire, pelo presente instrumento, nenhum direito de propriedade intelectual ou outros direitos exclusivos, incluindo patentes, desenhos, marcas, direitos autorais ou direitos sobre informações confidenciais ou segredos de negócio, sobre ou relacionados ao SOFTWARE ou nenhuma parte dele. Quaisquer direitos não expressamente concedidos sob o presente instrumento são reservados.
            </p>

            <h2 className="text-xl md:text-2xl font-display font-normal text-foreground mt-10 mb-4 tracking-tight text-pretty">
              2. Licença de uso do software
            </h2>
            <p className="text-body-md text-foreground/80 mb-4 leading-relaxed text-pretty">
              Sujeito aos termos e condições do presente instrumento, este TERMO concede ao LICENCIADO uma licença revogável, não exclusiva e intransferível para usar o SOFTWARE. O LICENCIADO não poderá utilizar e nem permitir o uso do SOFTWARE para uma outra finalidade que não seja o uso interno.
            </p>
            <p className="text-body-md text-foreground/80 mb-6 leading-relaxed text-pretty">
              Esta licença não implica na capacidade de acessar outros softwares além daqueles originalmente localizados no SOFTWARE. Em nenhuma hipótese o LICENCIADO terá acesso ao código fonte do SOFTWARE ora licenciado, por este se tratar de propriedade intelectual da LICENCIANTE.
            </p>

            <h2 className="text-xl md:text-2xl font-display font-normal text-foreground mt-10 mb-4 tracking-tight text-pretty">
              3. Pagamento e cancelamento
            </h2>
            <p className="text-body-md text-foreground/80 mb-4 leading-relaxed text-pretty">
              O LICENCIADO deve pagar à LICENCIANTE o valor do respectivo plano escolhido de acordo com a periodicidade definida entre as opções de pagamento disponibilizadas ao LICENCIADO.
            </p>
            <p className="text-body-md text-foreground/80 mb-4 leading-relaxed text-pretty">
              Caso o LICENCIADO, no decorrer da vigência do presente instrumento, opte por outro plano de licenciamento, os valores serão alterados de acordo com o respectivo plano escolhido.
            </p>
            <p className="text-body-md text-foreground/80 mb-4 leading-relaxed text-pretty">
              A falta de pagamento nas datas determinadas para seu vencimento acarretará na suspensão de acesso ao SOFTWARE até que as pendências financeiras sejam regularizadas.
            </p>
            <p className="text-body-md text-foreground/80 mb-4 leading-relaxed text-pretty">
              Caso a suspensão permaneça por prazo superior a 90 (noventa) dias, a LICENCIANTE poderá excluir integralmente as informações lançadas no SOFTWARE pelo LICENCIADO.
            </p>
            <p className="text-body-md text-foreground/80 mb-6 leading-relaxed text-pretty">
              Os valores estabelecidos no ato do licenciamento do SOFTWARE serão atualizados anualmente ou no menor lapso de tempo legalmente permitido pelo IGPM-FGV acumulado no período, ou no caso de extinção deste, de outro índice oficial que venha a substituí-lo.
            </p>

            <h2 className="text-xl md:text-2xl font-display font-normal text-foreground mt-10 mb-4 tracking-tight text-pretty">
              4. Banco de dados e arquivos anexados
            </h2>
            <p className="text-body-md text-foreground/80 mb-4 leading-relaxed text-pretty">
              Suspenso o acesso ao SOFTWARE, a LICENCIANTE manterá as informações do LICENCIADO lançadas no mesmo pelo período de 6 (seis) meses, contados da suspensão de acesso. Neste período, a LICENCIANTE tornará as informações do LICENCIADO disponíveis para serem extraídas do SOFTWARE em formato .xsl (Excel) relativo ao banco de dados e também disponibilizará os arquivos anexados como .pdf, imagens.
            </p>
            <p className="text-body-md text-foreground/80 mb-6 leading-relaxed text-pretty">
              Passados os 6 (seis) meses da suspensão do presente contrato, todas as <strong className="font-semibold text-foreground">INFORMAÇÕES</strong> do LICENCIADO, incluindo as pessoas, de conta e financeiras, em poder da LICENCIANTE serão excluídas permanentemente do banco de dados da LICENCIANTE, tendo sido extraídas ou não pelo LICENCIADO.
            </p>

            <h2 className="text-xl md:text-2xl font-display font-normal text-foreground mt-10 mb-4 tracking-tight text-pretty">
              5. Da segurança da informação e política de privacidade
            </h2>
            <p className="text-body-md text-foreground/80 mb-4 leading-relaxed text-pretty">
              Todas as medidas de segurança necessárias são tomadas para garantir a privacidade dos dados armazenados, incluindo-se proteção contra acesso, roubo, alteração ou destruição. As técnicas de proteção utilizadas são as mais sofisticadas do mercado, aplicadas em várias camadas para garantir a confiabilidade e o sigilo das informações. Também são realizados backups automáticos dos dados 2 vezes ao dia em servidores espelhados, utilizando serviços de hospedagem Cloud Computer.
            </p>
            <p className="text-body-md text-foreground/80 mb-4 leading-relaxed text-pretty">
              As Informações da Conta do Usuário são protegidas com senha por medida de segurança e garantia da privacidade, sendo de total e integral responsabilidade do mesmo o sigilo e a confidencialidade da referida senha e o uso dos serviços com a mesma.
            </p>
            <p className="text-body-md text-foreground/80 mb-6 leading-relaxed text-pretty">
              Não divulgamos em hipótese alguma dados pessoais cadastrados em nosso sistema. Restringimos o acesso a informações pessoais por parte de funcionários que necessitam ter acesso as informações para suporte ou manutenções programadas, e que estão sujeitos a obrigações contratuais de confidencialidade, podendo ser processados se deixarem de cumprir o contrato.
            </p>

            <h2 className="text-xl md:text-2xl font-display font-normal text-foreground mt-10 mb-4 tracking-tight text-pretty">
              6. Prazo e rescisão
            </h2>
            <h3 className="text-lg font-display font-semibold text-foreground mt-4 mb-2 tracking-tight text-pretty">
              Prazo
            </h3>
            <p className="text-body-md text-foreground/80 mb-4 leading-relaxed text-pretty">
              O presente Termo entra em vigor na data de seu aceite pelo LICENCIADO e vigorará por prazo indeterminado.
            </p>
            <h3 className="text-lg font-display font-semibold text-foreground mt-6 mb-2 tracking-tight text-pretty">
              Rescisão
            </h3>
            <p className="text-body-md text-foreground/80 mb-6 leading-relaxed text-pretty">
              O LICENCIADO poderá solicitar a rescisão a qualquer tempo, desde que esteja sem saldo devedor e que seja comunicado expressamente à LICENCIANTE por escrito. A LICENCIANTE fica isenta de quaisquer reembolso de parcelas pagas.
            </p>

            <h2 className="text-xl md:text-2xl font-display font-normal text-foreground mt-10 mb-4 tracking-tight text-pretty">
              7. Foro
            </h2>
            <p className="text-body-md text-foreground/80 mb-6 leading-relaxed text-pretty">
              Fica eleito o Foro da cidade do <strong className="font-semibold text-foreground">Recife/PE</strong> para esclarecer quaisquer dúvidas, caso estas venham a ocorrer no tocante ao cumprimento das Cláusulas pactuadas neste Contrato.
            </p>
          </article>

        </div>
      </main>

      <Footer />
    </div>
  );
}
