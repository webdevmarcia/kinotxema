export default function Footer() {
  return (
    <footer className="bg-white border-t border-black/10 py-10 mt-20">
      <div className="max-w-5xl mx-auto px-6 text-center">

        {/* LOGO + NOME */}
        <a href="/hero" className="flex flex-col items-center gap-3">
          <img 
            src="logotipo.webp"
            alt="Logo Kinotxema"
            className="w-20 h-20 object-contain"
          />
          <span className="font-greatvibes text-3xl font-bold tracking-tight text-[var(--brown)]">
            Kinotxema
          </span>
        </a>

        {/* DESCRIÇÃO */}
        <p className="text-[var(--brown)] mt-4 text-lg">
          Peças únicas, com tecidos africanos cheios de cultura e identidade.
        </p>

        {/* LINHA INFERIOR */}
        <div className="border-t border-black/10 mt-10 pt-6 text-[var(--brown)] text-sm">
          © {new Date().getFullYear()} Kinotxema — Todos os direitos reservados.
        </div>

      </div>
    </footer>
  );
}
