import { motion, useReducedMotion } from "framer-motion";

// Faz aparecer o conteúdo suavemente quando entra no ecrã.
export default function Reveal({ children, delay = 0, y = 24, as = "div", className, ...rest }) {
  const reduzir = useReducedMotion();
  const Comp = motion[as];

  return (
    <Comp
      className={className}
      initial={reduzir ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
