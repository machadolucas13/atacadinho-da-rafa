# Dados para Firestore

Copie os dados abaixo e cole no Firestore Console.

## 1. Coleção: categorias

Clique em "Iniciar coleção" e nomeie como `categorias`.

### Documento 1: moda-feminina
```json
{
  "id": "1",
  "nome": "Moda Feminina",
  "slug": "moda-feminina",
  "descricao": "Vestidos, saias, blusas e muito mais",
  "icone": "👗",
  "cor": "#ec4899",
  "imagem": "/images/categorias/moda-feminina.jpg",
  "ordem": 1,
  "ativo": true
}
```

### Documento 2: casa-decoracao
```json
{
  "id": "2",
  "nome": "Casa e Decoração",
  "slug": "casa-decoracao",
  "descricao": "Deixe sua casa mais bonita e aconchegante",
  "icone": "🏠",
  "cor": "#f59e0b",
  "imagem": "/images/categorias/casa-decoracao.jpg",
  "ordem": 2,
  "ativo": true
}
```

### Documento 3: cozinha
```json
{
  "id": "3",
  "nome": "Cozinha",
  "slug": "cozinha",
  "descricao": "Utensílios e organizadores de cozinha",
  "icone": "🍳",
  "cor": "#10b981",
  "imagem": "/images/categorias/cozinha.jpg",
  "ordem": 3,
  "ativo": true
}
```

### Documento 4: tecnologia
```json
{
  "id": "4",
  "nome": "Tecnologia",
  "slug": "tecnologia",
  "descricao": "Gadgets e acessórios tecnológicos",
  "icone": "💻",
  "cor": "#3b82f6",
  "imagem": "/images/categorias/tecnologia.jpg",
  "ordem": 4,
  "ativo": true
}
```

### Documento 5: beleza
```json
{
  "id": "5",
  "nome": "Beleza",
  "slug": "beleza",
  "descricao": "Maquiagem, skincare e cuidados pessoais",
  "icone": "💄",
  "cor": "#f472b6",
  "imagem": "/images/categorias/beleza.jpg",
  "ordem": 5,
  "ativo": true
}
```

### Documento 6: acessorios
```json
{
  "id": "6",
  "nome": "Acessórios",
  "slug": "acessorios",
  "descricao": "Bolsas, joias, relógios e mais",
  "icone": "👜",
  "cor": "#8b5cf6",
  "imagem": "/images/categorias/acessorios.jpg",
  "ordem": 6,
  "ativo": true
}
```

### Documento 7: ofertas
```json
{
  "id": "7",
  "nome": "Ofertas",
  "slug": "ofertas",
  "descricao": "Melhores promoções e descontos",
  "icone": "🏷️",
  "cor": "#ef4444",
  "imagem": "/images/categorias/ofertas.jpg",
  "ordem": 7,
  "ativo": true
}
```

### Documento 8: achados-virais
```json
{
  "id": "8",
  "nome": "Achados Virais",
  "slug": "achados-virais",
  "descricao": "Produtos que estão bombando na internet",
  "icone": "🔥",
  "cor": "#f97316",
  "imagem": "/images/categorias/achados-virais.jpg",
  "ordem": 8,
  "ativo": true
}
```

---

## 2. Coleção: pastas

Clique em "Iniciar coleção" e nomeie como `pastas`.

### Documento 1: decoracao-minimalista
```json
{
  "id": "1",
  "nome": "Decoração Minimalista",
  "slug": "decoracao-minimalista",
  "descricao": "Ideias para deixar sua casa minimalista e elegante",
  "imagemCapa": "/images/pastas/decoracao-minimalista.jpg",
  "categoriaId": "2",
  "categoria": {
    "id": "2",
    "nome": "Casa e Decoração",
    "slug": "casa-decoracao",
    "descricao": "Deixe sua casa mais bonita e aconchegante",
    "icone": "🏠",
    "cor": "#f59e0b",
    "imagem": "/images/categorias/casa-decoracao.jpg",
    "ordem": 2,
    "ativo": true
  },
  "destaque": true,
  "ordem": 1,
  "ativo": true
}
```

### Documento 2: looks-femininos-ate-100
```json
{
  "id": "2",
  "nome": "Looks Femininos até R$100",
  "slug": "looks-femininos-ate-100",
  "descricao": "Looks incríveis gastando pouco",
  "imagemCapa": "/images/pastas/looks-femininos.jpg",
  "categoriaId": "1",
  "categoria": {
    "id": "1",
    "nome": "Moda Feminina",
    "slug": "moda-feminina",
    "descricao": "Vestidos, saias, blusas e muito mais",
    "icone": "👗",
    "cor": "#ec4899",
    "imagem": "/images/categorias/moda-feminina.jpg",
    "ordem": 1,
    "ativo": true
  },
  "destaque": true,
  "ordem": 2,
  "ativo": true
}
```

