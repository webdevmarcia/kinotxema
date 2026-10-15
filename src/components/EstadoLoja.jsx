import { useEffect, useState } from "react";
import { estadoLoja } from "../lib/horario";

export default function EstadoLoja({ className = "" }) {
  const [estado, setEstado] = useState(estadoLoja);

  // Atualiza a cada minuto para mudar sozinho à hora de abrir/fechar.
  useEffect(() => {
    const t = setInterval(() => setEstado(estadoLoja()), 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <span className={`inline-flex items-center gap-2 text-sm font-medium ${className}`}>
      <span className="relative flex h-2.5 w-2.5">
        {estado.aberto && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-whatsapp opacity-60" />
        )}
        <span
          className={`relative inline-flex h-2.5 w-2.5 rounded-full ${estado.aberto ? "bg-whatsapp" : "bg-terracota"}`}
        />
      </span>
      {estado.texto}
    </span>
  );
}
