import { Link } from "react-router-dom";
import { HORARIO, NAV, SITE } from "../data/site";
import { linkWhatsApp } from "../lib/whatsapp";
import { IconeInstagram, IconeLocal, IconeTelefone, IconeWhatsApp } from "./Icones";
import EstadoLoja from "./EstadoLoja";

export default function Footer() {
  return (
    <footer className="bg-cacau text-creme/80">
      <div className="faixa-capulana" />
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <img src="/logotipo.webp" alt="" className="h-14 w-14 rounded-full bg-creme object-contain p-1" />
            <span className="font-script text-4xl text-creme">{SITE.nome}</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            “{SITE.slogan}” — peças únicas em tecidos africanos, feitas com cultura e identidade em Setúbal.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={`https://instagram.com/${SITE.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-11 w-11 place-items-center rounded-full bg-creme/10 transition hover:bg-terracota hover:text-white"
            >
              <IconeInstagram className="h-5 w-5" />
            </a>
            <a
              href={linkWhatsApp()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="grid h-11 w-11 place-items-center rounded-full bg-creme/10 transition hover:bg-whatsapp hover:text-white"
            >
              <IconeWhatsApp className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold tracking-widest text-creme uppercase">Navegação</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {[...NAV, { to: "/encomenda", label: "Encomendas" }, { to: "/favoritos", label: "Favoritos" }].map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="transition hover:text-ocre">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold tracking-widest text-creme uppercase">Horário</h2>
          <EstadoLoja className="mt-4 text-creme" />
          <dl className="mt-4 space-y-2 text-sm">
            {HORARIO.map((h) => (
              <div key={h.rotulo} className="flex justify-between gap-4">
                <dt>{h.rotulo}</dt>
                <dd className="text-creme">{h.abre ? `${h.abre} – ${h.fecha}` : "Encerrado"}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold tracking-widest text-creme uppercase">Visite-nos</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-3">
              <IconeLocal className="mt-0.5 h-5 w-5 shrink-0 text-ocre" />
              <span>
                {SITE.morada.linha1}
                <br />
                {SITE.morada.cidade}, {SITE.morada.pais}
              </span>
            </li>
            <li className="flex gap-3">
              <IconeTelefone className="mt-0.5 h-5 w-5 shrink-0 text-ocre" />
              <a href={`tel:${SITE.telefone.replace(/\s/g, "")}`} className="transition hover:text-ocre">
                {SITE.telefone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-creme/10">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 text-xs sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.nome}. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <Link to="/privacidade" className="transition hover:text-ocre">
              Política de privacidade
            </Link>
            <a href="https://www.livroreclamacoes.pt" target="_blank" rel="noopener noreferrer" className="transition hover:text-ocre">
              Livro de reclamações
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
