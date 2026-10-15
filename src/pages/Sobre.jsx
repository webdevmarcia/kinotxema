import { Link } from "react-router-dom";
import useSeo from "../hooks/useSeo";
import { SITE } from "../data/site";
import CabecalhoPagina from "../components/CabecalhoPagina";
import Reveal from "../components/Reveal";
import Titulo from "../components/Titulo";
import { IconeBrilho, IconeSetaDireita, IconeTesoura } from "../components/Icones";

const VALORES = [
  {
    titulo: "Autenticidade",
    texto: "Tecidos africanos escolhidos pela cor, pelo padrão e pela história que carregam.",
  },
  {
    titulo: "Feito com as mãos",
    texto: "Cada peça é cortada, cosida e terminada com atenção ao detalhe.",
  },
  {
    titulo: "Identidade",
    texto: "Moda que celebra a cultura africana e a leva para o dia a dia, com orgulho e alegria.",
  },
];

export default function Sobre() {
  useSeo({
    titulo: "Sobre",
    descricao: `Conheça a história da Kinotxema — “coisa linda” — e da sua fundadora, ${SITE.fundadora}. Moda em capulana feita em Setúbal.`,
  });

  return (
    <>
      <CabecalhoPagina
        eyebrow="Sobre nós"
        titulo={<>Kinotxema quer dizer <em className="text-terracota">“coisa linda”</em></>}
        migalhas={[{ label: "Sobre" }]}
      />

      <section className="container-site grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <img
            src="/produtos/saia3.webp"
            alt="Saia rodada em tecido africano exposta na loja Kinotxema"
            className="aspect-[4/5] w-full rounded-3xl object-cover shadow-2xl shadow-cacau/15"
          />
        </Reveal>
        <div>
          <Reveal as="blockquote">
            <p className="font-display text-2xl leading-relaxed italic sm:text-3xl">
              “Como nativa, o meu interesse é criar e inovar uma das coisas mais lindas e maravilhosas da cultura
              africana. Simplesmente, adoro a moda no traje de capulana.”
            </p>
            <footer className="mt-6 flex items-center gap-4">
              <span className="h-px w-12 bg-terracota" />
              <span className="font-semibold">{SITE.fundadora}</span>
              <span className="text-cacau-suave">Fundadora</span>
            </footer>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 space-y-4 leading-relaxed text-cacau-suave">
            <p>
              A Kinotxema nasceu do amor pelos tecidos africanos e da vontade de os trazer para o guarda-roupa de
              todos os dias. Na nossa loja em Setúbal, cada peça é pensada para valorizar a cor, o padrão e a
              história de cada tecido.
            </p>
            <p>
              Fazemos vestidos, saias, camisas e acessórios — e, acima de tudo, peças à medida de quem as vai usar.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-areia/60 py-20">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Titulo
            eyebrow="O tecido"
            titulo="O que é a capulana?"
          />
          <Reveal delay={0.1} className="space-y-4 text-lg leading-relaxed text-cacau-suave">
            <p>
              A capulana é um tecido estampado, de cores vivas, muito presente no dia a dia de Moçambique e de
              outros países africanos. É usada como traje, para carregar bebés, como presente em momentos
              importantes — e cada padrão pode transmitir uma mensagem.
            </p>
            <p>
              Na Kinotxema transformamos estes tecidos em peças contemporâneas, sem perder a alma e a
              identidade que os tornam únicos.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-site py-20">
        <Titulo eyebrow="O que nos move" titulo="Os nossos valores" centro />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {VALORES.map((v, i) => (
            <Reveal key={v.titulo} delay={i * 0.08} className="rounded-3xl border border-cacau/10 p-8 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-ocre/15 text-terracota">
                {i === 1 ? <IconeTesoura className="h-6 w-6" /> : <IconeBrilho className="h-6 w-6" />}
              </span>
              <h3 className="mt-5 text-2xl font-semibold">{v.titulo}</h3>
              <p className="mt-3 leading-relaxed text-cacau-suave">{v.texto}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-16 flex flex-wrap justify-center gap-4">
          <Link to="/colecao" className="btn-primario px-8 py-4 text-base">
            Ver a coleção <IconeSetaDireita className="h-5 w-5" />
          </Link>
          <Link to="/contactos" className="btn-secundario px-8 py-4 text-base">
            Visitar a loja
          </Link>
        </Reveal>
      </section>
    </>
  );
}