### Documento 3: achados-cozinha
```json
{
  "id": "3",
  "nome": "Achados de Cozinha",
  "slug": "achados-cozinha",
  "descricao": "Produtos que vão transformar sua cozinha",
  "imagemCapa": "/images/pastas/achados-cozinha.jpg",
  "categoriaId": "3",
  "categoria": {
    "id": "3",
    "nome": "Cozinha",
    "slug": "cozinha",
    "descricao": "Utensílios e organizadores de cozinha",
    "icone": "🍳",
    "cor": "#10b981",
    "imagem": "/images/categorias/cozinha.jpg",
    "ordem": 3,
    "ativo": true
  },
  "destaque": true,
  "ordem": 3,
  "ativo": true
}
```

### Documento 4: tecnologia-barata
```json
{
  "id": "4",
  "nome": "Tecnologia Barata",
  "slug": "tecnologia-barata",
  "descricao": "Gadgets incríveis por preços acessíveis",
  "imagemCapa": "/images/pastas/tecnologia-barata.jpg",
  "categoriaId": "4",
  "categoria": {
    "id": "4",
    "nome": "Tecnologia",
    "slug": "tecnologia",
    "descricao": "Gadgets e acessórios tecnológicos",
    "icone": "💻",
    "cor": "#3b82f6",
    "imagem": "/images/categorias/tecnologia.jpg",
    "ordem": 4,
    "ativo": true
  },
  "destaque": false,
  "ordem": 4,
  "ativo": true
}
```

---

## 3. Coleção: produtos

Clique em "Iniciar coleção" e nomeie como `produtos`.

### Documento 1: vestido-floral-midi-elegante
```json
{
  "id": "1",
  "nome": "Vestido Floral Midi Elegante",
  "slug": "vestido-floral-midi-elegante",
  "descricao": "Vestido midi floral perfeito para ocasiões especiais",
  "descricaoCurta": "Vestido floral midi elegante para festas",
  "imagemPrincipal": "/images/produtos/vestido-floral.jpg",
  "imagens": ["/images/produtos/vestido-floral-1.jpg", "/images/produtos/vestido-floral-2.jpg"],
  "preco": 89.9,
  "precoOriginal": 149.9,
  "moeda": "BRL",
  "linkAfiliado": "https://shopee.com.br/produto1",
  "loja": "Shopee",
  "avaliacao": 4.8,
  "numAvaliacoes": 245,
  "tags": ["vestido", "floral", "elegante", "festa"],
  "categoriaId": "1",
  "categoria": {
    "id": "1",
    "nome": "Moda Feminina",
    "slug": "moda-feminina",
    "descricao": "Vestidos, saias, blusas e muito mais",
    "icone": "👗",
    "cor": "#ec4899",
    "imagem": "/images/categorias/moda-feminina.jpg",
    "ordem": 1,
    "ativo": true
  },
  "destaque": true,
  "viral": true,
  "ativo": true,
  "visualizacoes": 1500,
  "cliques": 120,
  "conversoes": 15
}
```

### Documento 2: organizador-cozinha-5-em-1
```json
{
  "id": "2",
  "nome": "Organizador de Cozinha 5 em 1",
  "slug": "organizador-cozinha-5-em-1",
  "descricao": "Kit completo para organizar sua cozinha",
  "descricaoCurta": "Organizador de cozinha premium 5 peças",
  "imagemPrincipal": "/images/produtos/organizador-cozinha.jpg",
  "imagens": ["/images/produtos/organizador-cozinha-1.jpg"],
  "preco": 49.9,
  "precoOriginal": 79.9,
  "moeda": "BRL",
  "linkAfiliado": "https://mercadolivre.com.br/produto2",
  "loja": "Mercado Livre",
  "avaliacao": 4.6,
  "numAvaliacoes": 189,
  "tags": ["cozinha", "organizador", "decoração"],
  "categoriaId": "3",
  "categoria": {
    "id": "3",
    "nome": "Cozinha",
    "slug": "cozinha",
    "descricao": "Utensílios e organizadores de cozinha",
    "icone": "🍳",
    "cor": "#10b981",
    "imagem": "/images/categorias/cozinha.jpg",
    "ordem": 3,
    "ativo": true
  },
  "destaque": true,
  "viral": false,
  "ativo": true,
  "visualizacoes": 980,
  "cliques": 85,
  "conversoes": 12
}
```

