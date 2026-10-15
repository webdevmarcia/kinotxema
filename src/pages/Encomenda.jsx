import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useSeo from "../hooks/useSeo";
import { encontrarProduto } from "../data/produtos";
import { MEDIDAS } from "../data/conteudo";
import { SITE } from "../data/site";
import { linkWhatsApp } from "../lib/whatsapp";
import { useFavoritos } from "../context/favoritos";
import CabecalhoPagina from "../components/CabecalhoPagina";
import { IconeVisto, IconeWhatsApp } from "../components/Icones";

const TIPOS = ["Vestido", "Saia", "Camisa", "Blazer / casaco", "Calças / calções", "Conjunto", "Acessório", "Personalização / ajuste", "Outro"];
const OCASIOES = ["Dia a dia", "Cerimónia / casamento", "Festa", "Trabalho", "Oferta", "Outra"];

function Campo({ label, opcional, erro, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-medium">
        {label} {opcional && <span className="font-normal text-cacau-suave">(opcional)</span>}
      </span>
      {children}
      {erro && <span className="mt-1.5 block text-sm text-terracota">{erro}</span>}
    </label>
  );
}

function montarMensagem(d, referencias) {
  const linhas = [`Olá Kinotxema! Gostaria de fazer uma encomenda.`, ""];
  linhas.push(`*Nome:* ${d.nome}`);
  if (d.telefone) linhas.push(`*Contacto:* ${d.telefone}`);
  linhas.push(`*Tipo de peça:* ${d.tipo}`);
  if (d.ocasiao) linhas.push(`*Ocasião:* ${d.ocasiao}`);
  if (referencias.length) {
    linhas.push(`*Peças de referência:*`);
    referencias.forEach((p) => linhas.push(`  • ${p.nome} — ${SITE.url}/colecao/${p.id}`));
  }
  if (d.tecido) linhas.push(`*Tecido / cores:* ${d.tecido}`);
  const medidas = MEDIDAS.filter((m) => d[`medida_${m.nome}`]).map((m) => `${m.nome}: ${d[`medida_${m.nome}`]} cm`);
  if (medidas.length) linhas.push(`*Medidas:* ${medidas.join(" · ")}`);
  if (d.data) linhas.push(`*Para quando:* ${d.data.split("-").reverse().join("/")}`);
  if (d.detalhes) linhas.push("", `*Detalhes:* ${d.detalhes}`);
  return linhas.join("\n");
}

