"use client";

import React, { useState } from "react";

interface FAQItem {
  question: string;
  answerJsx: React.ReactNode;
}

interface FaqAccordionProps {
  items: FAQItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto divide-y divide-secondary-100 border-t border-b border-secondary-100">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="py-4">
            <button
              onClick={() => handleToggle(index)}
              className="flex w-full items-center justify-between gap-1.5 text-left text-foreground hover:text-primary-500 transition-colors duration-200 py-2 font-display font-medium text-lg md:text-xl cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="text-pretty pr-4">{item.question}</span>
              <span className="relative size-5 shrink-0">
                {/* Ícone de Mais (+) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`absolute inset-0 size-5 transition-all duration-300 text-primary-500 ${
                    isOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                {/* Ícone de Menos (-) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`absolute inset-0 size-5 transition-all duration-300 text-primary-500 ${
                    isOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                </svg>
              </span>
            </button>
            
            {/* Wrapper de Animação com Grid CSS */}
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="pt-2 pb-4 pl-1 text-body-md text-foreground/80 leading-relaxed text-pretty">
                  {item.answerJsx}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
