"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Lista de estados (UF) do Brasil
const ESTADOS = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];

export default function FormTesteGratis() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPromoCode = searchParams.get("codigo_promo") || "JOBBLIVE";

  // Estados do Formulário
  const [form, setForm] = useState({
    contato: "", // Nome pessoal
    nome: "", // Empresa
    email: "", // E-mail
    telefone: "", // Telefone
    tipo_empresa: "MEI", // Regime tributário
    qtd_funcionarios: "1a2", // Funcionários
    uf_nfe: "SP", // Estado (padrão São Paulo como UX melhor que AC)
    codigo_promocao: initialPromoCode, // Código Promocional padrão
    qtde_usuarios: 1, // Padrão 1
  });

  const [interesses, setInteresses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Função para formatar o telefone no padrão (99) 99999-9999 ou (99) 9999-9999
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const cleanValue = rawValue.replace(/[^\d]/g, "");
    
    let formatted = "";
    if (cleanValue.length > 0) {
      formatted = `(${cleanValue.slice(0, 2)}`;
    }
    if (cleanValue.length > 2) {
      formatted += `) ${cleanValue.slice(2, 7)}`;
    }
    if (cleanValue.length > 7) {
      formatted += `-${cleanValue.slice(7, 11)}`;
    }

    setForm((prev) => ({ ...prev, telefone: formatted }));
  };

  // Gerenciamento genérico de inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Gerenciamento de Checkboxes de Interesses
  const handleCheckboxChange = (value: string) => {
    setInteresses((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  // Envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    // Constrói modulos_interesse de acordo com a seleção ou "Vazio"
    const modulosInteresse = interesses.length > 0 ? interesses.join(",") : "Vazio";

    // Dados prontos para o payload
    const payload = {
      ...form,
      codigo_promocao: searchParams.get("codigo_promo") || form.codigo_promocao,
      modulos_interesse: modulosInteresse,
    };

    try {
      const response = await fetch("/api/teste-gratis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data?.status === true) {
        // Redireciona para página de sucesso local
        router.push("/teste-gratis/sucesso");
      } else {
        // Exibe erro retornado pela API ou genérico
        setErrorMsg(
          data?.mensagem || 
          "Ocorreu um erro ao processar seu cadastro. Por favor, revise os dados ou tente novamente."
        );
        setLoading(false);
      }
    } catch {
      setErrorMsg(
        "Não foi possível conectar ao servidor. Por favor, verifique sua conexão com a internet e tente novamente."
      );
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      
      {/* Título de seção */}
      <div>
        <h3 className="text-xl md:text-2xl font-display font-normal text-text-primary tracking-tightest">
          Preencha os campos abaixo
        </h3>
        <p className="text-body-sm text-text-secondary mt-1">
          Nenhum dado de pagamento é necessário para iniciar seu teste.
        </p>
      </div>

      {/* Banner de Erro */}
      {errorMsg && (
        <div className="bg-primary-50 border border-primary-200 text-primary-800 p-4 rounded-lg flex items-start gap-3 animate-fade-in text-body-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 text-primary-600 shrink-0 mt-0.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          <div>
            <span className="font-medium">Erro ao cadastrar:</span> {errorMsg}
          </div>
        </div>
      )}

      {/* Grid de Inputs Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Nome Pessoal */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contato" className="text-xs font-normal text-text-secondary">
            Nome pessoal *
          </label>
          <input
            type="text"
            id="contato"
            name="contato"
            required
            disabled={loading}
            placeholder="Seu nome"
            value={form.contato}
            onChange={handleChange}
            className="w-full h-11 px-3 bg-white border border-border-default rounded-md text-body-md text-text-primary placeholder:text-text-tertiary focus:outline-hidden focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-150 disabled:bg-disabled-bg disabled:text-disabled-text"
          />
        </div>

        {/* Nome da Empresa */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="nome" className="text-xs font-normal text-text-secondary">
            Empresa *
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            required
            disabled={loading}
            placeholder="Nome da empresa"
            value={form.nome}
            onChange={handleChange}
            className="w-full h-11 px-3 bg-white border border-border-default rounded-md text-body-md text-text-primary placeholder:text-text-tertiary focus:outline-hidden focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-150 disabled:bg-disabled-bg disabled:text-disabled-text"
          />
        </div>

        {/* E-mail */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-normal text-text-secondary">
            E-mail *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            disabled={loading}
            placeholder="exemplo@empresa.com"
            value={form.email}
            onChange={handleChange}
            className="w-full h-11 px-3 bg-white border border-border-default rounded-md text-body-md text-text-primary placeholder:text-text-tertiary focus:outline-hidden focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-150 disabled:bg-disabled-bg disabled:text-disabled-text"
          />
        </div>

        {/* Telefone */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="telefone" className="text-xs font-normal text-text-secondary">
            Telefone *
          </label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            required
            disabled={loading}
            placeholder="(00) 00000-0000"
            value={form.telefone}
            onChange={handlePhoneChange}
            className="w-full h-11 px-3 bg-white border border-border-default rounded-md text-body-md text-text-primary placeholder:text-text-tertiary focus:outline-hidden focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-150 disabled:bg-disabled-bg disabled:text-disabled-text"
          />
        </div>

      </div>

      {/* Inputs Secundários em Linha de 3 Colunas (Desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Regime Tributário */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="tipo_empresa" className="text-xs font-normal text-text-secondary">
            Regime tributário
          </label>
          <div className="relative">
            <select
              id="tipo_empresa"
              name="tipo_empresa"
              disabled={loading}
              value={form.tipo_empresa}
              onChange={handleChange}
              className="w-full h-11 px-3 bg-white border border-border-default rounded-md text-body-md text-text-primary focus:outline-hidden focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-150 appearance-none disabled:bg-disabled-bg disabled:text-disabled-text"
            >
              <option value="MEI">MEI</option>
              <option value="SIMPLES">Simples Nacional</option>
              <option value="LUCRO">Lucro Real/Presumido</option>
              <option value="NENHUMCNPJ">Sem CNPJ</option>
              <option value="OUTRO">Outro</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-text-tertiary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Funcionários */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="qtd_funcionarios" className="text-xs font-normal text-text-secondary">
            Funcionários
          </label>
          <div className="relative">
            <select
              id="qtd_funcionarios"
              name="qtd_funcionarios"
              disabled={loading}
              value={form.qtd_funcionarios}
              onChange={handleChange}
              className="w-full h-11 px-3 bg-white border border-border-default rounded-md text-body-md text-text-primary focus:outline-hidden focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-150 appearance-none disabled:bg-disabled-bg disabled:text-disabled-text"
            >
              <option value="1a2">1 a 2</option>
              <option value="3a5">3 a 5</option>
              <option value="6a10">6 a 10</option>
              <option value="acima10">Acima de 10</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-text-tertiary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Estado (UF) */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="uf_nfe" className="text-xs font-normal text-text-secondary">
            Estado
          </label>
          <div className="relative">
            <select
              id="uf_nfe"
              name="uf_nfe"
              disabled={loading}
              value={form.uf_nfe}
              onChange={handleChange}
              className="w-full h-11 px-3 bg-white border border-border-default rounded-md text-body-md text-text-primary focus:outline-hidden focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-150 appearance-none disabled:bg-disabled-bg disabled:text-disabled-text"
            >
              {ESTADOS.map((uf) => (
                <option key={uf.value} value={uf.value}>
                  {uf.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-text-tertiary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
        </div>

      </div>

      {/* Bloco de Interesses (Checkbox) */}
      <div className="flex flex-col gap-3 pt-2">
        <div>
          <h4 className="text-body-md font-medium text-text-primary">
            Qual o seu maior interesse em usar o Jobb?
          </h4>
          <p className="text-xs text-text-tertiary">(Marque mais de uma opção se quiser)</p>
        </div>

        <div className="flex flex-col gap-2.5">
          {/* Interesse 1 */}
          <label className="flex items-center gap-3 cursor-pointer group select-none">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                disabled={loading}
                checked={interesses.includes("ApenasOrcamentos")}
                onChange={() => handleCheckboxChange("ApenasOrcamentos")}
                className="sr-only"
              />
              <div className={`w-5 h-5 border rounded-sm flex items-center justify-center transition duration-150 ${
                interesses.includes("ApenasOrcamentos")
                  ? "bg-primary-500 border-primary-500"
                  : "bg-white border-border-default"
              }`}>
                {interesses.includes("ApenasOrcamentos") && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="white"
                    className="w-3.5 h-3.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-body-md text-text-secondary group-hover:text-text-primary transition duration-150">
              Apenas Controle dos Orçamentos
            </span>
          </label>

          {/* Interesse 2 */}
          <label className="flex items-center gap-3 cursor-pointer group select-none">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                disabled={loading}
                checked={interesses.includes("OrcamentoFinanceiro")}
                onChange={() => handleCheckboxChange("OrcamentoFinanceiro")}
                className="sr-only"
              />
              <div className={`w-5 h-5 border rounded-sm flex items-center justify-center transition duration-150 ${
                interesses.includes("OrcamentoFinanceiro")
                  ? "bg-primary-500 border-primary-500"
                  : "bg-white border-border-default"
              }`}>
                {interesses.includes("OrcamentoFinanceiro") && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="white"
                    className="w-3.5 h-3.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-body-md text-text-secondary group-hover:text-text-primary transition duration-150">
              Orçamentos com integração financeira
            </span>
          </label>

          {/* Interesse 3 */}
          <label className="flex items-center gap-3 cursor-pointer group select-none">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                disabled={loading}
                checked={interesses.includes("Tarefas")}
                onChange={() => handleCheckboxChange("Tarefas")}
                className="sr-only"
              />
              <div className={`w-5 h-5 border rounded-sm flex items-center justify-center transition duration-150 ${
                interesses.includes("Tarefas")
                  ? "bg-primary-500 border-primary-500"
                  : "bg-white border-border-default"
              }`}>
                {interesses.includes("Tarefas") && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="white"
                    className="w-3.5 h-3.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-body-md text-text-secondary group-hover:text-text-primary transition duration-150">
              Gestão de Tarefas
            </span>
          </label>
        </div>
      </div>

      {/* Código Promocional (Oculto ou visível se quiser, mas original era oculto / preenchido internamente) */}
      <input type="hidden" name="codigo_promocao" value={form.codigo_promocao} />

      {/* Botão de Envio */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary py-3.5 px-8 flex items-center justify-center gap-2 rounded-md font-normal transition duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-body-md select-none bg-primary-500 text-white hover:bg-primary-400"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Enviando dados...</span>
            </>
          ) : (
            <span>Começar teste grátis</span>
          )}
        </button>
      </div>

    </form>
  );
}
