"use client";

import React from "react";
import contactsData from "../../config/contacts.json";

import { WhatsappLogoIcon } from "@phosphor-icons/react";

export default function WhatsAppButton() {
  return (
    <a
      href={contactsData.whatsappLink || "https://wa.me/"}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar conosco no WhatsApp"
      className="fixed bottom-6 right-6 z-[999] flex items-center justify-center w-14 h-14 bg-whatsapp hover:bg-whatsapp-hover text-white rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-whatsapp focus:ring-offset-2"
    >
      <WhatsappLogoIcon className="w-8 h-8" />
    </a>
  );
}
