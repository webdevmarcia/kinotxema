import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="servicos"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-24"
    >

      {/* Background decorativo */}
      <div
        className="absolute inset-0 opacity-40 bg-cover bg-center"
        style={{
          backgroundImage: "url('/fundo2.webp')",
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl">

        {/* TÍTULO COM ANIMAÇÃO SUAVE */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-[var(--brown)] text-4xl md:text-5xl font-bold tracking-tight drop-shadow-xl mb-10"
        >
          Serviços
        </motion.h2>

        {/* LISTA COM STAGGER */}
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 1,
                ease: "easeOut",
                staggerChildren: 0.25,
              },
            },
          }}
          className="space-y-6 text-lg md:text-xl text-[var(--brown)] leading-relaxed"
        >
          {[
            "Peças sob medida — criação de roupas e acessórios exclusivos.",
            "Produtos diversos — bolsas, nécessaires, cestos, chapéus e muito mais.",
            "Personalização — aplicação de Capulana, ajustes e detalhes únicos."
          ].map((texto, index) => (
            <motion.li
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="pb-4 border-b border-[var(--brown)]/20"
            >
              <strong>{texto.split(" — ")[0]}</strong> — {texto.split(" — ")[1]}
            </motion.li>
          ))}
        </motion.ul>

      </div>
    </section>
  );
}
