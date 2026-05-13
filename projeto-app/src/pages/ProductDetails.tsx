import { ArrowLeft, CheckCircle2, PackageCheck, Ruler, ShoppingCart, Tags } from "lucide-react";
import { contacts } from "../lib/data";
import { buildWhatsAppUrl, currency } from "../lib/format";
import type { Product, UserRole } from "../lib/types";

type ProductDetailsProps = {
  product?: Product;
  role: UserRole;
  onBack: () => void;
  onAdd: (product: Product) => void;
};

export function ProductDetails({ product, role, onBack, onAdd }: ProductDetailsProps) {
  if (!product) {
    return (
      <section className="section">
        <div className="empty-state">Produto não encontrado.</div>
      </section>
    );
  }

  const canBuy = role !== "guest";
  const price = product.promoPrice ?? product.price;
  const whatsappUrl = buildWhatsAppUrl(
    contacts.commercialWhatsapp,
    `Olá! Quero orçamento para ${product.name}. SKU ${product.sku}. Código fabricante ${product.manufacturerCode}.`
  );

  return (
    <section className="section product-detail-page">
      <button type="button" className="ghost-action" onClick={onBack}>
        <ArrowLeft size={17} />
        Voltar
      </button>

      <div className="product-detail-layout">
        <div className="detail-gallery">
          <img src={product.image} alt={product.name} />
          <div>
            {product.gallery.map((image) => (
              <img key={image} src={image} alt={`${product.name} galeria`} loading="lazy" />
            ))}
          </div>
        </div>

        <article className="detail-content">
          <span className="eyebrow">{product.category} / {product.subcategory}</span>
          <h1>{product.name}</h1>
          <p>{product.fullDescription}</p>

          <div className="detail-price">
            <small>Preço estimado</small>
            <strong>{currency.format(price)}</strong>
            {product.promoPrice ? <del>{currency.format(product.price)}</del> : null}
          </div>

          <div className="detail-actions">
            <button type="button" className="primary-action big" onClick={() => (canBuy ? onAdd(product) : undefined)} disabled={!canBuy}>
              <ShoppingCart size={18} />
              {canBuy ? "Adicionar ao carrinho" : "Entre para comprar"}
            </button>
            <a className="ghost-action big" href={whatsappUrl} target="_blank" rel="noreferrer">
              Solicitar orçamento
            </a>
          </div>

          <div className="spec-grid">
            <span>
              <PackageCheck size={18} />
              SKU: {product.sku}
            </span>
            <span>
              <Tags size={18} />
              Código fabricante: {product.manufacturerCode}
            </span>
            <span>
              <Ruler size={18} />
              {product.dimensions.weightKg} kg / {product.dimensions.lengthCm}x{product.dimensions.widthCm}x{product.dimensions.heightCm} cm
            </span>
            <span>
              <CheckCircle2 size={18} />
              Estoque: {product.stock} unidades
            </span>
          </div>
        </article>
      </div>

      <div className="detail-panels">
        <section>
          <h2>Compatibilidade automotiva</h2>
          {product.applications.map((item) => (
            <p key={item}>
              <CheckCircle2 size={16} />
              {item}
            </p>
          ))}
        </section>

        <section>
          <h2>Especificações</h2>
          {Object.entries(product.specifications).map(([key, value]) => (
            <p key={key}>
              <strong>{key}</strong>
              {value}
            </p>
          ))}
        </section>

        <section>
          <h2>Referências cruzadas</h2>
          {product.crossReferences.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </section>
      </div>
    </section>
  );
}
