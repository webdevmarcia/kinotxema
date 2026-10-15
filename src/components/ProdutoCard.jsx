import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { nomeCategoria } from "../data/produtos";
import { useFavoritos } from "../context/favoritos";
import { IconeCoracao } from "./Icones";

export function BotaoFavorito({ produto, className = "" }) {
  const { eFavorito, alternar } = useFavoritos();
  const ativo = eFavorito(produto.id);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        alternar(produto.id);
      }}
      aria-pressed={ativo}
      aria-label={ativo ? `Remover ${produto.nome} dos favoritos` : `Guardar ${produto.nome} nos favoritos`}
      className={`grid h-10 w-10 place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur transition
        hover:scale-110 ${ativo ? "text-terracota" : "text-cacau"} ${className}`}
    >
      <motion.span key={String(ativo)} initial={{ scale: 0.6 }} animate={{ scale: 1 }}>
        <IconeCoracao cheio={ativo} className="h-5 w-5" />
      </motion.span>
    </button>
  );
}

export default function ProdutoCard({ produto }) {
  return (
    <article className="group relative">
      <Link to={`/colecao/${produto.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-areia">
          <img
            src={produto.img}
            alt={produto.nome}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <span className="absolute bottom-3 left-3 rounded-full bg-cacau/80 px-3 py-1 text-xs font-medium text-creme opacity-0 backdrop-blur transition group-hover:opacity-100">
            Ver peça
          </span>
        </div>
        <div className="mt-3 px-1">
          <p className="text-xs tracking-wide text-cacau-suave uppercase">{nomeCategoria(produto.categoria)}</p>
          <h3 className="mt-1 font-sans text-base font-medium">{produto.nome}</h3>
        </div>
      </Link>
      <BotaoFavorito produto={produto} className="absolute top-3 right-3" />
    </article>
  );
}
