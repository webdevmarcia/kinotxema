import { HORARIO } from "../data/site";

const DIAS = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

const paraMinutos = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

// Dia e hora atuais em Lisboa, independentemente do fuso horário de quem visita.
export function agoraEmLisboa() {
  const partes = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Lisbon",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (tipo) => partes.find((p) => p.type === tipo)?.value;
  const dia = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { dia, minutos: Number(get("hour")) * 60 + Number(get("minute")) };
}

const turnoDoDia = (dia) => HORARIO.find((h) => h.dias.includes(dia) && h.abre);

// Nota: feriados não são detetados automaticamente.
export function estadoLoja() {
  const { dia, minutos } = agoraEmLisboa();
  const hoje = turnoDoDia(dia);

  if (hoje && minutos >= paraMinutos(hoje.abre) && minutos < paraMinutos(hoje.fecha)) {
    return { aberto: true, texto: `Aberto agora · fecha às ${hoje.fecha}` };
  }
  if (hoje && minutos < paraMinutos(hoje.abre)) {
    return { aberto: false, texto: `Fechado · abre hoje às ${hoje.abre}` };
  }
  for (let i = 1; i <= 7; i++) {
    const d = (dia + i) % 7;
    const prox = turnoDoDia(d);
    if (prox) {
      const quando = i === 1 ? "amanhã" : DIAS[d];
      return { aberto: false, texto: `Fechado · abre ${quando} às ${prox.abre}` };
    }
  }
  return { aberto: false, texto: "Fechado" };
}