### Documento 3: air-fryer-4l-digital
```json
{
  "id": "3",
  "nome": "Air Fryer 4L Digital",
  "slug": "air-fryer-4l-digital",
  "descricao": "Fritadeira sem óleo digital 4 litros",
  "descricaoCurta": "Air fryer digital 4L - melhor custo benefício",
  "imagemPrincipal": "/images/produtos/air-fryer.jpg",
  "imagens": ["/images/produtos/air-fryer-1.jpg", "/images/produtos/air-fryer-2.jpg"],
  "preco": 299.9,
  "precoOriginal": 499.9,
  "moeda": "BRL",
  "linkAfiliado": "https://amazon.com.br/produto3",
  "loja": "Amazon",
  "avaliacao": 4.9,
  "numAvaliacoes": 512,
  "tags": ["cozinha", "eletrodoméstico", "air fryer"],
  "categoriaId": "3",
  "categoria": {
    "id": "3",
    "nome": "Cozinha",
    "slug": "cozinha",
    "descricao": "Utensílios e organizadores de cozinha",
    "icone": "🍳",
    "cor": "#10b981",
    "imagem": "/images/categorias/cozinha.jpg",
    "ordem": 3,
    "ativo": true
  },
  "destaque": true,
  "viral": true,
  "ativo": true,
  "visualizacoes": 2500,
  "cliques": 200,
  "conversoes": 30
}
```

### Documento 4: luminaria-mesa-led
```json
{
  "id": "4",
  "nome": "Luminária de Mesa LED",
  "slug": "luminaria-mesa-led",
  "descricao": "Luminária decorativa LED para mesa de escritório",
  "descricaoCurta": "Luminária LED mesa - decoração moderna",
  "imagemPrincipal": "/images/produtos/luminaria-led.jpg",
  "imagens": [],
  "preco": 59.9,
  "precoOriginal": 89.9,
  "moeda": "BRL",
  "linkAfiliado": "https://shopee.com.br/produto4",
  "loja": "Shopee",
  "avaliacao": 4.5,
  "numAvaliacoes": 98,
  "tags": ["decoração", "luminária", "LED", "escritório"],
  "categoriaId": "2",
  "categoria": {
    "id": "2",
    "nome": "Casa e Decoração",
    "slug": "casa-decoracao",
    "descricao": "Deixe sua casa mais bonita e aconchegante",
    "icone": "🏠",
    "cor": "#f59e0b",
    "imagem": "/images/categorias/casa-decoracao.jpg",
    "ordem": 2,
    "ativo": true
  },
  "destaque": false,
  "viral": false,
  "ativo": true,
  "visualizacoes": 650,
  "cliques": 45,
  "conversoes": 8
}
```

### Documento 5: fone-bluetooth-premium
```json
{
  "id": "5",
  "nome": "Fone Bluetooth Premium",
  "slug": "fone-bluetooth-premium",
  "descricao": "Fone de ouvido bluetooth com cancelamento de ruído",
  "descricaoCurta": "Fone bluetooth premium - melhor custo benefício",
  "imagemPrincipal": "/images/produtos/fone-bluetooth.jpg",
  "imagens": [],
  "preco": 129.9,
  "precoOriginal": 199.9,
  "moeda": "BRL",
  "linkAfiliado": "https://mercadolivre.com.br/produto5",
  "loja": "Mercado Livre",
  "avaliacao": 4.7,
  "numAvaliacoes": 320,
  "tags": ["tecnologia", "fone", "bluetooth", "áudio"],
  "categoriaId": "4",
  "categoria": {
    "id": "4",
    "nome": "Tecnologia",
    "slug": "tecnologia",
    "descricao": "Gadgets e acessórios tecnológicos",
    "icone": "💻",
    "cor": "#3b82f6",
    "imagem": "/images/categorias/tecnologia.jpg",
    "ordem": 4,
    "ativo": true
  },
  "destaque": true,
  "viral": true,
  "ativo": true,
  "visualizacoes": 1800,
  "cliques": 150,
  "conversoes": 20
}
```

