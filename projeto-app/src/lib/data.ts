import type { Banner, BlogPost, Customer, Order, OrderStatus, Policy, Product, Seller } from "./types";

export const brandAssets = {
  logo: "/projeto/brand/logo-vix.png",
  hero: "/projeto/brand/banner-hero-premium-v2.png",
  parts: "/projeto/brand/banner-parts-premium-v2.png"
};

export const contacts = {
  commercialPhone: "(27) 98123-7087",
  commercialWhatsapp: "5527981237087",
  institutionalPhone: "(27) 99840-6438",
  institutionalWhatsapp: "5527998406438",
  email: "comercial@vixatacado.com.br",
  instagram: "https://www.instagram.com/",
  address: "Av. Fernando Ferrari, 1450, Vitória - ES"
};

export const categories = [
  "Motor",
  "Freios",
  "Suspensão",
  "Elétrica",
  "Filtros",
  "Iluminação",
  "Acessórios"
];

export const brands = [
  "Bosch",
  "Cofap",
  "Nakata",
  "Sachs",
  "Mann Filter",
  "Mahle",
  "NGK",
  "Fremax",
  "Tecfil",
  "Arteb",
  "Hipper Freios",
  "Moura",
  "Philips"
];

export const products: Product[] = [
  {
    id: "prd-001",
    name: "Kit de embreagem Sachs",
    slug: "kit-embreagem-sachs-gol-saveiro-16",
    shortDescription: "Conjunto com platô, disco e rolamento para manutenção confiável.",
    fullDescription:
      "Kit de embreagem com aplicação para linha Volkswagen 1.6, indicado para manutenção preventiva e corretiva em oficinas e varejo.",
    sku: "VIX-EMB-0001",
    internalCode: "INT-9001",
    manufacturerCode: "SAC-300095",
    category: "Motor",
    subcategory: "Embreagem",
    brand: "Sachs",
    automaker: "Volkswagen",
    model: "Gol / Saveiro",
    yearStart: 2010,
    yearEnd: 2018,
    applications: ["Gol G5 1.6 2010-2013", "Saveiro 1.6 2010-2018", "Voyage 1.6 2011-2016"],
    crossReferences: ["300095", "633300900", "VIX-EMB-0001"],
    specifications: {
      material: "Composto orgânico reforçado",
      garantia: "6 meses",
      origem: "Reposição premium"
    },
    dimensions: { weightKg: 5.6, heightCm: 12, widthCm: 31, lengthCm: 31 },
    stock: 14,
    price: 689.9,
    promoPrice: 649.9,
    featured: true,
    novelty: false,
    bestSeller: true,
    priority: 1,
    tags: ["embreagem", "volkswagen", "sachs", "oficina"],
    seoTitle: "Kit de embreagem Sachs para Gol e Saveiro 1.6",
    seoDescription: "Kit de embreagem Sachs para Gol, Saveiro e Voyage com orçamento rápido na Vix Atacado.",
    image: brandAssets.parts,
    gallery: [brandAssets.parts, brandAssets.hero]
  },
  {
    id: "prd-002",
    name: "Jogo de pastilhas dianteiras",
    slug: "jogo-pastilhas-dianteiras-onix-prisma",
    shortDescription: "Pastilhas de freio para veículos de alto giro no balcão.",
    fullDescription:
      "Jogo de pastilhas dianteiras com excelente aceitação para manutenção de freios em veículos compactos Chevrolet.",
    sku: "VIX-FRE-0032",
    internalCode: "INT-9032",
    manufacturerCode: "HF-1102",
    category: "Freios",
    subcategory: "Pastilhas",
    brand: "Hipper Freios",
    automaker: "Chevrolet",
    model: "Onix / Prisma",
    yearStart: 2013,
    yearEnd: 2019,
    applications: ["Onix 1.0 2013-2019", "Prisma 1.4 2014-2019"],
    crossReferences: ["HF1102", "PD-150", "VIX-FRE-0032"],
    specifications: {
      posicao: "Dianteira",
      sensor: "Sem sensor",
      garantia: "3 meses"
    },
    dimensions: { weightKg: 1.2, heightCm: 8, widthCm: 12, lengthCm: 18 },
    stock: 48,
    price: 159.9,
    featured: true,
    novelty: false,
    bestSeller: true,
    priority: 2,
    tags: ["freios", "pastilha", "chevrolet", "onix"],
    seoTitle: "Pastilha de freio para Onix e Prisma",
    seoDescription: "Jogo de pastilhas dianteiras para Onix e Prisma com atendimento rápido.",
    image: brandAssets.parts,
    gallery: [brandAssets.parts]
  },
  {
    id: "prd-003",
    name: "Amortecedor dianteiro pressurizado",
    slug: "amortecedor-dianteiro-cofap-hb20",
    shortDescription: "Reposição para estabilidade, conforto e segurança.",
    fullDescription:
      "Amortecedor dianteiro pressurizado para aplicação Hyundai, indicado para revisão de suspensão e substituição por desgaste.",
    sku: "VIX-SUS-0108",
    internalCode: "INT-9108",
    manufacturerCode: "COF-GP32818",
    category: "Suspensão",
    subcategory: "Amortecedores",
    brand: "Cofap",
    automaker: "Hyundai",
    model: "HB20 / HB20S",
    yearStart: 2012,
    yearEnd: 2019,
    applications: ["HB20 1.0 2012-2019", "HB20S 1.6 2013-2019"],
    crossReferences: ["GP32818", "AM-55109", "VIX-SUS-0108"],
    specifications: {
      posicao: "Dianteira",
      tipo: "Pressurizado",
      garantia: "12 meses"
    },
    dimensions: { weightKg: 3.4, heightCm: 58, widthCm: 14, lengthCm: 14 },
    stock: 22,
    price: 329.9,
    featured: true,
    novelty: true,
    bestSeller: false,
    priority: 3,
    tags: ["suspensão", "amortecedor", "cofap", "hyundai"],
    seoTitle: "Amortecedor dianteiro Cofap para HB20",
    seoDescription: "Amortecedor dianteiro Cofap para HB20 com orçamento pela Vix Atacado.",
    image: brandAssets.parts,
    gallery: [brandAssets.parts, brandAssets.hero]
  },
  {
    id: "prd-004",
    name: "Bateria 60Ah selada",
    slug: "bateria-60ah-selada-linha-leve",
    shortDescription: "Partida confiável para veículos de linha leve.",
    fullDescription:
      "Bateria selada 60Ah para aplicação universal em linha leve, com boa durabilidade e alto giro comercial.",
    sku: "VIX-ELE-0047",
    internalCode: "INT-9047",
    manufacturerCode: "BAT-60D",
    category: "Elétrica",
    subcategory: "Baterias",
    brand: "Moura",
    automaker: "Universal",
    model: "Linha leve",
    yearStart: 2008,
    yearEnd: 2026,
    applications: ["Aplicação universal sob consulta", "Veículos compactos e sedãs leves"],
    crossReferences: ["60D", "M60", "VIX-ELE-0047"],
    specifications: {
      amperagem: "60Ah",
      tensao: "12V",
      garantia: "12 meses"
    },
    dimensions: { weightKg: 13.6, heightCm: 19, widthCm: 17, lengthCm: 24 },
    stock: 18,
    price: 459.9,
    promoPrice: 429.9,
    featured: false,
    novelty: true,
    bestSeller: true,
    priority: 4,
    tags: ["bateria", "elétrica", "60ah", "moura"],
    seoTitle: "Bateria 60Ah para linha leve",
    seoDescription: "Bateria 60Ah selada para linha leve com atendimento comercial rápido.",
    image: brandAssets.parts,
    gallery: [brandAssets.parts]
  },
  {
    id: "prd-005",
    name: "Filtro de óleo premium",
    slug: "filtro-oleo-premium-mann-filter",
    shortDescription: "Filtro para revisão preventiva com ótima eficiência.",
    fullDescription:
      "Filtro de óleo premium para manutenção preventiva, revisão rápida e aplicação em veículos de alto giro.",
    sku: "VIX-FIL-0021",
    internalCode: "INT-9021",
    manufacturerCode: "MANN-W712",
    category: "Filtros",
    subcategory: "Filtro de óleo",
    brand: "Mann Filter",
    automaker: "Volkswagen",
    model: "Fox / Polo",
    yearStart: 2015,
    yearEnd: 2023,
    applications: ["Fox 1.0 2015-2021", "Polo 1.0 2017-2023"],
    crossReferences: ["W712", "PSL560", "VIX-FIL-0021"],
    specifications: {
      tipo: "Óleo",
      linha: "Premium",
      garantia: "Contra defeito de fabricação"
    },
    dimensions: { weightKg: 0.35, heightCm: 10, widthCm: 8, lengthCm: 8 },
    stock: 120,
    price: 36.9,
    featured: false,
    novelty: false,
    bestSeller: true,
    priority: 5,
    tags: ["filtro", "óleo", "revisão", "mann"],
    seoTitle: "Filtro de óleo Mann Filter",
    seoDescription: "Filtro de óleo premium Mann Filter para revisão automotiva.",
    image: brandAssets.parts,
    gallery: [brandAssets.parts]
  },
  {
    id: "prd-006",
    name: "Lâmpada H4 12V 60/55W",
    slug: "lampada-h4-12v-philips",
    shortDescription: "Iluminação estável para reposição rápida.",
    fullDescription:
      "Lâmpada H4 12V para aplicação universal em veículos com farol compatível, ideal para venda de balcão.",
    sku: "VIX-ILU-0099",
    internalCode: "INT-9099",
    manufacturerCode: "PHI-H4-60",
    category: "Iluminação",
    subcategory: "Lâmpadas",
    brand: "Philips",
    automaker: "Universal",
    model: "Aplicação universal",
    yearStart: 2000,
    yearEnd: 2026,
    applications: ["Aplicação universal H4", "Farol baixo/alto 12V"],
    crossReferences: ["H4", "12342", "VIX-ILU-0099"],
    specifications: {
      potencia: "60/55W",
      tensao: "12V",
      encaixe: "H4"
    },
    dimensions: { weightKg: 0.08, heightCm: 6, widthCm: 4, lengthCm: 4 },
    stock: 86,
    price: 49.9,
    featured: false,
    novelty: true,
    bestSeller: false,
    priority: 6,
    tags: ["lâmpada", "iluminação", "philips", "h4"],
    seoTitle: "Lâmpada H4 12V Philips",
    seoDescription: "Lâmpada H4 12V 60/55W para reposição automotiva.",
    image: brandAssets.parts,
    gallery: [brandAssets.parts]
  }
];

