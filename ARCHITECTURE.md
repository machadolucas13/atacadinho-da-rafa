# Atacadinho da Rafa

**Plataforma de Descoberta de Produtos via Afiliados**

## Sobre o Projeto

Site independente de marketing de afiliados. Não é um marketplace, não é uma loja virtual. É um hub de descoberta e recomendação de produtos que redireciona usuários para lojas parceiras (Shopee, Mercado Livre, Amazon, etc.) através de links de afiliado.

## Stack Tecnológico

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS + shadcn/ui
- **Performance**: React Server Components, Image Optimization
- **Animações**: Framer Motion (para transições suaves)
- **SEO**: next-seo + metadata API nativa do Next.js

### Backend
- **API Routes**: Next.js API Routes
- **Banco de Dados**: PostgreSQL (próximo) / SQLite (desenvolvimento)
- **ORM**: Prisma
- **CMS**: Sanity.io ou Strapi (para gerenciamento de conteúdo)
- **Cache**: Redis (para busca e sessões)

### SEO & Performance
- **Sitemap**: Gerado dinamicamente via Next.js
- **RSS Feed**: Para artigos do blog
- **Schema.org**: Product, BreadcrumbList, Article
- **Core Web Vitals**: Otimização de LCP, FID, CLS

## Estrutura de Pastas

