import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { PRODUTOS } from "./src/data/produtos.js";
import { SITE } from "./src/data/site.js";

// Gera o sitemap.xml no build, sempre sincronizado com o catálogo.
function sitemap() {
  return {
    name: "kinotxema-sitemap",
    generateBundle() {
      const paginas = ["", "/colecao", "/servicos", "/sobre", "/encomenda", "/contactos", "/privacidade"];
      const urls = [...paginas, ...PRODUTOS.map((p) => `/colecao/${p.id}`)]
        .map((p) => `  <url><loc>${SITE.url}${p}</loc></url>`)
        .join("\n");
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), sitemap()],
});
