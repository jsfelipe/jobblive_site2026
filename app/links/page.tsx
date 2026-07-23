import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getMetadataForPath } from "../lib/seo";
import contactsData from "../config/contacts.json";
import themeData from "../config/theme.json";

// Consome os metadados dinâmicos para a rota "/links" vindos do seo.json
export const metadata = getMetadataForPath("/links");

// Ícones SVG do Phosphor Icons
const WhatsappIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-5 h-5 fill-current">
    <path d="m187.58 144.84l-32-16a8 8 0 0 0-8 .5l-14.69 9.8a40.55 40.55 0 0 1-16-16l9.8-14.69a8 8 0 0 0 .5-8l-16-32A8 8 0 0 0 104 64a40 40 0 0 0-40 40a88.1 88.1 0 0 0 88 88a40 40 0 0 0 40-40a8 8 0 0 0-4.42-7.16M152 176a72.08 72.08 0 0 1-72-72a24 24 0 0 1 19.29-23.54l11.48 23L101 118a8 8 0 0 0-.73 7.51a56.47 56.47 0 0 0 30.15 30.15A8 8 0 0 0 138 155l14.62-9.74l23 11.48A24 24 0 0 1 152 176M128 24a104 104 0 0 0-91.82 152.88l-11.35 34.05a16 16 0 0 0 20.24 20.24l34.05-11.35A104 104 0 1 0 128 24m0 192a87.87 87.87 0 0 1-44.06-11.81a8 8 0 0 0-6.54-.67L40 216l12.47-37.4a8 8 0 0 0-.66-6.54A88 88 0 1 1 128 216" />
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-5 h-5 fill-current">
    <path d="M176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm60-84a12,12,0,1,1-12-12A12,12,0,0,1,188,76Z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-5 h-5 fill-current">
    <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v80a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm-8-32a12,12,0,1,1,12-12A12,12,0,0,1,88,80Zm96,32v80a8,8,0,0,1-16,0V148c0-11-4.18-20-16-20s-16,9-16,20v44a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0v8c6.64-7.2,14.65-12,24-12C172.5,108,184,120.47,184,144Z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-5 h-5 fill-current">
    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,168a8,8,0,0,1-16,0V144H104a8,8,0,0,1,0-16h16V108c0-15.42,9.75-28,28-28a68.64,68.64,0,0,1,16,2,8,8,0,0,1,6,9.8,8.13,8.13,0,0,1-9.8,6,52,52,0,0,0-12.2-.8c-8.8,0-12,5.2-12,12v21h24a8,8,0,0,1,7.52,10.72L154,128H136Z"/>
  </svg>
);

const TiktokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-5 h-5 fill-current">
    <path d="M224,96a48.05,48.05,0,0,1-40-40,8,8,0,0,0-8-8H136a8,8,0,0,0-8,8V160a24,24,0,1,1-32-22.63V104a8,8,0,0,0-8-8H80a8,8,0,0,0-8,8,56,56,0,1,0,72,53.76V97.3A63.92,63.92,0,0,0,208,120v16a8,8,0,0,0,8,8h8a8,8,0,0,0,8-8V104A8,8,0,0,0,224,96Z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-5 h-5 fill-current">
    <path d="M234.44,69.53a24,24,0,0,0-16.88-16.89C198.39,48,128,48,128,48S57.61,48,38.44,52.64A24,24,0,0,0,21.56,69.53C16.9,88.7,16.9,128,16.9,128s0,39.3,4.66,58.47a24,24,0,0,0,16.88,16.89C57.61,208,128,208,128,208s70.39,0,89.56-4.64a24,24,0,0,0,16.88-16.89c4.66-19.17,4.66-58.47,4.66-58.47S239.1,88.7,234.44,69.53ZM99.9,156V100l48.1,28Z"/>
  </svg>
);

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-5 h-5 fill-current">
    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm56-88c0,21.84-24.87,40-56,40s-56-18.16-56-40,24.87-40,56-40S184,106.16,184,128Zm-56-24c-19,0-35,10.22-39.2,24C92.8,141.78,109,152,128,152s35.2-10.22,39.2-24C163,114.22,147,104,128,104Z"/>
  </svg>
);

const EnvelopeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-5 h-5 fill-current">
    <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,116.4,52.57,64ZM216,192H40V80.57l83.13,57.15a8,8,0,0,0,9.74,0L216,80.57V192Z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-5 h-5 fill-current">
    <path d="M222.37,158.46l-47.11-21.11a16,16,0,0,0-15.17,1.4L143.52,151a111.4,111.4,0,0,1-38.52-38.52l12.31-16.43a16,16,0,0,0,1.34-15.3L97.48,33.52A16,16,0,0,0,79.54,24H48A16,16,0,0,0,32,40c0,105.88,86.12,192,192,192a16,16,0,0,0,16-16V176.46A16,16,0,0,0,222.37,158.46ZM224,176.46V216c-97.05,0-176-78.95-176-176H79.54l21.11,47.11-12.43,16.57a8,8,0,0,0-.7,8.78,127.35,127.35,0,0,0,56,56,8,8,0,0,0,8.78-.7l16.63-12.47L224,176.46Z"/>
  </svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-5 h-5 fill-current">
    <path d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,201.37C110.15,188,56,138.83,56,104a72,72,0,0,1,144,0C200,138.83,145.85,188,128,217.37ZM128,72a32,32,0,1,0,32,32A32,32,0,0,0,128,72Zm0,48a16,16,0,1,1,16-16A16,16,0,0,1,128,120Z"/>
  </svg>
);

