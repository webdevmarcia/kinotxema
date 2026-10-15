import { useCallback, useEffect, useMemo, useState } from "react";
import { FavoritosContext } from "./favoritos";
import { PRODUTOS } from "../data/produtos";

const CHAVE = "kinotxema:favoritos";

function lerGuardados() {
  try {
    const ids = JSON.parse(localStorage.getItem(CHAVE) ?? "[]");
    // Ignora peças que entretanto saíram do catálogo.
    return Array.isArray(ids) ? ids.filter((id) => PRODUTOS.some((p) => p.id === id)) : [];
  } catch {
    return [];
  }
}

export default function FavoritosProvider({ children }) {
  const [ids, setIds] = useState(lerGuardados);

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(ids));
    } catch {
      /* armazenamento indisponível (modo privado) — a lista fica só nesta sessão */
    }
  }, [ids]);

  const alternar = useCallback(
    (id) => setIds((atual) => (atual.includes(id) ? atual.filter((x) => x !== id) : [...atual, id])),
    []
  );
  const remover = useCallback((id) => setIds((atual) => atual.filter((x) => x !== id)), []);
  const limpar = useCallback(() => setIds([]), []);

  const valor = useMemo(
    () => ({
      ids,
      produtos: ids.map((id) => PRODUTOS.find((p) => p.id === id)).filter(Boolean),
      eFavorito: (id) => ids.includes(id),
      alternar,
      remover,
      limpar,
    }),
    [ids, alternar, remover, limpar]
  );

  return <FavoritosContext.Provider value={valor}>{children}</FavoritosContext.Provider>;
}
