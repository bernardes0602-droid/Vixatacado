const store = {
  name: "Vix Auto Peças e Acessórios",
  whatsapp: "5527999998888",
  defaultMessage: "Olá! Quero solicitar um orçamento na Vix Auto Peças e Acessórios."
};

const categoryLabels = {
  motor: "Motor",
  freios: "Freios",
  suspensao: "Suspensão",
  eletrica: "Elétrica",
  filtros: "Filtros",
  iluminacao: "Iluminação"
};

const products = [
  {
    name: "Kit de embreagem Sachs",
    category: "motor",
    brand: "Sachs",
    vehicle: "Gol / Saveiro 1.6",
    price: 689.9,
    stock: "Pronta entrega",
    summary: "Conjunto com platô, disco e rolamento para manutenção com bom acabamento."
  },
  {
    name: "Jogo de pastilhas dianteiras",
    category: "freios",
    brand: "Hipper Freios",
    vehicle: "Onix / Prisma",
    price: 159.9,
    stock: "Alto giro",
    summary: "Boa frenagem, desgaste uniforme e aplicação em veículos de grande circulação."
  },
  {
    name: "Amortecedor dianteiro pressurizado",
    category: "suspensao",
    brand: "Cofap",
    vehicle: "HB20 / HB20S",
    price: 329.9,
    stock: "Disponível hoje",
    summary: "Reposição para dirigibilidade estável em uso urbano e rodoviário."
  },
  {
    name: "Bateria 60Ah selada",
    category: "eletrica",
    brand: "Moura",
    vehicle: "Linha leve",
    price: 459.9,
    stock: "Entrega urbana",
    summary: "Partida confiável e boa durabilidade para veículos de uso intenso."
  },
  {
    name: "Filtro de óleo premium",
    category: "filtros",
    brand: "Mann Filter",
    vehicle: "Fox / Polo 1.0",
    price: 36.9,
    stock: "Pronta entrega",
    summary: "Filtro de alta eficiência para manutenção preventiva com ótimo custo."
  },
  {
    name: "Lâmpada H4 12V 60/55W",
    category: "iluminacao",
    brand: "Philips",
    vehicle: "Aplicação universal",
    price: 49.9,
    stock: "Alto giro",
    summary: "Iluminação estável para reposição rápida e venda de balcão."
  },
  {
    name: "Kit correia dentada com tensor",
    category: "motor",
    brand: "Gates",
    vehicle: "Palio / Siena 1.4",
    price: 289.9,
    stock: "Disponível hoje",
    summary: "Ideal para revisão programada com peça de marca reconhecida."
  },
  {
    name: "Disco de freio ventilado",
    category: "freios",
    brand: "Fremax",
    vehicle: "Corolla 1.8",
    price: 214.9,
    stock: "Pronta entrega",
    summary: "Boa dissipação de calor e excelente aceitação no balcão."
  },
  {
    name: "Bieleta estabilizadora reforçada",
    category: "suspensao",
    brand: "Nakata",
    vehicle: "Civic 2.0",
    price: 74.9,
    stock: "Alto giro",
    summary: "Reposição para ruído e estabilidade com montagem simples."
  },
  {
    name: "Bobina de ignição eletrônica",
    category: "eletrica",
    brand: "Bosch",
    vehicle: "Fox / Gol 1.6",
    price: 269.9,
    stock: "Disponível hoje",
    summary: "Componente confiável para recuperação rápida de falha de ignição."
  },
  {
    name: "Filtro de cabine carvão ativado",
    category: "filtros",
    brand: "Tecfil",
    vehicle: "Renegade 1.8",
    price: 44.9,
    stock: "Pronta entrega",
    summary: "Mais conforto interno e revisão preventiva de boa recorrência."
  },
  {
    name: "Lanterna traseira lado direito",
    category: "iluminacao",
    brand: "Arteb",
    vehicle: "Strada cabine dupla",
    price: 189.9,
    stock: "Sob consulta",
    summary: "Peça com ótimo acabamento para reposição de colisão leve."
  }
];

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

function setCurrentYear() {
  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });
}

function setActiveNav() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href.split("#")[0] === current && !href.includes("#")) {
      link.setAttribute("aria-current", "page");
    }
  });
}

function setupMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (!toggle || !nav) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function buildWhatsAppUrl(message) {
  return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(message)}`;
}

function hydrateWhatsAppLinks() {
  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    if (link.dataset.productName) {
      return;
    }
    link.setAttribute("href", buildWhatsAppUrl(store.defaultMessage));
  });
}

function productCardTemplate(product) {
  const category = categoryLabels[product.category] || product.category;
  const message =
    `Olá! Quero orçamento para: ${product.name}. ` +
    `Aplicação: ${product.vehicle}. Marca: ${product.brand}.`;

  return `
    <article class="product-card">
      <div class="product-card-header">
        <div>
          <span class="product-chip">${category}</span>
          <h3>${product.name}</h3>
        </div>
        <span class="stock-chip">${product.stock}</span>
      </div>
      <p>${product.summary}</p>
      <div class="product-meta">
        <span>${product.brand}</span>
        <span>${product.vehicle}</span>
      </div>
      <div class="product-footer">
        <div class="price">
          <small>A partir de</small>
          <strong>${currency.format(product.price)}</strong>
        </div>
        <a
          class="button button-secondary button-small"
          data-whatsapp-link
          data-product-name="${product.name}"
          href="${buildWhatsAppUrl(message)}"
        >
          Solicitar
        </a>
      </div>
    </article>
  `;
}

function renderFeaturedProducts() {
  const container = document.querySelector("[data-featured-products]");
  if (!container) {
    return;
  }

  container.innerHTML = products.slice(0, 6).map(productCardTemplate).join("");
}

function renderCatalog(productsToRender) {
  const grid = document.querySelector("[data-product-grid]");
  const counter = document.querySelector("[data-results-count]");
  if (!grid || !counter) {
    return;
  }

  counter.textContent = `${productsToRender.length} produto${productsToRender.length === 1 ? "" : "s"} encontrados`;

  if (!productsToRender.length) {
    grid.innerHTML =
      '<div class="empty-state">Nenhum item encontrado com esse filtro. Tente outra busca ou fale com a equipe.</div>';
    return;
  }

  grid.innerHTML = productsToRender.map(productCardTemplate).join("");
}

function sortProducts(list, sortBy) {
  const items = [...list];

  if (sortBy === "menor-preco") {
    items.sort((a, b) => a.price - b.price);
  } else if (sortBy === "maior-preco") {
    items.sort((a, b) => b.price - a.price);
  } else if (sortBy === "marca") {
    items.sort((a, b) => a.brand.localeCompare(b.brand, "pt-BR"));
  }

  return items;
}

function setupCatalog() {
  const grid = document.querySelector("[data-product-grid]");
  if (!grid) {
    return;
  }

  const searchInput = document.querySelector("[data-search]");
  const sortSelect = document.querySelector("[data-sort]");
  const filterButtons = [...document.querySelectorAll("[data-filter]")];
  const params = new URLSearchParams(window.location.search);
  const validFilters = new Set(["all", ...Object.keys(categoryLabels)]);

  let activeFilter = params.get("categoria") || "all";
  let searchTerm = params.get("busca") || "";
  let activeSort = "relevancia";

  if (!validFilters.has(activeFilter)) {
    activeFilter = "all";
  }

  if (searchInput) {
    searchInput.value = searchTerm;
    searchInput.addEventListener("input", (event) => {
      searchTerm = event.target.value.trim().toLowerCase();
      updateCatalog();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", (event) => {
      activeSort = event.target.value;
      updateCatalog();
    });
  }

  filterButtons.forEach((button) => {
    if (button.dataset.filter === activeFilter) {
      button.classList.add("is-active");
    } else {
      button.classList.remove("is-active");
    }

    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter || "all";
      filterButtons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      updateCatalog();
    });
  });

  function updateCatalog() {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const inCategory = activeFilter === "all" || product.category === activeFilter;
      const haystack = `${product.name} ${product.brand} ${product.vehicle} ${product.summary}`.toLowerCase();
      const matchesSearch = !normalizedSearch || haystack.includes(normalizedSearch);
      return inCategory && matchesSearch;
    });

    renderCatalog(sortProducts(filtered, activeSort));
  }

  updateCatalog();
}

function setupBudgetForm() {
  const form = document.querySelector("[data-budget-form]");
  if (!form) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = String(formData.get("nome") || "").trim();
    const phone = String(formData.get("telefone") || "").trim();
    const vehicle = String(formData.get("veiculo") || "").trim();
    const part = String(formData.get("peca") || "").trim();
    const brand = String(formData.get("marca") || "").trim();
    const urgency = String(formData.get("urgencia") || "").trim();
    const notes = String(formData.get("observacoes") || "").trim();

    const lines = [
      `Olá! Meu nome é ${name}. Quero orçamento na ${store.name}.`,
      phone ? `Telefone: ${phone}` : "",
      vehicle ? `Veículo: ${vehicle}` : "",
      `Peça desejada: ${part}`,
      brand ? `Marca preferida: ${brand}` : "",
      urgency ? `Urgência: ${urgency}` : "",
      notes ? `Observações: ${notes}` : ""
    ].filter(Boolean);

    window.open(buildWhatsAppUrl(lines.join("\n")), "_blank", "noopener");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setCurrentYear();
  setActiveNav();
  setupMobileNav();
  hydrateWhatsAppLinks();
  renderFeaturedProducts();
  setupCatalog();
  setupBudgetForm();
});
