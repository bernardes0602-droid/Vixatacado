import { CalendarClock, ExternalLink, PackageCheck, Truck } from "lucide-react";
import { customers, orders, orderSteps } from "../lib/data";
import { currency } from "../lib/format";

export function Tracking() {
  const order = orders[0];
  const customer = customers.find((item) => item.id === order.customerId);
  const activeIndex = orderSteps.findIndex((step) => step.key === order.status);

  return (
    <section className="section tracking-page">
      <div className="section-heading">
        <span className="eyebrow">Acompanhamento de entrega</span>
        <h1>Status visual de orçamento, separação, transporte e entrega.</h1>
        <p>Admin e vendedor atualizam o pedido. Cliente acompanha etapa, datas, observações e rastreio.</p>
      </div>

      <div className="tracking-card">
        <div className="tracking-header">
          <div>
            <span>Pedido</span>
            <h2>{order.id}</h2>
            <p>{customer?.company}</p>
          </div>
          <div>
            <small>Total</small>
            <strong>{currency.format(order.total + order.freight)}</strong>
          </div>
        </div>

        <div className="status-rail">
          {orderSteps.map((step, index) => (
            <div key={step.key} className={index <= activeIndex ? "is-complete" : ""}>
              <span>{index + 1}</span>
              <strong>{step.label}</strong>
            </div>
          ))}
        </div>

        <div className="tracking-info-grid">
          <article>
            <Truck size={22} />
            <span>Transportadora</span>
            <strong>{order.carrier}</strong>
          </article>
          <article>
            <PackageCheck size={22} />
            <span>Código de rastreio</span>
            <strong>{order.trackingCode}</strong>
          </article>
          <article>
            <CalendarClock size={22} />
            <span>Previsão</span>
            <strong>{order.deliveryEstimate}</strong>
          </article>
          <a href={order.trackingUrl} target="_blank" rel="noreferrer">
            <ExternalLink size={22} />
            <span>Link de rastreio</span>
            <strong>Abrir</strong>
          </a>
        </div>
      </div>
    </section>
  );
}
