export interface FuncionalidadeItem {
  title: string;
  description: string;
  iconName: string;
}

export interface CategoriaFuncionalidade {
  id: string;
  label: string;
  summary: string;
  image: string;
  imageAlt: string;
  items: FuncionalidadeItem[];
}

export const funcionalidadesData: CategoriaFuncionalidade[] = [
  {
    id: "campanhas",
    label: "Campanhas / Projetos",
    summary:
      "O hub do job: briefing, cliente, orçamentos, tarefas e financeiro reunidos na mesma campanha — sem planilhas soltas.",
    image: "/assets/img/bg-modulos.png",
    imageAlt: "Painel de campanhas e projetos no JobbLive",
    items: [
      {
        title: "Campanhas e Projetos em um único painel",
        description:
          "Abertura de campanhas e projetos com fluxo moderno, reunindo tudo o que a agência precisa para planejar, executar e medir resultados. Conecte briefing, orçamento, cronograma, tarefas e financeiro de forma unificada.",
        iconName: "FolderSimpleUser",
      },
      {
        title: "Detalhes da Campanha: visão 360°",
        description:
          "Objetivos, público-alvo, contatos, orçamentos, cronogramas, financeiro, pedidos de produção e referências visuais na mesma tela. Facilite o alinhamento estratégico e operacional.",
        iconName: "Compass",
      },
      {
        title: "Painel com contadores do job",
        description:
          "No card da campanha, acompanhe de imediato tarefas e prazos, orçamentos, anexos e lançamentos financeiros — sem abrir cinco planilhas para saber o status do projeto.",
        iconName: "Target",
      },
    ],
  },
  {
    id: "orcamentos",
    label: "Orçamentos",
    summary:
      "Modelos de agência, markup, custos de fornecedores e proposta ao cliente — do orçado ao executado no mesmo fluxo.",
    image: "/assets/img/contratos-pdf.jpg",
    imageAlt: "Tela de orçamento e proposta no JobbLive",
    items: [
      {
        title: "Criação de Orçamentos Ágil",
        description:
          "Gere orçamentos de forma fácil e interativa com modelos pré-configurados que reduzem o retrabalho. Calcule taxas, impostos, margens e BV de forma automática.",
        iconName: "Receipt",
      },
      {
        title: "Cálculo do Orçamento pensado para agências",
        description:
          "Diferencie itens tributáveis e não tributáveis, aplique margens específicas para serviços terceirizados (Markup) e configure comissões de parceiros (BV) de forma automatizada e flexível.",
        iconName: "Calculator",
      },
      {
        title: "Envio de Orçamentos via PDF ou Link",
        description:
          "Envie propostas personalizadas com a identidade visual da sua agência, permitindo o download em PDF ou o acesso do cliente através de um link dinâmico seguro.",
        iconName: "FilePdf",
      },
      {
        title: "Espelho de custo e fornecedor por item",
        description:
          "Compare orçado, em trabalho e executado. Associe fornecedor e valor a cada linha do orçamento para acompanhar o custo real do job.",
        iconName: "ChartBar",
      },
      {
        title: "Aprovar pagamento de fornecedores",
        description:
          "Aprove pagamentos a partir da linha do orçamento, com rastreio de fornecedor, valores e comissões de parceiros (BV) vinculadas ao job.",
        iconName: "Handshake",
      },
      {
        title: "Prestação de Contas Simplificada",
        description:
          "Preencha fornecedores e custos de produção diretamente no orçamento. Lance despesas executadas e valores a pagar integrados automaticamente ao módulo financeiro.",
        iconName: "ListChecks",
      },
      {
        title: "Controle de Verba de Produção",
        description:
          "Monitore verbas solicitadas por produtores para pagamentos em dinheiro com auxílio de aplicativo mobile para prestação de contas de recibos e notas direto na rua.",
        iconName: "Coins",
      },
      {
        title: "Link Seguro para Autocadastro de Fornecedores",
        description:
          "Envie um link para fornecedores externos preencherem seus dados cadastrais e anexarem notas fiscais diretamente, automatizando o recebimento de contas pelo setor financeiro.",
        iconName: "Link",
      },
    ],
  },
  {
    id: "tarefas",
    label: "Tarefas",
    summary:
      "Execute o job com Kanban, Gantt, calendário e timesheet ligados à campanha e, quando fizer sentido, ao orçamento.",
    image: "/assets/img/bg-conectado.png",
    imageAlt: "Gestão de tarefas e cronograma no JobbLive",
    items: [
      {
        title: "Cronograma e Tarefas integradas",
        description:
          "Transforme o planejamento em execução com quadros Kanban, Gantt e listas de tarefas, com responsáveis e prazos claros para toda a equipe — vinculados à campanha.",
        iconName: "Calendar",
      },
      {
        title: "Gestão Visual via Kanban",
        description:
          "Gerencie fluxos de trabalho ligados à campanha e ao orçamento com quadros Kanban. Adicione convidados, comentários, anexos e acompanhe prazos.",
        iconName: "Kanban",
      },
      {
        title: "Organização com Calendário de Cores",
        description:
          "Associe cores de status a diferentes tarefas de projetos no calendário geral, facilitando a identificação visual rápida de pendências.",
        iconName: "CalendarDots",
      },
      {
        title: "Gráfico de Gantt Multiprojetos",
        description:
          "Acompanhe cronogramas de múltiplos projetos e dependências de tarefas simultaneamente sob uma visão Gantt integrada à campanha.",
        iconName: "ChartLineUp",
      },
      {
        title: "Timesheet e custo no orçamento",
        description:
          "Registre horas por atividade e, quando a tarefa estiver vinculada ao orçamento, lance o custo de equipe no job para análise de produtividade e margem.",
        iconName: "Hourglass",
      },
    ],
  },
  {
    id: "financeiro",
    label: "Financeiro",
    summary:
      "O financeiro nasce no orçamento: custos de fornecedores viram lançamentos, PPs e controle de caixa — sem digitar de novo.",
    image: "/assets/img/conciliacao-bancaria.jpg",
    imageAlt: "Módulo financeiro integrado ao orçamento no JobbLive",
    items: [
      {
        title: "Integração com custos de fornecedores do orçamento",
        description:
          "Custos aprovados no orçamento geram lançamentos e pedidos de produção (PP) no financeiro, vinculados ao job — sem retrabalho de digitação.",
        iconName: "Handshake",
      },
      {
        title: "Controle de Contas a Pagar",
        description:
          "Acompanhe de forma unificada os custos administrativos fixos da agência e as despesas específicas de produção vinculadas aos projetos.",
        iconName: "TrendDown",
      },
      {
        title: "Conciliação Bancária Descomplicada",
        description:
          "Importe arquivos OFX e conte com conciliação inteligente que sugere cruzamento de extrato e lançamentos do contas a pagar/receber.",
        iconName: "Bank",
      },
      {
        title: "Gerenciamento de Contas a Receber",
        description:
          "Registre faturamento, parcelamentos e datas de recebimento de clientes, garantindo o controle total e previsibilidade do fluxo de caixa.",
        iconName: "TrendUp",
      },
      {
        title: "Emissão de NF-e Integrada",
        description:
          "Fature os projetos da sua agência emitindo notas fiscais de serviço eletrônicas diretamente pelo sistema de forma rápida e segura.",
        iconName: "FileText",
      },
      {
        title: "Gráfico de Fluxo de Caixa e Previsão de Saldo",
        description:
          "Visualize a saúde financeira da agência em tempo real com gráficos interativos que mostram a evolução dos saldos e a previsão do fluxo de caixa futuro.",
        iconName: "ChartBar",
      },
    ],
  },
  {
    id: "cadastro",
    label: "Cadastro",
    summary:
      "Unidades, usuários, permissões e itens prontos para alimentar orçamentos e a operação da agência.",
    image: "/assets/img/fornecedores-link.jpg",
    imageAlt: "Cadastros e permissões no JobbLive",
    items: [
      {
        title: "Cadastro de Unidades sem limites",
        description:
          "Adicione e gerencie todas as unidades físicas ou filiais da sua agência em uma única plataforma sem restrições de limites de quantidade.",
        iconName: "Buildings",
      },
      {
        title: "Segmentação de Usuários por Unidade",
        description:
          "Associe usuários a unidades específicas do negócio, controlando e deixando o acesso a informações exclusivas e relevantes de cada operação.",
        iconName: "Users",
      },
      {
        title: "Controle de Permissões e Perfis",
        description:
          "Configure perfis de acesso personalizados e direcione com segurança as ações que cada membro da equipe pode realizar no sistema, garantindo a segurança de dados sensíveis.",
        iconName: "ShieldCheck",
      },
      {
        title: "Cadastro de Itens e Produtos",
        description:
          "Base integrada de produtos e serviços para agilizar a criação de orçamentos, permitindo associar valores sugeridos e contas contábeis correspondentes.",
        iconName: "Package",
      },
    ],
  },
];
