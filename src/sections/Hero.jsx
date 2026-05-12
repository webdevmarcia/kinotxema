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
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden px-6 py-32">

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/fundo.webp')",
          transform: `translateY(${scrollY * 0.15}px)`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />

      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: "url('/fundo.jpg')" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl text-center">

        {/* TÍTULO COM FRAMER MOTION */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="font-montserrat text-[var(--white)] text-4xl md:text-6xl leading-tight tracking-tight drop-shadow-2xl"
        >
          Peças únicas com tecidos africanos cheios de cultura e identidade.
        </motion.h1>

        {/* BOTÕES COM STAGGER */}
        <motion.div
          className="mt-14 flex flex-wrap justify-center gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delay: 0.4,
                staggerChildren: 0.25,
              },
            },
          }}
        >

          {/* BOTÃO 1 */}
          <motion.a
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#produtos"
            className="
              px-10 py-4 rounded-full font-semibold text-lg
              text-[var(--brown)]
              border border-[var(--brown)]
              bg-white
              shadow-lg shadow-black/10
              transition-all
            "
          >
            Ver Produtos
          </motion.a>

          {/* BOTÃO 2 */}
          <motion.a
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contatos"
            className="
              px-10 py-4 rounded-full font-semibold text-lg
              bg-[var(--brown)]
              text-white
              border border-[var(--brown)]
              shadow-lg shadow-black/20
              transition-all
            "
          >
            Fazer Encomenda
          </motion.a>

        </motion.div>

      </div>
    </section>
  );
}