export default function Encomenda() {
  useSeo({
    titulo: "Encomenda sob medida",
    descricao: "Peça a sua roupa ou acessório em tecido africano feito à medida. Envie o pedido e falamos consigo pelo WhatsApp.",
  });

  const [params] = useSearchParams();
  const { produtos: favoritos } = useFavoritos();
  const pecaInicial = encontrarProduto(params.get("peca"));

  const [referencias, setReferencias] = useState(() => (pecaInicial ? [pecaInicial.id] : []));
  const [erros, setErros] = useState({});
  const [enviado, setEnviado] = useState(false);

  // Peças sugeridas como referência: a peça de origem + favoritos.
  const sugestoes = [...new Set([...(pecaInicial ? [pecaInicial.id] : []), ...favoritos.map((p) => p.id)])]
    .map(encontrarProduto)
    .filter(Boolean);

  const alternarReferencia = (id) =>
    setReferencias((r) => (r.includes(id) ? r.filter((x) => x !== id) : [...r, id]));

  const submeter = (e) => {
    e.preventDefault();
    const dados = Object.fromEntries(new FormData(e.currentTarget));
    const novosErros = {};
    if (!dados.nome?.trim()) novosErros.nome = "Indique o seu nome.";
    if (!dados.tipo) novosErros.tipo = "Escolha o tipo de peça.";
    if (!dados.detalhes?.trim() && referencias.length === 0)
      novosErros.detalhes = "Descreva a peça que imagina (ou escolha uma peça de referência).";
    setErros(novosErros);
    if (Object.keys(novosErros).length) {
      e.currentTarget.querySelector(`[name="${Object.keys(novosErros)[0]}"]`)?.focus();
      return;
    }

    const refs = referencias.map(encontrarProduto).filter(Boolean);
    window.open(linkWhatsApp(montarMensagem(dados, refs)), "_blank", "noopener,noreferrer");
    setEnviado(true);
  };

  const hoje = new Date().toISOString().slice(0, 10);

  return (
    <>
      <CabecalhoPagina
        eyebrow="Encomendas"
        titulo="A sua peça, à sua medida"
        texto="Preencha o que souber — o resto combinamos consigo. Ao enviar, abrimos o WhatsApp com a mensagem já escrita; só tem de carregar em enviar."
        migalhas={[{ label: "Encomenda" }]}
      />

      <section className="container-site grid gap-12 py-16 lg:grid-cols-[1.6fr_1fr]">
        <form onSubmit={submeter} noValidate className="space-y-10">
          <fieldset className="grid gap-6 sm:grid-cols-2">
            <legend className="mb-6 font-display text-2xl">1. Os seus dados</legend>
            <Campo label="Nome" erro={erros.nome}>
              <input name="nome" autoComplete="name" className="campo" aria-invalid={!!erros.nome} />
            </Campo>
            <Campo label="Telemóvel" opcional>
              <input name="telefone" type="tel" autoComplete="tel" className="campo" placeholder="9xx xxx xxx" />
            </Campo>
          </fieldset>

          <fieldset className="grid gap-6 sm:grid-cols-2">
            <legend className="mb-6 font-display text-2xl">2. A peça</legend>
            <Campo label="Tipo de peça" erro={erros.tipo}>
              <select
                name="tipo"
                className="campo"
                defaultValue={pecaInicial ? { vestidos: "Vestido", saias: "Saia", camisas: "Camisa", calcas: "Calças / calções", acessorios: "Acessório" }[pecaInicial.categoria] ?? "" : ""}
                aria-invalid={!!erros.tipo}
              >
                <option value="" disabled>Escolha…</option>
                {TIPOS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </Campo>
            <Campo label="Ocasião" opcional>
              <select name="ocasiao" className="campo" defaultValue="">
                <option value="">—</option>
                {OCASIOES.map((o) => <option key={o}>{o}</option>)}
              </select>
            </Campo>

            {sugestoes.length > 0 && (
              <div className="sm:col-span-2">
                <p className="mb-3 text-sm font-medium">Peças de referência</p>
                <div className="flex flex-wrap gap-3">
                  {sugestoes.map((p) => {
                    const ativa = referencias.includes(p.id);
                    return (
                      <button
                        key={p.id}
                        type="button"
                        aria-pressed={ativa}
                        onClick={() => alternarReferencia(p.id)}
                        className={`flex items-center gap-3 rounded-2xl border p-2 pr-4 text-left text-sm transition ${
                          ativa ? "border-terracota bg-terracota/5" : "border-cacau/15 bg-white hover:border-cacau/40"
                        }`}
                      >
                        <img src={p.img} alt="" className="h-12 w-12 rounded-xl object-cover" />
                        <span className="max-w-40">{p.nome}</span>
                        {ativa && <IconeVisto className="h-5 w-5 text-terracota" />}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-xs text-cacau-suave">
                  Dica: guarde peças nos <Link to="/favoritos" className="underline">favoritos</Link> para aparecerem aqui.
                </p>
              </div>
            )}
            {sugestoes.length === 0 && (
              <p className="text-sm text-cacau-suave sm:col-span-2">
                Viu alguma peça de que gostou? Guarde-a nos favoritos na <Link to="/colecao" className="underline">coleção</Link> e ela aparece aqui como referência.
              </p>
            )}

            <Campo label="Tecido e cores preferidas" opcional className="sm:col-span-2">
              <input name="tecido" className="campo" placeholder="Ex.: tons de azul, padrão geométrico, escolho na loja…" />
            </Campo>
            <Campo label="Descreva a peça que imagina" erro={erros.detalhes} className="sm:col-span-2">
              <textarea
                name="detalhes"
                rows={5}
                className="campo resize-y"
                placeholder="Comprimento, mangas, decote, forro, bolsos…"
                aria-invalid={!!erros.detalhes}
              />
            </Campo>
          </fieldset>

          <fieldset>
            <legend className="mb-2 font-display text-2xl">3. Medidas e prazo</legend>
            <p className="mb-6 text-sm text-cacau-suave">
              Opcional — também podemos tirar as medidas na loja. <Link to="/servicos#medidas" className="underline">Como medir?</Link>
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {MEDIDAS.map((m) => (
                <Campo key={m.nome} label={m.nome}>
                  <div className="relative">
                    <input name={`medida_${m.nome}`} type="number" min="1" max="250" inputMode="decimal" className="campo pr-10" />
                    <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-sm text-cacau-suave">cm</span>
                  </div>
                </Campo>
              ))}
            </div>
            <Campo label="Para quando precisa da peça?" opcional className="mt-6 sm:max-w-xs">
              <input name="data" type="date" min={hoje} className="campo" />
            </Campo>
          </fieldset>

          <div className="flex flex-col gap-4 border-t border-cacau/10 pt-8 sm:flex-row sm:items-center">
            <button type="submit" className="btn-whatsapp px-8 py-4 text-base">
              <IconeWhatsApp className="h-5 w-5" /> Enviar pedido pelo WhatsApp
            </button>
            <p className="text-xs text-cacau-suave">
              Os dados não ficam guardados no site. <Link to="/privacidade" className="underline">Privacidade</Link>
            </p>
          </div>
          {enviado && (
            <p role="status" className="rounded-2xl bg-folha/10 p-4 text-sm text-folha">
              Abrimos o WhatsApp com o seu pedido. Se não abriu, verifique se o navegador bloqueou a janela ou contacte-nos pelo {SITE.telefone}.
            </p>
          )}
        </form>

        <aside className="h-fit space-y-6 rounded-3xl bg-cacau p-8 text-creme lg:sticky lg:top-28">
          <h2 className="text-2xl">Prefere falar pessoalmente?</h2>
          <p className="text-sm leading-relaxed text-creme/75">
            Venha à loja escolher o tecido e tirar medidas. Mostramos-lhe padrões e ajudamos a decidir.
          </p>
          <p className="text-sm">
            <strong className="block text-ocre">Morada</strong>
            {SITE.morada.linha1}, {SITE.morada.cidade}
          </p>
          <Link to="/contactos" className="btn-claro w-full">Ver horário e mapa</Link>
          <p className="border-t border-creme/10 pt-6 text-sm text-creme/75">
            Ou ligue-nos:{" "}
            <a href={`tel:${SITE.telefone.replace(/\s/g, "")}`} className="font-semibold text-creme hover:text-ocre">
              {SITE.telefone}
            </a>
          </p>
        </aside>
      </section>
    </>
  );
}
