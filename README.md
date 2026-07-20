# Atacadinho da Rafa

**Plataforma de Descoberta de Produtos via Afiliados**

Um site moderno e otimizado para SEO, inspirado no Pinterest, que conecta usuários aos melhores produtos, ofertas e achados através de links de afiliado.

## 🚀 Tecnologias

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Animações**: Framer Motion
- **Banco de Dados**: PostgreSQL + Prisma
- **SEO**: next-seo + Metadata API

## 📦 Estrutura do Projeto

```
src/
├── app/                    # Páginas (App Router)
│   ├── categorias/         # Páginas de categoria
│   ├── pastas/             # Páginas de coleções
│   ├── produtos/           # Páginas de produtos
│   ├── artigos/            # Blog SEO
│   └── busca/              # Página de busca
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── pinterest/          # Cards, Grid, Feed
│   ├── produto/            # Páginas de produto
│   └── blog/               # Artigos
├── data/                   # Mock data
├── types/                  # TypeScript types
└── lib/                    # Utilitários
```

## 🎯 Funcionalidades

- **Feed estilo Pinterest**: Grid masonry com produtos e artigos
- **Sistema de Coleções**: Pastas organizadas por tema
- **Blog SEO**: Artigos otimizados para busca
- **Busca Inteligente**: Pesquisa unificada
- **Design Responsivo**: Mobile-first
- **SEO Otimizado**: Meta tags, Schema.org, sitemap

## 🛠️ Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local

# Inicializar banco de dados
npm run db:push

# (Opcional) Popular com dados de exemplo
npm run db:seed

# Iniciar desenvolvimento
npm run dev
```

Acesse: http://localhost:3000

## 📊 Banco de Dados

```bash
# Gerar Prisma Client
npm run db:generate

# Criar migração
npm run db:migrate

# Visualizar dados
npm run db:studio
```

## 🚢 Deploy

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker

```bash
# Build e start
docker-compose up -d

# Acesse
http://localhost:3000
```

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Lint do código
- `npm run db:generate` - Gera Prisma Client
- `npm run db:push` - Sincroniza schema com banco
- `npm run db:migrate` - Cria nova migração
- `npm run db:seed` - Popula banco com dados de exemplo
- `npm run db:studio` - Abre Prisma Studio

## 🎨 Design

- **Cores**: Rosa (primária), Laranja (destaque)
- **Tipografia**: Inter + Poppins
- **Estilo**: Limpo, moderno, Pinterest-like
- **Mobile-first**: Design responsivo

## 🔍 SEO

- Meta tags dinâmicas
- Schema.org (Product, Article, BreadcrumbList)
- Sitemap.xml gerado dinamicamente
- URLs amigáveis
- Core Web Vitals otimizados

## 💰 Monetização

- Links de afiliado (Shopee, Mercado Livre, Amazon)
- Tracking de conversões
- Analytics integrado

## 📈 Métricas

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

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

---

Feito com ❤️ para o Atacadinho da Rafa