### Documento 6: kit-maquiagem-profissional
```json
{
  "id": "6",
  "nome": "Kit Maquiagem Profissional",
  "slug": "kit-maquiagem-profissional",
  "descricao": "Kit completo de maquiagem com 32 cores",
  "descricaoCurta": "Kit maquiagem profissional 32 cores",
  "imagemPrincipal": "/images/produtos/kit-maquiagem.jpg",
  "imagens": [],
  "preco": 79.9,
  "precoOriginal": 129.9,
  "moeda": "BRL",
  "linkAfiliado": "https://shopee.com.br/produto6",
  "loja": "Shopee",
  "avaliacao": 4.4,
  "numAvaliacoes": 156,
  "tags": ["beleza", "maquiagem", "kit"],
  "categoriaId": "5",
  "categoria": {
    "id": "5",
    "nome": "Beleza",
    "slug": "beleza",
    "descricao": "Maquiagem, skincare e cuidados pessoais",
    "icone": "💄",
    "cor": "#f472b6",
    "imagem": "/images/categorias/beleza.jpg",
    "ordem": 5,
    "ativo": true
  },
  "destaque": false,
  "viral": false,
  "ativo": true,
  "visualizacoes": 720,
  "cliques": 60,
  "conversoes": 10
}
```

### Documento 7: bolsa-transversal-feminina
```json
{
  "id": "7",
  "nome": "Bolsa Transversal Feminina",
  "slug": "bolsa-transversal-feminina",
  "descricao": "Bolsa transversal elegante para o dia a dia",
  "descricaoCurta": "Bolsa transversal feminina - estilo e praticidade",
  "imagemPrincipal": "/images/produtos/bolsa-transversal.jpg",
  "imagens": [],
  "preco": 69.9,
  "precoOriginal": 99.9,
  "moeda": "BRL",
  "linkAfiliado": "https://amazon.com.br/produto7",
  "loja": "Amazon",
  "avaliacao": 4.6,
  "numAvaliacoes": 210,
  "tags": ["acessórios", "bolsa", "feminino"],
  "categoriaId": "6",
  "categoria": {
    "id": "6",
    "nome": "Acessórios",
    "slug": "acessorios",
    "descricao": "Bolsas, joias, relógios e mais",
    "icone": "👜",
    "cor": "#8b5cf6",
    "imagem": "/images/categorias/acessorios.jpg",
    "ordem": 6,
    "ativo": true
  },
  "destaque": false,
  "viral": false,
  "ativo": true,
  "visualizacoes": 890,
  "cliques": 75,
  "conversoes": 11
}
```

### Documento 8: relogio-smartwatch
```json
{
  "id": "8",
  "nome": "Relógio Smartwatch",
  "slug": "relogio-smartwatch",
  "descricao": "Smartwatch com monitor cardíaco e GPS",
  "descricaoCurta": "Smartwatch completo - saúde e estilo",
  "imagemPrincipal": "/images/produtos/smartwatch.jpg",
  "imagens": [],
  "preco": 199.9,
  "precoOriginal": 349.9,
  "moeda": "BRL",
  "linkAfiliado": "https://mercadolivre.com.br/produto8",
  "loja": "Mercado Livre",
  "avaliacao": 4.8,
  "numAvaliacoes": 445,
  "tags": ["tecnologia", "smartwatch", "relógio", "fitness"],
  "categoriaId": "4",
  "categoria": {
    "id": "4",
    "nome": "Tecnologia",
    "slug": "tecnologia",
    "descricao": "Gadgets e acessórios tecnológicos",
    "icone": "💻",
    "cor": "#3b82f6",
    "imagem": "/images/categorias/tecnologia.jpg",
    "ordem": 4,
    "ativo": true
  },
  "destaque": true,
  "viral": true,
  "ativo": true,
  "visualizacoes": 2200,
  "cliques": 180,
  "conversoes": 25
}
```

---

## 4. Coleção: artigos

Clique em "Iniciar coleção" e nomeie como `artigos`.

### Documento 1: 15-melhores-organizadores-cozinha-baratos
```json
{
  "id": "1",
  "titulo": "15 Melhores Organizadores de Cozinha Baratos",
  "slug": "15-melhores-organizadores-cozinha-baratos",
  "descricao": "Descubra os melhores organizadores de cozinha por preços incríveis",
  "conteudo": "<h1>15 Melhores Organizadores de Cozinha Baratos</h1><p>Neste artigo, vamos mostrar os melhores organizadores...</p>",
  "imagemCapa": "/images/artigos/organizadores-cozinha.jpg",
  "imagens": [],
  "categoriaId": "3",
  "categoria": {
    "id": "3",
    "nome": "Cozinha",
    "slug": "cozinha",
    "descricao": "Utensílios e organizadores de cozinha",
    "icone": "🍳",
    "cor": "#10b981",
    "imagem": "/images/categorias/cozinha.jpg",
    "ordem": 3,
    "ativo": true
  },
  "destaque": true,
  "visualizacoes": 3200,
  "tempoLeitura": 8,
  "tags": ["cozinha", "organizadores", "baratos"],
  "ativo": true,
  "publicadoEm": "2024-01-15T00:00:00.000Z"
}
```

