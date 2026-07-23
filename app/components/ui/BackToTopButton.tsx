"use client";

import Link from "next/link";

import { ArrowUpIcon } from "@phosphor-icons/react";

export default function BackToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Link
      href="#"
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-500 text-white hover:bg-primary-600 transition-colors focus:outline-none shrink-0"
    >
      <ArrowUpIcon className="w-5 h-5" />
    </Link>
  );
}
