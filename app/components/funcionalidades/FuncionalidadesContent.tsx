"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import contactsData from "../../config/contacts.json";
import {
  funcionalidadesData,
  type CategoriaFuncionalidade,
} from "../../config/funcionalidades";
import {
  FolderSimpleUser,
  Compass,
  Calculator,
  Handshake,
  Calendar,
  Target,
  Buildings,
  Users,
  ShieldCheck,
  Package,
  Receipt,
  FilePdf,
  ListChecks,
  Coins,
  Link as LinkIcon,
  TrendDown,
  Bank,
  TrendUp,
  FileText,
  ChartBar,
  Kanban,
  CalendarDots,
  ChartLineUp,
  Hourglass,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";

const iconMap: Record<
  string,
  React.ComponentType<{
    size?: number;
    className?: string;
    weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  }>
> = {
  FolderSimpleUser,
  Compass,
  Calculator,
  Handshake,
  Calendar,
  Target,
  Buildings,
  Users,
  ShieldCheck,
  Package,
  Receipt,
  FilePdf,
  ListChecks,
  Coins,
  Link: LinkIcon,
  TrendDown,
  Bank,
  TrendUp,
  FileText,
  ChartBar,
  Kanban,
  CalendarDots,
  ChartLineUp,
  Hourglass,
};

function FuncionalidadeSection({
  category,
  index,
}: {
  category: CategoriaFuncionalidade;
  index: number;
}) {
  const imageOnRight = index % 2 === 0;
  const images =
    category.images && category.images.length > 0
      ? category.images
      : [category.image];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id={category.id}
      className="scroll-mt-40 border-b border-foreground/10 py-16 md:py-24 last:border-b-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        <div
          className={`lg:col-span-6 flex flex-col ${
            imageOnRight ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <p className="text-overline text-primary-500 font-normal tracking-widest uppercase mb-3 text-pretty">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h2 className="text-pretty leading-tight tracking-tightest mb-4 font-display text-foreground">
            {category.label}
          </h2>
          <p className="text-lg text-foreground/70 text-pretty mb-8 leading-relaxed">
            {category.summary}
          </p>

          <ul className="flex flex-col gap-6 list-none pl-0 m-0">
            {category.items.map((item) => {
              const IconComponent = iconMap[item.iconName] || FolderSimpleUser;
              return (
                <li key={item.title} className="flex gap-4 items-start">
                  <span className="text-primary-500 shrink-0 mt-0.5">
                    <IconComponent size={28} weight="light" />
                  </span>
                  <div>
                    <h3 className="text-lg font-display font-normal text-foreground mb-1 text-pretty leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-body-md text-foreground/70 text-pretty leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div
          className={`lg:col-span-6 lg:sticky lg:top-40 ${
            imageOnRight ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <div className="relative w-full aspect-[4/3] min-h-[480px] md:min-h-[540px] overflow-hidden border border-foreground/10 bg-neutral-50 shadow-sm group">
            {images.map((imgSrc, imgIdx) => (
              <div
                key={imgSrc}
                className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                  imgIdx === activeImageIndex
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Image
                  src={imgSrc}
                  alt={`${category.imageAlt} - Imagem ${imgIdx + 1}`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            ))}

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  aria-label="Imagem anterior"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-neutral-100/90 hover:bg-primary-500 text-neutral-800 hover:text-white border border-neutral-200/80 shadow-sm backdrop-blur-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
                >
                  <CaretLeft size={20} weight="bold" />
                </button>
                <button
                  onClick={nextImage}
                  aria-label="Próxima imagem"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-neutral-100/90 hover:bg-primary-500 text-neutral-800 hover:text-white border border-neutral-200/80 shadow-sm backdrop-blur-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
                >
                  <CaretRight size={20} weight="bold" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100/90 backdrop-blur-md border border-neutral-200/80 shadow-sm">
                  {images.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => setActiveImageIndex(dotIdx)}
                      aria-label={`Ir para imagem ${dotIdx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        dotIdx === activeImageIndex
                          ? "w-6 bg-primary-500"
                          : "w-2 bg-neutral-300 hover:bg-neutral-400"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function FuncionalidadesContent() {
  const [activeId, setActiveId] = useState(funcionalidadesData[0]?.id ?? "");

  useEffect(() => {
    const sections = funcionalidadesData
      .map((cat) => document.getElementById(cat.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="sticky top-16 md:top-20 z-30 bg-white/95 backdrop-blur-sm border-b border-foreground/10">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
          <nav
            aria-label="Tópicos de funcionalidades"
            className="flex justify-start md:justify-center gap-6 md:gap-8 overflow-x-auto scrollbar-none py-0.5"
          >
            {funcionalidadesData.map((cat) => {
              const active = activeId === cat.id;
              return (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className={`shrink-0 whitespace-nowrap py-4 px-2 text-sm md:text-base font-normal transition-colors duration-200 border-b-2 -mb-px focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                    active
                      ? "border-primary-500 text-primary-500"
                      : "border-transparent text-secondary-400 hover:text-secondary-600"
                  }`}
                >
                  {cat.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
        {funcionalidadesData.map((category, index) => (
          <FuncionalidadeSection
            key={category.id}
            category={category}
            index={index}
          />
        ))}
      </div>

      <section className="cta w-full bg-primary-500 py-16 md:py-24 overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center gap-6">
            <h2 className="text-pretty leading-tight tracking-tightest text-white font-display max-w-3xl">
              Pronto para transformar a gestão da sua agência?
            </h2>
            <p className="text-lg text-white/80 text-pretty">
              Comece seu teste grátis de 7 dias hoje mesmo ou agende uma
              demonstração ao vivo com nossos especialistas.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
              <Link
                href="/teste-gratis"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark btn-lg px-8 w-full sm:w-auto text-center flex items-center justify-center font-normal"
              >
                Começar teste grátis
              </Link>
              <a
                href={contactsData.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg px-8 bg-white/20 text-white hover:bg-white/30 transition-colors duration-150 w-full sm:w-auto text-center flex items-center justify-center font-normal"
              >
                Agendar demonstração
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
