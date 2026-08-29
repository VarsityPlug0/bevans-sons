import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us & Get a Free Quote | Bevans Sons",
  description: "Get a free solar or electronics quote from Bevans Sons Contact us via WhatsApp, email or our online form. We respond fast — nationwide South Africa.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
