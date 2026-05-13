import { ArrowRight, BadgeCheck, Boxes, Building2, Gauge, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { banners, blogPosts, brandAssets, categories, contacts, instagramFallback, products } from "../lib/data";
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
  const activeBanners = useMemo(() => banners.filter((banner) => banner.active).sort((a, b) => a.order - b.order), []);
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [activeBrand, setActiveBrand] = useState(products[0]?.brand ?? "");
  const hero = activeBanners[activeBannerIndex] ?? activeBanners[0];
  const featured = products.filter((product) => product.featured).slice(0, 3);
  const brandNames = Array.from(new Set(products.map((product) => product.brand)));
  const brandProducts = products.filter((product) => product.brand === activeBrand);
  const whatsappUrl = buildWhatsAppUrl(
    contacts.commercialWhatsapp,
    "Olá! Quero atendimento comercial pela plataforma Vix Atacado."
  );

  useEffect(() => {
    if (activeBanners.length <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveBannerIndex((current) => (current + 1) % activeBanners.length);
    }, 10000);

    return () => window.clearInterval(timer);
  }, [activeBanners.length]);

  function bannerTarget() {
    if (hero.id === "bn-workshop") {
      return "/projeto/loginclientes";
    }

    if (hero.id === "bn-promos") {
      return "/projeto/catalogo?promocoes=1";
    }

    return "/projeto/catalogo";
  }

  return (
    <>
      <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(5,5,6,.94), rgba(5,5,6,.55)), url(${hero.image})` }}>
        <div className="hero-content">
          <span className="eyebrow">Vix Auto Peças e Acessórios</span>
          <h1>{hero.title}</h1>
          <p>{hero.subtitle}</p>

          <div className="hero-actions">
            <button type="button" className="primary-action big" onClick={() => onNavigate(bannerTarget())}>
              {hero.cta}
              <ArrowRight size={18} />
            </button>
            <a className="ghost-action big" href={whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircle size={18} />
              Falar com comercial
            </a>
          </div>

          <div className="banner-controls" aria-label="Banners da home">
            {activeBanners.map((banner, index) => (
              <button
                key={banner.id}
                type="button"
                className={index === activeBannerIndex ? "is-active" : ""}
                onClick={() => setActiveBannerIndex(index)}
                aria-label={`Abrir banner ${index + 1}: ${banner.title}`}
              />
            ))}
          </div>

          <div className="hero-stats" aria-label="Indicadores da plataforma">
            <span>
              <strong>{products.length}</strong>
              Produtos em vitrine
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

      <section className="section hero-products-section">
        <div className="section-heading inline-heading">
          <div>
            <span className="eyebrow">Vitrine de produtos</span>
            <h2>Produtos em destaque já na página inicial.</h2>
          </div>
          <button type="button" className="ghost-action" onClick={() => onNavigate("/projeto/catalogo")}>
            Ver todos
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="product-grid compact-products">
          {products.slice(0, 3).map((product) => (
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

      <section className="section surface-section">
        <div className="section-heading">
          <span className="eyebrow">Catálogo automotivo</span>
          <h2>Encontre a peça certa com menos tempo de balcão.</h2>
          <p>Busque por nome, SKU, código de fabricante, marca, veículo, ano ou aplicação automotiva.</p>
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
          <span className="eyebrow">Atendimento Vix</span>
          <h2>Pedido organizado e conversa direta com o vendedor.</h2>
          <p>
            O cliente monta o pedido, informa a aplicação e encaminha tudo para o vendedor responsável com produtos,
            códigos, quantidades e valores.
          </p>
          <div className="feature-list">
            <span>
              <BadgeCheck size={18} />
              Cadastro com aprovação administrativa
            </span>
            <span>
              <Truck size={18} />
              Rastreio dentro do acesso do cliente
            </span>
            <span>
              <ShieldCheck size={18} />
              Acesso seguro por perfil
            </span>
          </div>
        </div>
      </section>

      <section className="section dark-section">
        <div className="section-heading inline-heading">
          <div>
            <span className="eyebrow">Produtos em destaque</span>
            <h2>Peças selecionadas para revisão, oficina e reposição.</h2>
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
          { icon: Boxes, title: "Catálogo sempre atualizado", text: "Produtos, categorias, marcas, aplicações, banners e SEO controlados pelo admin." },
          { icon: Building2, title: "Carteira por vendedor", text: "Clientes aprovados são vinculados a vendedores para atendimento mais rápido." },
          { icon: Gauge, title: "Controle da operação", text: "Pedidos, clientes, produtos, conteúdos e políticas ficam no painel administrativo." }
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
          <span className="eyebrow">Marcas</span>
          <h2>Clique em uma marca para ver os produtos relacionados.</h2>
        </div>

        <div className="brand-cloud">
          {brandNames.map((brand) => (
            <button
              key={brand}
              type="button"
              className={brand === activeBrand ? "is-active" : ""}
              onClick={() => setActiveBrand(brand)}
            >
              {brand}
            </button>
          ))}
        </div>

        <div className="brand-products-panel">
          <div className="section-heading inline-heading">
            <div>
              <span className="eyebrow">{activeBrand}</span>
              <h3>{brandProducts.length} produto{brandProducts.length === 1 ? "" : "s"} encontrado{brandProducts.length === 1 ? "" : "s"}</h3>
            </div>
            <button type="button" className="ghost-action" onClick={() => onNavigate(`/projeto/catalogo?marca=${encodeURIComponent(activeBrand)}`)}>
              Ver no catálogo
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="product-grid compact-products">
            {brandProducts.slice(0, 3).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                role={role}
                onAdd={onAdd}
                onOpen={(slug) => onNavigate(`/projeto/produto/${slug}`)}
              />
            ))}
          </div>
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
          <h2>Monte seu orçamento e envie direto para a equipe comercial.</h2>
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
