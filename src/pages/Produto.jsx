import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import useSeo from "../hooks/useSeo";
import { PRODUTOS, encontrarProduto, nomeCategoria } from "../data/produtos";
import { SITE } from "../data/site";
import { linkWhatsApp } from "../lib/whatsapp";
import { useFavoritos } from "../context/favoritos";
import ProdutoCard from "../components/ProdutoCard";
import Reveal from "../components/Reveal";
import NaoEncontrado from "./NaoEncontrado";
import {
  IconeCoracao,
  IconeFechar,
  IconePartilhar,
  IconeRegua,
  IconeBrilho,
  IconeSetaDireita,
  IconeSetaEsquerda,
  IconeVisto,
  IconeWhatsApp,
} from "../components/Icones";

function Ampliacao({ produto, aoFechar }) {
  useEffect(() => {
    const aoTeclar = (e) => e.key === "Escape" && aoFechar();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", aoTeclar);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", aoTeclar);
    };
  }, [aoFechar]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Imagem ampliada: ${produto.nome}`}
      className="fixed inset-0 z-50 grid place-items-center bg-cacau/95 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={aoFechar}
    >
      <button
        type="button"
        autoFocus
        aria-label="Fechar"
        className="absolute top-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-creme/10 text-creme hover:bg-creme/20"
        onClick={aoFechar}
      >
        <IconeFechar className="h-6 w-6" />
      </button>
      <motion.img
        src={produto.img}
        alt={produto.nome}
        className="max-h-[90svh] max-w-full rounded-xl object-contain"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        onClick={(e) => e.stopPropagation()}
      />
    </motion.div>
  );
}

function BotaoPartilhar({ produto }) {
  const [copiado, setCopiado] = useState(false);

  const partilhar = async () => {
    const url = `${window.location.origin}/colecao/${produto.id}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `${produto.nome} — ${SITE.nome}`, url });
      } catch {
        /* partilha cancelada */
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      window.prompt("Copie o link:", url);
    }
  };

  return (
    <button type="button" onClick={partilhar} className="btn-secundario">
      {copiado ? <IconeVisto className="h-5 w-5" /> : <IconePartilhar className="h-5 w-5" />}
      {copiado ? "Link copiado" : "Partilhar"}
    </button>
  );
}

export default function Produto() {
  const { id } = useParams();
  const produto = encontrarProduto(id);
  const [ampliado, setAmpliado] = useState(false);
  const { eFavorito, alternar } = useFavoritos();

  useSeo({
    titulo: produto?.nome ?? "Peça não encontrada",
    descricao: produto?.descricao,
    imagem: produto?.img,
  });

  if (!produto) return <NaoEncontrado />;

  const indice = PRODUTOS.indexOf(produto);
  const anterior = PRODUTOS[(indice - 1 + PRODUTOS.length) % PRODUTOS.length];
  const seguinte = PRODUTOS[(indice + 1) % PRODUTOS.length];
  const relacionados = PRODUTOS.filter((p) => p.categoria === produto.categoria && p.id !== produto.id).slice(0, 4);
  const maisPecas =
    relacionados.length >= 4
      ? relacionados
      : [...relacionados, ...PRODUTOS.filter((p) => p.destaque && p.id !== produto.id && !relacionados.includes(p))].slice(0, 4);
  const favorito = eFavorito(produto.id);
  const mensagem = `Olá Kinotxema! Tenho interesse nesta peça: "${produto.nome}".\n${SITE.url}/colecao/${produto.id}\n\nPodem dar-me mais informações (tamanhos, preço, disponibilidade)?`;

  return (
    <>
      <div className="container-site py-8 sm:py-12">
        <nav aria-label="Localização" className="mb-8 text-sm text-cacau-suave">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-terracota">Início</Link></li>
            <li aria-hidden>/</li>
            <li><Link to="/colecao" className="hover:text-terracota">Coleção</Link></li>
            <li aria-hidden>/</li>
            <li>
              <Link to={`/colecao?categoria=${produto.categoria}`} className="hover:text-terracota">
                {nomeCategoria(produto.categoria)}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-cacau">{produto.nome}</li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.button
            key={produto.id}
            type="button"
            onClick={() => setAmpliado(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="group relative block cursor-zoom-in overflow-hidden rounded-3xl bg-areia"
            aria-label="Ampliar imagem"
          >
            <img src={produto.img} alt={produto.nome} className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
            <span className="absolute right-4 bottom-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium shadow">
              Clique para ampliar
            </span>
          </motion.button>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">{nomeCategoria(produto.categoria)}</p>
            <h1 className="mt-3 text-4xl leading-tight font-semibold sm:text-5xl">{produto.nome}</h1>
            <p className="mt-6 text-lg leading-relaxed text-cacau-suave">{produto.descricao}</p>

            <ul className="mt-8 space-y-4 border-y border-cacau/10 py-6 text-sm">
              <li className="flex gap-3">
                <IconeBrilho className="h-5 w-5 shrink-0 text-terracota" />
                <span><strong>Peça única</strong> em tecido africano, feita com cuidado artesanal.</span>
              </li>
              <li className="flex gap-3">
                <IconeRegua className="h-5 w-5 shrink-0 text-terracota" />
                <span><strong>Também à medida</strong> — podemos fazer este modelo no seu tamanho.</span>
              </li>
              <li className="flex gap-3">
                <IconeWhatsApp className="h-5 w-5 shrink-0 text-terracota" />
                <span><strong>Preço e disponibilidade</strong> — pergunte-nos pelo WhatsApp ou na loja.</span>
              </li>
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={linkWhatsApp(mensagem)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp px-7 py-3.5 text-base">
                <IconeWhatsApp className="h-5 w-5" /> Pedir informações
              </a>
              <Link to={`/encomenda?peca=${produto.id}`} className="btn-primario px-7 py-3.5 text-base">
                Encomendar à medida
              </Link>
            </div>
            <div className="mt-3 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => alternar(produto.id)}
                aria-pressed={favorito}
                className={`btn-secundario ${favorito ? "border-terracota text-terracota" : ""}`}
              >
                <IconeCoracao cheio={favorito} className="h-5 w-5" />
                {favorito ? "Nos favoritos" : "Guardar"}
              </button>
              <BotaoPartilhar produto={produto} />
            </div>

            <div className="mt-10 flex justify-between gap-4 text-sm">
              <Link to={`/colecao/${anterior.id}`} className="flex items-center gap-2 text-cacau-suave hover:text-terracota">
                <IconeSetaEsquerda className="h-4 w-4" /> Anterior
              </Link>
              <Link to={`/colecao/${seguinte.id}`} className="flex items-center gap-2 text-cacau-suave hover:text-terracota">
                Seguinte <IconeSetaDireita className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-areia/60 py-20">
        <div className="container-site">
          <h2 className="text-3xl font-semibold">Também pode gostar</h2>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {maisPecas.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.06}>
                <ProdutoCard produto={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {ampliado && <Ampliacao produto={produto} aoFechar={() => setAmpliado(false)} />}
      </AnimatePresence>
    </>
  );
}
