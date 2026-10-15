import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import FavoritosProvider from "./context/FavoritosProvider";
import Layout from "./components/Layout";
import Inicio from "./pages/Inicio";

// As restantes páginas são carregadas só quando visitadas.
const Colecao = lazy(() => import("./pages/Colecao"));
const Produto = lazy(() => import("./pages/Produto"));
const Servicos = lazy(() => import("./pages/Servicos"));
const Sobre = lazy(() => import("./pages/Sobre"));
const Encomenda = lazy(() => import("./pages/Encomenda"));
const Contactos = lazy(() => import("./pages/Contactos"));
const Favoritos = lazy(() => import("./pages/Favoritos"));
const Privacidade = lazy(() => import("./pages/Privacidade"));
const NaoEncontrado = lazy(() => import("./pages/NaoEncontrado"));

function Carregando() {
  return (
    <div className="grid min-h-[60svh] place-items-center" role="status" aria-label="A carregar">
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-areia border-t-terracota" />
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <FavoritosProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Inicio />} />
              {[
                ["colecao", Colecao],
                ["colecao/:id", Produto],
                ["servicos", Servicos],
                ["sobre", Sobre],
                ["encomenda", Encomenda],
                ["contactos", Contactos],
                ["favoritos", Favoritos],
                ["privacidade", Privacidade],
                ["*", NaoEncontrado],
              ].map(([caminho, Pagina]) => (
                <Route
                  key={caminho}
                  path={caminho}
                  element={
                    <Suspense fallback={<Carregando />}>
                      <Pagina />
                    </Suspense>
                  }
                />
              ))}
            </Route>
          </Routes>
        </BrowserRouter>
      </FavoritosProvider>
    </MotionConfig>
  );
}
