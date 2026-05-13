import { CheckCircle2, Eye, ShoppingCart, Star } from "lucide-react";
import { currency } from "../lib/format";
import type { Product, UserRole } from "../lib/types";

type ProductCardProps = {
  product: Product;
  role: UserRole;
  onAdd: (product: Product) => void;
  onOpen: (slug: string) => void;
};

export function ProductCard({ product, role, onAdd, onOpen }: ProductCardProps) {
  const canBuy = role !== "guest";
  const price = product.promoPrice ?? product.price;

  return (
    <article className="product-card">
      <div className="product-media">
        <img src={product.image} alt={product.name} loading="lazy" />
        <div className="product-badges">
          {product.featured ? <span>Destaque</span> : null}
          {product.novelty ? <span>Novo</span> : null}
          {product.bestSeller ? <span>Mais vendido</span> : null}
        </div>
      </div>

      <div className="product-body">
        <div className="product-title-row">
          <span>{product.category}</span>
          <strong>{product.brand}</strong>
        </div>
        <h3>{product.name}</h3>
        <p>{product.shortDescription}</p>

        <div className="product-meta-grid">
          <span>SKU {product.sku}</span>
          <span>{product.automaker}</span>
          <span>{product.model}</span>
          <span>{product.yearStart}-{product.yearEnd}</span>
        </div>

        <div className="compatibility-line">
          <CheckCircle2 size={16} />
          {product.applications[0]}
        </div>
      </div>

      <div className="product-footer">
        <div>
          <small>A partir de</small>
          <strong>{currency.format(price)}</strong>
          {product.promoPrice ? <del>{currency.format(product.price)}</del> : null}
        </div>

        <div className="product-actions">
          <button type="button" className="ghost-action" onClick={() => onOpen(product.slug)}>
            <Eye size={17} />
            Ver
          </button>
          <button type="button" className="primary-action" onClick={() => (canBuy ? onAdd(product) : onOpen(product.slug))}>
            {canBuy ? <ShoppingCart size={17} /> : <Star size={17} />}
            {canBuy ? "Adicionar" : "Entrar"}
          </button>
        </div>
      </div>
    </article>
  );
}