export const banners: Banner[] = [
  {
    id: "bn-hero",
    title: "Autopeças para sua loja, oficina e manutenção",
    subtitle: "Peças selecionadas, marcas confiáveis e atendimento rápido para Vitória e região.",
    cta: "Explorar catálogo",
    image: brandAssets.hero,
    active: true,
    order: 1
  },
  {
    id: "bn-catalog",
    title: "Freios, motor, suspensão e elétrica em destaque",
    subtitle: "Encontre por aplicação, veículo, ano, marca, SKU ou código de fabricante.",
    cta: "Ver destaques",
    image: brandAssets.parts,
    active: true,
    order: 2
  },
  {
    id: "bn-workshop",
    title: "Atendimento direto para oficinas e clientes",
    subtitle: "Monte seu pedido, fale com o vendedor responsável e acompanhe tudo pelo acesso do cliente.",
    cta: "Entrar como cliente",
    image: brandAssets.hero,
    active: true,
    order: 3
  },
  {
    id: "bn-promos",
    title: "Produtos de revisão com orçamento rápido",
    subtitle: "Filtros, pastilhas, baterias e iluminação para pedidos de giro e reposição.",
    cta: "Ver promoções",
    image: brandAssets.parts,
    active: true,
    order: 4
  }
];

export const policies: Policy[] = [
  {
    slug: "politica-de-frete",
    title: "Política de Frete",
    summary: "Condições de envio, prazos, transportadoras e retirada conforme disponibilidade.",
    sections: [
      {
        heading: "Prazos e disponibilidade",
        text: "Os prazos são informados após confirmação de estoque, endereço de entrega e modalidade escolhida."
      },
      {
        heading: "Transportadoras",
        text: "Pedidos podem seguir por entrega própria, transportadora parceira ou retirada, conforme região e operação."
      }
    ]
  },
  {
    slug: "politica-de-devolucao",
    title: "Política de Devolução",
    summary: "Regras para devolução de produtos sem uso, com embalagem e documentação.",
    sections: [
      {
        heading: "Condição do produto",
        text: "A devolução exige produto sem instalação, sem marcas de uso e com embalagem original preservada."
      },
      {
        heading: "Análise técnica",
        text: "Peças instaladas ou com indício de mau uso passam por avaliação antes de qualquer troca ou crédito."
      }
    ]
  },
  {
    slug: "politica-comercial",
    title: "Política Comercial",
    summary: "Condições para orçamento, preços, disponibilidade, aprovação de cadastro e atendimento.",
    sections: [
      {
        heading: "Orçamentos",
        text: "Preços e disponibilidade podem variar conforme estoque, marca, campanha e confirmação do vendedor."
      },
      {
        heading: "Clientes aprovados",
        text: "Compras pela plataforma dependem de cadastro aprovado e vínculo com vendedor responsável."
      }
    ]
  },
  {
    slug: "politica-de-privacidade",
    title: "Política de Privacidade",
    summary: "Como dados de cadastro, contato, pedidos e atendimento são utilizados.",
    sections: [
      {
        heading: "Uso dos dados",
        text: "Os dados são usados para atendimento, orçamento, cadastro, faturamento, entrega e comunicação comercial."
      },
      {
        heading: "Segurança",
        text: "O acesso aos dados segue permissões por perfil e regras de segurança no banco de dados."
      }
    ]
  },
  {
    slug: "politica-de-reembolso",
    title: "Política de Reembolso",
    summary: "Critérios para reembolso, crédito ou troca após análise do pedido.",
    sections: [
      {
        heading: "Elegibilidade",
        text: "Reembolso depende da análise da solicitação, condição do produto e conformidade com as regras comerciais."
      },
      {
        heading: "Forma de devolução",
        text: "Quando aprovado, o reembolso segue o meio de pagamento utilizado ou crédito comercial acordado."
      }
    ]
  },
  {
    slug: "termos-de-uso",
    title: "Termos de Uso",
    summary: "Regras de uso do catálogo, painel de cliente, pedidos e conteúdos da plataforma.",
    sections: [
      {
        heading: "Uso da plataforma",
        text: "O catálogo é informativo e pedidos dependem de confirmação comercial, disponibilidade e aprovação de cadastro."
      },
      {
        heading: "Atualizações",
        text: "A Vix pode atualizar produtos, preços, políticas, textos e regras operacionais pelo painel administrativo."
      }
    ]
  }
];

