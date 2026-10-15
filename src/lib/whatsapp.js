import { SITE } from "../data/site";

export function linkWhatsApp(mensagem = "") {
  const base = `https://wa.me/${SITE.whatsapp}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}
