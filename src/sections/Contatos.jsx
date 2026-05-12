import { motion } from "framer-motion";

export default function Contatos() {
  return (
    <section
      id="contatos"
      className="centro w-full py-32 bg-[var(--gray)] relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6 relative z-10">

        {/* TÍTULO */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-[var(--brown)] mb-14 text-center"
        >
          Contatos
        </motion.h2>

        {/* HORÁRIO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl text-[var(--brown)] mb-4 font-bold flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-[var(--brown)]"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
              />
            </svg>
            Horário de funcionamento
          </h3>

          <div className="space-y-1 text-[var(--brown)]/90">
            <p><strong>Segundas:</strong> 9:30 às 19h</p>
            <p><strong>Terça a Sexta:</strong> 13:30 às 19h</p>
            <p><strong>Sábado:</strong> 9:30 às 13h</p>
            <p><strong>Domingos e Feriados:</strong> Encerrado</p>
          </div>
        </motion.div>

        {/* ENDEREÇO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h3 className="text-xl text-[var(--brown)] mb-4 font-bold flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-[var(--brown)]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
            </svg>
            Endereço
          </h3>

          <p className="text-[var(--brown)]/90">
            Centro Comercial S. Julião, loja 10, Setúbal
          </p>
        </motion.div>

        {/* BLOCOS DE CONTACTO COM STAGGER */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.25 }
            }
          }}
        >

          {/* WHATSAPP */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            className="p-6 bg-white/10 backdrop-blur-md shadow-xl rounded-2xl border border-white/20 text-center transition-all hover:scale-[1.03] hover:shadow-2xl"
          >
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="#25D366"
                className="drop-shadow-md"
              >
                <path d="M20.52 3.48A11.8 11.8 0 0 0 12.04 0C5.46 0 .1 5.36.1 11.94c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.64a12 12 0 0 0 5.74 1.46h.01c6.58 0 11.94-5.36 11.94-11.94 0-3.19-1.24-6.19-3.47-8.4zM12.05 21.3h-.01a9.3 9.3 0 0 1-4.74-1.3l-.34-.2-3.74.97 1-3.65-.22-.38a9.26 9.26 0 0 1-1.4-4.9c0-5.13 4.18-9.3 9.32-9.3 2.48 0 4.81.97 6.57 2.72a9.2 9.2 0 0 1 2.73 6.57c0 5.14-4.18 9.3-9.32 9.3z"/>
              </svg>
            </div>

            <a
              href="https://wa.me/351932663895"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2.5 rounded-full text-white font-medium bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all shadow-md"
            >
              Enviar Mensagem
            </a>
          </motion.div>

          {/* INSTAGRAM */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            className="p-6 bg-white/10 backdrop-blur-md shadow-xl rounded-2xl border border-white/20 text-center transition-all hover:scale-[1.03] hover:shadow-2xl"
          >
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="var(--castanho)"
                className="drop-shadow-md"
              >
                <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.5-.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5z"/>
              </svg>
            </div>

            <a
              href="https://instagram.com/kinotxema"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2.5 rounded-full text-white font-medium bg-[var(--castanho)] hover:bg-black/80 transition-all shadow-md"
            >
              Siga a nossa página
            </a>
          </motion.div>

        </motion.div>

      </div>

      {/* Background decorativo */}
      <div
        className="absolute inset-0 opacity-40 bg-cover bg-center"
        style={{
          backgroundImage: "url('/fundo.webp')",
        }}
      />
    </section>
  );
}