export const sellers: Seller[] = [
  {
    id: "seller-01",
    name: "Equipe Comercial Vix",
    phone: contacts.commercialWhatsapp,
    email: "comercial@vixatacado.com.br",
    managerId: "manager-01"
  },
  {
    id: "seller-02",
    name: "Carteira Oficinas",
    phone: contacts.institutionalWhatsapp,
    email: "oficinas@vixatacado.com.br",
    managerId: "manager-01"
  }
];

export const customers: Customer[] = [
  {
    id: "customer-01",
    name: "Auto Center Vitória",
    company: "Auto Center Vitória Ltda",
    phone: "(27) 99911-2211",
    email: "compras@autocentervitoria.com.br",
    status: "approved",
    sellerId: "seller-01",
    city: "Vitória",
    segment: "Oficina"
  },
  {
    id: "customer-02",
    name: "Rápido Freios",
    company: "Rápido Freios ME",
    phone: "(27) 98822-3311",
    email: "contato@rapidofreios.com.br",
    status: "pending",
    city: "Serra",
    segment: "Centro automotivo"
  },
  {
    id: "customer-03",
    name: "Cliente Balcão",
    company: "Pessoa física",
    phone: "(27) 97733-4411",
    email: "cliente@email.com",
    status: "approved",
    sellerId: "seller-02",
    city: "Vila Velha",
    segment: "Varejo"
  }
];

