export type Categoria = {
  id: string;
  nome: string;
  nomeEn?: string;
  slug: string;
  descricao?: string;
  descricaoEn?: string;
  icone?: string;
  cor?: string;
  imagem?: string;
  ordem: number;
  ativo: boolean;
};

export type Pasta = {
  id: string;
  nome: string;
  slug: string;
  descricao?: string;
  imagemCapa?: string;
  categoriaId: string;
  categoria: Categoria;
  destaque: boolean;
  ordem: number;
  ativo: boolean;
};

export type Produto = {
  id: string;
  nome: string;
  slug: string;
  descricao?: string;
  descricaoCurta?: string;
  imagemPrincipal: string;
  imagens: string[];
  preco?: number;
  precoOriginal?: number;
  moeda: string;
  linkAfiliado: string;
  loja: string;
  avaliacao?: number;
  numAvaliacoes: number;
  tags: string[];
  categoriaId: string;
  categoria: Categoria;
  destaque: boolean;
  viral: boolean;
  ativo: boolean;
  visualizacoes: number;
  cliques: number;
  conversoes: number;
};

export type Artigo = {
  id: string;
  titulo: string;
  slug: string;
  descricao?: string;
  conteudo: string;
  imagemCapa?: string;
  imagens: string[];
  categoriaId: string;
  categoria: Categoria;
  destaque: boolean;
  visualizacoes: number;
  tempoLeitura?: number;
  cliques: number;
  conversoes: number;
  autor?: string;
  tags: string[];
  ativo: boolean;
  publicadoEm: Date;
  locale?: string;
};