```
atacadinho-da-rafa/
├── src/
│   ├── app/                    # App Router (Next.js 14)
│   │   ├── layout.tsx          # Layout global
│   │   ├── page.tsx            # Home (feed Pinterest)
│   │   ├── loading.tsx         # Loading skeleton
│   │   ├── not-found.tsx       # 404 customizado
│   │   ├── error.tsx           # Error boundary
│   │   │
│   │   ├── categorias/         # /categorias/[slug]
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── pastas/             # /pastas/[slug] (Coleções)
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── produtos/           # /produtos/[slug]
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── artigos/            # /artigos/[slug] (Blog SEO)
│   │   │   ├── page.tsx        # Lista de artigos
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── busca/              # /busca?q=
│   │   │   └── page.tsx
│   │   │
│   │   ├── api/                # API Routes
│   │   │   ├── produtos/
│   │   │   ├── pastas/
│   │   │   ├── busca/
│   │   │   └── analytics/
│   │   │
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── ui/                 # Componentes base (shadcn)
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── SearchModal.tsx
│   │   ├── pinterest/
│   │   │   ├── MasonryGrid.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ArticleCard.tsx
│   │   │   ├── FolderCard.tsx
│   │   │   ├── PinModal.tsx
│   │   │   └── InfiniteFeed.tsx
│   │   ├── produto/
│   │   │   ├── ProductHero.tsx
│   │   │   ├── ProductComparison.tsx
│   │   │   ├── AffiliateButton.tsx
│   │   │   └── ProductGallery.tsx
│   │   └── shared/
│   │       ├── SeoHead.tsx
│   │       ├── Breadcrumbs.tsx
│   │       └── Rating.tsx
│   │
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── seo.ts
│   │   ├── utils.ts
│   │   └── constants.ts
│   │
│   ├── types/
│   │   ├── produto.ts
│   │   ├── pasta.ts
│   │   ├── artigo.ts
│   │   └── categoria.ts
│   │
│   ├── data/
│   │   ├── mock-data.ts        # Dados para desenvolvimento
│   │   └── categorias.ts
│   │
│   └── styles/
│       └── globals.css
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── public/
│   ├── images/
│   │   ├── produtos/
│   │   ├── pastas/
│   │   └── artigos/
│   └── icons/
│
├── .env.local
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Banco de Dados - Schema Prisma

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Categoria {
  id          String   @id @default(cuid())
  nome        String
  slug        String   @unique
  descricao   String?
  icone       String?
  cor         String?
  imagem      String?
  ordem       Int      @default(0)
  ativo       Boolean  @default(true)
  criadoEm    DateTime @default(now())
  atualizadoEm DateTime @updatedAt

  pastas      Pasta[]
  produtos    Produto[]
  artigos     Artigo[]

  @@map("categorias")
}

model Pasta {
  id          String   @id @default(cuid())
  nome        String
  slug        String   @unique
  descricao   String?
  imagemCapa  String?
  categoriaId String
  categoria   Categoria @relation(fields: [categoriaId], references: [id])
  destaque    Boolean   @default(false)
  ordem       Int      @default(0)
  ativo       Boolean   @default(true)
  criadoEm    DateTime @default(now())
  atualizadoEm DateTime @updatedAt

  produtos    ProdutoPasta[]
  artigos     ArtigoPasta[]

  @@map("pastas")
}

model Produto {
  id              String   @id @default(cuid())
  nome            String
  slug            String   @unique
  descricao       String?
  descricaoCurta  String?
  imagemPrincipal String
  imagens         String[]
  preco           Float?
  precoOriginal   Float?
  moeda           String   @default("BRL")
  linkAfiliado    String
  loja            String   // Shopee, Mercado Livre, Amazon, etc
  avaliacao       Float?   @default(0)
  numAvaliacoes   Int      @default(0)
  tags            String[]
  categoriaId     String
  categoria       Categoria @relation(fields: [categoriaId], references: [id])
  destaque        Boolean   @default(false)
  viral           Boolean   @default(false)
  ativo           Boolean   @default(true)
  visualizacoes   Int      @default(0)
  cliques         Int      @default(0)
  conversoes      Int      @default(0)
  criadoEm        DateTime @default(now())
  atualizadoEm    DateTime @updatedAt

  pastas          ProdutoPasta[]
  artigos         ArtigoProduto[]

  @@map("produtos")
}

model ProdutoPasta {
  id        String   @id @default(cuid())
  produtoId String
  pastaId   String
  produto   Produto @relation(fields: [produtoId], references: [id], onDelete: Cascade)
  pasta     Pasta   @relation(fields: [pastaId], references: [id], onDelete: Cascade)
  ordem     Int     @default(0)
  criadoEm  DateTime @default(now())

  @@unique([produtoId, pastaId])
  @@map("produtos_pastas")
}

model Artigo {
  id              String   @id @default(cuid())
  titulo          String
  slug            String   @unique
  descricao       String?
  conteudo        String   // Markdown ou HTML
  imagemCapa      String?
  imagens         String[]
  categoriaId     String
  categoria       Categoria @relation(fields: [categoriaId], references: [id])
  destaque        Boolean   @default(false)
  visualizacoes   Int      @default(0)
  tempoLeitura    Int?     // em minutos
  tags            String[]
  ativo           Boolean  @default(true)
  publicadoEm     DateTime @default(now())
  criadoEm        DateTime @default(now())
  atualizadoEm    DateTime @updatedAt

  pastas          ArtigoPasta[]
  produtos        ArtigoProduto[]

  @@map("artigos")
}

model ArtigoPasta {
  id      String   @id @default(cuid())
  artigoId String
  pastaId String
  artigo  Artigo @relation(fields: [artigoId], references: [id], onDelete: Cascade)
  pasta   Pasta   @relation(fields: [pastaId], references: [id], onDelete: Cascade)
  criadoEm DateTime @default(now())

  @@unique([artigoId, pastaId])
  @@map("artigos_pastas")
}

model ArtigoProduto {
  id        String   @id @default(cuid())
  artigoId  String
  produtoId String
  artigo    Artigo   @relation(fields: [artigoId], references: [id], onDelete: Cascade)
  produto   Produto  @relation(fields: [produtoId], references: [id], onDelete: Cascade)
  ordem     Int     @default(0)
  criadoEm  DateTime @default(now())

  @@unique([artigoId, produtoId])
  @@map("artigos_produtos")
}

model Analytics {
  id        String   @id @default(cuid())
  tipo      String   // view, click, conversion
  entidade  String   // produto, artigo, pasta
  entidadeId String
  ip        String?
  userAgent String?
  referrer  String?
  criadoEm  DateTime @default(now())

  @@map("analytics")
}
```

## Estratégia SEO

### Estrutura de URLs
```
/
├── /categorias/[slug]
├── /pastas/[slug]
├── /produtos/[slug]
├── /artigos/[slug]
└── /busca?q=[query]
```

### Otimizações
1. **Meta tags dinâmicas**: Título, descrição, Open Graph, Twitter Cards
2. **Schema.org**: Product, Article, BreadcrumbList, ItemList
3. **Sitemap.xml**: Gerado dinamicamente
4. **Robots.txt**: Configurado para indexação
5. **Canonical URLs**: Evitar conteúdo duplicado
6. **Alt text**: Em todas as imagens
7. **Core Web Vitals**: 
   - LCP < 2.5s
   - FID < 100ms
   - CLS < 0.1
8. **Mobile-first**: Design responsivo otimizado
9. **Intern linking**: Produtos relacionados, pastas relacionadas

