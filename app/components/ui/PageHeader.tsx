"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface PageHeaderProps {
  title: string;
  description?: string;
  overline?: string;
  isCentered?: boolean;
}

export default function PageHeader({ title, description, overline, isCentered = true }: PageHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.6 } });
    
    tl.fromTo(".animate-el", 
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.12 }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-secondary-50 pt-24 md:pt-32 pb-16 md:pb-20">
      <div className={`mx-auto w-full max-w-4xl px-4 md:px-6 lg:px-8 ${isCentered ? "text-center" : "text-left"}`}>
        {overline && (
          <p className="animate-el opacity-0 text-overline text-primary-500 font-normal tracking-widest uppercase mb-4 text-pretty">
            {overline}
          </p>
        )}
        <h1 className="animate-el opacity-0 text-3xl md:text-5xl lg:text-5xl max-w-4xl mx-auto text-foreground text-pretty tracking-tightest leading-tightest mb-6">
          {title}
        </h1>
        {description && (
          <p className="animate-el opacity-0 text-body-md text-foreground/60 max-w-2xl mx-auto text-pretty">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
