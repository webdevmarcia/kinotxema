import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { NAV, SITE } from "../data/site";
import { useFavoritos } from "../context/favoritos";
import { IconeCoracao, IconeFechar, IconeMenu } from "./Icones";

function Logotipo() {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label={`${SITE.nome} — página inicial`}>
      <img src="/logotipo.webp" alt="" className="h-12 w-12 object-contain sm:h-14 sm:w-14" />
      <span className="font-script text-3xl leading-none text-cacau sm:text-4xl">{SITE.nome}</span>
    </Link>
  );
}

function BotaoFavoritos() {
  const { ids } = useFavoritos();
  return (
    <Link
      to="/favoritos"
      className="relative grid h-11 w-11 place-items-center rounded-full text-cacau transition hover:bg-cacau/5"
      aria-label={`Favoritos (${ids.length})`}
    >
      <IconeCoracao className="h-6 w-6" cheio={ids.length > 0} />
      {ids.length > 0 && (
        <span className="absolute top-1 right-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-terracota px-1 text-[11px] font-semibold text-white">
          {ids.length}
        </span>
      )}
    </Link>
  );
}

const linkClasse = ({ isActive }) =>
  `relative py-2 text-sm font-medium transition hover:text-terracota ${
    isActive ? "text-terracota after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded after:bg-terracota" : "text-cacau"
  }`;

export default function Header() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const { pathname } = useLocation();

  // Fecha o menu ao mudar de página.
  const [ultimoPath, setUltimoPath] = useState(pathname);
  if (pathname !== ultimoPath) {
    setUltimoPath(pathname);
    setAberto(false);
  }

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 8);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // Bloqueia o scroll da página e permite fechar com Escape enquanto o menu está aberto.
  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (e) => e.key === "Escape" && setAberto(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", aoTeclar);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", aoTeclar);
    };
  }, [aberto]);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-all duration-300 ${
        rolou ? "border-cacau/10 bg-creme/90 shadow-sm backdrop-blur-lg" : "border-transparent bg-creme"
      }`}
    >
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:rounded-lg focus:bg-cacau focus:px-4 focus:py-2 focus:text-creme"
      >
        Saltar para o conteúdo
      </a>

      <div className="container-site flex h-18 items-center justify-between gap-4 sm:h-20">
        <Logotipo />

        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/"} className={linkClasse}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <BotaoFavoritos />
          <Link to="/encomenda" className="btn-primario hidden sm:inline-flex">
            Fazer encomenda
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full text-cacau transition hover:bg-cacau/5 lg:hidden"
            aria-label="Abrir menu"
            aria-expanded={aberto}
            aria-controls="menu-movel"
            onClick={() => setAberto(true)}
          >
            <IconeMenu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {aberto && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-cacau/50 backdrop-blur-sm" onClick={() => setAberto(false)} />
            <motion.div
              id="menu-movel"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="absolute top-0 right-0 flex h-full w-[min(20rem,85vw)] flex-col bg-creme shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="faixa-capulana" />
              <div className="flex items-center justify-between p-5">
                <span className="font-script text-3xl">{SITE.nome}</span>
                <button
                  type="button"
                  aria-label="Fechar menu"
                  className="grid h-11 w-11 place-items-center rounded-full hover:bg-cacau/5"
                  onClick={() => setAberto(false)}
                >
                  <IconeFechar className="h-6 w-6" />
                </button>
              </div>
              <nav aria-label="Menu móvel" className="flex flex-col px-5">
                {[...NAV, { to: "/favoritos", label: "Favoritos" }].map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      `border-b border-cacau/10 py-4 font-display text-2xl transition ${
                        isActive ? "text-terracota" : "text-cacau hover:text-terracota"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
              <div className="mt-auto p-5">
                <Link to="/encomenda" className="btn-primario w-full">
                  Fazer encomenda
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
