export interface FuncionalidadeItem {
  title: string;
  description: string;
  iconName: string; // Nome do ícone do Phosphor Icons correspondente
}

export interface CategoriaFuncionalidade {
  id: string;
  label: string;
  items: FuncionalidadeItem[];
}

export const funcionalidadesData: CategoriaFuncionalidade[] = [
  {
    id: "campanhas",
    label: "Campanhas / Projetos",
    items: [
      {
        title: "Campanhas e Projetos em um único painel",
        description: "Abertura de campanhas e projetos com fluxo moderno, reunindo tudo o que a agência precisa para planejar, executar e medir resultados. Conecte briefing, orçamento, cronograma, tarefas e financeiro de forma unificada.",
        iconName: "FolderSimpleUser"
      },
      {
        title: "Detalhes da Campanha: visão 360°",
        description: "Objetivos, público-alvo, contatos, orçamentos, cronogramas, financeiro, pedidos de produção e referências visuais na mesma tela. Facilite o alinhamento estratégico e operacional.",
        iconName: "Compass"
      },
      {
        title: "Cálculo do Orçamento pensado para agências",
        description: "Diferencie itens tributáveis e não tributáveis, aplique margens específicas para serviços terceirizados (Markup) e configure comissões de forma automatizada e flexível.",
        iconName: "Calculator"
      },
      {
        title: "Aprovar Pagamento com BV",
        description: "Aprove pagamentos de fornecedores com rastreabilidade total de comissões vinculadas a parceiros (BV) configurado diretamente na linha de lançamento.",
        iconName: "Handshake"
      },
      {
        title: "Cronograma e Tarefas integradas",
        description: "Transforme o planejamento em execução com quadros Kanban, Gantt e listas de tarefas, com responsáveis e prazos claros para toda a equipe.",
        iconName: "Calendar"
      },
      {
        title: "Centralização que vira resultado",
        description: "Reduza o retrabalho e acelere decisões ao centralizar as informações estratégicas e financeiras. Abandone planilhas soltas e foque na performance.",
        iconName: "Target"
      }
    ]
  },
  {
    id: "cadastro",
    label: "Cadastro",
    items: [
      {
        title: "Cadastro de Unidades sem limites",
        description: "Adicione e gerencie todas as unidades físicas ou filiais da sua agência em uma única plataforma sem restrições de limites de quantidade.",
        iconName: "Buildings"
      },
      {
        title: "Segmentação de Usuários por Unidade",
        description: "Associe usuários a unidades específicas do negócio, controlando e deixando o acesso a informações exclusivas e relevantes de cada operação.",
        iconName: "Users"
      },
      {
        title: "Controle de Permissões e Perfis",
        description: "Configure perfis de acesso personalizados e direcione com segurança as ações que cada membro da equipe pode realizar no sistema, garantindo a segurança de dados sensíveis.",
        iconName: "ShieldCheck"
      },
      {
        title: "Cadastro de Itens e Produtos",
        description: "Base integrada de produtos e serviços para agilizar a criação de orçamentos, permitindo associar valores sugeridos e contas contábeis correspondentes.",
        iconName: "Package"
      }
    ]
  },
  {
    id: "orcamentos",
    label: "Orçamentos",
    items: [
      {
        title: "Criação de Orçamentos Ágil",
        description: "Gere orçamentos de forma fácil e interativa com modelos pré-configurados que reduzem o retrabalho. Calcule taxas, impostos, margens e BV de forma automática.",
        iconName: "Receipt"
      },
      {
        title: "Envio de Orçamentos via PDF ou Link",
        description: "Envie propostas personalizadas com a identidade visual da sua agência, permitindo o download em PDF ou o acesso do cliente através de um link dinâmico seguro.",
        iconName: "FilePdf"
      },
      {
        title: "Prestação de Contas Simplificada",
        description: "Preencha fornecedores e custos de produção diretamente no orçamento. Lance despesas executadas e valores a pagar integrados automaticamente ao módulo financeiro.",
        iconName: "ListChecks"
      },
      {
        title: "Controle de Verba de Produção",
        description: "Monitore verbas solicitadas por produtores para pagamentos em dinheiro com auxílio de aplicativo mobile para prestação de contas de recibos e notas direto na rua.",
        iconName: "Coins"
      },
      {
        title: "Link Seguro para Autocadastro de Fornecedores",
        description: "Envie um link para fornecedores externos preencherem seus dados cadastrais e anexarem notas fiscais diretamente, automatizando o recebimento de contas pelo setor financeiro.",
        iconName: "Link"
      }
    ]
  },
  {
    id: "financeiro",
    label: "Financeiro",
    items: [
      {
        title: "Controle de Contas a Pagar",
        description: "Acompanhe de forma unificada os custos administrativos fixos da agência e as despesas específicas de produção vinculadas aos projetos.",
        iconName: "TrendDown"
      },
      {
        title: "Conciliação Bancária Descomplicada",
        description: "Importe arquivos OFX e conte com conciliação inteligente que sugere cruzamento de extrato e lançamentos do contas a pagar/receber.",
        iconName: "Bank"
      },
      {
        title: "Gerenciamento de Contas a Receber",
        description: "Registre faturamento, parcelamentos e datas de recebimento de clientes, garantindo o controle total e previsibilidade do fluxo de caixa.",
        iconName: "TrendUp"
      },
      {
        title: "Emissão de NF-e Integrada",
        description: "Fature os projetos da sua agência emitindo notas fiscais de serviço eletrônicas diretamente pelo sistema de forma rápida e segura.",
        iconName: "FileText"
      },
      {
        title: "Gráfico de Fluxo de Caixa e Previsão de Saldo",
        description: "Visualize a saúde financeira da agência em tempo real com gráficos interativos que mostram a evolução dos saldos e a previsão do fluxo de caixa futuro.",
        iconName: "ChartBar"
      }
    ]
  },
  {
    id: "tarefas",
    label: "Tarefas",
    items: [
      {
        title: "Gestão Visual via Kanban",
        description: "Gerencie fluxos de trabalho de forma clara e ágil com quadros Kanban. Adicione convidados, insira comentários, anexe arquivos e acompanhe prazos.",
        iconName: "Kanban"
      },
      {
        title: "Organização com Calendário de Cores",
        description: "Associe cores de status a diferentes tarefas de projetos no calendário geral, facilitando a identificação visual rápida de pendências.",
        iconName: "CalendarDots"
      },
      {
        title: "Gráfico de Gantt Multiprojetos",
        description: "Acompanhe cronogramas de múltiplos projetos e dependências de tarefas simultaneamente sob uma visão Gantt integrada.",
        iconName: "ChartLineUp"
      },
      {
        title: "Timesheet e Gestão de Tempo",
        description: "Registre as horas trabalhadas em cada atividade e projeto, gerando dados de produtividade e análise de custo de equipe por campanha.",
        iconName: "Hourglass"
      }
    ]
  }
];
