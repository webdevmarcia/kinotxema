// Informação central da loja — altere aqui e o site inteiro é atualizado.
export const SITE = {
  nome: "Kinotxema",
  slogan: "Coisa linda",
  descricao:
    "Peças únicas com tecidos africanos cheios de cultura e identidade. Moda em capulana, peças sob medida e acessórios artesanais em Setúbal.",
  url: "https://kinotxema.vercel.app",
  fundadora: "Sandra Correia",
  telefone: "+351 935 586 206",
  whatsapp: "351935586206",
  instagram: "kinotxema",
  morada: {
    linha1: "Centro Comercial S. Julião, loja 10",
    cidade: "Setúbal",
    pais: "Portugal",
  },
  mapsQuery: "Centro Comercial S. Julião, Setúbal",
};

// dias: 0 = domingo … 6 = sábado. Horas em "HH:MM" (hora de Lisboa).
export const HORARIO = [
  { dias: [1], rotulo: "Segunda-feira", abre: "09:30", fecha: "19:00" },
  { dias: [2, 3, 4, 5], rotulo: "Terça a sexta", abre: "13:30", fecha: "19:00" },
  { dias: [6], rotulo: "Sábado", abre: "09:30", fecha: "13:00" },
  { dias: [0], rotulo: "Domingos e feriados", abre: null, fecha: null },
];

export const NAV = [
  { to: "/", label: "Início" },
  { to: "/colecao", label: "Coleção" },
  { to: "/servicos", label: "Serviços" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contactos", label: "Contactos" },
];
