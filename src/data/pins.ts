export interface Pin {
  id: string;
  slug: string;
  locale: string;
  titulo: string;
  descricao: string;
  imagem: string;
  destaque: boolean;
  categoriaId: string;
  publicadoEm?: string;
  links?: { nome: string; preco: string; url: string; imagem?: string; dica?: string }[];
  tags?: string[];
  dicaUso?: string;
  imagemPrincipal?: string;
}

export const pins: Pin[] = [
  {
    "id": "pin-achadinhos-pets-cuidados-caes-gatos-2026",
    "slug": "achadinhos-pets-caes-gatos-higiene-brinquedos-shopee-2026",
    "locale": "pt",
    "titulo": "62 Achadinhos Pet na Shopee: Higiene, Camas, Brinquedos e Passeios",
    "descricao": "Seleção de 62 itens para cães e gatos com nomes, preços informados e links individuais da Shopee: tapetes higiênicos, camas, fontes de água, brinquedos, coleiras, transporte, banho e cuidados. Compare medidas, quantidade, materiais e avaliações antes de comprar. Valores podem variar.",
    "imagem": "/assets/images/logo_rafa.png",
    "destaque": true,
    "categoriaId": "pets",
    "publicadoEm": "2026-11-27",
    "tags": [
      "achadinhos pet Shopee",
      "produtos para cachorro",
      "produtos para gatos",
      "tapete higiênico cachorro",
      "cama pet",
      "brinquedos para cachorro",
      "brinquedos para gato",
      "bebedouro automático pet",
      "fonte de água gatos",
      "coleira personalizada",
      "transporte de animais",
      "bolsa pet",
      "banho e tosa",
      "areia biodegradável gatos",
      "comedouro pet",
      "higiene pet",
      "acessórios para pets",
      "cuidados com cães e gatos",
      "presentes para pets",
      "loja pet online"
    ],
    "dicaUso": "Para escolher melhor: compare preço por unidade nos tapetes e fraldas, medidas das camas e transportadoras, capacidade dos bebedouros e facilidade de higienização. Brinquedos devem ser adequados ao porte e supervisionados. Produtos antiparasitários, suplementos, itens odontológicos e petiscos exigem atenção à composição e orientação veterinária. Preços são os informados nos anúncios e podem mudar. Links de afiliado.",
    "links": [
      {
        "nome": "Tapete higiênico Doguitto Pads 80x60cm 30 unidades",
        "preco": "R$ 45,51",
        "url": "https://s.shopee.com.br/AUvtVK6Yjw",
        "dica": "Compare dimensões, quantidade, absorção e custo por unidade."
      },
      {
        "nome": "Tapete higiênico 60x60cm 50 unidades",
        "preco": "R$ 69,89",
        "url": "https://s.shopee.com.br/2LaBmPZE2M",
        "dica": "Compare dimensões, quantidade, absorção e custo por unidade."
      },
      {
        "nome": "Tapete higiênico Espaço de Bicho 50 unidades",
        "preco": "R$ 61,90",
        "url": "https://s.shopee.com.br/1CH09KowA",
        "dica": "Compare dimensões, quantidade, absorção e custo por unidade."
      },
      {
        "nome": "Bolsa transportadora com janela para cães e gatos pequenos",
        "preco": "R$ 49,39",
        "url": "https://s.shopee.com.br/114oC3FsZH",
        "dica": "Confira dimensões, ventilação, limite de peso e sistema de fixação; acessórios não substituem dispositivos de retenção adequados."
      },
      {
        "nome": "Brinquedo interativo de pelúcia pato com som",
        "preco": "R$ 27,54 - R$ 44,00",
        "url": "https://s.shopee.com.br/9AQVv5SNlw",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Kit 6 ou 10 brinquedos mordedores para filhotes",
        "preco": "R$ 26,89 - R$ 43,99",
        "url": "https://s.shopee.com.br/4qHWlAhWvV",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Postinho educador de xixi formato hidrante",
        "preco": "R$ 24,53 - R$ 62,40",
        "url": "https://s.shopee.com.br/20xLO5Xcgu",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Tapete gelado refrescante Great Pets",
        "preco": "R$ 95,00",
        "url": "https://s.shopee.com.br/30psa1aByg",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Tapete higiênico Doguitto Pads 80x60cm 60 unidades",
        "preco": "R$ 123,50",
        "url": "https://s.shopee.com.br/W8XbSE6Ub",
        "dica": "Compare dimensões, quantidade, absorção e custo por unidade."
      },
      {
        "nome": "Cama pet luxo suede tamanhos M e G",
        "preco": "R$ 58,66 - R$ 65,19",
        "url": "https://s.shopee.com.br/2LaBn4rnCi",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Kit 6 mordedores com macaco e brinquedos com apito",
        "preco": "R$ 36,99",
        "url": "https://s.shopee.com.br/6AmuMAbzIu",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Bebedouro automático de água corrente 2L",
        "preco": "R$ 55,99",
        "url": "https://s.shopee.com.br/W8Xbmnss1",
        "dica": "Confira capacidade, material e facilidade de limpeza."
      },
      {
        "nome": "Kit 2 areias higiênicas biodegradáveis tofu Presti Pet 5kg",
        "preco": "R$ 79,99",
        "url": "https://s.shopee.com.br/1qdvCGQXUl",
        "dica": "Compare dimensões, quantidade, absorção e custo por unidade."
      },
      {
        "nome": "Kit 100 tapetes higiênicos Espaço de Bicho 50x60cm",
        "preco": "R$ 107,99",
        "url": "https://s.shopee.com.br/9AQVvn64VB",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Brinquedo pato dispensador de ração e petiscos",
        "preco": "R$ 31,99",
        "url": "https://s.shopee.com.br/gRxoCxcan",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Assento pet acolchoado para carro até 10kg",
        "preco": "R$ 207,00",
        "url": "https://s.shopee.com.br/AUvtWKTuc0",
        "dica": "Confira dimensões, ventilação, limite de peso e sistema de fixação; acessórios não substituem dispositivos de retenção adequados."
      },
      {
        "nome": "Boné para cachorro e gato vários modelos",
        "preco": "R$ 26,90 - R$ 39,90",
        "url": "https://s.shopee.com.br/9fMmWqivxI",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Coleira com plaquinha personalizada e QR Code",
        "preco": "R$ 37,20",
        "url": "https://s.shopee.com.br/9zzcvVXeZY",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Tigela elevada de aço inox 400ml para pets",
        "preco": "R$ 28,49",
        "url": "https://s.shopee.com.br/2qWSOMgWvl",
        "dica": "Confira capacidade, material e facilidade de limpeza."
      },
      {
        "nome": "Brinquedo macaco de pelúcia com apito",
        "preco": "R$ 23,74",
        "url": "https://s.shopee.com.br/8fUFL76Nvu",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Kit escova dupla e creme dental Pet Clean",
        "preco": "R$ 26,99",
        "url": "https://s.shopee.com.br/1qdvCZs3tI",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Kit máquina de tosa com tesoura pente e lixa",
        "preco": "R$ 39,00",
        "url": "https://s.shopee.com.br/9fMmWzfR4S",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Comedouro e bebedouro automático 2 em 1 2200ml + 800ml",
        "preco": "R$ 59,99",
        "url": "https://s.shopee.com.br/2gD2CB0P91",
        "dica": "Confira capacidade, material e facilidade de limpeza."
      },
      {
        "nome": "Protetor acústico de orelhas para cães",
        "preco": "R$ 37,99 - R$ 41,99",
        "url": "https://s.shopee.com.br/8pnfXX6uTG",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Arnês refletivo ajustável respirável para pets",
        "preco": "R$ 22,50 - R$ 26,50",
        "url": "https://s.shopee.com.br/5fqdlkw69D",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Vestido pet ajustável com guia de passeio",
        "preco": "R$ 21,99 - R$ 40,99",
        "url": "https://s.shopee.com.br/5VXDZTIKLq",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Bolsa cápsula espacial de transporte pet",
        "preco": "R$ 103,54",
        "url": "https://s.shopee.com.br/8AXykQFttw",
        "dica": "Confira dimensões, ventilação, limite de peso e sistema de fixação; acessórios não substituem dispositivos de retenção adequados."
      },
      {
        "nome": "Bolsa de transporte pet Skapetshop",
        "preco": "R$ 49,90 - R$ 64,90",
        "url": "https://s.shopee.com.br/9AQVwLenrp",
        "dica": "Confira dimensões, ventilação, limite de peso e sistema de fixação; acessórios não substituem dispositivos de retenção adequados."
      },
      {
        "nome": "Kit escova dupla e creme dental Pet Clean (outro anúncio)",
        "preco": "R$ 26,99",
        "url": "https://s.shopee.com.br/60TUAdAVFe",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Kit shampoo branqueador e condicionador Peluche Blueberry 2x500ml",
        "preco": "R$ 69,90",
        "url": "https://s.shopee.com.br/9zzcw4x73h",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Fonte de água em aço inox com sensor inteligente",
        "preco": "R$ 279,99",
        "url": "https://s.shopee.com.br/2LaBo6nwGi",
        "dica": "Confira capacidade, material e facilidade de limpeza."
      },
      {
        "nome": "Cama pet removível e lavável peluda",
        "preco": "R$ 79,99",
        "url": "https://s.shopee.com.br/8AXykshhpv",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Bebedouro para Shih Tzu sem molhar pelos com comedouro",
        "preco": "R$ 54,90",
        "url": "https://s.shopee.com.br/2gD2CoB7J2",
        "dica": "Confira capacidade, material e facilidade de limpeza."
      },
      {
        "nome": "Kit completo pet com transporte comedouro peitoral e sanitário",
        "preco": "R$ 119,99",
        "url": "https://s.shopee.com.br/114oDmGaMU",
        "dica": "Confira dimensões, ventilação, limite de peso e sistema de fixação; acessórios não substituem dispositivos de retenção adequados."
      },
      {
        "nome": "Escova tira pelos pet com spray 3 em 1 USB-C",
        "preco": "R$ 29,99 - R$ 32,99",
        "url": "https://s.shopee.com.br/80EYYgfzi8",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Kit transporte para cachorro pequeno porte 7 itens",
        "preco": "R$ 119,99",
        "url": "https://s.shopee.com.br/6q2bAaEQSN",
        "dica": "Confira dimensões, ventilação, limite de peso e sistema de fixação; acessórios não substituem dispositivos de retenção adequados."
      },
      {
        "nome": "Bandana pet com nome bordado",
        "preco": "R$ 31,90",
        "url": "https://s.shopee.com.br/80EYYnLQlo",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Seringa aplicadora de comprimidos para pets",
        "preco": "R$ 11,18 - R$ 27,90",
        "url": "https://s.shopee.com.br/6q2bAgpSiL",
        "dica": "Consulte um veterinário antes do uso; confira indicação, composição, idade e porte do animal."
      },
      {
        "nome": "Kit coleira luxo com pérolas e laços",
        "preco": "R$ 35,55 - R$ 39,11",
        "url": "https://s.shopee.com.br/2LaBoSEipw",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Osso nó natural premium Best Bone 1kg",
        "preco": "R$ 92,89 - R$ 95,90",
        "url": "https://s.shopee.com.br/4qHWn736ld",
        "dica": "Consulte um veterinário antes do uso; confira indicação, composição, idade e porte do animal."
      },
      {
        "nome": "Fralda higiênica Newpet para cães machos 12 unidades",
        "preco": "R$ 32,90 - R$ 42,90",
        "url": "https://s.shopee.com.br/4B1pzus7Wq",
        "dica": "Compare dimensões, quantidade, absorção e custo por unidade."
      },
      {
        "nome": "Máquina profissional de tosa para cães",
        "preco": "R$ 99,99 - R$ 193,99",
        "url": "https://s.shopee.com.br/7VIHy4VgZx",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Kit shampoo condicionador e colônia Genial Pet Cereja e Avelã",
        "preco": "R$ 153,36",
        "url": "https://s.shopee.com.br/9pgCkOm37A",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Produto anti-tártaro Lavizoo 100g para cães e gatos",
        "preco": "R$ 45,35",
        "url": "https://s.shopee.com.br/9Kjw9eJWXJ",
        "dica": "Consulte um veterinário antes do uso; confira indicação, composição, idade e porte do animal."
      },
      {
        "nome": "Kit banho Pet Clean Melancia para cães",
        "preco": "R$ 42,99",
        "url": "https://s.shopee.com.br/114oEN62UT",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Mesa de tosa dobrável para cães e gatos",
        "preco": "R$ 175,00",
        "url": "https://s.shopee.com.br/4LLGCXW8hd",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Kit 5 mantas soft fleece para cães e gatos",
        "preco": "R$ 55,98",
        "url": "https://s.shopee.com.br/1BOEQkYejH",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Coleira antiparasitária anunciada como natural 62cm",
        "preco": "R$ 35,72",
        "url": "https://s.shopee.com.br/gRxprZGoM",
        "dica": "Consulte um veterinário antes do uso; confira indicação, composição, idade e porte do animal."
      },
      {
        "nome": "Kit filhotes Genial Pet shampoo condicionador e colônia",
        "preco": "R$ 41,50",
        "url": "https://s.shopee.com.br/4qHWnY5Oto",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Kit cama pet com cesto tapete e travesseiro",
        "preco": "R$ 121,26 - R$ 155,10",
        "url": "https://s.shopee.com.br/Lp7RJLivd",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Cama redonda pétala dupla face até 84cm",
        "preco": "R$ 189,90",
        "url": "https://s.shopee.com.br/1BOEQsdk5s",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Mochila pet panorâmica ventilada LEGNA",
        "preco": "R$ 79,98 - R$ 119,99",
        "url": "https://s.shopee.com.br/AUvtY4898r",
        "dica": "Confira dimensões, ventilação, limite de peso e sistema de fixação; acessórios não substituem dispositivos de retenção adequados."
      },
      {
        "nome": "Cadeirinha pet veicular com cinto até 10kg",
        "preco": "R$ 64,88 - R$ 76,89",
        "url": "https://s.shopee.com.br/AKcTLnLEzL",
        "dica": "Confira dimensões, ventilação, limite de peso e sistema de fixação; acessórios não substituem dispositivos de retenção adequados."
      },
      {
        "nome": "Rampa pet antiderrapante regulável 4 níveis",
        "preco": "R$ 131,00",
        "url": "https://s.shopee.com.br/3LSj11AGh5",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Coleira com tag de aço inox gravada a laser",
        "preco": "R$ 27,93 - R$ 38,43",
        "url": "https://s.shopee.com.br/BVhFEhaB3",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Suplemento Petskin anunciado para dermatite e leishmaniose",
        "preco": "R$ 154,70",
        "url": "https://s.shopee.com.br/AAJ39fqhNc",
        "dica": "Consulte um veterinário antes do uso; confira indicação, composição, idade e porte do animal."
      },
      {
        "nome": "Caminha pet grande quadrada com cabeceira",
        "preco": "R$ 54,89 - R$ 69,89",
        "url": "https://s.shopee.com.br/3LSj1AxQej",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Brinquedo polvo de pelúcia com som",
        "preco": "R$ 24,69",
        "url": "https://s.shopee.com.br/1BOERE4wDQ",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Capa impermeável para banco de carro transporte pet",
        "preco": "R$ 97,90 - R$ 177,90",
        "url": "https://s.shopee.com.br/4qHWo17IVV",
        "dica": "Confira dimensões, ventilação, limite de peso e sistema de fixação; acessórios não substituem dispositivos de retenção adequados."
      },
      {
        "nome": "Cama pet rebaixada personalizada coroa rosa",
        "preco": "R$ 75,20 - R$ 93,06",
        "url": "https://s.shopee.com.br/1gKV2F9GzA",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Cabana cama tenda toca pet para cães e gatos",
        "preco": "R$ 38,94 - R$ 43,00",
        "url": "https://s.shopee.com.br/9fMmYzUSjZ",
        "dica": "Confira tamanho, material, modo de uso e avaliações do anúncio."
      },
      {
        "nome": "Osso natural 3–4 LBF Dog's para cães pequenos",
        "preco": "R$ 50,39",
        "url": "https://s.shopee.com.br/4VegPiMozU",
        "dica": "Consulte um veterinário antes do uso; confira indicação, composição, idade e porte do animal."
      }
    ]
  },
  {
    "id": "pin-moda-feminina-primavera-verao-2026",
    "slug": "primavera-verao-2026-looks-femininos-shopee",
    "locale": "pt",
    "titulo": "46 Looks Femininos Primavera-Verão 2026: Vestidos, Conjuntos e Moda Shopee",
    "descricao": "Inspirações de moda feminina para a primavera e o verão: 46 opções de vestidos curtos e midi, conjuntos de cropped e short-saia, alfaiataria, tricot, crochê, macaquinhos, sandália e acessórios. Confira nomes, preços informados e links da Shopee. Os valores e descontos podem mudar; verifique medidas, frete e disponibilidade antes de comprar.",
    "imagem": "/assets/images/primavera-verao-2026-capa.png",
    "destaque": true,
    "categoriaId": "moda",
    "publicadoEm": "2026-11-25",
    "tags": [
      "moda primavera verão 2026",
      "looks primavera verão",
      "moda feminina Shopee",
      "vestidos de verão",
      "vestido curto feminino",
      "conjunto feminino verão",
      "cropped e short saia",
      "vestido tricot modal",
      "look boho chic",
      "moda praia",
      "vestido para festa",
      "alfaiataria feminina",
      "vestidos com renda",
      "crochê feminino",
      "macaquinho feminino",
      "achadinhos Shopee",
      "tendências moda feminina",
      "roupas femininas baratas",
      "looks para calor",
      "inspiração Pinterest moda"
    ],
    "dicaUso": "Primavera-verão pede peças adequadas ao clima e à ocasião: conjuntos leves e vestidos para passeios, tricot e crochê para looks de praia e alfaiataria ou cetim para eventos. Compare composição do tecido, transparência, forro, comprimento e tabela de medidas. Os preços foram informados na seleção e podem variar por tamanho, cor, frete e data. Os links são de afiliados.",
    "links": [
      {
        "nome": "Conjunto cropped manga curta + short-saia plissado",
        "preco": "R$ 47,13",
        "url": "https://s.shopee.com.br/6AmsBRFZwZ",
        "dica": "Confira medidas de cada peça, tecido e opções de cor antes de escolher."
      },
      {
        "nome": "Conjunto top costas abertas com amarração + shorts 6030",
        "preco": "R$ 76,01",
        "url": "https://s.shopee.com.br/Lp5EyM6xY",
        "dica": "Confira medidas de cada peça, tecido e opções de cor antes de escolher."
      },
      {
        "nome": "Conjunto tropical bandana cropped + short",
        "preco": "R$ 46,80",
        "url": "https://s.shopee.com.br/80EWN5EvoH",
        "dica": "Confira medidas de cada peça, tecido e opções de cor antes de escolher."
      },
      {
        "nome": "Conjunto short-saia + blusa frente única decotada",
        "preco": "R$ 39,99",
        "url": "https://s.shopee.com.br/1BOCEZHK6W",
        "dica": "Confira medidas de cada peça, tecido e opções de cor antes de escolher."
      },
      {
        "nome": "Vestido curto com babadinhos, decote e bojo",
        "preco": "R$ 56,90 a 61,90",
        "url": "https://s.shopee.com.br/9pgAYY5Wsg",
        "dica": "Confira comprimento, tecido, forro e tabela de medidas do vendedor."
      },
      {
        "nome": "Vestido curto tricot modal listrado tomara que caia",
        "preco": "R$ 55,00",
        "url": "https://s.shopee.com.br/9KjtxfSYOP",
        "dica": "Confira comprimento, tecido, forro e tabela de medidas do vendedor."
      },
      {
        "nome": "Conjunto crepe Duna frente única estilo macaquinho",
        "preco": "R$ 45,00",
        "url": "https://s.shopee.com.br/W8VRTz2S4",
        "dica": "Confira medidas de cada peça, tecido e opções de cor antes de escolher."
      },
      {
        "nome": "Conjunto Duna blusa frente única + short-saia boho chic",
        "preco": "R$ 58,00",
        "url": "https://s.shopee.com.br/BVf2w74wE",
        "dica": "Confira medidas de cada peça, tecido e opções de cor antes de escolher."
      },
      {
        "nome": "Conjunto Duna 3 peças cropped + capa + short-saia",
        "preco": "R$ 45,00",
        "url": "https://s.shopee.com.br/5VXBOm7xxp",
        "dica": "Confira medidas de cada peça, tecido e opções de cor antes de escolher."
      },
      {
        "nome": "Sandália feminina plataforma tamanco flat",
        "preco": "R$ 74,99",
        "url": "https://s.shopee.com.br/qlLqLHhEv",
        "dica": "Verifique material, tamanho e avaliações com fotos antes da compra."
      },
      {
        "nome": "Conjunto blusa floral sem mangas + shorts lisos",
        "preco": "R$ 62,99",
        "url": "https://s.shopee.com.br/2qWQE2nl14",
        "dica": "Confira medidas de cada peça, tecido e opções de cor antes de escolher."
      },
      {
        "nome": "Conjunto Antonela short-saia + blusa assimétrica",
        "preco": "R$ 64,90",
        "url": "https://s.shopee.com.br/7KypaMZfzd",
        "dica": "Confira medidas de cada peça, tecido e opções de cor antes de escolher."
      },
      {
        "nome": "Conjunto alfaiataria tomara que caia + calça pantalona",
        "preco": "R$ 102,60",
        "url": "https://s.shopee.com.br/8AXwZvIUtt",
        "dica": "Confira medidas de cada peça, tecido e opções de cor antes de escolher."
      },
      {
        "nome": "Vestido curto babado busto meia-taça para balada",
        "preco": "R$ 63,00",
        "url": "https://s.shopee.com.br/114m2oHppN",
        "dica": "Confira comprimento, tecido, forro e tabela de medidas do vendedor."
      },
      {
        "nome": "Vestido curto de tule com body Mini Gigi",
        "preco": "R$ 48,79",
        "url": "https://s.shopee.com.br/qlLqYyqHl",
        "dica": "Confira comprimento, tecido, forro e tabela de medidas do vendedor."
      },
      {
        "nome": "Conjunto Yasminyy",
        "preco": "R$ 70,00",
        "url": "https://s.shopee.com.br/4LLE13Jurs",
        "dica": "Confira medidas de cada peça, tecido e opções de cor antes de escolher."
      },
      {
        "nome": "Vestido curto ajustado com amarração na cintura e plissado",
        "preco": "R$ 121,60",
        "url": "https://s.shopee.com.br/2gD021uBN6",
        "dica": "Confira comprimento, tecido, forro e tabela de medidas do vendedor."
      },
      {
        "nome": "Conjunto Agnes em renda cropped + saia curta",
        "preco": "R$ 64,90",
        "url": "https://s.shopee.com.br/9073Zi03vv",
        "dica": "Confira medidas de cada peça, tecido e opções de cor antes de escolher."
      },
      {
        "nome": "Blusa cropped suplex manga longa com amarração lateral",
        "preco": "R$ 35,01",
        "url": "https://s.shopee.com.br/3g5XDwjxJj",
        "dica": "Verifique material, tamanho e avaliações com fotos antes da compra."
      },
      {
        "nome": "Vestido alfaiataria tomara que caia com babado Barbei",
        "preco": "R$ 65,94",
        "url": "https://s.shopee.com.br/9pgAZKGrvD",
        "dica": "Confira comprimento, tecido, forro e tabela de medidas do vendedor."
      },
      {
        "nome": "Conjunto Tropicana com zíper frontal, amarração e ilhós",
        "preco": "R$ 67,99",
        "url": "https://s.shopee.com.br/3g5XE3lfLy",
        "dica": "Confira medidas de cada peça, tecido e opções de cor antes de escolher."
      },
      {
        "nome": "Vestido frente única com renda francesa",
        "preco": "R$ 85,50",
        "url": "https://s.shopee.com.br/9zzalmH8UO",
        "dica": "Confira comprimento, tecido, forro e tabela de medidas do vendedor."
      },
      {
        "nome": "Vestido sem alças com manga longa de renda marrom",
        "preco": "R$ 132,05",
        "url": "https://s.shopee.com.br/6AmsCmypkY",
        "dica": "Confira comprimento, tecido, forro e tabela de medidas do vendedor."
      },
      {
        "nome": "Conjunto Liv cropped tomara que caia + saia com cinto",
        "preco": "R$ 79,99",
        "url": "https://s.shopee.com.br/5qA1oETgln",
        "dica": "Confira medidas de cada peça, tecido e opções de cor antes de escolher."
      },
      {
        "nome": "Macaquinho Bia alças finas e costas trançadas",
        "preco": "R$ 49,00 a 64,60",
        "url": "https://s.shopee.com.br/2gD02T9KXZ",
        "dica": "Confira medidas de cada peça, tecido e opções de cor antes de escolher."
      },
      {
        "nome": "Vestido curto com franjas Tobinoone",
        "preco": "R$ 91,20",
        "url": "https://s.shopee.com.br/1qdt33NDar",
        "dica": "Confira comprimento, tecido, forro e tabela de medidas do vendedor."
      },
      {
        "nome": "Vestido Rubi brilhante",
        "preco": "R$ 123,50",
        "url": "https://s.shopee.com.br/1CErjFr5N",
        "dica": "Confira comprimento, tecido, forro e tabela de medidas do vendedor."
      },
      {
        "nome": "Conjunto de tule",
        "preco": "R$ 142,50",
        "url": "https://s.shopee.com.br/2La9e3JMaS",
        "dica": "Confira medidas de cada peça, tecido e opções de cor antes de escolher."
      },
      {
        "nome": "Vestido jeans Kissmelady 8337/8507 com brilho",
        "preco": "R$ 85,08",
        "url": "https://s.shopee.com.br/5LDlDbOK1L",
        "dica": "Confira comprimento, tecido, forro e tabela de medidas do vendedor."
      },
      {
        "nome": "Conjunto colete cropped + saia-short alfaiataria",
        "preco": "R$ 114,00",
        "url": "https://s.shopee.com.br/9zzamFisgC",
        "dica": "Confira medidas de cada peça, tecido e opções de cor antes de escolher."
      },
      {
        "nome": "Acessório corporal de correntes e strass dourado",
        "preco": "R$ 18,01",
        "url": "https://s.shopee.com.br/4LLE1syqIo",
        "dica": "Verifique material, tamanho e avaliações com fotos antes da compra."
      },
      {
        "nome": "Conjunto alfaiataria tomara que caia + short",
        "preco": "R$ 94,05",
        "url": "https://s.shopee.com.br/3qOxR1qT37",
        "dica": "Confira medidas de cada peça, tecido e opções de cor antes de escolher."
      },
      {
        "nome": "Conjunto alfaiataria regata peplum + short cerejinhas",
        "preco": "R$ 78,38 a 79,99",
        "url": "https://s.shopee.com.br/20xJFi9Mj5",
        "dica": "Confira medidas de cada peça, tecido e opções de cor antes de escolher."
      },
      {
        "nome": "Vestido curto cetim premium drapeado para festa",
        "preco": "R$ 80,75",
        "url": "https://s.shopee.com.br/3Vm72X6N1l",
        "dica": "Confira comprimento, tecido, forro e tabela de medidas do vendedor."
      },
      {
        "nome": "Vestido midi de tule em camadas assimétricas",
        "preco": "R$ 111,15",
        "url": "https://s.shopee.com.br/60TS1FpDpV",
        "dica": "Confira comprimento, tecido, forro e tabela de medidas do vendedor."
      },
      {
        "nome": "Macacão frente única com argola estilo Aladim",
        "preco": "R$ 98,90",
        "url": "https://s.shopee.com.br/2BGjTaQkEK",
        "dica": "Confira medidas de cada peça, tecido e opções de cor antes de escolher."
      },
      {
        "nome": "Conjunto tricot modal cropped + saia multiformas",
        "preco": "R$ 79,21",
        "url": "https://s.shopee.com.br/9zzao28you",
        "dica": "Confira medidas de cada peça, tecido e opções de cor antes de escolher."
      },
      {
        "nome": "Vestido curto tricot modal listrado com fenda lateral",
        "preco": "R$ 59,90",
        "url": "https://s.shopee.com.br/7AfPQsIUAe",
        "dica": "Confira comprimento, tecido, forro e tabela de medidas do vendedor."
      },
      {
        "nome": "Vestido sereia branco off-white crochê com franjas",
        "preco": "R$ 379,00",
        "url": "https://s.shopee.com.br/6AmsF4yfZR",
        "dica": "Confira comprimento, tecido, forro e tabela de medidas do vendedor."
      },
      {
        "nome": "Vestido curto renda manga longa gola alta com recorte",
        "preco": "R$ 139,99",
        "url": "https://s.shopee.com.br/2La9g5GraM",
        "dica": "Confira comprimento, tecido, forro e tabela de medidas do vendedor."
      },
      {
        "nome": "Vestido curto chiffon manga longa com forro",
        "preco": "R$ 76,89",
        "url": "https://s.shopee.com.br/80EWQXpg9T",
        "dica": "Confira comprimento, tecido, forro e tabela de medidas do vendedor."
      },
      {
        "nome": "Conjunto tricot crochê cropped + saia com franjas",
        "preco": "R$ 79,99",
        "url": "https://s.shopee.com.br/60TS30BjEm",
        "dica": "Confira medidas de cada peça, tecido e opções de cor antes de escolher."
      },
      {
        "nome": "Top tomara que caia Luxury",
        "preco": "R$ 260,00",
        "url": "https://s.shopee.com.br/8VAn1djKf9",
        "dica": "Verifique material, tamanho e avaliações com fotos antes da compra."
      },
      {
        "nome": "Conjunto cropped com brilho + short-saia festa",
        "preco": "R$ 79,89 a 79,90",
        "url": "https://s.shopee.com.br/AAJ10lfMIR",
        "dica": "Confira medidas de cada peça, tecido e opções de cor antes de escolher."
      },
      {
        "nome": "Vestido Lovito cáqui casual evasê gola U",
        "preco": "R$ 59,90",
        "url": "https://s.shopee.com.br/5AuL3dANe0",
        "dica": "Confira comprimento, tecido, forro e tabela de medidas do vendedor."
      },
      {
        "nome": "Vestido midi tricot modal listrado costas trançadas",
        "preco": "R$ 59,99",
        "url": "https://s.shopee.com.br/5AuL3fnVuV",
        "dica": "Confira comprimento, tecido, forro e tabela de medidas do vendedor."
      }
    ]
  },
  {
    "id": "pin-46-achadinhos-mercado-livre-2026",
    "slug": "46-achadinhos-mercado-livre-tecnologia-casa-2026",
    "locale": "pt",
    "titulo": "46 Achadinhos do Mercado Livre: TVs, Celulares, Casa e Eletrodomésticos",
    "descricao": "Explore 46 produtos do Mercado Livre: TVs 4K, celulares Samsung e Motorola, notebooks, videogames, air fryers, geladeiras, ar-condicionado, ferramentas e itens para casa. Veja dicas para comparar modelos, voltagem, garantia e frete antes de comprar. Preços e disponibilidade podem mudar; confira sempre o anúncio.",
    "imagem": "/assets/images/IMG-20261124-WA1903.jpg",
    "destaque": true,
    "categoriaId": "ofertas",
    "publicadoEm": "2026-11-24",
    "tags": [
      "achadinhos Mercado Livre",
      "46 ofertas Mercado Livre",
      "eletrônicos",
      "smart TV 4K",
      "celulares Samsung",
      "notebooks",
      "PlayStation 5 Pro",
      "Nintendo Switch 2",
      "air fryer",
      "geladeira",
      "ar-condicionado inverter",
      "ferramentas",
      "eletrodomésticos",
      "produtos para casa",
      "ideias de presentes",
      "comparar preços"
    ],
    "dicaUso": "Guia de compra: em eletrônicos, confira memória, modelo e garantia; em eletrodomésticos, tensão (127 V ou 220 V), medidas e consumo; em ferramentas, acessórios e capacidade. Compare o preço total com frete e a reputação do vendedor. Os links podem gerar comissão de afiliado, sem custo extra informado ao comprador.",
    "links": [
      {
        "nome": "Smart TV AOC 50 polegadas Roku 4K 50U7066",
        "preco": "Consultar preço",
        "url": "https://meli.la/2y6P5Gh",
        "dica": "Compare resolução, sistema, conexões HDMI e medidas da tela com o espaço disponível."
      },
      {
        "nome": "Notebook Samsung Galaxy Book Go",
        "preco": "Consultar preço",
        "url": "https://meli.la/2ocfXww",
        "dica": "Confira memória, armazenamento, versão exata e garantia antes de escolher."
      },
      {
        "nome": "Nintendo Switch 2 + EA Sports FC 27",
        "preco": "Consultar preço",
        "url": "https://meli.la/24GBvCV",
        "dica": "Confira edição, acessórios, jogos incluídos e condições da garantia."
      },
      {
        "nome": "Notebook Acer Aspire Go 15 i3-1215U 8GB 256GB",
        "preco": "Consultar preço",
        "url": "https://meli.la/11t7FQb",
        "dica": "Confira memória, armazenamento, versão exata e garantia antes de escolher."
      },
      {
        "nome": "Samsung Galaxy Tab S10 FE 128GB",
        "preco": "Consultar preço",
        "url": "https://meli.la/33RMxq5",
        "dica": "Confira memória, armazenamento, versão exata e garantia antes de escolher."
      },
      {
        "nome": "Samsung Galaxy Z Flip7 5G 256GB",
        "preco": "Consultar preço",
        "url": "https://meli.la/1ruavWW",
        "dica": "Confira memória, armazenamento, versão exata e garantia antes de escolher."
      },
      {
        "nome": "PlayStation 5 Pro 2TB",
        "preco": "Consultar preço",
        "url": "https://meli.la/1hheyLG",
        "dica": "Confira edição, acessórios, jogos incluídos e condições da garantia."
      },
      {
        "nome": "Samsung Galaxy S26 5G 256GB 12GB RAM",
        "preco": "Consultar preço",
        "url": "https://meli.la/1CXYdrK",
        "dica": "Confira memória, armazenamento, versão exata e garantia antes de escolher."
      },
      {
        "nome": "PlayStation 4 com mais de 20 jogos e 2 controles",
        "preco": "Consultar preço",
        "url": "https://meli.la/2CAAWNY",
        "dica": "Confira edição, acessórios, jogos incluídos e condições da garantia."
      },
      {
        "nome": "Controle sem fio Xbox Series X/S Robot",
        "preco": "Consultar preço",
        "url": "https://meli.la/2TkjGrw",
        "dica": "Confira edição, acessórios, jogos incluídos e condições da garantia."
      },
      {
        "nome": "Motorola Moto G17 128GB 4G",
        "preco": "Consultar preço",
        "url": "https://meli.la/2eTY8cm",
        "dica": "Confira memória, armazenamento, versão exata e garantia antes de escolher."
      },
      {
        "nome": "Smart TV Philco 32 polegadas Roku P32VIK",
        "preco": "Consultar preço",
        "url": "https://meli.la/1dfdsj3",
        "dica": "Compare resolução, sistema, conexões HDMI e medidas da tela com o espaço disponível."
      },
      {
        "nome": "Teclado mecânico sem fio RGB tri-mode com tela",
        "preco": "Consultar preço",
        "url": "https://meli.la/1smkcce",
        "dica": "Confira medidas, especificações, avaliações e o que acompanha o produto."
      },
      {
        "nome": "Ar-condicionado Split Prime Air 9FC 9.000 BTU/h",
        "preco": "R$ 1.484",
        "url": "https://meli.la/1gPSLva",
        "dica": "Verifique BTUs adequados ao ambiente, tensão elétrica, instalação e consumo."
      },
      {
        "nome": "Geladeira HQ duplex 230 litros HQ230RDFS",
        "preco": "Consultar preço",
        "url": "https://meli.la/11Zyp1c",
        "dica": "Confira dimensões, capacidade útil, abertura da porta e voltagem."
      },
      {
        "nome": "Air Fryer Britânia 6,5L digital BAF65A",
        "preco": "Consultar preço",
        "url": "https://meli.la/1qCTewJ",
        "dica": "Compare capacidade, potência, tensão e espaço disponível na bancada."
      },
      {
        "nome": "Micro-ondas Electrolux Efficient 20L ME20B",
        "preco": "Consultar preço",
        "url": "https://meli.la/32Gonwh",
        "dica": "Compare capacidade, potência, tensão e espaço disponível na bancada."
      },
      {
        "nome": "Fritadeira forno Mondial Oven 12L AFON-12L-BG",
        "preco": "Consultar preço",
        "url": "https://meli.la/2NRq1Cz",
        "dica": "Compare capacidade, potência, tensão e espaço disponível na bancada."
      },
      {
        "nome": "Air Fryer Philco 6,5L Glass PAF65A 127V",
        "preco": "Consultar preço",
        "url": "https://meli.la/1vsEoeo",
        "dica": "Compare capacidade, potência, tensão e espaço disponível na bancada."
      },
      {
        "nome": "Ar-condicionado Midea AI Ecomaster Inverter 9.000 BTUs",
        "preco": "Consultar preço",
        "url": "https://meli.la/2TYPMkM",
        "dica": "Verifique BTUs adequados ao ambiente, tensão elétrica, instalação e consumo."
      },
      {
        "nome": "Mixer EOS EMX02 600W",
        "preco": "Consultar preço",
        "url": "https://meli.la/2Sz8etz",
        "dica": "Compare capacidade, potência, tensão e espaço disponível na bancada."
      },
      {
        "nome": "Marmita elétrica portátil 1,05L bivolt",
        "preco": "Consultar preço",
        "url": "https://meli.la/2aiqj9U",
        "dica": "Confira medidas, especificações, avaliações e o que acompanha o produto."
      },
      {
        "nome": "Descascador de alho elétrico automático",
        "preco": "Consultar preço",
        "url": "https://meli.la/1RbcNEJ",
        "dica": "Confira medidas, especificações, avaliações e o que acompanha o produto."
      },
      {
        "nome": "Sanduicheira Cadence SanduGrill SAN230",
        "preco": "Consultar preço",
        "url": "https://meli.la/11ktCMP",
        "dica": "Compare capacidade, potência, tensão e espaço disponível na bancada."
      },
      {
        "nome": "Ar-condicionado LG Inverter Smart Voice AI 12.000 BTUs",
        "preco": "Consultar preço",
        "url": "https://meli.la/2xDcS5f",
        "dica": "Verifique BTUs adequados ao ambiente, tensão elétrica, instalação e consumo."
      },
      {
        "nome": "Climatizador portátil Luxside 600ml",
        "preco": "Consultar preço",
        "url": "https://meli.la/15SREoG",
        "dica": "Confira medidas, especificações, avaliações e o que acompanha o produto."
      },
      {
        "nome": "Kit 3 pendentes retrô Nordic Judaluz",
        "preco": "Consultar preço",
        "url": "https://meli.la/1JLyEvk",
        "dica": "Confira medidas, especificações, avaliações e o que acompanha o produto."
      },
      {
        "nome": "Ventilador Mondial Super Power VSP40C 40cm",
        "preco": "Consultar preço",
        "url": "https://meli.la/1RYUNtA",
        "dica": "Confira medidas, especificações, avaliações e o que acompanha o produto."
      },
      {
        "nome": "Liquidificador Philco PH900 1200W 3L",
        "preco": "Consultar preço",
        "url": "https://meli.la/1FsBhN7",
        "dica": "Compare capacidade, potência, tensão e espaço disponível na bancada."
      },
      {
        "nome": "Geladeira duplex RT554 410L Inverter",
        "preco": "Consultar preço",
        "url": "https://meli.la/29hHkmJ",
        "dica": "Confira dimensões, capacidade útil, abertura da porta e voltagem."
      },
      {
        "nome": "Limpadora de pisos sem fio Arno X-Clean 4",
        "preco": "Consultar preço",
        "url": "https://meli.la/2zQx3UP",
        "dica": "Confira medidas, especificações, avaliações e o que acompanha o produto."
      },
      {
        "nome": "Torneira gourmet monocomando Holtter retrátil",
        "preco": "Consultar preço",
        "url": "https://meli.la/1riP96f",
        "dica": "Confira medidas, especificações, avaliações e o que acompanha o produto."
      },
      {
        "nome": "Carregador inteligente 12V 6A bivolt para baterias",
        "preco": "Consultar preço",
        "url": "https://meli.la/1teCnwb",
        "dica": "Confira medidas, especificações, avaliações e o que acompanha o produto."
      },
      {
        "nome": "Caixa de som LG XBOOM XG8T Bluetooth",
        "preco": "Consultar preço",
        "url": "https://meli.la/2H4Hs7t",
        "dica": "Confira medidas, especificações, avaliações e o que acompanha o produto."
      },
      {
        "nome": "Patinete elétrico dobrável 350W com aplicativo e GPS",
        "preco": "Consultar preço",
        "url": "https://meli.la/2PUXzPD",
        "dica": "Confira medidas, especificações, avaliações e o que acompanha o produto."
      },
      {
        "nome": "Robô aspirador WAP W200 3 em 1",
        "preco": "Consultar preço",
        "url": "https://meli.la/1vnWn37",
        "dica": "Confira medidas, especificações, avaliações e o que acompanha o produto."
      },
      {
        "nome": "Lavadora de alta pressão Kärcher 1.500 PSI 1400W",
        "preco": "Consultar preço",
        "url": "https://meli.la/296sLDF",
        "dica": "Confira especificações, acessórios incluídos e compatibilidade com a tarefa."
      },
      {
        "nome": "Parafusadeira e furadeira WAP WF12K3.2 12V",
        "preco": "Consultar preço",
        "url": "https://meli.la/26Jrvai",
        "dica": "Confira especificações, acessórios incluídos e compatibilidade com a tarefa."
      },
      {
        "nome": "Parafusadeira de impacto Inova Cases SCR-12948 12V",
        "preco": "Consultar preço",
        "url": "https://meli.la/2siDah6",
        "dica": "Confira especificações, acessórios incluídos e compatibilidade com a tarefa."
      },
      {
        "nome": "Aparador de pelos Kemei KM-6776 3 em 1",
        "preco": "Consultar preço",
        "url": "https://meli.la/2whaJ4n",
        "dica": "Confira medidas, especificações, avaliações e o que acompanha o produto."
      },
      {
        "nome": "Ventilador de teto LED E26/E27 com controle remoto",
        "preco": "Consultar preço",
        "url": "https://meli.la/2Caox4Y",
        "dica": "Confira medidas, especificações, avaliações e o que acompanha o produto."
      },
      {
        "nome": "Babá eletrônica Motorola PIP1510 HD Wi-Fi",
        "preco": "Consultar preço",
        "url": "https://meli.la/1Ur3uxx",
        "dica": "Confira medidas, especificações, avaliações e o que acompanha o produto."
      },
      {
        "nome": "Macaco hidráulico tipo garrafa 2 toneladas",
        "preco": "Consultar preço",
        "url": "https://meli.la/1MM4DSH",
        "dica": "Confira especificações, acessórios incluídos e compatibilidade com a tarefa."
      },
      {
        "nome": "Parafusadeira sem fio The Black Tools com maleta",
        "preco": "Consultar preço",
        "url": "https://meli.la/1aDGmGb",
        "dica": "Confira especificações, acessórios incluídos e compatibilidade com a tarefa."
      },
      {
        "nome": "Aspirador de pó e água WAP GTW 10 1400W",
        "preco": "Consultar preço",
        "url": "https://meli.la/1e2WrBW",
        "dica": "Confira especificações, acessórios incluídos e compatibilidade com a tarefa."
      },
      {
        "nome": "Escova elétrica de limpeza DeckCasa JY-6010",
        "preco": "Consultar preço",
        "url": "https://meli.la/1c4bCpp",
        "dica": "Confira medidas, especificações, avaliações e o que acompanha o produto."
      }
    ]
  },
  {
    "id": "pin-garrafas-termicas-shopee-2026",
    "slug": "garrafas-copos-termicos-achadinhos-shopee-2026",
    "locale": "pt",
    "titulo": "64 Garrafas e Copos Térmicos: Achadinhos na Shopee a partir de R$ 24",
    "descricao": "Seleção de garrafas e copos térmicos para academia, trabalho, escola e viagens: modelos inox, florais, infantis, personalizados, com canudo, alça e kits. Valores informados em 24/11/2026 e sujeitos a alterações. Confira o preço final e as características no anúncio da Shopee.",
    "imagem": "/assets/images/pin-garrafas.jpg",
    "destaque": true,
    "categoriaId": "ofertas",
    "publicadoEm": "2026-11-24",
    "tags": [
      "Garrafas térmicas",
      "Copos térmicos",
      "Shopee",
      "Achadinhos",
      "Academia",
      "Infantil",
      "Presentes"
    ],
    "links": [
      {
        "nome": "Garrafa térmica inox 550ml",
        "preco": "R$ 31,99 - 33,99",
        "url": "https://s.shopee.com.br/20xHVfrAUz"
      },
      {
        "nome": "ROMANTIC CROWN copo 1200/600ml",
        "preco": "R$ 34,98 - 49,98",
        "url": "https://s.shopee.com.br/7KynrUFH2v"
      },
      {
        "nome": "ROMANTIC CROWN garrafa 800ml",
        "preco": "R$ 44,98 - 44,99",
        "url": "https://s.shopee.com.br/qlK7YZHgB"
      },
      {
        "nome": "Copo térmico personalizado 1200ml",
        "preco": "R$ 39,90 - 79,90",
        "url": "https://s.shopee.com.br/5AuJHYMNZc"
      },
      {
        "nome": "MODUS garrafa térmica 2,4 litros",
        "preco": "R$ 146,28 - 199,99",
        "url": "https://s.shopee.com.br/9zzZ2RptYf"
      },
      {
        "nome": "Garrafa floral 1200ml com base silicone",
        "preco": "R$ 46,99",
        "url": "https://s.shopee.com.br/9V3IRXnPKk"
      },
      {
        "nome": "WATERSY garrafa 500ml",
        "preco": "R$ 27,98 - 59,00",
        "url": "https://s.shopee.com.br/8fUBS1UB3g"
      },
      {
        "nome": "Kit bolsa térmica, garrafa e marmita",
        "preco": "R$ 138,70 - 171,90",
        "url": "https://s.shopee.com.br/1LhaiYiYmk"
      },
      {
        "nome": "Garrafa térmica flip 900ml",
        "preco": "R$ 36,70 - 38,99",
        "url": "https://s.shopee.com.br/6VPgs46t8r"
      },
      {
        "nome": "ROMANTIC CROWN copo flip 1200ml",
        "preco": "R$ 49,98",
        "url": "https://s.shopee.com.br/6fj74NoBN4"
      },
      {
        "nome": "Copo térmico floral 1200ml com canudo",
        "preco": "R$ 49,99 - 52,99",
        "url": "https://s.shopee.com.br/1qdrJW1qb1"
      },
      {
        "nome": "Copo inox portátil 1200ml sem logo",
        "preco": "R$ 43,99",
        "url": "https://s.shopee.com.br/1LhaibyoHA"
      },
      {
        "nome": "GAW Sport squeeze inox 500ml",
        "preco": "R$ 35,90",
        "url": "https://s.shopee.com.br/4B1m5pisNm"
      },
      {
        "nome": "MODUS esportiva 750ml com paracord",
        "preco": "R$ 39,99 - 59,99",
        "url": "https://s.shopee.com.br/70LxT3gxyH"
      },
      {
        "nome": "Kit garrafa 500ml e três xícaras",
        "preco": "R$ 26,98 - 31,98",
        "url": "https://s.shopee.com.br/5fqZse7AEl"
      },
      {
        "nome": "ROMANTIC CROWN garrafa 800ml (outra oferta)",
        "preco": "R$ 44,98 - 44,99",
        "url": "https://s.shopee.com.br/80EUewxSwj"
      },
      {
        "nome": "Hilee Free Sip inox 304",
        "preco": "R$ 79,00 - 94,00",
        "url": "https://s.shopee.com.br/9AQS371pc4"
      },
      {
        "nome": "Garrafa inox 900/1700ml com alça",
        "preco": "R$ 56,99",
        "url": "https://s.shopee.com.br/BVdKadg2L"
      },
      {
        "nome": "WATERSY copo térmico 591ml",
        "preco": "R$ 25,99 - 44,80",
        "url": "https://s.shopee.com.br/qlK7qAPjs"
      },
      {
        "nome": "Garrafa infantil 500/520ml com canudo",
        "preco": "R$ 30,90 - 43,90",
        "url": "https://s.shopee.com.br/1W10v52w3W"
      },
      {
        "nome": "Garrafa esportiva 32 oz",
        "preco": "R$ 41,30 - 62,00",
        "url": "https://s.shopee.com.br/2La7ud3te7"
      },
      {
        "nome": "Garrafa infantil inox 550ml",
        "preco": "R$ 33,96 - 39,96",
        "url": "https://s.shopee.com.br/2gCyJG68r2"
      },
      {
        "nome": "TOURO garrafas 350 a 1000ml",
        "preco": "R$ 25,99 - 65,00",
        "url": "https://s.shopee.com.br/1BOAWWbqX9"
      },
      {
        "nome": "Termolar garrafão térmico 5 litros",
        "preco": "R$ 52,99 - 55,99",
        "url": "https://s.shopee.com.br/5VX9gVPLTC"
      },
      {
        "nome": "ROMANTIC CROWN copo portátil 1200/600ml",
        "preco": "R$ 34,99 - 49,99",
        "url": "https://s.shopee.com.br/5VX9fsFBO8"
      },
      {
        "nome": "Garrafa inox com proteção silicone 350 a 1000ml",
        "preco": "R$ 31,99 - 37,99",
        "url": "https://s.shopee.com.br/8VAlFaPAvQ"
      },
      {
        "nome": "Garrafa floral 1200ml (outra oferta)",
        "preco": "R$ 52,99",
        "url": "https://s.shopee.com.br/6AmqTJTK4s"
      },
      {
        "nome": "Garrafa aesthetic floral 800ml",
        "preco": "R$ 63,90",
        "url": "https://s.shopee.com.br/2VtY7MWM9k"
      },
      {
        "nome": "Copo térmico strass 1200ml",
        "preco": "R$ 74,88 - 78,89",
        "url": "https://s.shopee.com.br/3B9Eubtg0q"
      },
      {
        "nome": "Garrafa fofa 700ml com dois bicos",
        "preco": "R$ 45,80 - 46,80",
        "url": "https://s.shopee.com.br/9071rLK0DH"
      },
      {
        "nome": "MODUS esportiva 1 litro a vácuo",
        "preco": "R$ 69,99 - 79,99",
        "url": "https://s.shopee.com.br/AKcPRo5iuc"
      },
      {
        "nome": "Garrafa onça preta 600ml",
        "preco": "R$ 59,90",
        "url": "https://s.shopee.com.br/3B9EueNK1d"
      },
      {
        "nome": "Garrafa laço rosa 900ml",
        "preco": "R$ 65,90",
        "url": "https://s.shopee.com.br/9zzZ3DbJkN"
      },
      {
        "nome": "Copo térmico 600ml com alça",
        "preco": "R$ 38,00 - 45,00",
        "url": "https://s.shopee.com.br/9fMiecKaGn"
      },
      {
        "nome": "UCOCOLLA Monet Garden 750ml",
        "preco": "R$ 54,90 - 64,90",
        "url": "https://s.shopee.com.br/1gKR7vWy4D"
      },
      {
        "nome": "Copo Stray Kids K-pop 1200ml",
        "preco": "R$ 75,00 - 90,00",
        "url": "https://s.shopee.com.br/W8TjoNXV1"
      },
      {
        "nome": "Garrafa glitter arco-íris",
        "preco": "R$ 36,99 - 56,90",
        "url": "https://s.shopee.com.br/9KjsG42ht5"
      },
      {
        "nome": "ROMANTIC CROWN kit dois copos",
        "preco": "R$ 79,98",
        "url": "https://s.shopee.com.br/5fqZtLBNeq"
      },
      {
        "nome": "KUBB garrafa personalizada 420 a 1050ml",
        "preco": "R$ 59,90 - 95,90",
        "url": "https://s.shopee.com.br/1W10vh9imF"
      },
      {
        "nome": "Garrafa tropical aves 1200ml",
        "preco": "R$ 52,99",
        "url": "https://s.shopee.com.br/114kKmtU5H"
      },
      {
        "nome": "CIVAGO copo 770ml interior cerâmico",
        "preco": "R$ 79,99",
        "url": "https://s.shopee.com.br/Lp3XZVHyA"
      },
      {
        "nome": "Garrafa kawaii 500ml com canudo",
        "preco": "R$ 33,00 - 68,12",
        "url": "https://s.shopee.com.br/8KrL4Hipa3"
      },
      {
        "nome": "CIVAGO fashion 770ml com pingente",
        "preco": "R$ 79,99",
        "url": "https://s.shopee.com.br/6AmqUJmH7m"
      },
      {
        "nome": "Garrafa infantil 530ml inox 304",
        "preco": "R$ 54,99 - 59,98",
        "url": "https://s.shopee.com.br/1LhajRiCka"
      },
      {
        "nome": "Copo floral blogueirinho 1200ml",
        "preco": "R$ 74,00 - 120,00",
        "url": "https://s.shopee.com.br/114kKqN4QS"
      },
      {
        "nome": "Copo floral inox 304 1 litro",
        "preco": "R$ 64,98 - 74,98",
        "url": "https://s.shopee.com.br/9pg8r5XRMe"
      },
      {
        "nome": "Garrafa inox 316L 750ml com flor",
        "preco": "R$ 45,99 - 65,99",
        "url": "https://s.shopee.com.br/6VPgsyfKGR"
      },
      {
        "nome": "Garrafa fashion estampada 1 litro",
        "preco": "R$ 64,98 - 74,98",
        "url": "https://s.shopee.com.br/4VecVK3n60"
      },
      {
        "nome": "Garrafa infantil desenhada 500ml",
        "preco": "R$ 40,80",
        "url": "https://s.shopee.com.br/4qHStxFf42"
      },
      {
        "nome": "Garrafa Hello Kitty 900ml",
        "preco": "R$ 69,99",
        "url": "https://s.shopee.com.br/60TQI7FHfV"
      },
      {
        "nome": "Copo Hello Kitty 1200ml",
        "preco": "R$ 50,63 - 59,99",
        "url": "https://s.shopee.com.br/30poic8ha3"
      },
      {
        "nome": "Hilee coleção cachorros fofos",
        "preco": "R$ 79,00 - 89,00",
        "url": "https://s.shopee.com.br/Lp3XjINgQ"
      },
      {
        "nome": "Copo Snoopy 900ml",
        "preco": "R$ 69,99",
        "url": "https://s.shopee.com.br/9zzZ3VTyfz"
      },
      {
        "nome": "Garrafa Sonic LED 500ml",
        "preco": "R$ 24,00 - 50,00",
        "url": "https://s.shopee.com.br/2VtY7jrrdP"
      },
      {
        "nome": "Garrafa cerejas 900ml",
        "preco": "R$ 65,90",
        "url": "https://s.shopee.com.br/5fqZtZfP7f"
      },
      {
        "nome": "Garrafa LED personalizada 500ml",
        "preco": "R$ 33,55 - 37,88",
        "url": "https://s.shopee.com.br/2qWOWNy6Yb"
      },
      {
        "nome": "Garrafa leopardo 800ml",
        "preco": "R$ 65,90",
        "url": "https://s.shopee.com.br/1qdrKYfVeo"
      },
      {
        "nome": "Garrafa tigre 800ml",
        "preco": "R$ 65,90",
        "url": "https://s.shopee.com.br/5VX9hJR99S"
      },
      {
        "nome": "Squeeze Três Palavrinhas personalizada",
        "preco": "R$ 39,90 - 75,90",
        "url": "https://s.shopee.com.br/9zzZ3bIp6Y"
      },
      {
        "nome": "Garrafa personalizada laser 800ml",
        "preco": "R$ 39,90 - 53,00",
        "url": "https://s.shopee.com.br/1Lhajh2gHA"
      },
      {
        "nome": "Garrafa cereja feminina 800ml",
        "preco": "R$ 57,99",
        "url": "https://s.shopee.com.br/6AmqUab0Zt"
      },
      {
        "nome": "Garrafa com canudo 600 a 1000ml",
        "preco": "R$ 49,69 - 67,49",
        "url": "https://s.shopee.com.br/6fj75Wly7z"
      },
      {
        "nome": "Garrafa infantil escolar com trava 350ml",
        "preco": "R$ 38,53",
        "url": "https://s.shopee.com.br/3B9Ev72oBK"
      },
      {
        "nome": "Copo Stitch 900ml",
        "preco": "R$ 69,99",
        "url": "https://s.shopee.com.br/9pg8rO3psv"
      }
    ]
  },

  {
    id: "pin-brinquedos-rafa-2026",
    slug: "brinquedos-achadinhos-mercadolivre-2026",
    locale: "pt",
    titulo: "33 Brinquedos e Pelúcias: Achadinhos a partir de R$ 15 no Mercado Livre",
    descricao: "33 Brinquedos e Pelúcias achadinhos no Mercado Livre a partir de R$ 15! Labubu, Stitch, capivaras, bonecas reborn, unicórnios e muito mais. Aproveite as promoções de 11/11 com descontos e cupons especiais. Presentes para crianças de todas as idades. Preços informados em 24/10/2026, sujeitos a alteração.",
    imagem: "/assets/images/pin brinquedos.png",
    destaque: true,
    categoriaId: "ofertas",
    publicadoEm: "2026-10-24",
    tags: ["Brinquedos", "Pelúcias", "Mercado Livre", "Presentes", "11.11", "Descontos", "Cupons", "Brinquedos Infantis", "Achadinhos", "Ofertas"],
    links: [
      { nome: "Labubu", preco: "R$ 15,00", url: "https://meli.la/2iAiQmd" },
      { nome: "Labubu Dragão Branco", preco: "R$ 66,80", url: "https://meli.la/2Lq6Fv2" },
      { nome: "Stitch", preco: "R$ 39,00", url: "https://meli.la/2nmVwLt" },
      { nome: "Xuxão Cachorro Gigante", preco: "R$ 78,00", url: "https://meli.la/2dLAL5o" },
      { nome: "Kitty Fada de Pelúcia", preco: "R$ 62,00", url: "https://meli.la/27e9eZm" },
      { nome: "4 Teletubbies", preco: "R$ 169,00", url: "https://meli.la/2NcDvWT" },
      { nome: "Pelúcia Pônei", preco: "R$ 587,00", url: "https://meli.la/1wsqCWN" },
      { nome: "Charizard", preco: "R$ 95,00", url: "https://meli.la/2qhH3zb" },
      { nome: "Capivara de Pelúcia", preco: "R$ 39,00", url: "https://meli.la/2fzRDj9" },
      { nome: "Cachorrinho de Pelúcia", preco: "R$ 28,00", url: "https://meli.la/1gdidDx" },
      { nome: "Unicórnio 30 cm", preco: "R$ 35,00", url: "https://meli.la/1vKb9oS" },
      { nome: "Labubu", preco: "R$ 133,00", url: "https://meli.la/2F3FZgm" },
      { nome: "Stitch Rosa", preco: "R$ 116,00", url: "https://meli.la/1qtHKH3" },
      { nome: "Ursos Bluey", preco: "R$ 80,00", url: "https://meli.la/1GXXmLt" },
      { nome: "Boneca Fada Bailarina", preco: "R$ 27,00", url: "https://meli.la/17g5cYL" },
      { nome: "Camaleão Enrolados", preco: "R$ 71,00", url: "https://meli.la/26Njo1Z" },
      { nome: "Urso Teddy Gigante 1,10 m", preco: "R$ 110,00", url: "https://meli.la/2wGtD2m" },
      { nome: "Xuxão Gato Gigante", preco: "R$ 98,00", url: "https://meli.la/2ZJjPgJ" },
      { nome: "6 Mini Bebês Reborn", preco: "R$ 65,00", url: "https://meli.la/29RXYmm" },
      { nome: "Boneca K-pop Lumi", preco: "R$ 59,00", url: "https://meli.la/2P243zx" },
      { nome: "Kit Cápsula Mini Baby", preco: "R$ 47,00", url: "https://meli.la/1mBgjwS" },
      { nome: "Cozinha Infantil", preco: "R$ 72,00", url: "https://meli.la/1RrsDRr" },
      { nome: "Pandy e Sereia, 2 Pelúcias", preco: "R$ 78,00", url: "https://meli.la/34fg2SJ" },
      { nome: "Touro de Pelúcia", preco: "R$ 36,00", url: "https://meli.la/2yMFv84" },
      { nome: "Kuromi", preco: "R$ 54,00", url: "https://meli.la/1k7Rc22" },
      { nome: "Cavalo de Pelúcia", preco: "R$ 109,00", url: "https://meli.la/2UjKDU9" },
      { nome: "Capivara Dançante", preco: "R$ 39,90", url: "https://meli.la/23ddixz" },
      { nome: "DJ Risonho", preco: "R$ 65,00", url: "https://meli.la/24vB9B8" },
      { nome: "Boneca Reborn", preco: "R$ 170,00", url: "https://meli.la/18WEo9M" },
      { nome: "Boneca Reborn Faz Xixi", preco: "R$ 123,00", url: "https://meli.la/1YzvBrP" },
      { nome: "Boneca Reborn Panda", preco: "R$ 220,00", url: "https://meli.la/2pamjKQ" },
      { nome: "Coruja Harry Potter", preco: "R$ 127,00", url: "https://meli.la/2gVhC3m" },
      { nome: "My Little Pony Fluttershy", preco: "R$ 56,00", url: "https://meli.la/1Muh4Tf" },
    ],
  },

   {
      id: "pin-jeans-pt",
      slug: "calcaspromocaocalcas-jeans-femininas-economicas-2026",
      locale: "pt",
      titulo: "Calças Jeans Femininas a partir de R$ 24,90: 20 modelos que empinham o bumbum",
      descricao: "wide leg, flare, cargo, skinny e mais. Selecionamos os melhores achados da Shopee com preço baixo, envio rápido e modelos que realmente valorizam a silhueta.",
      imagem: "/images/pin1.png",
      destaque: true,
      categoriaId: "moda-feminina",
      publicadoEm: "2026-07-22",
      tags: ["Destaque", "Tendência", "Moda Feminina"],
      dicaUso: "Perfeito para sair à noite, trabalho casual ou encontros. Combine com tênis branco ou sandália e ganhe um look moderno sem esforço.",
      links: [
       { nome: "Calça Jeans Feminina | Bazar Brechó Desapego usada", preco: "R$ 24,90", url: "https://s.shopee.com.br/4qEG7HYQVJ", dica: "Opção sustentável e super barata: brechó online com peças curadas. Vale a pena para quem quer estilo gastando pouco." },
       { nome: "calça wide leg jeans feminina levanta bumbum", preco: "R$ 29,90", url: "https://s.shopee.com.br/5fnN74lkgj", dica: "Modelo wide leg de cintura alta: alonga a silhueta e deixa o look equilibrado. Perfeita para sair ou trabalho casual." },
       { nome: "calça jeans feminina levanta bumbum cintura alta com lycra", preco: "R$ 36,90", url: "https://s.shopee.com.br/1Vxo9SwHGb", dica: "Com lycra, ela fica mais justa e confortável. Escolha se quer modeladora + conforto no mesmo lugar." },
       { nome: "calça jeans feminina preta grafite cintura alta empina bumbum", preco: "R$ 36,90", url: "https://s.shopee.com.br/4AyZKPbq6n", dica: "Cor grafite combina com tudo e passa impressão de mais cara. Use com blusa branca e tênis para um look clean." },
       { nome: "Calças Jogger Jeans Feminina Com Elástico Super Confortável Estilosa", preco: "R$ 39,99", url: "https://s.shopee.com.br/8AUi5ohfoR", dica: "Jogger é tendência conforto: elástico no tornozelo, caimento moderno. Ideal para dia a dia e viagens." },
       { nome: "calça jeans flare grafite feminina super empina bumbum tendência", preco: "R$ 41,99", url: "https://s.shopee.com.br/LlqlV9Kxg", dica: "Flare volta e meia aparece nas tendências. Desta vez veio para ficar, com cós alto e modelagem que valoriza." },
       { nome: "calça jeans feminina preta com Lycra empina bumbum", preco: "R$ 44,99", url: "https://s.shopee.com.br/6VMU6mioLv", dica: "Lycra = liberdade de movimento. Se você quer ajuste sem apertar, essa é a melhor escolha." },
       { nome: "Calça Jeans Flare Feminina Cintura Alta Modeladora Levanta Bumbum Com Lycra Boca De Sino Premium", preco: "R$ 47,90", url: "https://s.shopee.com.br/9pcw59yz77", dica: "Boca de sino + lycra = conforto + estilo. Use com salto para alongar ainda mais a perna." },
       { nome: "calça jeans cargo grafite feminina empina bumbum super tendencia", preco: "R$ 48,59", url: "https://s.shopee.com.br/50XgKK36x0", dica: "Cargo com bolsos laterais: estilo street e funcional. Combine com cropped para um look jovem." },
       { nome: "Calça Jeans Feminina em Brilhos Furta Cor Estrelas Luxuosa", preco: "R$ 151,91", url: "https://s.shopee.com.br/111XZ3TejC", dica: "Para sair à noite ou festas: brilhos discretos chamam atenção sem exagero. Destaque sem parecer que está fantasiada." },
       { nome: "Calça Jeans Feminina Sal E Pimenta Skinny Linda Rasgada Envio Rapido", preco: "R$ 91,20", url: "https://s.shopee.com.br/9zwMHdcaC2", dica: "Skinny rasgada é um clássico moderno. Marca Sal e Pimenta tem caimento ótimo e entrega rápida." },
       { nome: "Calça Jeans Feminina Wide Leg Rasgada no joelho Cintura Alta Boca larga Moda Street Gringa 100%", preco: "R$ 66,49", url: "https://s.shopee.com.br/30mbwoImih", dica: "Rasgada no joelho + wide leg = vibe street. Se você gosta de moda jovem, essa é a peça chave." },
       { nome: "Calça Jeans Feminina Cargo Wide Leg Black Marmorizada Pantalona Boca Larga Cintura Alta Premium", preco: "R$ 69,65", url: "https://s.shopee.com.br/9V05goBWiK", dica: "Marmorizada + cargo + wide leg: super tendência. Use com cropped preto e sandália de salto." },
       { nome: "Calça Jeans Stoned Bordada Miss Texas Blue Strass Cowgirl Moda Country Feminina Texas Ranch Oficial", preco: "R$ 260,10", url: "https://s.shopee.com.br/3g2Ik8amft", dica: "Bordada e com strass: para quem quer ousar. Use em shows country ou festas temáticas." },
       { nome: "CALÇA JEANS WIDE COM LISTRAS E BOTÕES LATERAIS CINTURA ALTA", preco: "R$ 251,91", url: "https://s.shopee.com.br/1qaeYnTtU3", dica: "Listras + botões laterais: detalhe que faz diferença. Fica ótimo com cropped preto ou branco." },
       { nome: "Calça Jeans Maxi Wide Leg Moda Tendência Europa Pantalona", preco: "R$ 193,50", url: "https://s.shopee.com.br/9ANFIInyCg", dica: "Maxi wide leg europeia: caimento elegante e leve. Use com sandália de salto ou tênis plataforma." },
       { nome: "Calça Jeans Feminina Com Detalhe Bordado Wide Lag Pantalona", preco: "R$ 189,91", url: "https://s.shopee.com.br/5VTwvbIie8", dica: "Bordado delicado + pantalona: feminino sem ser exagerado. Ideal para almoços e eventos diurnos." },
       { nome: "Calça Jeans citura alto Wide Leg Destroyed Rasgada pantalona Femininas", preco: "R$ 133", url: "https://s.shopee.com.br/7Kvb711ahz", dica: "Destroyed + wide leg: estilo urbano e despojado. Combine com jaqueta de couro para ficar ainda mais forte." },
       { nome: "Calça Jeans Feminina Sal e Pimenta Original Vários Modelos - Cintura Alta - Skinny Com Elastano", preco: "R$ 79,99", url: "https://s.shopee.com.br/6Ajdiz3LHY", dica: "Marca confiável, vários modelos e elastano. Escolha conforme seu tipo de corpo: skinny realça, flare equilibra." },
       { nome: "calça cargo jeans e sarja feminina", preco: "R$ 90", url: "https://s.shopee.com.br/AAFmUPLhFY", dica: "Cargo jeans/sarja: versátil, resistente e estilosa. Serve para trilha, cidade e looks utilitários." },
     ],
   },
   {
      id: "pin-tenis-pt",
      slug: "tenis-corrida-masculino-feminino-2026",
      locale: "pt",
      titulo: "Tênis de Corrida Masculino e Feminino: os melhores modelos para você treinar com estilo",
      descricao: "Selecionamos tênis de corrida masculinos e femininos que combinam conforto, performance e estilo. New Balance, Fila, Mizuno, Adidas e Olympikus com preço baixo.",
      imagem: "/images/pin2.png",
      destaque: true,
      categoriaId: "calcados",
      publicadoEm: "2026-07-23",
      tags: ["Esporte", "Fitness", "Tendência"],
      dicaUso: "Use para corrida, academia, caminhada ou looks casuais. Dica: escolha modelos com amortecimento se treinar mais de 3 vezes por semana.",
      links: [
       { nome: "Tênis New Balance 530 Feminino Original Casual Retrô Conforto Academia Caminhada Dia a Dia Leve", preco: "R$ 591,40", url: "https://s.shopee.com.br/3qLjBG86H9", dica: "Ícone retrô e conforto: serve para academia, caminhada e looks casuais. Escolha se quer versatilidade." },
       { nome: "Tênis Feminino New Balance 530 Esportivo Casual Respirável Solado Robusto Confortável Original", preco: "R$ 572,91", url: "https://s.shopee.com.br/9KgfjTaZXr", dica: "Modelo respirável para dias quentes. Solado robusto aguenta mais de 3 trechos por semana." },
       { nome: "Tênis New Balance Fresh Foam Arishi V4 Feminino Original com Nota Fiscal e Garantia", preco: "R$ 345,21", url: "https://s.shopee.com.br/Llr11YRzl", dica: "Com garantia e nota fiscal: seguro para quem corre regularmente. Fresh Foam reduz impacto." },
       { nome: "Tenis Mizuno Space 5 Menina", preco: "R$ 270", url: "https://s.shopee.com.br/6L34A8VJTY", dica: "Perfeito para meninas e adolescentes: leve, flexível e com design moderno para escola e lazer." },
       { nome: "Tênis Fila Recovery Feminino Bege Leve Macio Caminhada Academia Casual", preco: "R$ 287,96", url: "https://s.shopee.com.br/2qTBzji6XE", dica: "Bege combina com tudo. Leve e macio: ideal para caminhadas longas sem machucar o pé." },
       { nome: "Tênis Fila Progress Lite Feminino Bege Caminhada Original Mulher Confortável Macio Corrida", preco: "R$ 306", url: "https://s.shopee.com.br/7KvbM3lce0", dica: "Progress Lite é a linha conforto da Fila. Use para caminhada diária e tarefas do dia a dia." },
       { nome: "Tenis Fila Runner 2K Feminino Lifestyle Casual Confortavel", preco: "R$ 368,90", url: "https://s.shopee.com.br/30mcCAubGI", dica: "Lifestyle casual: sai da academia direto para o encontro. Design clean e conforto garantido." },
       { nome: "Tênis Adidas Supernova Comfortglide Feminino Corrida", preco: "R$ 619", url: "https://s.shopee.com.br/8fQywf3JEO", dica: "Alta performance para quem treina sério. Amortecimento superior e estabilidade em cada passada." },
       { nome: "Tênis New Balance Feminino Fresh Foam X 1080v14", preco: "R$ 736", url: "https://s.shopee.com.br/30mcCHSKuu", dica: "Topo de linha para corrida longa. Se você treina acima de 5km, esse modelo faz diferença." },
       { nome: "Tênis New Balance Fuelcell Rebel V5 Feminino - Rosa Neo/Rosa", preco: "R$ 894", url: "https://s.shopee.com.br/50Xga2wIew", dica: "Fuelcell devolve energia no impacto. Perfeito para quem quer velocidade e estilo no mesmo tênis." },
       { nome: "Tênis Mizuno Wave Creation 26 Feminino Original com Nota Fiscal e Garantia", preco: "R$ 511,71", url: "https://s.shopee.com.br/9Kgfk4a3y9", dica: "Nota fiscal + garantia: compra segura. Wave Creation é sinônimo de durabilidade e amortecimento." },
       { nome: "Tênis Olympikus Swift 5 Feminino Cinza e Rosa", preco: "R$ 315", url: "https://s.shopee.com.br/1qaeoLRWiJ", dica: "Swift 5 é conforto nacional. Ótimo custo-benefício para caminhada, academia e uso diário." },
       { nome: "Tenis Fila Maxxi Lite Feminino Caminhada Corrida Treinos Academia Confortável e Macio", preco: "R$ 277", url: "https://s.shopee.com.br/190d12lth", dica: "Maxxi Lite para treinos intensos: leve, macio e durável. Economia sem abrir mão da qualidade." },
       { nome: "Tênis Adidas Latin Run 3.0 Feminino", preco: "R$ 374", url: "https://s.shopee.com.br/1qaeoQK91n", dica: "Estilo Adidas + conforto para corrida. Versátil para academia, rua e looks esportivos." },
       { nome: "Tênis Feminino de Academia para Musculação Treino Funcional Caminhada Corrida e Uso Diário", preco: "R$ 49", url: "https://s.shopee.com.br/2BDVD8Z0sq", dica: "Preço imbatível para começar: serve para musculação, caminhada e dia a dia. Escolha se o orçamento está curto." },
       { nome: "Tênis Feminino Esportivo Axion Estiloso Moderno Treino Academia Corrida Caminhada", preco: "R$ 69,99", url: "https://s.shopee.com.br/9zwMXZza4G", dica: "Design moderno e preço acessível. Perfeito para quem quer estilo sem gastar muito." },
       { nome: "Tênis Feminino Esportivo Academia Caminhada Leve Confortável Dia a Dia Treino", preco: "R$ 106", url: "https://s.shopee.com.br/3g2Izz0TrF", dica: "Meio termo entre básico e performance: confortável, leve e serve para várias situações." },
     ],
   },
  {
    id: "pin-jeans-en",
    slug: "best-womens-jeans-under-50-deals-2026",
    locale: "en",
    titulo: "Best Women's Jeans Under R$50",
    descricao: "20 models that lift and shape: wide leg, flare, cargo, skinny and more.",
    imagem: "/images/pin1.png",
    destaque: true,
    categoriaId: "moda-feminina",
    publicadoEm: "2026-07-22",
    links: [
      { nome: "Used Women's Jeans from Thrift Store", preco: "R$ 24,90", url: "https://s.shopee.com.br/4qEG7HYQVJ" },
      { nome: "Wide Leg Women's Jeans Butt Lifter", preco: "R$ 29,90", url: "https://s.shopee.com.br/5fnN74lkgj" },
      { nome: "Women's Jeans High Waist with Lycra", preco: "R$ 36,90", url: "https://s.shopee.com.br/1Vxo9SwHGb" },
      { nome: "Women's Black Graphite Jeans High Waist", preco: "R$ 36,90", url: "https://s.shopee.com.br/4AyZKPbq6n" },
      { nome: "Women's Jogger Jeans with Elastic", preco: "R$ 39,99", url: "https://s.shopee.com.br/8AUi5ohfoR" },
      { nome: "Flare Graphite Women's Jeans Butt Lifter", preco: "R$ 41,99", url: "https://s.shopee.com.br/LlqlV9Kxg" },
      { nome: "Women's Black Jeans with Lycra Butt Lifter", preco: "R$ 44,99", url: "https://s.shopee.com.br/6VMU6mioLv" },
      { nome: "Flare Women's Jeans High Waist Modeling", preco: "R$ 47,90", url: "https://s.shopee.com.br/9pcw59yz77" },
      { nome: "Cargo Graphite Women's Jeans Butt Lifter", preco: "R$ 48,59", url: "https://s.shopee.com.br/50XgKK36x0" },
      { nome: "Women's Jeans in Iridescent Star Brilhoso Luxuoso", preco: "R$ 151,91", url: "https://s.shopee.com.br/111XZ3TejC" },
      { nome: "Women's Jeans Salt and Pepper Skinny Pretty Ripped Fast Shipping", preco: "R$ 91,20", url: "https://s.shopee.com.br/9zwMHdcaC2" },
      { nome: "Women's Jeans Wide Leg Ripped on the Knee High Waist Wide Mouth Street Gringa 100%", preco: "R$ 66,49", url: "https://s.shopee.com.br/30mbwoImih" },
      { nome: "Women's Jeans Cargo Wide Leg Black Marmorized Pants Wide Waist High Waist Premium", preco: "R$ 69,65", url: "https://s.shopee.com.br/9V05goBWiK" },
      { nome: "Women's Jeans Stoned Embroidered Miss Texas Blue Strass Cowgirl Country Fashion Texas Ranch Official", preco: "R$ 260,10", url: "https://s.shopee.com.br/3g2Ik8amft" },
      { nome: "WOMEN'S JEANS WIDE WITH STRIPES AND SIDE BUTTONS HIGH WAIST", preco: "R$ 251,91", url: "https://s.shopee.com.br/1qaeYnTtU3" },
      { nome: "Women's Jeans Maxi Wide Leg Europe Trend Pants", preco: "R$ 193,50", url: "https://s.shopee.com.br/9ANFIInyCg" },
      { nome: "Women's Jeans with Embroidered Detail Wide Pants Palazzo", preco: "R$ 189,91", url: "https://s.shopee.com.br/5VTwvbIie8" },
      { nome: "Women's Jeans super high Wide Leg Destroyed Ripped palazzo Pants", preco: "R$ 133", url: "https://s.shopee.com.br/7Kvb711ahz" },
      { nome: "Women's Jeans Salt and Pepper Original Several Models - High Waist - Skinny With Elastane", preco: "R$ 79,99", url: "https://s.shopee.com.br/6Ajdiz3LHY" },
      { nome: "women's cargo jeans and twill pants", preco: "R$ 90", url: "https://s.shopee.com.br/AAFmUPLhFY" },
    ],
  },
  {
    id: "pin-tenis-en",
    slug: "tenis-corrida-masculino-feminino-2026",
    locale: "en",
    titulo: "Men's and Women's Running Shoes: best models to train in style",
    descricao: "Selected running shoes for men and women that combine comfort, performance and style.",
    imagem: "/images/pin2.png",
    destaque: true,
    categoriaId: "calcados",
    publicadoEm: "2026-07-23",
    links: [
      { nome: "New Balance 530 Women's Original Casual Retro Comfort Gym Walking Everyday Light", preco: "R$ 591,40", url: "https://s.shopee.com.br/3qLjBG86H9" },
      { nome: "Women's New Balance 530 Sporty Casual Breathable Robust Comfortable Original", preco: "R$ 572,91", url: "https://s.shopee.com.br/9KgfjTaZXr" },
      { nome: "New Balance Fresh Foam Arishi V4 Women's Original with Invoice and Warranty", preco: "R$ 345,21", url: "https://s.shopee.com.br/Llr11YRzl" },
      { nome: "Mizuno Space 5 Kids Shoes", preco: "R$ 270", url: "https://s.shopee.com.br/6L34A8VJTY" },
      { nome: "Fila Recovery Women's Beige Light Soft Walking Gym Casual", preco: "R$ 287,96", url: "https://s.shopee.com.br/2qTBzji6XE" },
      { nome: "Fila Progress Lite Women's Beige Walking Original Woman Comfortable Soft Running", preco: "R$ 306", url: "https://s.shopee.com.br/7KvbM3lce0" },
      { nome: "Fila Runner 2K Women's Lifestyle Casual Comfortable", preco: "R$ 368,90", url: "https://s.shopee.com.br/30mcCAubGI" },
      { nome: "Adidas Supernova Comfortglide Women's Running", preco: "R$ 619", url: "https://s.shopee.com.br/8fQywf3JEO" },
      { nome: "New Balance Women's Fresh Foam X 1080v14", preco: "R$ 736", url: "https://s.shopee.com.br/30mcCHSKuu" },
      { nome: "New Balance Fuelcell Rebel V5 Women's - Pink Neo/Pink", preco: "R$ 894", url: "https://s.shopee.com.br/50Xga2wIew" },
      { nome: "Mizuno Wave Creation 26 Women's Original with Invoice and Warranty", preco: "R$ 511,71", url: "https://s.shopee.com.br/9Kgfk4a3y9" },
      { nome: "Olympikus Swift 5 Women's Grey and Pink", preco: "R$ 315", url: "https://s.shopee.com.br/1qaeoLRWiJ" },
      { nome: "Fila Maxxi Lite Women's Walking Running Gym Training Academy Comfortable and Soft", preco: "R$ 277", url: "https://s.shopee.com.br/190d12lth" },
      { nome: "Adidas Latin Run 3.0 Women's", preco: "R$ 374", url: "https://s.shopee.com.br/1qaeoQK91n" },
      { nome: "Women's Gym Shoes for Bodybuilding Functional Training Walking Running Daily Use", preco: "R$ 49", url: "https://s.shopee.com.br/2BDVD8Z0sq" },
      { nome: "Women's Sporty Gym Shoes Walking Light Comfortable Everyday Training", preco: "R$ 69,99", url: "https://s.shopee.com.br/9zwMXZza4G" },
      { nome: "Women's Sporty Academy Walking Light Comfortable Everyday Training", preco: "R$ 106", url: "https://s.shopee.com.br/3g2Izz0TrF" },
    ],
  },
   {
      id: "pin-lembrancinhas-pt",
      slug: "lembrancinhas-para-festas",
      locale: "pt",
      titulo: "Lembrancinhas para festas: ideias criativas para aniversário, maternidade e eventos",
      descricao: "20 sugestões de lembrancinhas para festas com precinho, link direto e dicas para encantar os convidados. Sabonetes, maletas, copos, chaveiros e muito mais.",
      imagem: "/images/pin3.png",
      destaque: true,
      categoriaId: "festas",
      publicadoEm: "2026-07-24",
      tags: ["Festas", "Criativo", "Novo"],
      dicaUso: "Ideal para festas de aniversário infantil, chá revelação, maternidade e eventos escolares. Combine 2 a 3 itens diferentes para criar kits personalizados.",
      links: [
       { nome: "Sabonete lembrancinha maternidade nome personalizado", preco: "R$ 78,00 - R$ 281,58", url: "https://s.shopee.com.br/2VqOlfAgHE", dica: "Personalizado com nome do bebê: toque carinhoso que os pais guardam para sempre. Perfeito para maternidade." },
       { nome: "Maleta fazendinha aniversário lembrancinha kits 10/20/30 unidades", preco: "R$ 67,50 - R$ 270,00", url: "https://s.shopee.com.br/4VbT9Mkw31", dica: "Tema fazendinha: as crianças amam. Kits com 10, 20 ou 30 unidades para festas de todos os tamanhos." },
       { nome: "Copos Mini Bucks 250ml lembrancinha aniversário Princesas Aquarela", preco: "R$ 60,00 - R$ 120,00", url: "https://s.shopee.com.br/1BL1BFsoyK", dica: "Mini copos temáticos: funcionam como lembrança e como utilidade na festa. Tema princesas encanta." },
       { nome: "Kit festas chá revelação neutro lembrancinha personalizadas", preco: "R$ 35,91 - R$ 71,01", url: "https://s.shopee.com.br/AUsgIQEUDZ", dica: "Neutro + personalizado: serve para qualquer tema de chá revelação. Personalize com data e nome do bebê." },
       { nome: "Ovo de Dinossauro Surpresa brinde ou lembrancinha aniversário", preco: "R$ 19,90 - R$ 49,90", url: "https://s.shopee.com.br/1LeRNbqhRw", dica: "Ovo surpresa: diversão garantida para crianças. Barato e fácil de montar como lembrancinha." },
       { nome: "Kit Mini Bomboniere Vidro Cristal Potiche Lembrancinha 9cm", preco: "R$ 69,99 - R$ 209,99", url: "https://s.shopee.com.br/BSTzUCKu0", dica: "Vidro cristal: parece caro, mas sai barato. Encha com balas ou brigadeiros e surpreenda." },
       { nome: "Kit Massinha de Modelar + Bolha de Sabão + Cortador Molde Lembrancinha Infantil", preco: "R$ 55,90", url: "https://s.shopee.com.br/2VqOlnSU9A", dica: "Atividade + lembrancinha: as crianças usam na festa e levam para casa. Kit completo e criativo." },
       { nome: "Estojinho Pintura 24 pçs Kit Lembrancinha Aquarela", preco: "R$ 114,90", url: "https://s.shopee.com.br/20u8AtmgSu", dica: "24 peças para pintar: entretenimento garantido. Perfeito para festas infantis de 4 a 10 anos." },
       { nome: "Chaveiro Personalizado Brinde Lembrancinha Acrílico Espelhado", preco: "R$ 49,99 - R$ 174,99", url: "https://s.shopee.com.br/60QGwH6O48", dica: "Acrílico espelhado: brilha na foto e na lembrança. Personalize com nome ou data do evento." },
       { nome: "Kit Revistinha Livro Educativo de Colorir Kit Festa Lembrancinha Infantil", preco: "R$ 19,99", url: "https://s.shopee.com.br/70Io89AQzI", dica: "Livrinho educativo: os pais aprovam porque tem atividade, não só brinquedo. Preço excelente." },
       { nome: "Adesivos Bluey Cachorrinho Premium Lembrancinha Festa Infantil", preco: "R$ 13,34", url: "https://s.shopee.com.br/7prv7knmT3", dica: "Tema Bluey é sucesso absoluto com crianças. Adesivos são baratos e fáceis de distribuir." },
       { nome: "15 Maletas Dia das Crianças Lembrancinha Brinde", preco: "R$ 112,00", url: "https://s.shopee.com.br/1BL1kW2w1l", dica: "Kit fechado para 15 crianças: você não precisa montar nada. Chega prontinho para a festa." },
       { nome: "25 Maletas Dia das Crianças Lembrancinha Brinde", preco: "R$ 175,00", url: "https://s.shopee.com.br/gOl9b4q2g", dica: "Versão maior para festas com mais crianças. Mais itens, mais variedade, mesmo preço justo." },
       { nome: "Sacolinha Feliz Dia das Crianças Pegue e Monte Lembrancinha", preco: "R$ 28,80", url: "https://s.shopee.com.br/qiBLu4Chj", dica: "Faça você mesmo: sacolinhas personalizadas com doces e brinquedos pequenos. Criativo e barato." },
       { nome: "Kit 10 lembrancinhas maternidade menino ou menina", preco: "R$ 98,60", url: "https://s.shopee.com.br/1gHILR120u", dica: "Maternidade neutra: serve para chá revelação e nascimento. Kit com 10 unidades pronto para presentear." },
       { nome: "Kit Massinha Dia das Crianças Lembrancinhas", preco: "R$ 150,00", url: "https://s.shopee.com.br/1qaiXk0Ofx", dica: "Massinha de modelar é atemporal. As crianças brincam e ainda levam para casa de lembrança." },
       { nome: "Kit 25 Giro Hélice Pirocóptero Brinquedo Criança Lembrancinha", preco: "R$ 15,98", url: "https://s.shopee.com.br/1LeRwp2Igs", dica: "Brinquedo surpresa: giro e voa baratinho. 25 unidades para distribuir rapidamente na festa." },
       { nome: "50 Brinquedos Dia das Crianças Lembrancinha Infantil Kit Festa", preco: "R$ 58,93", url: "https://s.shopee.com.br/1Vxs981fLv", dica: "50 brinquedos variados: diversidade para agradar a todos os convidados sem repetir." },
       { nome: "Kit de Pintar Lembrancinha de Aniversário diferente", preco: "R$ 99,99", url: "https://s.shopee.com.br/2LWz8eyUf6", dica: "Diferente dos tradicionais: kit de pintura que entretém e vira lembrança. Ideal para festas temáticas." },
       { nome: "Lembrancinha Maternidade Safari Festa Safari Aniversário", preco: "R$ 108,00", url: "https://s.shopee.com.br/2VqPKxxrK9", dica: "Tema safari: encanta pais e filhos. Perfeito para maternidade e aniversários infantis." },
       { nome: "Lembrancinha de Aniversário Patrulha Canina", preco: "R$ 59,90", url: "https://s.shopee.com.br/20u8k2zlL4", dica: "Patrulha Canina é sucesso garantido. Crianças amam e o tema vende lembrancinha sozinho." },
       { nome: "Kit 25 Copos Personalizados Lembrancinha de Aniversário", preco: "R$ 39,99", url: "https://s.shopee.com.br/2BDYwLz807", dica: "Copos personalizados: úteis, bonitos e baratos. Use na festa e ainda serve como lembrança." },
       { nome: "Kit 20 lembrancinhas aniversário moana adulta fundo do mar", preco: "R$ 143,00", url: "https://s.shopee.com.br/30mfvsvxJI", dica: "Tema Moana adulto: diferente e charmoso. Perfeito para festas temáticas ou chá de bebê oceânico." },
       { nome: "Almochaveiro capivara lembrancinha aniversário barata", preco: "R$ 25,00", url: "https://s.shopee.com.br/3B668BvJyL", dica: "Capivara é fofa e barata. Almochaveiro é utilidade pura: os convidados usam e lembram da festa." },
       { nome: "Caixa Maletinha Fazendinha Rosa Lembrancinhas Kit Aniversário", preco: "R$ 24,21", url: "https://s.shopee.com.br/2g9pXGxDzG", dica: "Maletinha rosa com tema fazendinha: caixinha organizada e fofa. As crianças adoram abrir." },
       { nome: "Lembrancinha Personalizada Borboleta Jardim menina", preco: "R$ 49,40", url: "https://s.shopee.com.br/2qTFjZwaeJ", dica: "Borboleta jardim: delicado e colorido. Serve para maternidade, aniversário e chá de menina." },
       { nome: "50 Balinhas Personalizadas Patati Patatá Lembrancinha Aniversário", preco: "R$ 39,90", url: "https://s.shopee.com.br/3g2Mj6tPxU", dica: "Patati Patatá + balinhas: a combinação mais feliz para festa infantil. Barata e eficaz." },
     ],
   },
   {
      id: "pin-quarto-infantil-pt",
      slug: "gadgets-para-quarto-2026",
      locale: "pt",
      titulo: "Gadgets para quarto de criança e bebê: 25 achados que decoram, organizam e deixam o quarto perfeito",
      descricao: "Selecionamos achados para quarto infantil e de bebê que combinam praticidade, decoração e carinho em 2026. Luminárias, tapetes, adesivos, móveis e muito mais.",
      imagem: "/images/pin4.png",
      destaque: true,
      categoriaId: "tecnologia",
      publicadoEm: "2026-07-25",
      tags: ["Quarto Infantil", "Bebê", "Decoração"],
      dicaUso: "Use para organizar brinquedos, iluminar o quarto à noite e deixar o ambiente mais fofo. Ideal para chá de bebê e decoração infantil.",
      links: [
       { nome: "Luminária Led Luz Noturna com Sensor Automático Quarto Bebê", preco: "R$ 19,99", url: "https://s.shopee.com.br/9V096vaCzl", dica: "Sensor automático: acende sozinha ao escurecer. Perfeita para mães que não querem levantar à noite." },
       { nome: "Lixeira Antiodor Para Quarto do Bebê Banheiro Fraldas Anti Bacteriana 10 Litros", preco: "R$ 169,90", url: "https://s.shopee.com.br/3qLmMaOpI2", dica: "Anti-odor e anti-bacteriana: essencial para quarto de bebê. 10 litros cabe fraldas de vários dias." },
       { nome: "Peça decorativa iluminada leão safari grande para pendurar", preco: "R$ 234,06", url: "https://s.shopee.com.br/7KveX26Yos", dica: "Leão iluminado: decoração de impacto para quarto infantil. Vira ponto de luz e encantamento." },
       { nome: "Porta retrato 12 meses fotos crescimento primeiro ano enfeite infantil decoração quarto de bebê", preco: "R$ 78,99", url: "https://s.shopee.com.br/5LAa9PzdOC", dica: "Registro do primeiro ano: cada mês com uma foto. Decoração que vira memória afetiva." },
       { nome: "Jogo De Quarto Infantil Trevalla Móveis Pom Pom 3 Peças e 3 ANOS de Garantia", preco: "R$ 735,99", url: "https://s.shopee.com.br/2BDYNbtgdm", dica: "Móvel completo com garantia: investe-se uma vez e dura anos. Ideal para quarto infantil completo." },
       { nome: "Quarto Bebê Completo Berço Americano Ben 3 Em1 Guarda Roupa 4 Portas e Cômoda Uli 4 Gavetas 100% MDF", preco: "R$ 1.804,91", url: "https://s.shopee.com.br/70Io8ViRe1", dica: "Quarto completo: tudo que o bebê precisa num pacote. 100% MDF e 3 em 1: crescimento junto com a criança." },
       { nome: "Papel de Parede Infantil Menina Floral Jardim Encantado Lavável Vinil Fosco Autoadesivo Quarto Bebê", preco: "R$ 49,39", url: "https://s.shopee.com.br/1VxraQ7NX7", dica: "Autoadesivo e lavável: você mesma cola e troca quando quiser. Tema floral para quarto de menina." },
       { nome: "Móbile Bebe Decoração Urso Ursinho Quarto de Bebe", preco: "R$ 142,50 - R$ 152,00", url: "https://s.shopee.com.br/6L37LJlH6Y", dica: "Ursinho mobile: movimento suave que acalma o bebê. Decoração que vira brinquedo." },
       { nome: "Porta Maternidade Ursinho Lua Personalizado Nome Bebê MDF Feltro Decoração Quarto Infantil", preco: "R$ 114,00", url: "https://s.shopee.com.br/qiAnENGoS", dica: "Personalizado com nome: afeto e decoração juntos. Perfeito para chá de bebê e quarto." },
       { nome: "Luminaria Plastica LED Lua Mesa Abajur Infantil Pilha Decorativa Sala Quarto Criança Estudo Pequena", preco: "R$ 13,90", url: "https://s.shopee.com.br/5VU0LsCxnK", dica: "Lua de LED com pilha: sem fio, sem tomada, sem complicação. Luz suave para sono tranquilo." },
       { nome: "Adesivo de Parede Infantil Arco Romano Boho para Prateleiras - Várias Cores", preco: "R$ 38,43", url: "https://s.shopee.com.br/903sWLl5fc", dica: "Arco boho: tendência que decora sem esforço. Várias cores para combinar com o quarto." },
       { nome: "Espelho Gatinho com LED Decorativo Infantil 70x65 para Quarto Menina com Controle Remoto Premium hello kitty", preco: "R$ 183,90", url: "https://s.shopee.com.br/5fnQYJMIQj", dica: "Hello Kitty + LED: as meninas amam. Controle remoto para mudar a cor da luz conforme o humor." },
       { nome: "Kit Quadro Heróis - 6 Unidades Para Meninos", preco: "R$ 26,95", url: "https://s.shopee.com.br/1VxragFDMP", dica: "6 quadros de heróis: decoração pronta para quarto de menino. Barato e impactante." },
       { nome: "Kit 3 Nichos Prateleira Borboleta Para Bebê Infantil Quarto e Sala", preco: "R$ 37,94", url: "https://s.shopee.com.br/BSU0F6ggW", dica: "Nichos em formato de borboleta: organizam e decoram ao mesmo tempo. Fáceis de instalar." },
       { nome: "Tapete Pelúcia Quarto Criança Infantil Menino Menina Juvenil Controle Vídeo Game 78cm Decorativo", preco: "R$ 49,41", url: "https://s.shopee.com.br/6L37LaRLWN", dica: "Pelúcia + tema gamer: combina decoração e diversão. Perfeito para quarto juvenil." },
       { nome: "Cortina Quarto Infantil Menina Laço 2,80 m x 1,70m Criança Garota Princesa Bando Estampado", preco: "R$ 117,60", url: "https://s.shopee.com.br/5q6qkgohrk", dica: "Cortina temática com laço: fecha a decoração do quarto com chave de ouro. Tema princesa." },
       { nome: "Kit 12 Tapetes 1m² EVA 30cm x 30cm Felpudo Infantil Tatame Fofinho Quarto Crianças Diversas Cores", preco: "R$ 165,50", url: "https://s.shopee.com.br/3VivyPxBYk", dica: "12 tapetes EVA: monta e desmonta o layout do quarto. Diversas cores para combinar." },
       { nome: "Dopamina cogumelo cabide doméstico cabide quarto piso armazenamento ferramenta útil decoração do quarto das crianças", preco: "R$ 57,22 - R$ 134,73", url: "https://s.shopee.com.br/1Vxrakytai", dica: "Cogumelo cabide: organização + decoração. As crianças penduram roupas e brinquedos." },
       { nome: "Tapete Felpudo 40mm Para Sala E Quarto 1.00 x 1.50 - CORES", preco: "R$ 29,50 - R$ 38,90", url: "https://s.shopee.com.br/7prv8QAohI", dica: "Felpudo 40mm: conforto para pés descalços. Várias cores para harmonizar com o quarto." },
       { nome: "Tapete Infantil Kids Para Quarto Criança Menina Menino 1,00 x 1,40", preco: "R$ 64,76", url: "https://s.shopee.com.br/4qEJYvzIEk", dica: "Kids kids kids: design colorido e tamanho ideal para brincar. Antiderrapante e fácil de limpar." },
       { nome: "Tapete Infantil Educativo Emborrachado 1,00x1,50m Criança Brincar Menino Menina Quarto", preco: "R$ 59,40", url: "https://s.shopee.com.br/AAFpul8HfM", dica: "Educativo + emborrachado: brincar com segurança. Ideal para primeiros anos de vida." },
       { nome: "Cama Infantil Carro em MDF Patrulha Canina Kids Quarto Criança Design Temático - Blue Moby", preco: "R$ 274,99", url: "https://s.shopee.com.br/3B65ZuU81r", dica: "Cama temática Patrulha Canina: as crianças vão amar dormir. MDF resistente e seguro." },
       { nome: "Cama Infantil Para Quarto Meninas Frozen 100% MDF com proteção lateral", preco: "R$ 245,99", url: "https://s.shopee.com.br/7AcELEg6hG", dica: "Frozen + proteção lateral: segurança para meninas que estão deixando o berço." },
       { nome: "Tapete passadeira 60X120 cm florescente no escuro ideal para quarto da criança", preco: "R$ 90,00 - R$ 120,00", url: "https://s.shopee.com.br/9V097ZbVo6", dica: "Brilha no escuro: magia para a hora de dormir. Perfeito para quarto de criança que tem medo do escuro." },
       { nome: "Luminária De Teto Embutida Estilo Lua, Lustre Retrô Nórdico Led Para Quarto, Cozinha, Corredor, Quarto De Criança", preco: "R$ 129,00 - R$ 229,00", url: "https://s.shopee.com.br/AKZG77WptA", dica: "Lua no teto: luz indireta perfeita para quarto infantil. Retrô e nórdico combina com decoração moderna." },
       { nome: "Luminária Pendente Avião Vermelho Infantil Quarto Criança Bebê Menino Menina infantil criança lustre", preco: "R$ 99,90", url: "https://s.shopee.com.br/2BDYO9FYQK", dica: "Avião pendente: tema que meninos adoram. Vermelho combina com decoração vibrante." },
     ],
   },
];


export async function getPins(locale?: string): Promise<Pin[]> {
  if (locale) {
    return pins.filter((p) => p.locale === locale);
  }
  return pins;
}

export async function getPinBySlug(slug: string, locale: string): Promise<Pin | undefined> {
  const all = await getPins(locale);
  return all.find((p) => p.slug === slug);
}
