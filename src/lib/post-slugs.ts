export const POST_SLUGS: Record<string, string> = {
  "melhores-calcas-jeans-masculino-guia-2026": "best-mens-jeans-guide-cuts-styles-2026",
  "melhores-calcas-jeans-feminino-guia-2026": "best-womens-jeans-guide-cuts-styles-2026",
  "como-ganhar-dinheiro-como-afiliado-guia-2026": "how-to-make-money-as-affiliate-guide-2026",
  "como-montar-guarda-roupa-capsula-gastando-poco-2026": "how-to-build-capsule-wardrobe-budget-2026",
  "tendencias-moda-primavera-verao-2026": "fashion-trends-spring-summer-2026",
  "maquiagem-para-iniciantes-guia-passo-a-passo": "makeup-for-beginners-step-by-step-guide",
  "como-organizar-apartamento-pequeno-com-pouco-dinheiro": "how-to-organize-small-apartment-budget",
  "decoracao-sustentavel-20-ideias-ate-100-reais": "sustainable-decor-20-ideas-under-100",
  "rotina-skincare-pele-oleosa-produtos-funcionam": "skincare-routine-oily-skin-products-work",
  "como-escolher-perfume-guia-completo": "how-to-choose-perfume-complete-guide",
  "como-economizar-supermercado-dicas": "how-to-save-at-grocery-store-tips",
  "melhores-apps-financas-pessoais-2026": "best-personal-finance-apps-2026",
  "como-criar-conteudo-instagram-seguidores": "how-to-create-instagram-content-followers",
  "guia-marketing-afiliados-iniciantes-2026": "affiliate-marketing-guide-beginners-2026",
  "como-fazer-mudanca-gastando-pouco": "how-to-move-on-a-budget",
};

export function getSlugForLocale(baseSlug: string, locale: string): string {
  if (locale === "en") {
    return POST_SLUGS[baseSlug] || baseSlug;
  }
  return baseSlug;
}

