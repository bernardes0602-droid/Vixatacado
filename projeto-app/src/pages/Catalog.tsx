import { Filter, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { brands, categories, products } from "../lib/data";
import { normalize } from "../lib/format";
import type { Product, UserRole } from "../lib/types";

type CatalogProps = {
  role: UserRole;
  initialSearch: string;
  initialCategory: string;
  initialBrand: string;
  initialPromoOnly: boolean;
  onAdd: (product: Product) => void;
  onNavigate: (path: string) => void;
};

type SortKey = "priority" | "price-asc" | "price-desc" | "newest" | "best-seller" | "az";

export function Catalog({ role, initialSearch, initialCategory, initialBrand, initialPromoOnly, onAdd, onNavigate }: CatalogProps) {
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [brand, setBrand] = useState(initialBrand);
  const [automaker, setAutomaker] = useState("Todas");
  const [year, setYear] = useState("");
  const [promoOnly, setPromoOnly] = useState(initialPromoOnly);
  const [sort, setSort] = useState<SortKey>("priority");

  const automakers = useMemo(() => ["Todas", ...Array.from(new Set(products.map((product) => product.automaker)))], []);

  const filteredProducts = useMemo(() => {
    const searchTerm = normalize(search);
    const yearValue = Number(year);

    const filtered = products.filter((product) => {
      const haystack = normalize(
        [
          product.name,
          product.sku,
          product.internalCode,
          product.manufacturerCode,
          product.category,
          product.subcategory,
          product.brand,
          product.automaker,
          product.model,
          product.fullDescription,
          ...product.applications,
          ...product.crossReferences,
          ...product.tags
        ].join(" ")
      );

      const matchesSearch = !searchTerm || haystack.includes(searchTerm);
      const matchesCategory = category === "Todas" || product.category === category;
      const matchesBrand = brand === "Todas" || product.brand === brand;
      const matchesAutomaker = automaker === "Todas" || product.automaker === automaker;
      const matchesYear = !yearValue || (yearValue >= product.yearStart && yearValue <= product.yearEnd);
      const matchesPromo = !promoOnly || Boolean(product.promoPrice);

      return matchesSearch && matchesCategory && matchesBrand && matchesAutomaker && matchesYear && matchesPromo;
    });

    return filtered.sort((a, b) => {
      if (sort === "price-asc") return (a.promoPrice ?? a.price) - (b.promoPrice ?? b.price);
      if (sort === "price-desc") return (b.promoPrice ?? b.price) - (a.promoPrice ?? a.price);
      if (sort === "newest") return Number(b.novelty) - Number(a.novelty);
      if (sort === "best-seller") return Number(b.bestSeller) - Number(a.bestSeller);
      if (sort === "az") return a.name.localeCompare(b.name, "pt-BR");
      return a.priority - b.priority;
    });
  }, [automaker, brand, category, promoOnly, search, sort, year]);

  return (
    <section className="section catalog-page">
      <div className="section-heading">
        <span className="eyebrow">Catálogo avançado</span>
        <h1>Autopeças com filtros por aplicação, código, veículo, marca, ano e prioridade comercial.</h1>
        <p>Produtos visíveis para todos. Compra e solicitação estruturada ficam reservadas para clientes cadastrados e aprovados.</p>
      </div>

      <div className="catalog-layout">
        <aside className="filter-panel">
          <div className="panel-title">
            <Filter size={19} />
            <strong>Filtros</strong>
          </div>

          <label>
            Categoria
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              <option>Todas</option>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <label>
            Marca
            <select value={brand} onChange={(event) => setBrand(event.target.value)}>
              <option>Todas</option>
              {brands.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <label>
            Montadora
            <select value={automaker} onChange={(event) => setAutomaker(event.target.value)}>
              {automakers.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <label>
            Ano do veículo
            <input value={year} onChange={(event) => setYear(event.target.value)} inputMode="numeric" placeholder="Ex.: 2018" />
          </label>

          <label className="check-filter">
            <input type="checkbox" checked={promoOnly} onChange={(event) => setPromoOnly(event.target.checked)} />
            Somente promoções
          </label>
        </aside>

        <div className="catalog-results">
          <div className="catalog-toolbar">
            <label className="search-field">
              <Search size={18} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Nome, SKU, código, referência cruzada, veículo ou aplicação"
              />
            </label>

            <label className="sort-field">
              <SlidersHorizontal size={18} />
              <select value={sort} onChange={(event) => setSort(event.target.value as SortKey)}>
                <option value="priority">Destaque manual</option>
                <option value="price-asc">Menor preço</option>
                <option value="price-desc">Maior preço</option>
                <option value="newest">Mais recentes</option>
                <option value="best-seller">Mais vendidos</option>
                <option value="az">Alfabética</option>
              </select>
            </label>
          </div>

          <div className="result-count">
            <strong>{filteredProducts.length}</strong> produtos encontrados
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

          {filteredProducts.length === 0 ? (
            <div className="empty-state">Nenhum produto encontrado com os filtros selecionados.</div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
