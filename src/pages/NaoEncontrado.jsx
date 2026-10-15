import { Link } from "react-router-dom";
import useSeo from "../hooks/useSeo";

export default function NaoEncontrado() {
  useSeo({ titulo: "Página não encontrada" });
  return (
    <section className="container-site grid min-h-[60svh] place-items-center py-24 text-center">
      <div>
        <img src="/logotipo.webp" alt="" className="mx-auto w-40 opacity-90" />
        <p className="eyebrow mt-6">Erro 404</p>
        <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Esta página perdeu-se pelo caminho</h1>
        <p className="mt-4 text-cacau-suave">Mas há muitas coisas lindas à sua espera.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primario">Ir para o início</Link>
          <Link to="/colecao" className="btn-secundario">Ver coleção</Link>
        </div>
      </div>
    </section>
  );
}
