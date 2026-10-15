import useSeo from "../hooks/useSeo";
import { SITE } from "../data/site";
import CabecalhoPagina from "../components/CabecalhoPagina";

export default function Privacidade() {
  useSeo({ titulo: "Política de privacidade", descricao: "Como o site da Kinotxema trata os seus dados." });

  return (
    <>
      <CabecalhoPagina titulo="Política de privacidade" migalhas={[{ label: "Privacidade" }]} />
      <article className="container-site max-w-3xl space-y-8 py-16 leading-relaxed text-cacau-suave [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-cacau">
        <section>
          <h2>Que dados recolhemos</h2>
          <p>
            Este site não tem contas de utilizador, não usa cookies de publicidade nem ferramentas de
            análise, e não guarda em servidor os dados que escreve nos formulários.
          </p>
        </section>
        <section>
          <h2>Formulários e WhatsApp</h2>
          <p>
            Os formulários de encomenda e de mensagem apenas preparam uma mensagem e abrem o WhatsApp. A
            mensagem só nos chega se a enviar, e a partir daí é tratada pelo WhatsApp (Meta) de acordo com a
            política de privacidade desse serviço. Usamos estes dados apenas para responder ao seu pedido.
          </p>
        </section>
        <section>
          <h2>Favoritos</h2>
          <p>
            A lista de favoritos é guardada apenas no armazenamento local do seu navegador. Pode apagá-la a
            qualquer momento na página de favoritos ou limpando os dados do navegador.
          </p>
        </section>
        <section>
          <h2>Serviços de terceiros</h2>
          <p>
            As fontes do site são carregadas do Google Fonts. O mapa na página de contactos é fornecido pelo
            Google Maps e só é carregado se clicar em “Mostrar mapa”. As ligações para o Instagram e WhatsApp
            levam-no para esses serviços, que têm as suas próprias políticas.
          </p>
        </section>
        <section>
          <h2>Os seus direitos</h2>
          <p>
            Pode pedir para consultar, corrigir ou apagar os dados que nos enviou por mensagem, contactando-nos
            pelo {SITE.telefone} ou na loja ({SITE.morada.linha1}, {SITE.morada.cidade}).
          </p>
        </section>
      </article>
    </>
  );
}
