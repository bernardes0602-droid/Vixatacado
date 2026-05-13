import { Minus, Plus, Send, Trash2 } from "lucide-react";
import { contacts, customers, sellers } from "../lib/data";
import { buildWhatsAppUrl, currency } from "../lib/format";
import type { CartItem, UserRole } from "../lib/types";

type CartProps = {
  cart: CartItem[];
  role: UserRole;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onNavigate: (path: string) => void;
};

export function Cart({ cart, role, onUpdateQuantity, onRemove, onNavigate }: CartProps) {
  const customer = customers.find((item) => item.status === "approved");
  const seller = sellers.find((item) => item.id === customer?.sellerId) ?? sellers[0];
  const subtotal = cart.reduce((sum, item) => sum + (item.product.promoPrice ?? item.product.price) * item.quantity, 0);
  const freight = cart.length ? 45 : 0;
  const total = subtotal + freight;

  const lines = [
    "Olá! Quero fechar um pedido pela plataforma Vix Atacado.",
    customer ? `Cliente: ${customer.name} / ${customer.company}` : "Cliente: visitante em teste",
    `Vendedor responsável: ${seller.name}`,
    "",
    "Produtos:",
    ...cart.map((item) => {
      const price = item.product.promoPrice ?? item.product.price;
      return `- ${item.quantity}x ${item.product.name} | SKU ${item.product.sku} | ${currency.format(price)}`;
    }),
    "",
    `Subtotal: ${currency.format(subtotal)}`,
    `Frete estimado: ${currency.format(freight)}`,
    `Total estimado: ${currency.format(total)}`,
    "Observações: confirmar disponibilidade, aplicação e prazo."
  ];

  const whatsappUrl = buildWhatsAppUrl(seller.phone || contacts.commercialWhatsapp, lines.join("\n"));
  const canCheckout = role === "customer" || role === "seller" || role === "admin";

  return (
    <section className="section cart-page">
      <div className="section-heading">
        <span className="eyebrow">Carrinho e pedidos</span>
        <h1>Pedido estruturado para registro no banco e envio ao WhatsApp do vendedor.</h1>
        <p>Cliente aprovado finaliza pedido. Visitante visualiza catálogo e segue para cadastro.</p>
      </div>

      {cart.length === 0 ? (
        <div className="empty-state">
          Seu carrinho está vazio.
          <button type="button" className="primary-action" onClick={() => onNavigate("/projeto/catalogo")}>
            Abrir catálogo
          </button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => {
              const price = item.product.promoPrice ?? item.product.price;
              return (
                <article key={item.product.id} className="cart-item">
                  <img src={item.product.image} alt={item.product.name} />
                  <div>
                    <span>{item.product.sku}</span>
                    <h3>{item.product.name}</h3>
                    <p>{item.product.brand} / {item.product.model}</p>
                  </div>
                  <div className="quantity-control">
                    <button type="button" onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)} aria-label="Diminuir quantidade">
                      <Minus size={16} />
                    </button>
                    <strong>{item.quantity}</strong>
                    <button type="button" onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)} aria-label="Aumentar quantidade">
                      <Plus size={16} />
                    </button>
                  </div>
                  <strong>{currency.format(price * item.quantity)}</strong>
                  <button type="button" className="icon-danger" onClick={() => onRemove(item.product.id)} aria-label="Remover produto">
                    <Trash2 size={18} />
                  </button>
                </article>
              );
            })}
          </div>

          <aside className="order-summary">
            <h2>Resumo</h2>
            <p>
              <span>Subtotal</span>
              <strong>{currency.format(subtotal)}</strong>
            </p>
            <p>
              <span>Frete estimado</span>
              <strong>{currency.format(freight)}</strong>
            </p>
            <p className="summary-total">
              <span>Total</span>
              <strong>{currency.format(total)}</strong>
            </p>

            <div className="seller-box">
              <span>Vendedor responsável</span>
              <strong>{seller.name}</strong>
              <small>{contacts.commercialPhone}</small>
            </div>

            {canCheckout ? (
              <a className="primary-action big full" href={whatsappUrl} target="_blank" rel="noreferrer">
                <Send size={18} />
                Enviar pedido
              </a>
            ) : (
              <button type="button" className="primary-action big full" onClick={() => onNavigate("/projeto/login")}>
                Solicitar cadastro
              </button>
            )}
          </aside>
        </div>
      )}
    </section>
  );
}
