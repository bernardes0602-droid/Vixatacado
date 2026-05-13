import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { products } from "../lib/data";
import type { Product, UserRole } from "../lib/types";

type BrandsProps = {
  role: UserRole;
  onAdd: (product: Product) => void;
  onNavigate: (path: string) => void;
};

export function Brands({ role, onAdd, onNavigate }: BrandsProps) {
  const brandNames = useMemo(() => Array.from(new Set(products.map((product) => product.brand))), []);
  const [activeBrand, setActiveBrand] = useState(brandNames[0] ?? "");
  const filteredProducts = products.filter((product) => product.brand === activeBrand);

  return (
    <section className="section brand-page">
      <div className="section-heading">
        <span className="eyebrow">Marcas</span>
        <h1>Escolha uma marca e veja os produtos disponíveis.</h1>
        <p>Esta área conecta marca, aplicação, produto e catálogo para o cliente encontrar a peça certa mais rápido.</p>
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

      <div className="section-heading inline-heading brand-result-heading">
        <div>
          <span className="eyebrow">{activeBrand}</span>
          <h2>{filteredProducts.length} produto{filteredProducts.length === 1 ? "" : "s"} encontrado{filteredProducts.length === 1 ? "" : "s"}</h2>
        </div>
        <button type="button" className="ghost-action" onClick={() => onNavigate(`/projeto/catalogo?marca=${encodeURIComponent(activeBrand)}`)}>
          Abrir no catálogo
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
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
  );
}
