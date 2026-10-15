import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import useSeo from "../hooks/useSeo";
import { FAQ, MEDIDAS, PASSOS_ENCOMENDA, SERVICOS } from "../data/conteudo";
import CabecalhoPagina from "../components/CabecalhoPagina";
import Reveal from "../components/Reveal";
import Titulo from "../components/Titulo";
import { linkWhatsApp } from "../lib/whatsapp";
import { IconeBrilho, IconeMais, IconeRegua, IconeSaco, IconeTesoura, IconeVisto, IconeWhatsApp } from "../components/Icones";

const ICONES = { "sob-medida": IconeTesoura, produtos: IconeSaco, personalizacao: IconeBrilho };

function Pergunta({ pergunta, resposta }) {
  const [aberta, setAberta] = useState(false);
  const id = useId();
  return (
    <div className="border-b border-cacau/10">
      <h3 className="font-sans">
        <button
          type="button"
          aria-expanded={aberta}
          aria-controls={id}
          onClick={() => setAberta(!aberta)}
          className="flex w-full items-center justify-between gap-6 py-5 text-left text-base font-medium transition hover:text-terracota sm:text-lg"
        >
          {pergunta}
          <IconeMais className={`h-5 w-5 shrink-0 transition-transform duration-300 ${aberta ? "rotate-45 text-terracota" : ""}`} />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {aberta && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 leading-relaxed text-cacau-suave">{resposta}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Servicos() {
  useSeo({
    titulo: "Serviços",
    descricao:
      "Peças sob medida, acessórios em capulana e personalização de roupa. Conheça os serviços da Kinotxema em Setúbal.",
  });

  return (
    <>
      <CabecalhoPagina
        eyebrow="Serviços"
        titulo="Feito para si, com tecidos que contam histórias"
        texto="Da peça sob medida ao pequeno detalhe em capulana, acompanhamos cada pedido do início ao fim."
        migalhas={[{ label: "Serviços" }]}
      />

      <section className="container-site py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {SERVICOS.map((s, i) => {
            const Icone = ICONES[s.id];
            return (
              <Reveal key={s.id} delay={i * 0.08} className="flex flex-col rounded-3xl bg-white p-8 shadow-sm ring-1 ring-cacau/5">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-terracota/10 text-terracota">
                  <Icone className="h-7 w-7" />
                </span>
                <h2 className="mt-6 text-2xl font-semibold">{s.titulo}</h2>
                <p className="mt-3 leading-relaxed text-cacau-suave">{s.texto}</p>
                <ul className="mt-6 space-y-2 text-sm">
                  {s.itens.map((item) => (
                    <li key={item} className="flex gap-2">
                      <IconeVisto className="h-5 w-5 shrink-0 text-folha" /> {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="bg-cacau py-20 text-creme">
        <div className="container-site">
          <Titulo
            eyebrow="Como funciona"
            titulo={<span className="text-creme">Encomendas sob medida</span>}
          />
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PASSOS_ENCOMENDA.map((p, i) => (
              <Reveal as="li" key={p.titulo} delay={i * 0.08} className="relative border-t border-creme/20 pt-6">
                <span className="font-display text-4xl text-ocre">{i + 1}</span>
                <h3 className="mt-3 text-xl">{p.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-creme/70">{p.texto}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="medidas" className="container-site grid gap-12 py-20 lg:grid-cols-2 lg:gap-20">
        <div>
          <Titulo
            eyebrow="Guia de medidas"
            titulo="Como tirar as suas medidas"
            texto="Vai encomendar à distância? Use uma fita métrica flexível, por cima de roupa leve, e peça ajuda a alguém se puder."
          />
          <Reveal delay={0.1}>
            <Link to="/encomenda" className="btn-primario mt-8">
              <IconeRegua className="h-5 w-5" /> Enviar as minhas medidas
            </Link>
          </Reveal>
        </div>
        <Reveal as="dl" delay={0.1} className="grid gap-4 sm:grid-cols-2">
          {MEDIDAS.map((m, i) => (
            <div key={m.nome} className="rounded-2xl bg-areia/70 p-6">
              <dt className="flex items-center gap-3 font-display text-xl">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-terracota text-sm font-sans text-white">{i + 1}</span>
                {m.nome}
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-cacau-suave">{m.dica}</dd>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="bg-areia/60 py-20">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <div>
            <Titulo eyebrow="Perguntas frequentes" titulo="Dúvidas?" texto="Se não encontrar aqui a resposta, fale connosco — respondemos com todo o gosto." />
            <Reveal delay={0.1}>
              <a
                href={linkWhatsApp("Olá Kinotxema! Tenho uma dúvida:")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp mt-8"
              >
                <IconeWhatsApp className="h-5 w-5" /> Perguntar no WhatsApp
              </a>
            </Reveal>
          </div>
          <Reveal>
            {FAQ.map((f) => (
              <Pergunta key={f.pergunta} {...f} />
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
