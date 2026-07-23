"use client";

import { useEffect } from "react";

export default function ScrollAnimateInitializer() {
  useEffect(() => {
    // 1. Instancia o IntersectionObserver com threshold e margem inferior de 50px
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target); // Roda apenas uma vez por elemento
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -150px 0px", // Dispara quando o elemento entra 150px na tela
      }
    );

    const registerElements = () => {
      const elements = document.querySelectorAll(
        "[class*='reveal-fade-']:not(.active), [class*='animate-fade-']:not(.active):not(.hero-animate-fade-up)"
      );
      elements.forEach((el) => observer.observe(el));
    };

    // Registro inicial
    registerElements();

    // 3. MutationObserver para monitorar mudanças dinâmicas no DOM (essencial para SPAs, tabs e transições)
    const mutationObserver = new MutationObserver(() => {
      registerElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // 4. Cleanup
    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