### Títulos e Descrições SEO
- Padrão: `[Título do Produto] - Atacadinho da Rafa`
- Padrão: `[Título do Artigo] - Atacadinho da Rafa`
- Padrão: `[Nome da Pasta] - Coleção - Atacadinho da Rafa`

## Fluxo do Usuário

```
1. Entrada (Home)
   ↓
   Feed visual estilo Pinterest
   - Cards de produtos
   - Cards de artigos
   - Cards de pastas/coleções
   ↓

2. Descoberta
   - Clica em uma categoria
   - Clica em uma pasta/coleção
   - Clica em um produto
   - Clica em um artigo
   - Usa a busca
   ↓

3. Consumo de Conteúdo
   - Navega pelo catálogo
   - Lê artigos de recomendação
   - Explora pastas/coleções
   ↓

4. Conversão
   - Clica em "Ver Oferta" ou "Comprar"
   - É redirecionado para loja parceira
   - (Conversão gera comissão)
```

## Componentes Principais

### Layout
- **Navbar**: Logo + busca + categorias
- **Footer**: Links + newsletter + redes sociais
- **Sidebar**: Filtros e navegação
- **SearchModal**: Busca em tempo real

### Pinterest Feed
- **MasonryGrid**: Grid de colunas dinâmico
- **ProductCard**: Card de produto (imagem + nome + preço + loja)
- **ArticleCard**: Card de artigo (imagem + título + categoria)
- **FolderCard**: Card de pasta/coleção (imagem + nome + quantidade)
- **InfiniteFeed**: Scroll infinito com Intersection Observer
- **PinModal**: Modal com detalhes do produto

### Produto
- **ProductHero**: Imagem principal + info básica
- **ProductGallery**: Galeria de imagens
- **ProductComparison**: Comparação com similares
- **AffiliateButton**: CTA "Ver Oferta" estilizado
- **Rating**: Sistema de avaliação

### Blog
- **ArticleContent**: Conteúdo formatado (Markdown)
- **ArticleCard**: Card de artigo no feed
- **TableOfContents**: Índice do artigo

## Estratégia de Conteúdo

### Tipos de Conteúdo
1. **Produtos individuais**: Páginas otimizadas para SEO
2. **Artigos de lista**: "15 melhores X", "20 achados de Y"
3. **Pastas/coleções**: Curadoria temática
4. **Comparativos**: "X vs Y - Qual escolher?"

### Frequência de Publicação
- Meta inicial: 3-5 artigos/semana
- Meta: 20-30 produtos por semana
- Atualizar pastas quinzenalmente

## Monetização

### Modelo
- Links de afiliado (Shopee, Mercado Livre, Amazon, etc.)
- Comissão por venda (CPA)
- Comissão por clique (CPC) - opcional

### Implementação
- UTM parameters para tracking
- Redirecionamento com tracking
- Analytics de conversões

## Performance

### Otimizações
- Next.js Image Optimization
- Fontes otimizadas (next/font)
- Code splitting automático
- Lazy loading de componentes
- CDN para imagens
- Cache agressivo (Redis + Next.js cache)

## MVP Inicial

### Fase 1 (Semana 1-2)
1. Setup do projeto Next.js
2. Configuração do banco de dados
3. Criação do schema Prisma
4. Design system (Tailwind + cores + tipografia)

### Fase 2 (Semana 3-4)
1. Layout base (Navbar, Footer)
2. Home com feed masonry
3. Página de categoria
4. Página de produto
5. Componentes de card

### Fase 3 (Semana 5-6)
1. Sistema de busca
2. Páginas de pasta/coleção
3. Blog básico (listagem + artigo)
4. SEO básico implementado

### Fase 4 (Semana 7-8)
1. Modal de produto
2. Sistema de comparação
3. Analytics básico
4. Mock data populado
5. Testes e ajustes

### Fase 5 (Semana 9-10)
1. Deploy em produção
2. Configuração de domínio
3. Google Analytics + Search Console
4. Testes de SEO
5. Ajustes finais

## Métricas de Sucesso

### SEO
- Posicionamento médio top 10 para 50+ keywords
- 10.000 visitas orgânicas/mês em 3 meses
- CTR médio > 3% no Google

### Conversão
- CTR em links afiliados > 5%
- Taxa de conversão > 2%
- Receita de afiliados > R$ 1.000/mês em 3 meses

### Performance
- PageSpeed Score > 90
- Core Web Vitals no verde
- Tempo de carregamento < 3s