export default function LinksPage() {
  const brandName = process.env.NEXT_PUBLIC_PROJECT_NAME || "Jobb";

  // Prepara os links com seus respectivos ícones e rótulos
  const links = [
    {
      id: "whatsapp",
      label: "Falar no WhatsApp",
      url: contactsData.whatsappLink,
      icon: <WhatsappIcon />,
      isPrimary: true,
    },
    {
      id: "website",
      label: "Acessar Site Oficial",
      url: "/",
      icon: <GlobeIcon />,
      isPrimary: false,
    },
    {
      id: "instagram",
      label: "Instagram",
      url: contactsData.instagram,
      icon: <InstagramIcon />,
      isPrimary: false,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      url: contactsData.linkedin,
      icon: <LinkedinIcon />,
      isPrimary: false,
    },
    {
      id: "facebook",
      label: "Facebook",
      url: contactsData.facebook,
      icon: <FacebookIcon />,
      isPrimary: false,
    },
    {
      id: "tiktok",
      label: "TikTok",
      url: contactsData.tiktok,
      icon: <TiktokIcon />,
      isPrimary: false,
    },
    {
      id: "youtube",
      label: "YouTube",
      url: contactsData.youtube,
      icon: <YoutubeIcon />,
      isPrimary: false,
    },
    {
      id: "phone",
      label: `Ligar para ${contactsData.phone}`,
      url: `tel:${contactsData.whatsapp}`,
      icon: <PhoneIcon />,
      isPrimary: false,
    },
    {
      id: "email",
      label: "Enviar E-mail",
      url: `mailto:${contactsData.email}`,
      icon: <EnvelopeIcon />,
      isPrimary: false,
    },
  ];

  // Filtra apenas os links que possuem URL configurada
  const activeLinks = links.filter((link) => link.url && link.url !== "");

  // Link do Google Maps baseado no endereço
  const mapsUrl = contactsData.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactsData.address)}`
    : null;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-12 px-6 relative overflow-hidden">


      {/* Conteúdo centralizado */}
      <main className="w-full max-w-md flex-1 flex flex-col items-center z-10">
        
        {/* Bloco do Topo: Logotipo e Bio */}
        <header className="text-center mb-8 animate-fade-up">
          {themeData.logoLight ? (
            <div className="flex justify-center mb-4">
              <Image
                src={themeData.logoLight}
                alt={brandName}
                width={160}
                height={64}
                className="h-16 w-auto object-contain"
                priority
              />
            </div>
          ) : (
            <h1 className="font-display text-3xl font-black text-foreground tracking-tighter mb-2">
              {brandName}<span className="text-primary">.</span>
            </h1>
          )}

          <p className="text-body-md text-pretty text-foreground/70 max-w-sm mx-auto mt-2">
            Conecte-se conosco e acesse nossos canais oficiais de comunicação.
          </p>
        </header>

        {/* Lista de Botões/Links (Staggered Animation) */}
        <div className="w-full flex flex-col gap-3">
          {activeLinks.map((link, index) => {
            const delayClass = `delay-${Math.min(index + 1, 5)}`;
            
            if (link.isPrimary) {
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn-primary btn-lg w-full flex items-center justify-center gap-2 animate-fade-up text-center font-normal ${delayClass}`}
                  id={`link-${link.id}`}
                >
                  {link.icon}
                  {link.label}
                </a>
              );
            }

            // Para links internos como "/", usamos a tag Link do Next.js
            const isInternal = link.url.startsWith("/");
            const linkProps = {
              className: `btn-ghost btn-lg w-full flex items-center justify-center gap-2 animate-fade-up text-center font-normal ${delayClass}`,
              id: `link-${link.id}`,
            };

            if (isInternal) {
              return (
                <Link
                  key={link.id}
                  href={link.url}
                  {...linkProps}
                >
                  {link.icon}
                  {link.label}
                </Link>
              );
            }

            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                {...linkProps}
              >
                {link.icon}
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Bloco de Endereço Físico (Puxado do setup) */}
        {contactsData.address && (
          <div
            className="w-full mt-10 p-4 rounded-lg bg-surface border border-base flex flex-col items-center text-center animate-fade-up delay-5"
          >
            <span className="contact-icon mb-2">
              <MapPinIcon />
            </span>
            <span className="text-overline mb-1">Nosso Endereço</span>
            
            {mapsUrl ? (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-sm text-pretty hover:text-primary transition-colors text-center font-normal block max-w-xs"
              >
                {contactsData.address}
              </a>
            ) : (
              <p className="text-body-sm text-pretty text-center max-w-xs">
                {contactsData.address}
              </p>
            )}
          </div>
        )}
      </main>

      {/* Footer Minimalista */}
      <footer
        className="w-full text-center mt-12 py-4 border-t border-foreground/10 text-caption animate-fade-up delay-5"
      >
        <p className="text-caption text-foreground/60 text-pretty">
          &copy; {new Date().getFullYear()} {brandName}. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
