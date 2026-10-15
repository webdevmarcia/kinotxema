import { useState } from "react";
import useSeo from "../hooks/useSeo";
import { HORARIO, SITE } from "../data/site";
import { agoraEmLisboa } from "../lib/horario";
import { linkWhatsApp } from "../lib/whatsapp";
import CabecalhoPagina from "../components/CabecalhoPagina";
import EstadoLoja from "../components/EstadoLoja";
import Reveal from "../components/Reveal";
import { IconeInstagram, IconeLocal, IconeRelogio, IconeTelefone, IconeWhatsApp } from "../components/Icones";

const mapsPesquisa = encodeURIComponent(SITE.mapsQuery);

// O mapa só é carregado depois de o visitante aceitar (evita enviar dados à Google sem consentimento).
function Mapa() {
  const [carregar, setCarregar] = useState(false);
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-areia lg:aspect-auto lg:h-full lg:min-h-[28rem]">
      {carregar ? (
        <iframe
          title={`Mapa: ${SITE.morada.linha1}`}
          src={`https://www.google.com/maps?q=${mapsPesquisa}&output=embed`}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center p-8 text-center">
          <div>
            <IconeLocal className="mx-auto h-10 w-10 text-terracota" />
            <p className="mt-4 font-display text-2xl">{SITE.morada.linha1}</p>
            <p className="text-cacau-suave">{SITE.morada.cidade}</p>
            <button type="button" onClick={() => setCarregar(true)} className="btn-primario mt-6">
              Mostrar mapa
            </button>
            <p className="mx-auto mt-3 max-w-xs text-xs text-cacau-suave">
              O mapa é fornecido pelo Google Maps e só é carregado se clicar.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function MensagemRapida() {
  const [texto, setTexto] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        window.open(linkWhatsApp(texto.trim() || "Olá Kinotxema!"), "_blank", "noopener,noreferrer");
      }}
      className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-cacau/5 sm:p-8"
    >
      <h2 className="text-2xl font-semibold">Envie-nos uma mensagem</h2>
      <label className="mt-4 block">
        <span className="sr-only">Mensagem</span>
        <textarea
          rows={4}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          className="campo resize-y"
          placeholder="Olá! Queria saber…"
        />
      </label>
      <button type="submit" className="btn-whatsapp mt-4 w-full sm:w-auto">
        <IconeWhatsApp className="h-5 w-5" /> Enviar pelo WhatsApp
      </button>
    </form>
  );
}

export default function Contactos() {
  useSeo({
    titulo: "Contactos e horário",
    descricao: `Visite a Kinotxema no ${SITE.morada.linha1}, ${SITE.morada.cidade}. Horário, mapa, WhatsApp e Instagram.`,
  });
  const hoje = agoraEmLisboa().dia;

  return (
    <>
      <CabecalhoPagina
        eyebrow="Contactos"
        titulo="Venha visitar-nos"
        texto="Estamos em Setúbal, de portas abertas para lhe mostrar tecidos, peças e ideias."
        migalhas={[{ label: "Contactos" }]}
      />

      <section className="container-site grid gap-8 py-16 lg:grid-cols-2">
        <div className="space-y-8">
          <Reveal className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-cacau/5 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="flex items-center gap-3 text-2xl font-semibold">
                <IconeRelogio className="h-6 w-6 text-terracota" /> Horário
              </h2>
              <EstadoLoja />
            </div>
            <dl className="mt-6 divide-y divide-cacau/10">
              {HORARIO.map((h) => {
                const ehHoje = h.dias.includes(hoje);
                return (
                  <div key={h.rotulo} className={`flex justify-between gap-4 py-3 ${ehHoje ? "font-semibold text-terracota" : ""}`}>
                    <dt>
                      {h.rotulo}
                      {ehHoje && <span className="ml-2 rounded-full bg-terracota/10 px-2 py-0.5 text-xs">hoje</span>}
                    </dt>
                    <dd>{h.abre ? `${h.abre} – ${h.fecha}` : "Encerrado"}</dd>
                  </div>
                );
              })}
            </dl>
          </Reveal>

          <Reveal delay={0.05} className="grid gap-4 sm:grid-cols-2">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${mapsPesquisa}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-3xl bg-white p-6 shadow-sm ring-1 ring-cacau/5 transition hover:ring-terracota/40"
            >
              <IconeLocal className="h-7 w-7 text-terracota" />
              <p className="mt-4 font-semibold">Morada</p>
              <p className="text-sm text-cacau-suave">{SITE.morada.linha1}, {SITE.morada.cidade}</p>
              <p className="mt-3 text-sm font-medium text-terracota group-hover:underline">Obter direções →</p>
            </a>
            <a
              href={`tel:${SITE.telefone.replace(/\s/g, "")}`}
              className="group rounded-3xl bg-white p-6 shadow-sm ring-1 ring-cacau/5 transition hover:ring-terracota/40"
            >
              <IconeTelefone className="h-7 w-7 text-terracota" />
              <p className="mt-4 font-semibold">Telefone</p>
              <p className="text-sm text-cacau-suave">{SITE.telefone}</p>
              <p className="mt-3 text-sm font-medium text-terracota group-hover:underline">Ligar →</p>
            </a>
            <a
              href={linkWhatsApp()}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-3xl bg-whatsapp p-6 text-white shadow-sm transition hover:brightness-110"
            >
              <IconeWhatsApp className="h-7 w-7" />
              <p className="mt-4 font-semibold">WhatsApp</p>
              <p className="text-sm text-white/85">Resposta rápida a dúvidas e encomendas</p>
            </a>
            <a
              href={`https://instagram.com/${SITE.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-3xl bg-gradient-to-br from-terracota to-ocre p-6 text-white shadow-sm transition hover:brightness-110"
            >
              <IconeInstagram className="h-7 w-7" />
              <p className="mt-4 font-semibold">Instagram</p>
              <p className="text-sm text-white/85">@{SITE.instagram} — novidades e bastidores</p>
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <MensagemRapida />
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <Mapa />
        </Reveal>
      </section>
    </>
  );
}
