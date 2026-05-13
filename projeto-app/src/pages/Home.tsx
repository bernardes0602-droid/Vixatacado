import { ArrowRight, BadgeCheck, Boxes, Building2, Gauge, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { banners, blogPosts, brandAssets, brands, categories, contacts, instagramFallback, products } from "../lib/data";
import { buildWhatsAppUrl, currency } from "../lib/format";
import type { Product } from "../lib/types";
import { ProductCard } from "../components/ProductCard";
import type { UserRole } from "../lib/types";

type HomeProps = {
  role: UserRole;
  onNavigate: (path: string) => void;
  onAdd: (product: Product) => void;
};

export function Home({ role, onNavigate, onAdd }: HomeProps) {
  const hero = banners[0];
  const featured = products.filter((product) => product.featured).slice(0, 3);
  const whatsappUrl = buildWhatsAppUrl(
    contacts.commercialWhatsapp,
    "Olá! Quero atendimento comercial pela plataforma Vix Atacado."
  );

  return (
    <>
      <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(5,5,6,.94), rgba(5,5,6,.55)), url(${hero.image})` }}>
        <div className="hero-content">
          <span className="eyebrow">Projeto em teste / Vix Atacado</span>
          <h1>{hero.title}</h1>
          <p>{hero.subtitle}</p>

          <div className="hero-actions">
            <button type="button" className="primary-action big" onClick={() => onNavigate("/projeto/catalogo")}>
              {hero.cta}
              <ArrowRight size={18} />
            </button>
            <a className="ghost-action big" href={whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircle size={18} />
              Falar com comercial
            </a>
          </div>

          <div className="hero-stats" aria-label="Indicadores da plataforma">
            <span>
              <strong>{products.length}</strong>
              Produtos modelo
            </span>
            <span>
              <strong>{categories.length}</strong>
              Categorias
            </span>
            <span>
              <strong>4</strong>
              Perfis de acesso
            </span>
          </div>
        </div>
      </section>

      <section className="section surface-section">
        <div className="section-heading">
          <span className="eyebrow">Catálogo automotivo</span>
          <h2>Busca por peça, SKU, código, marca, veículo, aplicação e ano.</h2>
          <p>Estrutura preparada para operar como catálogo, balcão digital, orçamento e pedido integrado ao vendedor responsável.</p>
        </div>

        <div className="category-track">
          {categories.map((category, index) => (
            <button key={category} type="button" onClick={() => onNavigate(`/projeto/catalogo?categoria=${encodeURIComponent(category)}`)}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{category}</strong>
            </button>
          ))}
        </div>
      </section>

      <section className="section split-section">
        <div className="image-panel">
          <img src={brandAssets.parts} alt="Catálogo visual de autopeças Vix Atacado" loading="lazy" />
        </div>
        <div className="copy-panel">
          <span className="eyebrow">Conversão comercial</span>
          <h2>Do catálogo ao WhatsApp do vendedor com pedido estruturado.</h2>
          <p>
            O fluxo foi desenhado para visitante visualizar produtos, cliente aprovado comprar, vendedor acompanhar carteira e admin controlar CMS,
            produtos, pedidos, banners, SEO e operação.
          </p>
          <div className="feature-list">
            <span>
              <BadgeCheck size={18} />
              Cadastro com aprovação administrativa
            </span>
            <span>
              <Truck size={18} />
              Pedido com rastreio e status visual
            </span>
            <span>
              <ShieldCheck size={18} />
              Arquitetura pronta para Supabase RLS
            </span>
          </div>
        </div>
      </section>

      <section className="section dark-section">
        <div className="section-heading inline-heading">
          <div>
            <span className="eyebrow">Produtos em destaque</span>
            <h2>Peças priorizadas para vitrine, campanhas e giro comercial.</h2>
          </div>
          <button type="button" className="ghost-action" onClick={() => onNavigate("/projeto/catalogo")}>
            Ver catálogo completo
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="product-grid">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              role={role}
              onAdd={onAdd}
              onOpen={(slug) => onNavigate(`/projeto/produto/${slug}`)}
            />
          ))}
        </div>
      </section>

      <section className="section ops-grid">
        {[
          { icon: Boxes, title: "CMS de catálogo", text: "Produtos, categorias, marcas, aplicações, banners, blog e SEO editáveis pelo admin." },
          { icon: Building2, title: "CRM comercial", text: "Clientes aprovados, carteira por vendedor e visão por gerente." },
          { icon: Gauge, title: "Dashboards", text: "Pedidos, faturamento, clientes, equipe, estoque e indicadores de conversão." }
        ].map((item) => (
          <article key={item.title} className="ops-card">
            <item.icon size={24} />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="section brand-section">
        <div className="section-heading">
          <span className="eyebrow">Marcas e conteúdos</span>
          <h2>Base preparada para SEO, autoridade e recorrência.</h2>
        </div>

        <div className="brand-cloud">
          {brands.map((brand) => (
            <span key={brand}>{brand}</span>
          ))}
        </div>

        <div className="content-grid">
          {blogPosts.map((post) => (
            <button key={post.id} className="content-card" type="button" onClick={() => onNavigate("/projeto/blog")}>
              <img src={post.image} alt={post.title} loading="lazy" />
              <span>{post.category}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
            </button>
          ))}
          <article className="content-card instagram-card">
            <span>Instagram</span>
            <h3>Feed com fallback manual no CMS</h3>
            <div className="mini-feed">
              {instagramFallback.map((post) => (
                <a key={post.id} href={post.url} target="_blank" rel="noreferrer" aria-label={post.title}>
                  <img src={post.image} alt={post.title} loading="lazy" />
                </a>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section cta-section">
        <div>
          <span className="eyebrow">Pedido inteligente</span>
          <h2>Valor estimado no carrinho, registro no banco e envio para WhatsApp do vendedor.</h2>
          <p>Exemplo de subtotal atual por item destacado: {currency.format(products[0].promoPrice ?? products[0].price)}</p>
        </div>
        <button type="button" className="primary-action big" onClick={() => onNavigate("/projeto/carrinho")}>
          Abrir pedido
          <ArrowRight size={18} />
        </button>
      </section>
    </>
  );
}