### Documento 2: 20-achados-shopee-decoracao
```json
{
  "id": "2",
  "titulo": "20 Achados da Shopee para Deixar Sua Casa Bonita",
  "slug": "20-achados-shopee-decoracao",
  "descricao": "Os melhores achados de decoração da Shopee",
  "conteudo": "<h1>20 Achados da Shopee para Decorar</h1><p>Separamos os melhores achados...</p>",
  "imagemCapa": "/images/artigos/achados-shopee.jpg",
  "imagens": [],
  "categoriaId": "2",
  "categoria": {
    "id": "2",
    "nome": "Casa e Decoração",
    "slug": "casa-decoracao",
    "descricao": "Deixe sua casa mais bonita e aconchegante",
    "icone": "🏠",
    "cor": "#f59e0b",
    "imagem": "/images/categorias/casa-decoracao.jpg",
    "ordem": 2,
    "ativo": true
  },
  "destaque": true,
  "visualizacoes": 5100,
  "tempoLeitura": 10,
  "tags": ["shopee", "decoração", "achados"],
  "ativo": true,
  "publicadoEm": "2024-01-20T00:00:00.000Z"
}
```

### Documento 3: 10-tenis-femininos-alta-2024
```json
{
  "id": "3",
  "titulo": "10 Tênis Femininos que Estão em Alta em 2024",
  "slug": "10-tenis-femininos-alta-2024",
  "descricao": "Os tênis mais fashion e confortáveis do momento",
  "conteudo": "<h1>10 Tênis Femininos em Alta</h1><p>Descubra os tênis que estão bombando...</p>",
  "imagemCapa": "/images/artigos/tenis-femininos.jpg",
  "imagens": [],
  "categoriaId": "1",
  "categoria": {
    "id": "1",
    "nome": "Moda Feminina",
    "slug": "moda-feminina",
    "descricao": "Vestidos, saias, blusas e muito mais",
    "icone": "👗",
    "cor": "#ec4899",
    "imagem": "/images/categorias/moda-feminina.jpg",
    "ordem": 1,
    "ativo": true
  },
  "destaque": false,
  "visualizacoes": 2800,
  "tempoLeitura": 7,
  "tags": ["tênis", "feminino", "moda", "2024"],
  "ativo": true,
  "publicadoEm": "2024-01-25T00:00:00.000Z"
}
```

---

## Como adicionar no Firestore

1. Acesse https://console.firebase.google.com
2. Selecione o projeto `atacadinho-da-rafa`
3. No menu esquerdo, clique em **Firestore Database**
4. Clique em **Iniciar coleção**
5. Digite o nome da coleção (`categorias`, `pastas`, `produtos` ou `artigos`)
6. Clique em **Avançar**
7. Em "ID do documento", digite o slug do primeiro item (ex: `moda-feminina`)
8. Cole o JSON correspondente no campo de dados
9. Clique em **Salvar**
10. Repita para todos os documentos

### Dica rápida:
Você também pode usar o **Modo de edição em massa** no Firestore Console para colar vários documentos de uma vez.

## Como cadastrar novos produtos depois

Quando você quiser adicionar um novo produto:
1. Vá no Firestore Console
2. Abra a coleção `produtos`
3. Clique em **Adicionar documento**
4. O ID pode ser automático ou você pode usar o slug do produto (ex: `body-de-renda-preto`)
5. Preencha os campos:
   - `nome`: Nome do produto
   - `slug`: URL amigável (ex: `body-de-renda-preto`)
   - `descricao`: Descrição completa
   - `descricaoCurta`: Descrição curta
   - `imagemPrincipal`: Caminho da imagem (ex: `/images/produtos/body-renda.jpg`)
   - `preco`: 89.9
   - `precoOriginal`: 149.9
   - `linkAfiliado`: Link de afiliado completo
   - `loja`: Shopee, Mercado Livre, Amazon, etc
   - `tags`: Array de palavras-chave
   - `categoriaId`: ID da categoria
   - `destaque`: true ou false
   - `viral`: true ou false
6. Clique em **Salvar**

O site vai atualizar automaticamente!