export const orderSteps: Array<{ key: OrderStatus; label: string }> = [
  { key: "quote_sent", label: "Orçamento enviado" },
  { key: "review", label: "Em análise" },
  { key: "confirmed", label: "Pedido confirmado" },
  { key: "invoiced", label: "Pedido faturado" },
  { key: "separation", label: "Separação" },
  { key: "sent", label: "Pedido enviado" },
  { key: "transport", label: "Em transporte" },
  { key: "delivered", label: "Entregue" },
  { key: "cancelled", label: "Cancelado" }
];

export const orders: Order[] = [
  {
    id: "VIX-2026-0018",
    customerId: "customer-01",
    sellerId: "seller-01",
    status: "separation",
    total: 1489.5,
    freight: 69.9,
    carrier: "Entrega Vix Express",
    trackingCode: "VIXEXP0018",
    trackingUrl: "https://vixatacado.com.br/projeto/cliente",
    deliveryEstimate: "14/05/2026",
    createdAt: "2026-05-12",
    items: [
      { sku: "VIX-EMB-0001", name: "Kit de embreagem Sachs", quantity: 1, price: 649.9 },
      { sku: "VIX-FRE-0032", name: "Jogo de pastilhas dianteiras", quantity: 4, price: 159.9 }
    ]
  },
  {
    id: "VIX-2026-0019",
    customerId: "customer-03",
    sellerId: "seller-02",
    status: "transport",
    total: 879.7,
    freight: 45,
    carrier: "Transportadora parceira",
    trackingCode: "TRK918273",
    trackingUrl: "https://vixatacado.com.br/projeto/cliente",
    deliveryEstimate: "13/05/2026",
    createdAt: "2026-05-12",
    items: [
      { sku: "VIX-SUS-0108", name: "Amortecedor dianteiro pressurizado", quantity: 2, price: 329.9 },
      { sku: "VIX-FIL-0021", name: "Filtro de óleo premium", quantity: 3, price: 36.9 }
    ]
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: "post-01",
    title: "Como identificar desgaste no sistema de freios",
    slug: "desgaste-sistema-freios",
    excerpt: "Sinais práticos para orientar clientes e oficinas na hora da revisão preventiva.",
    category: "Freios",
    author: "Equipe Vix",
    status: "published",
    image: brandAssets.parts
  },
  {
    id: "post-02",
    title: "Checklist de revisão antes de viagem",
    slug: "checklist-revisao-viagem",
    excerpt: "Itens de alta procura para preparar o veículo com mais segurança.",
    category: "Revisão",
    author: "Equipe Vix",
    status: "published",
    image: brandAssets.hero
  }
];

export const instagramFallback = [
  { id: "ig-01", title: "Linha de freios em destaque", image: brandAssets.parts, url: contacts.instagram },
  { id: "ig-02", title: "Atendimento para oficinas", image: brandAssets.hero, url: contacts.instagram },
  { id: "ig-03", title: "Novidades no catálogo", image: brandAssets.parts, url: contacts.instagram }
];
