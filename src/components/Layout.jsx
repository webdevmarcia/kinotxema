import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import { linkWhatsApp } from "../lib/whatsapp";
import { IconeSetaCima, IconeWhatsApp } from "./Icones";

function BotoesFlutuantes() {
  const [mostrarTopo, setMostrarTopo] = useState(false);

  useEffect(() => {
    const aoRolar = () => setMostrarTopo(window.scrollY > 700);
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <div className="fixed right-4 bottom-4 z-30 flex flex-col items-center gap-3 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {mostrarTopo && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Voltar ao topo"
            className="grid h-11 w-11 place-items-center rounded-full bg-white text-cacau shadow-lg ring-1 ring-cacau/10 transition hover:bg-creme"
          >
            <IconeSetaCima className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
      <a
        href={linkWhatsApp("Olá Kinotxema! Gostaria de saber mais sobre as vossas peças.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar connosco no WhatsApp"
        className="grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-xl shadow-whatsapp/30 transition hover:scale-105"
      >
        <IconeWhatsApp className="h-7 w-7" />
      </a>
    </div>
  );
}

export default function Layout() {
  const { pathname } = useLocation();

  // Cada nova página começa no topo.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <main id="conteudo">
        <Outlet />
      </main>
      <Footer />
      <BotoesFlutuantes />
    </>
  );
}
