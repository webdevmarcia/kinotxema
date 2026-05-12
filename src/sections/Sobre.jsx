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
      id="sobre"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white px-6 py-24"
    >
      {/* Background image */}
<div
  className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
  style={{
    backgroundImage: "url('logotipo.webp')",
    backgroundSize: "400px", // 👈 muda o tamanho aqui
    transform: `translateY(${scrollY * 0.15}px)`,
  }}
/>


      <div className="relative mx-auto text-center max-w-3xl">

        {/* TÍTULO COM FRAMER MOTION */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-[var(--brown)] mb-10"
        >
          Sobre a Kinotxema
        </motion.h2>

        {/* TEXTO + ASSINATURA COM FRAMER MOTION */}
        <motion.blockquote
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-[var(--brown)] leading-relaxed italic"
        >
          <p className="mb-6">
            “Como nativa, o meu interesse é criar e inovar uma das coisas mais lindas
            e maravilhosas da cultura africana. <br/> Simplesmente, adoro a moda no traje
            de Capulana. <br/> Kinotxema significa <strong>‘Coisa linda’</strong>.”
          </p>

          <footer className="mt-4 text-xl font-semibold not-italic">
            — Sandra Correia
          </footer>
        </motion.blockquote>

      </div>
    </section>
  );
}
