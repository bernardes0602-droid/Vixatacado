import {
  Car,
  ClipboardList,
  LogIn,
  Menu,
  MessageCircle,
  Search,
  ShoppingCart,
  UserRound,
  X
} from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { brandAssets, contacts, policies } from "../lib/data";
import { buildWhatsAppUrl } from "../lib/format";
import type { CartItem, UserRole } from "../lib/types";

type LayoutProps = {
  children: ReactNode;
  currentPath: string;
  role: UserRole;
  cart: CartItem[];
  onNavigate: (path: string) => void;
};

const navItems = [
  { path: "/projeto", label: "Home" },
  { path: "/projeto/catalogo", label: "Catálogo" },
  { path: "/projeto/marcas", label: "Marcas" },
  { path: "/projeto/blog", label: "Conteúdos" }
];

export function Layout({ children, currentPath, role, cart, onNavigate }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const whatsappUrl = buildWhatsAppUrl(
    contacts.commercialWhatsapp,
    "Olá! Vim pelo projeto da plataforma Vix Atacado e quero atendimento comercial."
  );

  function goTo(path: string) {
    setMenuOpen(false);
    onNavigate(path);
  }

  const accountPath =
    role === "admin" || role === "manager" || role === "seller"
      ? "/projeto/admin"
      : role === "customer"
        ? "/projeto/cliente"
        : "/projeto/loginclientes";
  const accountLabel = role === "customer" ? "Minha conta" : "Área do cliente";

  return (
    <div className="app-shell">
      <header className="main-header">
        <div className="header-top">
          <button className="icon-button mobile-only" type="button" onClick={() => setMenuOpen(true)} aria-label="Abrir menu">
            <Menu size={22} />
          </button>

          <button className="brand-button" type="button" onClick={() => goTo("/projeto")} aria-label="Ir para home do projeto">
            <img src={brandAssets.logo} alt="Vix Auto Peças e Acessórios" />
          </button>

          <div className="header-search">
            <Search size={18} />
            <input
              type="search"
              placeholder="Buscar por peça, SKU, marca, veículo ou aplicação"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  const value = event.currentTarget.value.trim();
                  goTo(`/projeto/catalogo${value ? `?busca=${encodeURIComponent(value)}` : ""}`);
                }
              }}
            />
          </div>

          <div className="header-actions">
            <button className="header-link" type="button" onClick={() => goTo(accountPath)}>
              <LogIn size={18} />
              {accountLabel}
            </button>

            <button className="cart-button" type="button" onClick={() => goTo("/projeto/carrinho")} aria-label="Abrir carrinho">
              <ShoppingCart size={20} />
              <span>{cartQuantity}</span>
            </button>
          </div>
        </div>

        <div className="nav-ribbon">
          <nav className={menuOpen ? "site-nav is-open" : "site-nav"} aria-label="Navegação do projeto">
            <button className="icon-button nav-close mobile-only" type="button" onClick={() => setMenuOpen(false)} aria-label="Fechar menu">
              <X size={22} />
            </button>
            {navItems.map((item) => (
              <button
                key={item.path}
                type="button"
                className={currentPath === item.path ? "is-active" : ""}
                onClick={() => goTo(item.path)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <a className="whatsapp-ribbon" href={whatsappUrl} target="_blank" rel="noreferrer">
            <MessageCircle size={24} />
            <span>
              <small>Atendimento comercial</small>
              <strong>{contacts.commercialPhone}</strong>
            </span>
          </a>
        </div>
      </header>

      <main>{children}</main>

      <footer className="main-footer">
        <div className="footer-brand">
          <img src={brandAssets.logo} alt="Logo Vix Auto Peças e Acessórios" />
          <p>Autopeças, acessórios, pedidos e atendimento comercial para oficinas, lojas e clientes aprovados.</p>
        </div>

        <div className="footer-columns">
          <div>
            <h3>Operação</h3>
            <button type="button" onClick={() => goTo("/projeto/catalogo")}>
              <Car size={16} />
              Catálogo automotivo
            </button>
            <button type="button" onClick={() => goTo("/projeto/marcas")}>
              <Car size={16} />
              Produtos por marca
            </button>
          </div>
          <div>
            <h3>Comercial</h3>
            <button type="button" onClick={() => goTo("/projeto/carrinho")}>
              <ClipboardList size={16} />
              Pedidos e orçamento
            </button>
            <button type="button" onClick={() => goTo("/projeto/loginclientes")}>
              <UserRound size={16} />
              Acesso do cliente
            </button>
          </div>
          <div>
            <h3>Contato</h3>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircle size={16} />
              {contacts.commercialPhone}
            </a>
            <a href={`mailto:${contacts.email}`}>
              <UserRound size={16} />
              {contacts.email}
            </a>
          </div>
          <div>
            <h3>Políticas</h3>
            {policies.map((policy) => (
              <button key={policy.slug} type="button" onClick={() => goTo(`/projeto/politicas/${policy.slug}`)}>
                {policy.title}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
