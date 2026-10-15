import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import useSeo from "../hooks/useSeo";
import { SITE } from "../data/site";
import { CATEGORIAS, PRODUTOS } from "../data/produtos";
import Reveal from "../components/Reveal";
import Titulo from "../components/Titulo";
import ProdutoCard from "../components/ProdutoCard";
import EstadoLoja from "../components/EstadoLoja";
import { PASSOS_ENCOMENDA } from "../data/conteudo";
import { IconeLocal, IconeSetaDireita, IconeWhatsApp } from "../components/Icones";
import { linkWhatsApp } from "../lib/whatsapp";

function Hero() {
  const reduzir = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, reduzir ? 0 : 160]);

  return (
    <section className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 -z-20 scale-110">
        <img src="/fundo.webp" alt="" fetchPriority="high" className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cacau/90 via-cacau/70 to-cacau/30" />

      <div className="container-site py-24">
        <motion.div
          className="max-w-2xl text-creme"
          initial={reduzir ? false : "oculto"}
          animate="visivel"
          variants={{ visivel: { transition: { staggerChildren: 0.15 } } }}
        >
          {[
            <p key="e" className="eyebrow text-ocre">Moda africana · Setúbal</p>,
            <h1 key="h" className="mt-4 text-5xl leading-[1.05] font-semibold sm:text-6xl lg:text-7xl">
              Coisa linda, <em className="font-normal text-ocre">feita em capulana.</em>
            </h1>,
            <p key="p" className="mt-6 max-w-xl text-lg leading-relaxed text-creme/85">
              Peças únicas com tecidos africanos cheios de cultura e identidade — vestidos, saias, camisas e
              acessórios, ou a peça dos seus sonhos feita à sua medida.
            </p>,
            <div key="b" className="mt-10 flex flex-wrap gap-4">
              <Link to="/colecao" className="btn-claro px-8 py-4 text-base">
                Ver coleção <IconeSetaDireita className="h-5 w-5" />
              </Link>
              <Link
                to="/encomenda"
                className="btn-primario border border-creme/30 bg-transparent px-8 py-4 text-base hover:border-terracota"
              >
                Peça sob medida
              </Link>
            </div>,
            <EstadoLoja key="s" className="mt-10 text-creme/85" />,
          ].map((el) => (
            <motion.div
              key={el.key}
              variants={{ oculto: { opacity: 0, y: 24 }, visivel: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
            >
              {el}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Faixa() {
  const itens = ["Peças únicas", "Feito à mão", "Sob medida", "Tecidos africanos", "Capulana", "Setúbal"];
  const linha = [...itens, ...itens];
  return (
    <div className="overflow-hidden border-y border-cacau/10 bg-areia py-4" aria-hidden>
      <div className="flex w-max animate-[deslizar_40s_linear_infinite] gap-10 font-display text-xl italic">
        {[...linha, ...linha].map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            {t} <span className="text-terracota not-italic">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Categorias() {
  return (
    <section className="container-site py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Titulo eyebrow="Explorar" titulo="Encontre a sua peça" />
        <Link to="/colecao" className="btn-secundario">
          Toda a coleção <IconeSetaDireita className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
        {CATEGORIAS.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.06}>
            <Link
              to={`/colecao?categoria=${c.id}`}
              className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-areia sm:aspect-[4/3]"
            >
              <img
                src={c.capa}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cacau/80 via-cacau/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-creme sm:p-6">
                <div>
                  <h3 className="text-xl font-semibold sm:text-2xl">{c.nome}</h3>
                  <p className="text-sm text-creme/80">
                    {PRODUTOS.filter((p) => p.categoria === c.id).length} peças
                  </p>
                </div>
                <span className="hidden h-10 w-10 place-items-center rounded-full bg-creme text-cacau transition group-hover:bg-terracota group-hover:text-white sm:grid">
                  <IconeSetaDireita className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Destaques() {
  const destaques = PRODUTOS.filter((p) => p.destaque);
  return (
    <section className="bg-areia/60 py-24">
      <div className="container-site">
        <Titulo
          eyebrow="Destaques"
          titulo="Peças que contam histórias"
          texto="Cada peça é única: o padrão do tecido, o corte e os acabamentos fazem dela uma coisa linda e irrepetível."
        />
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3">
          {destaques.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.08}>
              <ProdutoCard produto={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SobreResumo() {
  return (
    <section className="container-site grid items-center gap-12 py-24 lg:grid-cols-2 lg:gap-20">
      <Reveal className="relative">
        <img
          src="/fundo2.webp"
          alt="Peças em tecidos africanos penduradas"
          loading="lazy"
          className="aspect-[4/5] w-full rounded-3xl object-cover shadow-2xl shadow-cacau/20"
        />
        <img
          src="/logotipo.webp"
          alt=""
          loading="lazy"
          className="absolute -right-4 -bottom-8 w-36 rounded-full bg-creme p-3 shadow-xl sm:-right-8 sm:w-44"
        />
      </Reveal>
      <div>
        <Titulo eyebrow="A nossa história" titulo={<>Kinotxema significa <em className="text-terracota">“coisa linda”</em></>} />
        <Reveal as="blockquote" delay={0.1} className="mt-8 border-l-4 border-ocre pl-6">
          <p className="font-display text-xl leading-relaxed italic sm:text-2xl">
            “Como nativa, o meu interesse é criar e inovar uma das coisas mais lindas e maravilhosas da cultura
            africana. Simplesmente, adoro a moda no traje de capulana.”
          </p>
          <footer className="mt-4 text-sm font-semibold tracking-wide text-cacau-suave uppercase">
            — {SITE.fundadora}, fundadora
          </footer>
        </Reveal>
        <Reveal delay={0.2}>
          <Link to="/sobre" className="btn-secundario mt-10">
            Conhecer a Kinotxema <IconeSetaDireita className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function ComoFunciona() {
  return (
    <section className="bg-cacau py-24 text-creme">
      <div className="container-site">
        <Titulo
          eyebrow="Sob medida"
          titulo={<span className="text-creme">Da ideia à sua peça, em 4 passos</span>}
          texto={<span className="text-creme/75">Escolha o modelo e o tecido — nós cuidamos do resto.</span>}
        />
        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PASSOS_ENCOMENDA.map((passo, i) => (
            <Reveal as="li" key={passo.titulo} delay={i * 0.08} className="rounded-2xl border border-creme/10 bg-creme/5 p-6">
              <span className="font-display text-5xl text-ocre">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-xl">{passo.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-creme/70">{passo.texto}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mt-12">
          <Link to="/encomenda" className="btn-claro px-8 py-4 text-base">
            Começar a minha encomenda <IconeSetaDireita className="h-5 w-5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function Visita() {
  return (
    <section className="container-site py-24">
      <Reveal className="grid overflow-hidden rounded-3xl bg-terracota text-creme lg:grid-cols-[1.2fr_1fr]">
        <div className="p-8 sm:p-12 lg:p-16">
          <p className="eyebrow text-ocre">Visite a loja</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Venha ver, tocar e experimentar.</h2>
          <p className="mt-4 max-w-md leading-relaxed text-creme/85">
            Tem muitas mais peças à sua espera na loja: tecidos para escolher, acessórios e cestaria artesanal.
          </p>
          <p className="mt-6 flex items-start gap-3">
            <IconeLocal className="mt-0.5 h-5 w-5 shrink-0" />
            {SITE.morada.linha1}, {SITE.morada.cidade}
          </p>
          <EstadoLoja className="mt-3" />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contactos" className="btn-claro">
              Horário e mapa
            </Link>
            <a
              href={linkWhatsApp("Olá Kinotxema! Gostaria de visitar a loja.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <IconeWhatsApp className="h-5 w-5" /> WhatsApp
            </a>
          </div>
        </div>
        <div className="relative h-72 lg:h-auto">
          <img
            src="/produtos/produto3.webp"
            alt="Interior da loja Kinotxema"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </Reveal>
    </section>
  );
}

export default function Inicio() {
  useSeo({});
  return (
    <>
      <Hero />
      <Faixa />
      <Categorias />
      <Destaques />
      <SobreResumo />
      <ComoFunciona />
      <Visita />
    </>
  );
}
