import Reveal from "./Reveal";

export default function Titulo({ eyebrow, titulo, texto, centro = false, className = "" }) {
  return (
    <Reveal className={`${centro ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-3xl leading-tight font-semibold sm:text-4xl md:text-5xl">{titulo}</h2>
      {texto && <p className="mt-4 text-base leading-relaxed text-cacau-suave sm:text-lg">{texto}</p>}
    </Reveal>
  );
}
