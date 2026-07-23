import React from "react";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/layout/Footer";
import PageHeader from "../components/ui/PageHeader";
import { getMetadataForPath } from "../lib/seo";

export const metadata = getMetadataForPath("/politica-de-privacidade");

export default function PoliticaDePrivacidadePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-foreground">
      <Navbar />
      
      <main className="flex-1 bg-white">
        {/* Cabeçalho da Página */}
        <PageHeader 
          title="Política de Privacidade" 
          description="Leia com atenção os termos que regem nossa relação. Antes de usar o Jobb é importante que você leia e concorde com nossa política." 
        />

        <div className="mx-auto w-full max-w-4xl px-4 md:px-6 lg:px-8 py-20 md:py-28">
          {/* Documento de Política de Privacidade */}
          <article className="text-left">
            <p className="text-body-md text-foreground/80 mb-6 leading-relaxed text-pretty">
              Ao efetuar seu cadastro para utilização dos serviços, você concorda com nossa política, sem modificações.
            </p>

            {/* Quadro de Informações do Proprietário */}
            <div className="bg-secondary-50 rounded-lg p-6 mb-10 border-l-4 border-primary-500">
              <h3 className="text-md font-display font-semibold text-foreground mb-3">
                Proprietário e Controlador de Dados
              </h3>
              <p className="text-body-sm text-foreground/80 mb-1 leading-relaxed">
                <strong className="font-semibold text-foreground">Empresa:</strong> Unity Brasil Tecnologia da Informação Ltda
              </p>
              <p className="text-body-sm text-foreground/80 mb-1 leading-relaxed">
                <strong className="font-semibold text-foreground">CNPJ:</strong> 06.013.344/0001-11
              </p>
              <p className="text-body-sm text-foreground/80 leading-relaxed">
                <strong className="font-semibold text-foreground">Endereço:</strong> Rua Ribeiro de Brito, 901, sala 903, Recife/PE
              </p>
            </div>

            <h2 className="text-xl md:text-2xl font-display font-normal text-foreground mt-8 mb-4 tracking-tight text-pretty">
              Tipos de Dados coletados
            </h2>
            <p className="text-body-md text-foreground/80 mb-4 leading-relaxed text-pretty">
              Entre os tipos de Dados Pessoais que esta Ferramenta/Aplicativo coleta, por si mesmo ou através de terceiros, existem: Cookie; Dados de uso.
            </p>
            <p className="text-body-md text-foreground/80 mb-4 leading-relaxed text-pretty">
              Detalhes completos sobre cada tipo de Dados Pessoais coletados são fornecidos nas seções dedicadas desta política de privacidade ou por textos explicativos específicos exibidos antes da coleta de Dados. Os Dados Pessoais poderão ser fornecidos livremente pelo Usuário, ou, no caso dos Dados de Utilização, coletados automaticamente ao se utilizar este Aplicativo.
            </p>
            <p className="text-body-md text-foreground/80 mb-4 leading-relaxed text-pretty">
              A menos que especificado diferentemente todos os Dados solicitados por este Aplicativo são obrigatórios e a falta de fornecimento destes Dados poderá impossibilitar este Aplicativo de fornecer os seus Serviços. Nos casos em que este Aplicativo afirmar especificamente que alguns Dados não forem obrigatórios, os Usuários ficam livres para deixarem de comunicar estes Dados sem nenhuma consequência para a disponibilidade ou o funcionamento do Serviço. Os Usuários que tiverem dúvidas a respeito de quais Dados Pessoais são obrigatórios estão convidados a entrar em contato com o Proprietário.
            </p>
            <p className="text-body-md text-foreground/80 mb-4 leading-relaxed text-pretty">
              Quaisquer usos de cookies – ou de outras ferramentas de rastreamento – por este Aplicativo ou pelos proprietários de serviços terceiros utilizados por este Aplicativo serão para a finalidade de fornecer os Serviços solicitados pelo Usuário, além das demais finalidades descritas no presente documento e na Política de Cookies, se estiver disponível.
            </p>
            <p className="text-body-md text-foreground/80 mb-8 leading-relaxed text-pretty">
              Os Usuários ficam responsáveis por quaisquer Dados Pessoais de terceiros que forem obtidos, publicados ou compartilhados através deste Serviço (este Aplicativo) e confirmam que possuem a autorização dos terceiros para fornecerem os Dados para o Proprietário.
            </p>

            <h2 className="text-xl md:text-2xl font-display font-normal text-foreground mt-10 mb-4 tracking-tight text-pretty">
              Modo e local de processamento dos Dados
            </h2>
            
            <h3 className="text-lg font-display font-semibold text-foreground mt-6 mb-3 tracking-tight text-pretty">
              Método de processamento
            </h3>
            <p className="text-body-md text-foreground/80 mb-6 leading-relaxed text-pretty">
              O Proprietário tomará as medidas de segurança adequadas para impedir o acesso não autorizado, divulgação, alteração ou destruição não autorizada dos Dados. O processamento dos Dados é realizado utilizando computadores e /ou ferramentas de TI habilitadas, seguindo procedimentos organizacionais e meios estritamente relacionados com os fins indicados.
            </p>
            <p className="text-body-md text-foreground/80 mb-6 leading-relaxed text-pretty">
              Além do Proprietário, em alguns casos, os Dados podem ser acessados por certos tipos de pessoas encarregadas, envolvidas com a operação deste Serviço (este Aplicativo) (administração, vendas, marketing, administração legal do sistema) ou pessoas externas (como fornecedores terceirizados de serviços técnicos, carteiros, provedores de hospedagem, empresas de TI, agências de comunicação) nomeadas, quando necessário, como Processadores de Dados por parte do Proprietário. A lista atualizada destas partes pode ser solicitada ao Proprietário a qualquer momento.
            </p>

            <h3 className="text-lg font-display font-semibold text-foreground mt-8 mb-3 tracking-tight text-pretty">
              Base jurídica para o processamento
            </h3>
            <p className="text-body-md text-foreground/80 mb-4 leading-relaxed text-pretty">
              O Proprietário poderá processar os Dados Pessoais relacionados ao Usuário se uma das hipóteses a seguir se aplicar:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-foreground/80">
              <li className="text-body-md leading-relaxed text-pretty">
                Os Usuários tenham dado a sua anuência para uma ou mais finalidades específicas conforme a <strong className="font-semibold text-foreground">“LGPD” (Lei Geral de Proteção de Dados Pessoais - Lei nº 13.709/2018)</strong>. 
                <span className="block text-body-sm text-foreground/60 mt-1">
                  Observação: De acordo com algumas legislações o Proprietário poderá ter a permissão para processar os Dados Pessoais ATÉ QUE O Usuário faça objeção a isto (“opt-out”), sem ter que se basear em anuência ou em quaisquer outras bases jurídicas a seguir. Isto contudo não se aplica sempre que o processamento de Dados Pessoais estiver sujeito à legislação europeia de proteção de dados;
                </span>
              </li>
              <li className="text-body-md leading-relaxed text-pretty">
                O fornecimento dos Dados for necessário para o cumprimento de um contrato com o Usuário e/ou quaisquer obrigações pré-contratuais do mesmo;
              </li>
              <li className="text-body-md leading-relaxed text-pretty">
                O processamento for necessário para o cumprimento de uma obrigação jurídica à qual o Proprietário estiver sujeito;
              </li>
              <li className="text-body-md leading-relaxed text-pretty">
                O processamento estiver relacionado a uma tarefa que for executada no interesse público ou no exercício de uma autorização oficial na qual o Proprietário estiver investido;
              </li>
              <li className="text-body-md leading-relaxed text-pretty">
                O processamento for necessário para a finalidade de interesses legítimos perseguidos pelo Proprietário ou por um terceiro;
              </li>
            </ul>
            <p className="text-body-md text-foreground/80 mb-6 leading-relaxed text-pretty">
              Em qualquer caso, o Proprietário colaborará de bom grado para esclarecer qual a base jurídica que se aplica ao processamento, e em especial se o fornecimento de Dados for um requisito obrigatório por força de lei ou contratual, ou uma exigência necessária para celebrar um contrato.
            </p>

            <h3 className="text-lg font-display font-semibold text-foreground mt-8 mb-3 tracking-tight text-pretty">
              Lugar
            </h3>
            <p className="text-body-md text-foreground/80 mb-4 leading-relaxed text-pretty">
              Os dados são processados ​​nas sedes de operação dos Proprietários, e em quaisquer outros lugares onde as partes envolvidas com o processamento estiverem localizadas. Dependendo da localização do Usuário as transferências de dados poderão envolver a transferência dos Dados do Usuário para outro país que não seja o seu. Para descobrirem mais sobre o local de processamento de tais Dados transferidos os Usuários poderão verificar a seção contendo os detalhes sobre o processamento de Dados Pessoais.
            </p>
            <p className="text-body-md text-foreground/80 mb-4 leading-relaxed text-pretty">
              Os Usuários também possuem o direito de serem informados sobre a base jurídica das transferências de Dados para países de fora da União Europeia ou para quaisquer organizações internacionais regidas pelo direito internacional público ou formadas por dois ou mais países, tal como a ONU, e sobre as medidas de segurança tomadas pelo Proprietário para proteger os seus Dados.
            </p>
            <p className="text-body-md text-foreground/80 mb-6 leading-relaxed text-pretty">
              Se ocorrerem quaisquer tais transferências os Usuários poderão descobrir mais a respeito verificando as seções pertinentes deste documento ou perguntando ao Proprietário utilizando as informações fornecidas na seção de contatos.
            </p>

            <h3 className="text-lg font-display font-semibold text-foreground mt-8 mb-3 tracking-tight text-pretty">
              Período de conservação
            </h3>
            <p className="text-body-md text-foreground/80 mb-4 leading-relaxed text-pretty">
              Os Dados Pessoais serão processados e armazenados pelo tempo que for necessário para as finalidades para as quais forem coletados.
            </p>
            <p className="text-body-md text-foreground/80 mb-2 leading-relaxed text-pretty">
              Portanto:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-foreground/80">
              <li className="text-body-md leading-relaxed text-pretty">
                Os Dados Pessoais coletados para as finalidades relacionadas com a execução de um contrato entre o Proprietário e o Usuário serão conservados até que tal contrato tenha sido completamente cumprido.
              </li>
              <li className="text-body-md leading-relaxed text-pretty">
                Os Dados Pessoais coletados para as finalidades relacionadas com os legítimos interesses do Proprietário serão conservados pelo tempo que for necessário para cumprir tais finalidades. Os Usuários poderão obter informações específicas sobre os interesses legítimos perseguidos pelo Proprietário dentro das seções pertinentes deste documento ou entrando em contato com o Proprietário.
              </li>
              <li className="text-body-md leading-relaxed text-pretty">
                O Proprietário poderá ter a permissão de conservar os Dados Pessoais por um prazo maior sempre que o Usuário tiver dado a sua autorização para tal processamento, enquanto tal autorização não tiver sido retirada. Além disso, o Proprietário poderá ficar obrigado a conservar os Dados Pessoais por um prazo maior em todas as ocasiões em que estiver obrigado a fazê-lo para o cumprimento de uma obrigação jurídica ou em cumprimento de um mandado de uma autoridade.
              </li>
            </ul>
            <p className="text-body-md text-foreground/80 mb-6 leading-relaxed text-pretty">
              Assim que o prazo de conservação vencer os Dados Pessoais serão apagados. Desta forma o direito de acessar, o direito de apagar, o direito de corrigir e o direito à portabilidade dos dados não poderão ter o seu cumprimento exigido após o vencimento do prazo de conservação.
            </p>

            <h2 className="text-xl md:text-2xl font-display font-normal text-foreground mt-10 mb-4 tracking-tight text-pretty">
              As finalidades do processamento
            </h2>
            <p className="text-body-md text-foreground/80 mb-4 leading-relaxed text-pretty">
              Os Dados relativos ao Usuário são coletados para permitir que o Proprietário forneça os seus Serviços, bem como para os seguintes propósitos: <strong className="font-semibold text-foreground">Visualizar conteúdo de plataformas externas</strong> e <strong className="font-semibold text-foreground">Registro e autenticação</strong>.
            </p>
            <p className="text-body-md text-foreground/80 mb-6 leading-relaxed text-pretty">
              Os Usuários poderão obter informações adicionais detalhadas sobre tais finalidades do processamento e sobre os Dados Pessoais específicos utilizados para cada finalidade nas seções respectivas deste documento.
            </p>

            <h2 className="text-xl md:text-2xl font-display font-normal text-foreground mt-10 mb-4 tracking-tight text-pretty">
              Informações detalhadas sobre o processamento de Dados Pessoais
            </h2>
            <p className="text-body-md text-foreground/80 mb-6 leading-relaxed text-pretty">
              Os Dados Pessoais são recolhidos para os seguintes fins e utilizando os seguintes serviços:
            </p>

            <div className="space-y-6 mb-8">
              <div className="bg-secondary-50 rounded-lg p-5">
                <h4 className="text-md font-display font-semibold text-foreground mb-2">
                  Registro e autenticação
                </h4>
                <p className="text-body-sm text-foreground/80 mb-3 leading-relaxed">
                  Ao se registrar ou autenticar, os Usuários permitem a este serviço (Sistema JobbLive) identificá-los e dar-lhes o acesso a serviços dedicados. Dependendo do que estiver descrito abaixo, os serviços de registro e autenticação podem ser fornecidos por terceiros. Neste caso, este Aplicativo poderá acessar alguns Dados armazenados por estes serviços de terceiros para fins de registro ou identificação.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-foreground/80 text-body-sm">
                  <li>
                    <strong className="font-semibold text-foreground">Google OAuth (Google LLC):</strong> Serviço de registro e autenticação fornecido pelo Google LLC e conectado à rede Google.
                  </li>
                  <li>
                    <strong className="font-semibold text-foreground">Google Gmail (Google LLC):</strong> Serviço de e-mail integrado para funcionalidades de comunicação do sistema.
                  </li>
                </ul>
                <p className="text-body-sm text-foreground/70 mt-3 italic">
                  Dados Pessoais coletados: vários tipos de Dados como especificados na política de privacidade do serviço.
                  <br />
                  Lugar de processamento: EUA – Política de Privacidade. Participante do Privacy Shield.
                </p>
              </div>
            </div>

            <h2 className="text-xl md:text-2xl font-display font-normal text-foreground mt-10 mb-4 tracking-tight text-pretty">
              Informações adicionais sobre a coleta e processamento de Dados
            </h2>

            <h3 className="text-lg font-display font-semibold text-foreground mt-6 mb-3 tracking-tight text-pretty">
              Ação jurídica
            </h3>
            <p className="text-body-md text-foreground/80 mb-4 leading-relaxed text-pretty">
              Os Dados Pessoais dos Usuários podem ser utilizados para fins jurídicos pelo Proprietário em juízo ou nas etapas conducentes à possível ação jurídica decorrente de uso indevido deste Serviço (este Aplicativo) ou dos Serviços relacionados.
            </p>
            <p className="text-body-md text-foreground/80 mb-6 leading-relaxed text-pretty">
              O Usuário declara estar ciente de que o Proprietário poderá ser obrigado a revelar os Dados Pessoais mediante solicitação das autoridades governamentais.
            </p>

            <h3 className="text-lg font-display font-semibold text-foreground mt-8 mb-3 tracking-tight text-pretty">
              Informações adicionais sobre os Dados Pessoais do Usuário
            </h3>
            <p className="text-body-md text-foreground/80 mb-6 leading-relaxed text-pretty">
              Além das informações contidas nesta política de privacidade, este Aplicativo poderá fornecer ao Usuário informações adicionais e contextuais sobre os services específicos ou a coleta e processamento de Dados Pessoais mediante solicitação.
            </p>

            <h3 className="text-lg font-display font-semibold text-foreground mt-8 mb-3 tracking-tight text-pretty">
              Logs do sistema e manutenção
            </h3>
            <p className="text-body-md text-foreground/80 mb-6 leading-relaxed text-pretty">
              Para fins de operação e manutenção, este Aplicativo e quaisquer serviços de terceiros poderão coletar arquivos que gravam a interação com este Aplicativo (logs do sistema) ou usar outros Dados Pessoais (tais como endereço IP) para esta finalidade.
            </p>

            <h3 className="text-lg font-display font-semibold text-foreground mt-8 mb-3 tracking-tight text-pretty">
              As informações não contidas nesta política
            </h3>
            <p className="text-body-md text-foreground/80 mb-6 leading-relaxed text-pretty">
              Mais detalhes sobre a coleta ou processamento de Dados Pessoais podem ser solicitados ao Proprietário, a qualquer momento. Favor ver as informações de contato no início deste documento.
            </p>

            <h3 className="text-lg font-display font-semibold text-foreground mt-8 mb-3 tracking-tight text-pretty">
              Mudanças nesta política de privacidade
            </h3>
            <p className="text-body-md text-foreground/80 mb-4 leading-relaxed text-pretty">
              O Proprietário se reserva o direito de fazer alterações nesta política de privacidade a qualquer momento, mediante comunicação aos seus Usuários nesta página e possivelmente dentro deste Serviço/Aplicativo e/ou – na medida em que for viável tecnicamente e juridicamente – enviando um aviso para os Usuários através de quaisquer informações de contato disponíveis para o Proprietário.
            </p>
            <p className="text-body-md text-foreground/80 mb-4 leading-relaxed text-pretty">
              É altamente recomendável que esta página seja consultada várias vezes em relação à última modificação descrita na parte inferior.
            </p>
            <p className="text-body-md text-foreground/80 leading-relaxed text-pretty">
              Caso as mudanças afetem as atividades de processamento realizadas com base na anuência do Usuário, o Proprietário coletará nova anuência do Usuário, onde for exigida.
            </p>
          </article>

        </div>
      </main>

      <Footer />
    </div>
  );
}
