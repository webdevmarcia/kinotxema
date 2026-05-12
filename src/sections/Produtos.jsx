import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function CategoriaDropdown({ titulo, produtos }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Caixa da categoria */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-[var(--claro)] text-[var(--brown)]
        font-semibold text-lg md:text-xl py-3 px-4 md:py-4 md:px-6
        rounded-xl shadow-md flex justify-between items-center
        hover:scale-[1.02] transition-all"
      >
        {titulo}
        <span className="text-sm md:text-base">{open ? "▲" : "▼"}</span>
      </button>

      {/* Conteúdo do dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden mt-3 md:mt-4"
          >
            <div
              className="flex flex-nowrap overflow-x-auto no-scrollbar 
              space-x-4 md:space-x-6 py-3 px-1 snap-x snap-mandatory"
            >
              {produtos.map((produto, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white shadow-lg rounded-xl overflow-hidden 
                  border border-gray-200 snap-center"
                >
                  <img
                    src={produto.img}
                    alt={produto.nome}
                    className="w-40 h-40 md:w-64 md:h-64 object-cover object-center"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CatalogoPreview() {
  const categorias = {
    Camisas: [
      { nome: "Camisa 1", img: "/produtos/camisa1.webp" },
      { nome: "Camisa 2", img: "/produtos/camisa2.webp" },
      { nome: "Camisa 3", img: "/produtos/camisa3.webp" },
      { nome: "Camisa 4", img: "/produtos/camisa4.webp" },
      { nome: "Camisa 5", img: "/produtos/camisa5.webp" },
    ],

    Calças: [
      { nome: "Calça 1", img: "/produtos/calca1.webp" }
    ],

    Vestidos: [
      { nome: "Vestido 1", img: "/produtos/vestido1.webp" },
      { nome: "Vestido 2", img: "/produtos/vestido2.webp" },
      { nome: "Vestido 3", img: "/produtos/vestido3.webp" },
    ],

    Saias: [
      { nome: "Saia 2", img: "/produtos/saia2.webp" },
      { nome: "Saia 3", img: "/produtos/saia3.webp" },
      { nome: "Saia 4", img: "/produtos/saia4.webp" },
      { nome: "Saia 5", img: "/produtos/saia5.webp" },
      { nome: "Saia 6", img: "/produtos/saia6.webp" },
    ],

    Outros: [
      { nome: "Diversos", img: "/produtos/produto4.webp" },
      { nome: "Cestos", img: "/produtos/produto5.webp" },
      { nome: "Acessórios", img: "/produtos/produto1.webp" }, // corrigido
    ],
  };

  return (
    <section id="produtos" className="py-14 md:py-20 w-full">
      <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-[var(--brown)] mb-10 md:mb-16"
        >
          Produtos
        </motion.h2>

        <div className="flex flex-col gap-6 md:gap-8">
          {Object.entries(categorias).map(([nome, produtos]) => (
            <CategoriaDropdown key={nome} titulo={nome} produtos={produtos} />
          ))}
        </div>

      </div>
    </section>
  );
}
