import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import useSeo from "../hooks/useSeo";
import { nomeCategoria } from "../data/produtos";
import { SITE } from "../data/site";
import { useFavoritos } from "../context/favoritos";
import { linkWhatsApp } from "../lib/whatsapp";
import CabecalhoPagina from "../components/CabecalhoPagina";
import { IconeCoracao, IconeFechar, IconeSetaDireita, IconeWhatsApp } from "../components/Icones";

export default function Favoritos() {
  useSeo({ titulo: "Favoritos", descricao: "As peças Kinotxema que guardou." });
  const { produtos, remover, limpar } = useFavoritos();

  const mensagem = [
    "Olá Kinotxema! Gostei destas peças e gostava de mais informações:",
    "",
    ...produtos.map((p) => `• ${p.nome} — ${SITE.url}/colecao/${p.id}`),
  ].join("\n");

  return (
    <>
      <CabecalhoPagina
        eyebrow="A sua seleção"
        titulo="Favoritos"
        texto="As peças que guardou ficam neste dispositivo. Envie-nos a lista de uma só vez para saber preços e disponibilidade."
        migalhas={[{ label: "Favoritos" }]}
      />

      <section className="container-site py-16">
        {produtos.length === 0 ? (
          <div className="mx-auto max-w-lg rounded-3xl border border-dashed border-cacau/20 p-12 text-center">
            <IconeCoracao className="mx-auto h-12 w-12 text-terracota" />
            <p className="mt-4 font-display text-2xl">Ainda não guardou nenhuma peça</p>
            <p className="mt-2 text-cacau-suave">Toque no coração de uma peça da coleção para a guardar aqui.</p>
            <Link to="/colecao" className="btn-primario mt-6">
              Explorar a coleção <IconeSetaDireita className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
            <ul className="divide-y divide-cacau/10 border-y border-cacau/10">
              <AnimatePresence initial={false}>
                {produtos.map((p) => (
                  <motion.li
                    key={p.id}
                    layout
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-4 overflow-hidden py-4 sm:gap-6"
                  >
                    <Link to={`/colecao/${p.id}`} className="shrink-0">
                      <img src={p.img} alt="" className="h-24 w-20 rounded-xl object-cover sm:h-32 sm:w-28" />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs tracking-wide text-cacau-suave uppercase">{nomeCategoria(p.categoria)}</p>
                      <Link to={`/colecao/${p.id}`} className="mt-1 block font-display text-xl hover:text-terracota">
                        {p.nome}
                      </Link>
                      <p className="mt-1 line-clamp-2 hidden text-sm text-cacau-suave sm:block">{p.descricao}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => remover(p.id)}
                      aria-label={`Remover ${p.nome}`}
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-cacau-suave transition hover:bg-terracota/10 hover:text-terracota"
                    >
                      <IconeFechar className="h-5 w-5" />
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            <aside className="h-fit space-y-4 rounded-3xl bg-areia p-8 lg:sticky lg:top-28">
              <p className="font-display text-2xl">
                {produtos.length} {produtos.length === 1 ? "peça guardada" : "peças guardadas"}
              </p>
              <a href={linkWhatsApp(mensagem)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full">
                <IconeWhatsApp className="h-5 w-5" /> Pedir informações
              </a>
              <Link to="/encomenda" className="btn-primario w-full">
                Encomendar à medida
              </Link>
              <button type="button" onClick={limpar} className="w-full text-sm text-cacau-suave underline hover:text-terracota">
                Limpar lista
              </button>
            </aside>
          </div>
        )}
      </section>
    </>
  );
}
