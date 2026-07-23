export interface SegmentoData {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  painPoints: { title: string; description: string }[];
  benefits: { title: string; description: string }[];
  features: { title: string; description: string }[];
  ctaTitle: string;
  ctaSubtitle: string;
}

export const segmentosData: Record<string, SegmentoData> = {
  "agencia-de-marketing": {
    slug: "agencia-de-marketing",
    name: "Agência de marketing",
    metaTitle: "Software de Gestão para agências de marketing | Jobb Live",
    metaDescription: "O software de gestão para agências de marketing. Controle timesheet, escopo de projetos, contratos recorrentes e garanta a rentabilidade da sua operação.",
    heroTitle: "O software de gestão para agências de marketing escalarem com lucro",
    heroSubtitle: "Gerencie projetos, timesheet, financeiro e a rentabilidade de seus contratos em um único sistema, livre de planilhas complexas e retrabalho.",
    painPoints: [
      {
        title: "Escopo fora de controle (Scope Creep)",
        description: "Seu time faz entregas extras que não estavam no contrato, consumindo a margem de lucro sem que você consiga cobrar por isso."
      },
      {
        title: "Dificuldade em medir a rentabilidade",
        description: "Não saber quais clientes recorrentes (retainers) realmente dão lucro e quais estão consumindo mais horas do que o planejado."
      },
      {
        title: "Timesheet ineficiente ou inexistente",
        description: "Falta de clareza sobre onde a equipe aloca o tempo de trabalho, dificultando o cálculo do custo real de cada entrega."
      }
    ],
    benefits: [
      {
        title: "Visibilidade total do custo por cliente",
        description: "Entenda exatamente quanto custa atender cada conta em tempo real, cruzando as horas trabalhadas do time com os valores dos contratos."
      },
      {
        title: "Controle rígido de demandas e prazos",
        description: "Centralize o fluxo de criação, aprovação e entrega de tarefas em boards visuais e organizados por prioridade."
      },
      {
        title: "Previsibilidade financeira real",
        description: "Acompanhe faturamento recorrente, custos operacionais e fluxo de caixa futuro de forma integrada e automática."
      }
    ],
    features: [
      {
        title: "Timesheet inteligente",
        description: "Registro de horas simples integrado às tarefas, gerando relatórios automáticos de custo e esforço por projeto."
      },
      {
        title: "Gestão de contratos recorrentes",
        description: "Controle de retainers, renovações, faturamento mensal automático e reajustes sem processos manuais."
      },
      {
        title: "Relatórios de rentabilidade",
        description: "Gráficos visuais mostrando a margem de contribuição e o lucro real de cada cliente e projeto."
      }
    ],
    ctaTitle: "Sua agência de marketing com controle absoluto",
    ctaSubtitle: "Pare de perder dinheiro com entregas fora do escopo. Comece seu teste de 7 dias grátis na JobbLive."
  },
  "agencia-de-live-marketing": {
    slug: "agencia-de-live-marketing",
    name: "Agência de live marketing",
    metaTitle: "Software para agências de live marketing | Jobb Live",
    metaDescription: "Gerencie ativações, eventos e campanhas de live marketing. Controle orçamentos complexos, contratação de promotores e custos de campo em tempo real.",
    heroTitle: "Controle sua operação de live marketing de ponta a ponta, do orçamento ao campo",
    heroSubtitle: "Centralize a gestão de fornecedores, controle de diárias, compras de materiais e orçamentos de eventos sem planilhas caóticas.",
    painPoints: [
      {
        title: "Desvio de custos durante a execução",
        description: "Custos extras imprevistos no local do evento que estouram a margem planejada sem que a diretoria perceba a tempo."
      },
      {
        title: "Gestão caótica de terceiros e diárias",
        description: "Controlar centenas de notas fiscais, pagamentos de promotores, staffs e fornecedores locais em planilhas dispersas."
      },
      {
        title: "Orçamentos complexos e demorados",
        description: "Dificuldade para montar propostas comerciais rápidas e precisas que respeitem as margens de lucro exigidas pela agência."
      }
    ],
    benefits: [
      {
        title: "Margem de lucro garantida por projeto",
        description: "Compare o orçamento planejado com o custo real de campo em tempo real e tome decisões antes que o evento termine."
      },
      {
        title: "Portal de fornecedores integrado",
        description: "Seus parceiros atualizam dados cadastrais e enviam notas fiscais diretamente pelo sistema, reduzindo a burocracia do financeiro."
      },
      {
        title: "Gestão ágil de compras e reembolsos",
        description: "Aprove compras de insumos para os eventos e controle adiantamentos e reembolsos de produção de forma simples."
      }
    ],
    features: [
      {
        title: "Orçamentador de eventos",
        description: "Criação de orçamentos detalhados por categorias de custos, margem e impostos específicos de live marketing."
      },
      {
        title: "Controle de custos de campo",
        description: "Lançamento rápido de despesas de produção no local do evento com fluxo de aprovação multinível."
      },
      {
        title: "Geração de contratos automática",
        description: "Emissão automatizada de contratos de prestação de serviços para staffs, promotores e fornecedores com assinatura digital."
      }
    ],
    ctaTitle: "Elimine o caos financeiro do seu próximo evento",
    ctaSubtitle: "Tenha controle em tempo real de cada centavo investido na ativação. Teste a JobbLive grátis por 7 dias."
  },
  "agencia-de-publicidade": {
    slug: "agencia-de-publicidade",
    name: "agências de publicidade",
    metaTitle: "Gestão para agências de publicidade e mídia | Jobb Live",
    metaDescription: "Centralize a mídia, fluxo de criação, faturamento e o controle de BV da sua agência de publicidade em um único sistema integrado.",
    heroTitle: "Centralize a operação, mídia e o controle de BV da sua agência em uma única tela",
    heroSubtitle: "Gerencie o fluxo de jobs desde o briefing até a veiculação, com controle total de BVs e rentabilidade de contas.",
    painPoints: [
      {
        title: "Controle manual e ineficiente de BV",
        description: "Acompanhar bonificações de veiculação (BVs) em planilhas gera erros de cobrança e perda de receita garantida por direito."
      },
      {
        title: "Atrasos recorrentes na criação",
        description: "Falta de visibilidade do gargalo de produção, gerando refações constantes e prazos estourados com clientes."
      },
      {
        title: "Dificuldade em integrar mídia e financeiro",
        description: "Processo truncado para faturar veiculações e repassar pagamentos a veículos de comunicação e produtores."
      }
    ],
    benefits: [
      {
        title: "Faturamento de mídia sem erros",
        description: "Integre as ordens de veiculação diretamente ao faturamento da agência, automatizando cobranças e repasses."
      },
      {
        title: "Controle absoluto de receitas de BV",
        description: "Monitore o status de cada BV a receber de veículos, garantindo o recebimento correto de todas as bonificações."
      },
      {
        title: "Fluxo criativo sem gargalos",
        description: "Gerencie o fluxo de tráfego de jobs (briefing, criação, revisão, aprovação interna e externa) de forma transparente."
      }
    ],
    features: [
      {
        title: "Módulo de controle de BV",
        description: "Rastreamento inteligente de contratos de bonificação por veículo, com alertas de prazos e valores a receber."
      },
      {
        title: "Workflow de criação integrado",
        description: "Gestão visual de jobs por equipe, com controle de status de aprovação de peças publicitárias."
      },
      {
        title: "Faturamento automatizado",
        description: "Emissão de notas fiscais de serviços e controle de repasses de mídia integrados ao fluxo de caixa."
      }
    ],
    ctaTitle: "Sua agência de publicidade mais organizada e rentável",
    ctaSubtitle: "Gerencie mídia, criação e BVs sem perder o controle. Comece seu teste gratuito hoje mesmo."
  },
  "agencia-de-conteudo-digital": {
    slug: "agencia-de-conteudo-digital",
    name: "agência de conteúdo digital",
    metaTitle: "Software de Gestão para agências de conteúdo digital | Jobb Live",
    metaDescription: "Gerencie alto volume de entregas de conteúdo, redes sociais e SEO. Otimize a capacidade do time e meça a lucratividade de cada cliente.",
    heroTitle: "Gerencie o fluxo de criação e a lucratividade da sua agência de conteúdo digital",
    heroSubtitle: "Organize alto volume de posts, copys e designs em um fluxo de trabalho ágil, sabendo exatamente o custo de cada conta.",
    painPoints: [
      {
        title: "Alto volume de pequenas demandas",
        description: "Controlar dezenas de posts diários, criativos e copys sem perder o prazo ou errar no canal de publicação."
      },
      {
        title: "Sobrecarga crônica da equipe",
        description: "Não saber a real capacidade de trabalho do time de design e redação, levando a sobrecarga e queda na qualidade."
      },
      {
        title: "Sensação de trabalhar muito e lucrar pouco",
        description: "Falta de dados para provar se a mensalidade cobrada do cliente cobre o custo das inúmeras alterações solicitadas."
      }
    ],
    benefits: [
      {
        title: "Entregas ágeis e organizadas",
        description: "Visualize todo o cronograma de publicações e o status de cada peça de conteúdo em kanbans dedicados."
      },
      {
        title: "Planejamento de capacidade eficiente",
        description: "Distribua as tarefas com base na carga horária disponível de cada profissional, evitando gargalos e estresse."
      },
      {
        title: "Cobrança justa por refações",
        description: "Monitore o tempo gasto em retrabalhos e tenha dados concretos para renegociar o valor do fee mensal do cliente."
      }
    ],
    features: [
      {
        title: "Kanban de produção multicanais",
        description: "Organização de demandas de conteúdo por cliente, canal e data de publicação com fluxo rápido de status."
      },
      {
        title: "Alocação de equipe (capacity)",
        description: "Gráficos de ocupação do time em tempo real para planejamento de novas demandas e contratações."
      },
      {
        title: "Métricas de custo por entrega",
        description: "Cálculo automático do custo de cada post ou campanha com base no valor da hora do profissional alocado."
      }
    ],
    ctaTitle: "Ganhe escala na sua produção de conteúdo",
    ctaSubtitle: "Elimine o caos das planilhas de conteúdo e controle a margem de lucro de cada conta. Comece agora."
  },
  "agencia-de-ativacao-de-marca": {
    slug: "agencia-de-ativacao-de-marca",
    name: "agências de ativações de marca",
    metaTitle: "Software de Gestão para Ativações de Marca | Jobb Live",
    metaDescription: "Organize a logística, contratação de promotores e prestação de contas de ativações de marca. Controle despesas de campo com facilidade.",
    heroTitle: "Simplifique a logística, a gestão de promotores e o custo de suas ativações",
    heroSubtitle: "Monitore despesas de campo, contratação de staff, logística de materiais promocionais e controle financeiro por projeto.",
    painPoints: [
      {
        title: "Logística complexa de materiais",
        description: "Perda de kits, brindes e materiais promocionais no envio para pontos de ativação devido à falta de rastreio centralizado."
      },
      {
        title: "Controle financeiro de promotores",
        description: "Gerenciar pagamentos de diárias, transporte e alimentação de dezenas de promotores em diferentes cidades."
      },
      {
        title: "Prestação de contas demorada",
        description: "Levar semanas reunindo recibos de despesas de campo para apresentar o fechamento financeiro ao cliente final."
      }
    ],
    benefits: [
      {
        title: "Logística integrada ao projeto",
        description: "Acompanhe o status do envio e recebimento de materiais promocionais diretamente na aba do projeto."
      },
      {
        title: "Gestão simplificada de promotores",
        description: "Automatize a coleta de dados de staff, envio de contratos de diárias e conciliação de pagamentos em lote."
      },
      {
        title: "Relatório pós-evento instantâneo",
        description: "Apresente os custos reais consolidados do projeto no dia seguinte à finalização da ativação."
      }
    ],
    features: [
      {
        title: "Rastreamento de insumos",
        description: "Controle de estoque de brindes, uniformes e displays promocionais alocados por projeto ou campanha."
      },
      {
        title: "Gestão de staffs e diárias",
        description: "Módulo para cadastro de promotores, controle de escalas de trabalho e fluxo de pagamento de ajuda de custo."
      },
      {
        title: "App de lançamento de despesas",
        description: "Permite aos produtores de campo lançarem fotos de recibos diretamente pelo celular para reembolso ágil."
      }
    ],
    ctaTitle: "Garanta a execução perfeita da sua próxima ativação",
    ctaSubtitle: "Monitore a logística e as despesas de campo em um único lugar. Teste a JobbLive grátis por 7 dias."
  },
  "agencia-de-trade-marketing": {
    slug: "agencia-de-trade-marketing",
    name: "Agências de Trade Marketing",
    metaTitle: "Gestão para Agências de Trade Marketing | Jobb Live",
    metaDescription: "Otimize a gestão de campanhas de trade, positivação de PDV, promotores e faturamento de contratos corporativos de grande escala.",
    heroTitle: "Gerencie suas campanhas de trade e a operação de PDV com controle financeiro absoluto",
    heroSubtitle: "Controle contratos de grande porte, logística de positivação de PDV e a rentabilidade da sua operação de trade marketing.",
    painPoints: [
      {
        title: "Perda de controle em contratos de grande escala",
        description: "Dificuldade para consolidar os custos operacionais de promotores e materiais promocionais de campanhas nacionais."
      },
      {
        title: "Faturamento manual complexo",
        description: "Gastar dias calculando reembolsos de despesas de campo e faturando taxas de agenciamento por cliente corporativo."
      },
      {
        title: "Falta de integração logística e operacional",
        description: "Operação de campo desconectada do financeiro, gerando atrasos em pagamentos a fornecedores e promotores."
      }
    ],
    benefits: [
      {
        title: "Lucratividade real por PDV ou Região",
        description: "Analise a margem de contribuição de cada campanha de trade segmentada por cliente, região ou ponto de venda."
      },
      {
        title: "Faturamento corporativo simplificado",
        description: "Gere faturas automáticas integrando taxa de agenciamento (fee), reembolsos aprovados e prestação de contas de forma transparente."
      },
      {
        title: "Sincronização de fornecedores e compras",
        description: "Gerencie as cotações de produção de displays, impressão de materiais e contratação de terceiros no mesmo sistema."
      }
    ],
    features: [
      {
        title: "Faturamento por contrato (fee + variável)",
        description: "Configuração de faturamento recorrente integrado à cobrança de custos extras reembolsáveis pré-aprovados."
      },
      {
        title: "Gestão de compras em lote",
        description: "Módulo de compras para cotações de materiais de ponto de venda com múltiplos fornecedores nacionais."
      },
      {
        title: "Dashboard de indicadores corporativos",
        description: "Visão gerencial consolidada de receitas, despesas, impostos e margem líquida de toda a operação de trade."
      }
    ],
    ctaTitle: "Controle total da sua operação de trade marketing",
    ctaSubtitle: "Simplifique a gestão de contratos corporativos complexos e ganhe produtividade. Teste agora."
  },
  "organizador-de-feiras-e-congressos": {
    slug: "organizador-de-feiras-e-congressos",
    name: "Organizadores de feiras e congressos",
    metaTitle: "Gestão para feiras, congressos e eventos corporativos | Jobb Live",
    metaDescription: "Software de gestão para grandes eventos corporativos. Controle a venda de estandes, patrocínios, orçamentos milionários e montagem.",
    heroTitle: "Gerencie o orçamento e a operação de suas feiras e congressos em um único lugar",
    heroSubtitle: "Controle orçamentos complexos de infraestrutura, venda de cotas de patrocínio, contratos de estandes e fluxo de caixa de grandes eventos.",
    painPoints: [
      {
        title: "Planilhas de orçamento gigantes e confusas",
        description: "Controlar milhares de itens de custo (segurança, limpeza, montagem, credenciamento) em planilhas sujeitas a erros humanos."
      },
      {
        title: "Falta de controle na receita de patrocínios",
        description: "Acompanhar o status financeiro de vendas de estandes e parcelas de patrocínio de forma manual e descentralizada."
      },
      {
        title: "Gestão de fornecedores críticos",
        description: "Lidar com prazos de montagem, liberação de notas fiscais e fluxos de pagamentos complexos de prestadores de infraestrutura."
      }
    ],
    benefits: [
      {
        title: "Previsão de Fluxo de Caixa pré-evento",
        description: "Acompanhe as receitas das vendas de espaço físico e patrocínios contra o cronograma de pagamentos a fornecedores."
      },
      {
        title: "Gestão integrada de grandes fornecedores",
        description: "Aprove contratos de montagem, geradores e equipes de apoio diretamente no sistema, mantendo o controle do orçamento."
      },
      {
        title: "Emissão e assinatura de contratos",
        description: "Agilize a venda de espaços gerando contratos de locação automaticamente e coletando assinaturas digitais com validade jurídica."
      }
    ],
    features: [
      {
        title: "Planejamento Financeiro Consolidado",
        description: "Estrutura detalhada de orçamento com categorias de receitas e despesas específicas para feiras e congressos."
      },
      {
        title: "Controle de Contratos de Expositores",
        description: "Histórico de vendas de estandes, patrocínios, parcelamentos e emissão de notas fiscais integradas."
      },
      {
        title: "Cronograma Financeiro de Fornecedores",
        description: "Calendário de desembolsos integrado ao fluxo de caixa para evitar atrasos em serviços essenciais do evento."
      }
    ],
    ctaTitle: "Reduza os riscos operacionais da sua feira ou congresso",
    ctaSubtitle: "Centralize o controle de custos de infraestrutura e garanta a margem do seu evento. Comece a usar."
  },
  "organizador-de-festivais-e-shows": {
    slug: "organizador-de-festivais-e-shows",
    name: "uma empresa organizadora de festivais e shows",
    metaTitle: "Software de Gestão para Festivais e Shows | Jobb Live",
    metaDescription: "Gerencie a produção de shows e festivais. Controle fluxo de caixa de alto risco, adiantamento de cachês e conciliação de ticketeiras.",
    heroTitle: "Controle o fluxo de caixa, venda de ingressos e custos de produção do seu festival",
    heroSubtitle: "Monitore adiantamentos de cachês, pagamentos de fornecedores de palco, som e luz, e integre o recebimento de ticketeiras.",
    painPoints: [
      {
        title: "Descasamento severo de fluxo de caixa",
        description: "Pagar altos valores de adiantamento de cachês de artistas e locações de arenas antes de receber o repasse das ticketeiras."
      },
      {
        title: "Conciliação complexa de vendas de ingressos",
        description: "Falta de integração com os relatórios das plataformas de venda de ingressos, dificultando o fechamento de caixa em tempo real."
      },
      {
        title: "Estouro de custos na produção do festival",
        description: "Custo com rider técnico de última hora, geradores extras ou estruturas adicionais que destroem a rentabilidade do show."
      }
    ],
    benefits: [
      {
        title: "Controle financeiro de alto risco sob controle",
        description: "Mapeie todas as saídas de capital (adiantamentos) contra a previsão de recebíveis de ingressos e patrocínios em tempo real."
      },
      {
        title: "Gestão integrada de contratos de artistas",
        description: "Monitore prazos de pagamento de cachês, cláusulas de rider de hospitalidade e documentação no mesmo painel."
      },
      {
        title: "Prestação de contas rápida pós-show",
        description: "Gere relatórios de custo real de produção, taxas e receitas de bilheteria logo após o encerramento do evento."
      }
    ],
    features: [
      {
        title: "Fluxo de caixa de alta frequência",
        description: "Acompanhamento diário de entradas e saídas financeiras com simulações de cenários de vendas de ingressos."
      },
      {
        title: "Controle de cachês e riders",
        description: "Módulo específico para gerenciar adiantamentos de artistas, cronograma de pagamentos e custos de hospitalidade."
      },
      {
        title: "Gestão de custos de montagem e som",
        description: "Acompanhamento detalhado de contratos de estrutura, luz, som, geradores e equipes de apoio do festival."
      }
    ],
    ctaTitle: "Garanta a saúde financeira do seu festival ou show",
    ctaSubtitle: "Monitore cachês, fornecedores de estrutura e bilheteria de forma integrada. Agende uma demonstração."
  }
};
