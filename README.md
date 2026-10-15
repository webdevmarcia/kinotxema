# Kinotxema — site

Site da Kinotxema, loja de moda africana em capulana em Setúbal. Feito com React, Vite, Tailwind CSS 4 e Framer Motion.

## Comandos

```bash
npm install      # instalar dependências (só da primeira vez)
npm run dev      # ver o site em http://localhost:5173 enquanto edita
npm run build    # gerar a versão final na pasta dist/
npm run preview  # pré-visualizar a versão final
npm run lint     # verificar o código
```

## Onde alterar o conteúdo

| O quê | Ficheiro |
| --- | --- |
| Telefone, WhatsApp, Instagram, morada, horário, menu | `src/data/site.js` |
| Produtos e categorias | `src/data/produtos.js` |
| Serviços, passos da encomenda, guia de medidas, perguntas frequentes | `src/data/conteudo.js` |
| Cores e tipos de letra | `src/index.css` (bloco `@theme`) |
| Dados para o Google (horário, morada) | `index.html` (bloco `application/ld+json`) |

### Adicionar um produto

1. Coloque a fotografia em `public/produtos/` (formato `.webp`, ~1000 px de largura).
2. Acrescente uma entrada em `src/data/produtos.js`:

```js
{
  id: "saia-nova",              // aparece no link: /colecao/saia-nova (sem espaços nem acentos)
  nome: "Saia Nova",
  categoria: "saias",           // um dos ids de CATEGORIAS
  img: "/produtos/saia-nova.webp",
  descricao: "Descrição curta da peça.",
  destaque: true,               // opcional: mostra na página inicial
},
```

O `sitemap.xml` é gerado automaticamente no build com todas as páginas e produtos.

## Páginas

- `/` início · `/colecao` catálogo com filtros e pesquisa · `/colecao/:id` página de cada peça
- `/servicos` serviços, guia de medidas e FAQ · `/sobre` · `/contactos` horário, mapa e mensagem
- `/encomenda` formulário de encomenda sob medida (envia pelo WhatsApp)
- `/favoritos` peças guardadas pelo visitante · `/privacidade`

## Publicar

É uma aplicação de página única (SPA): o servidor tem de devolver `index.html` para qualquer endereço.
Já estão incluídos os ficheiros para **Netlify** (`public/_redirects`) e **Vercel** (`vercel.json`).
Basta ligar o repositório e usar `npm run build` com a pasta `dist`.

Se o domínio final não for `kinotxema.vercel.app`, altere-o em `src/data/site.js`, `index.html` e `public/robots.txt`.
