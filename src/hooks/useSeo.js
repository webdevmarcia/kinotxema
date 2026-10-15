import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE } from "../data/site";

function definirMeta(atributo, chave, conteudo) {
  let el = document.head.querySelector(`meta[${atributo}="${chave}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(atributo, chave);
    document.head.appendChild(el);
  }
  el.setAttribute("content", conteudo);
}

// Atualiza título, descrição, Open Graph e URL canónico de cada página.
export default function useSeo({ titulo, descricao = SITE.descricao, imagem }) {
  const { pathname } = useLocation();

  useEffect(() => {
    const tituloCompleto = titulo
      ? `${titulo} — ${SITE.nome}`
      : `${SITE.nome} — Moda africana em capulana, Setúbal`;
    const url = `${SITE.url}${pathname === "/" ? "" : pathname}`;

    document.title = tituloCompleto;
    definirMeta("name", "description", descricao);
    definirMeta("property", "og:title", tituloCompleto);
    definirMeta("property", "og:description", descricao);
    definirMeta("property", "og:url", url);
    if (imagem) definirMeta("property", "og:image", `${SITE.url}${imagem}`);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [titulo, descricao, imagem, pathname]);
}
