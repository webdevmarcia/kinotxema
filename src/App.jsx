import Header from "./components/Header";
import Footer from "./components/Footer";

import Hero from "./sections/Hero";
import Sobre from "./sections/Sobre";
import Produtos from "./sections/Produtos";
import Servicos from "./sections/Servicos";
import Contatos from "./sections/Contatos";

function App() {
  return (
    <>
      <Header />

      {/* Hero full-screen */}
      <Hero />

      {/* Conteúdo principal */}
      <main>
        <Sobre />
        <Servicos />
        <Produtos />
        <Contatos />
      </main>

      <Footer />
    </>
  );
}

export default App;
