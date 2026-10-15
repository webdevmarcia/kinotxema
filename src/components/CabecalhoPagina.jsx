import { Link } from "react-router-dom";
import Reveal from "./Reveal";

export default function CabecalhoPagina({ eyebrow, titulo, texto, migalhas = [], children }) {
  return (
    <section className="relative overflow-hidden bg-areia/70">
      <img
        src="/logotipo.webp"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-16 w-72 opacity-10 sm:w-96"
      />
      <div className="container-site relative py-14 sm:py-20">
        {migalhas.length > 0 && (
          <nav aria-label="Localização" className="mb-6 text-sm text-cacau-suave">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/" className="hover:text-terracota">Início</Link>
              </li>
              {migalhas.map((m) => (
                <li key={m.label} className="flex items-center gap-2">
                  <span aria-hidden>/</span>
                  {m.to ? (
                    <Link to={m.to} className="hover:text-terracota">{m.label}</Link>
                  ) : (
                    <span aria-current="page" className="text-cacau">{m.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <Reveal className="max-w-3xl">
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h1 className="text-4xl leading-tight font-semibold sm:text-5xl md:text-6xl">{titulo}</h1>
          {texto && <p className="mt-5 text-lg leading-relaxed text-cacau-suave">{texto}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
