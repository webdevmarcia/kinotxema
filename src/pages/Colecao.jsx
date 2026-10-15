import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import useSeo from "../hooks/useSeo";
import { CATEGORIAS, PRODUTOS, nomeCategoria } from "../data/produtos";
import CabecalhoPagina from "../components/CabecalhoPagina";
import ProdutoCard from "../components/ProdutoCard";
import { IconeFechar, IconePesquisa } from "../components/Icones";

// Pesquisa sem acentos nem maiúsculas: "necessaire" encontra "Nécessaire".
const normalizar = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function Colecao() {
  const [params, setParams] = useSearchParams();
  const categoria = params.get("categoria") ?? "todas";
  const pesquisa = params.get("q") ?? "";

  useSeo({
    titulo: categoria === "todas" ? "Coleção" : `${nomeCategoria(categoria)} — Coleção`,
    descricao:
      "Vestidos, saias, camisas, acessórios e cestaria em tecidos africanos. Descubra a coleção Kinotxema.",
  });

  const atualizar = (chave, valor) => {
    const novos = new URLSearchParams(params);
    if (!valor || valor === "todas") novos.delete(chave);
    else novos.set(chave, valor);
    setParams(novos, { replace: true, preventScrollReset: true });
  };

  const resultados = useMemo(() => {
    const termo = normalizar(pesquisa.trim());
    return PRODUTOS.filter(
      (p) =>
        (categoria === "todas" || p.categoria === categoria) &&
        (!termo || normalizar(`${p.nome} ${p.descricao} ${nomeCategoria(p.categoria)}`).includes(termo))
    );
  }, [categoria, pesquisa]);

  const filtros = [{ id: "todas", nome: "Todas" }, ...CATEGORIAS];

  return (
    <>
      <CabecalhoPagina
        eyebrow="Coleção"
        titulo="Tecidos africanos, peças únicas"
        texto="Uma seleção das nossas peças. Gostou de alguma? Guarde-a nos favoritos ou peça-nos informações pelo WhatsApp — e se não houver no seu tamanho, fazemos à medida."
        migalhas={[{ label: "Coleção" }]}
      />

      <section className="container-site py-12">
        <div className="sticky top-18 z-20 -mx-4 flex flex-col gap-4 bg-creme/95 px-4 py-4 backdrop-blur sm:top-20 sm:-mx-6 sm:px-6 lg:-mx-8 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-wrap lg:px-0" role="tablist" aria-label="Categorias">
            {filtros.map((f) => {
              const ativo = categoria === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={ativo}
                  onClick={() => atualizar("categoria", f.id)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
                    ativo
                      ? "border-cacau bg-cacau text-creme"
                      : "border-cacau/15 bg-white text-cacau hover:border-cacau/40"
                  }`}
                >
                  {f.nome}
                </button>
              );
            })}
          </div>

          <label className="relative block w-full lg:w-72">
            <span className="sr-only">Pesquisar peças</span>
            <IconePesquisa className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-cacau-suave" />
            <input
              type="search"
              value={pesquisa}
              onChange={(e) => atualizar("q", e.target.value)}
              placeholder="Pesquisar: azul, saia, bolsa…"
              className="campo rounded-full py-2.5 pl-11"
            />
          </label>
        </div>

        <p className="mt-6 text-sm text-cacau-suave" aria-live="polite">
          {resultados.length} {resultados.length === 1 ? "peça" : "peças"}
          {categoria !== "todas" && <> em <strong className="text-cacau">{nomeCategoria(categoria)}</strong></>}
          {pesquisa && <> para “<strong className="text-cacau">{pesquisa}</strong>”</>}
        </p>

        {resultados.length > 0 ? (
          <motion.div layout className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {resultados.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProdutoCard produto={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="mt-12 rounded-3xl border border-dashed border-cacau/20 p-12 text-center">
            <p className="font-display text-2xl">Não encontrámos peças com esses filtros.</p>
            <p className="mt-2 text-cacau-suave">Experimente outra pesquisa — ou peça-nos uma peça feita à medida.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button type="button" className="btn-secundario" onClick={() => setParams({}, { replace: true })}>
                <IconeFechar className="h-4 w-4" /> Limpar filtros
              </button>
              <Link to="/encomenda" className="btn-primario">
                Pedir peça sob medida
              </Link>
            </div>
          </div>
        )}

        <div className="mt-20 rounded-3xl bg-cacau p-8 text-center text-creme sm:p-12">
          <h2 className="text-3xl font-semibold">Há muito mais na loja</h2>
          <p className="mx-auto mt-3 max-w-xl text-creme/75">
            O catálogo online mostra apenas uma parte. Visite-nos em Setúbal ou acompanhe as novidades no Instagram.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/contactos" className="btn-claro">Como chegar</Link>
            <a href="https://instagram.com/kinotxema" target="_blank" rel="noopener noreferrer" className="btn-primario border border-creme/30 bg-transparent">
              @kinotxema
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
