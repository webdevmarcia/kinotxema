import { useState, useRef, useEffect } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const links = [
    { href: "#sobre", label: "Sobre" },
    { href: "#servicos", label: "Serviços" },
    { href: "#produtos", label: "Produtos" },
    { href: "#contatos", label: "Contatos" },
  ];

  return (
    <header className="
      flex items-center justify-between 
      h-20 px-6 bg-white sticky top-0 z-50 w-full 
      shadow-md transition-colors
    ">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">

        {/* LOGO */}
        <a href="/" className="flex items-center gap-3">
          <img 
            src="logotipo.webp" 
            alt="Logo Kinotxema" 
            className="w-20 h-20 object-contain"
          />
          <span className="font-greatvibes text-3xl font-bold text-[var(--brown)]">
            Kinotxema
          </span>
        </a>

        {/* ÍCONE HAMBÚRGUER */}
        <button
          aria-label="Abrir menu"
          className="md:hidden flex flex-col gap-1.5 ml-2"
          onClick={() => setOpen(true)}
        >
          <span className="w-7 h-0.5 bg-[var(--brown)] rounded"></span>
          <span className="w-7 h-0.5 bg-[var(--brown)] rounded"></span>
          <span className="w-7 h-0.5 bg-[var(--brown)] rounded"></span>
        </button>

        {/* NAV DESKTOP */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[var(--brown)] hover:text-[var(--castanho)] transition"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* MENU MOBILE */}
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xl z-50 flex justify-end">
          <div
            ref={menuRef}
            className="
              w-72 h-full bg-white/95 backdrop-blur-xl shadow-xl 
              p-8 flex flex-col gap-8 animate-slideLeft
            "
          >
            {/* BOTÃO FECHAR */}
            <button
              aria-label="Fechar menu"
              className="self-end text-3xl text-[var(--brown)] hover:text-[var(--castanho)] transition"
              onClick={() => setOpen(false)}
            >
              ×
            </button>

            {/* NAV MOBILE */}
            <nav className="flex flex-col gap-6 text-lg font-semibold">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-[var(--brown)] hover:text-[var(--castanho)] transition"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
