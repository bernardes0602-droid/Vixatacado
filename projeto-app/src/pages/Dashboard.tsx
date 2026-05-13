import {
  BarChart3,
  Boxes,
  CheckCircle2,
  ClipboardList,
  Edit3,
  ShieldCheck,
  ShoppingBag,
  Truck,
  UserCheck,
  UsersRound
} from "lucide-react";
import { banners, blogPosts, customers, orders, products, sellers } from "../lib/data";
import { currency } from "../lib/format";
import type { UserRole } from "../lib/types";

type DashboardProps = {
  role: UserRole;
  onNavigate: (path: string) => void;
};

const roleTitle: Record<UserRole, string> = {
  guest: "Painel bloqueado",
  admin: "Painel administrativo CMS",
  manager: "Painel do gerente",
  seller: "Painel do vendedor",
  customer: "Painel do cliente"
};

export function Dashboard({ role, onNavigate }: DashboardProps) {
  if (role === "guest") {
    return (
      <section className="section dashboard-page">
        <div className="empty-state">
          Acesse como cliente, vendedor, gerente ou admin para visualizar os painéis.
          <button type="button" className="primary-action" onClick={() => onNavigate("/projeto/loginclientes")}>
            Ir para login
          </button>
        </div>
      </section>
    );
  }

  const totalOrders = orders.reduce((sum, order) => sum + order.total + order.freight, 0);
  const approvedCustomers = customers.filter((customer) => customer.status === "approved").length;
  const pendingCustomers = customers.filter((customer) => customer.status === "pending");

  return (
    <section className="section dashboard-page">
      <div className="section-heading">
        <span className="eyebrow">Sistema Vix</span>
        <h1>{roleTitle[role]}</h1>
        <p>Área de trabalho com permissões separadas para conteúdo, catálogo, clientes, vendedores, pedidos e acompanhamento.</p>
      </div>

      <div className="kpi-grid">
        <article>
          <ShoppingBag size={22} />
          <span>Pedidos</span>
          <strong>{orders.length}</strong>
        </article>
        <article>
          <UsersRound size={22} />
          <span>Clientes aprovados</span>
          <strong>{approvedCustomers}</strong>
        </article>
        <article>
          <Boxes size={22} />
          <span>Produtos ativos</span>
          <strong>{products.length}</strong>
        </article>
        <article>
          <BarChart3 size={22} />
          <span>Carteira estimada</span>
          <strong>{currency.format(totalOrders)}</strong>
        </article>
      </div>

      {role === "admin" ? <AdminDashboard pendingCustomers={pendingCustomers} /> : null}
      {role === "manager" ? <ManagerDashboard /> : null}
      {role === "seller" ? <SellerDashboard /> : null}
      {role === "customer" ? <CustomerDashboard /> : null}
    </section>
  );
}

function AdminDashboard({ pendingCustomers }: { pendingCustomers: typeof customers }) {
  return (
    <div className="dashboard-grid">
      <section className="admin-panel wide">
        <div className="panel-title">
          <ShieldCheck size={20} />
          <strong>Aprovação de clientes</strong>
        </div>
        <div className="table-like">
          {pendingCustomers.map((customer) => (
            <div key={customer.id}>
              <span>{customer.company}</span>
              <span>{customer.city}</span>
              <span>{customer.segment}</span>
              <button type="button" className="primary-action small">
                Aprovar
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-panel">
        <div className="panel-title">
          <Boxes size={20} />
          <strong>CMS de produtos</strong>
        </div>
        {products.slice(0, 4).map((product) => (
          <p key={product.id}>
            <span>{product.sku}</span>
            <strong>{product.name}</strong>
            <button type="button" className="icon-inline" aria-label="Editar produto">
              <Edit3 size={15} />
            </button>
          </p>
        ))}
      </section>

      <section className="admin-panel">
        <div className="panel-title">
          <ClipboardList size={20} />
          <strong>Pedidos</strong>
        </div>
        {orders.map((order) => (
          <p key={order.id}>
            <span>{order.id}</span>
            <strong>{currency.format(order.total + order.freight)}</strong>
            <small>{order.status}</small>
          </p>
        ))}
      </section>

      <section className="admin-panel">
        <div className="panel-title">
          <Edit3 size={20} />
          <strong>CMS completo</strong>
        </div>
        <p>
          <span>Banners da home</span>
          <strong>{banners.filter((banner) => banner.active).length}</strong>
        </p>
        <p>
          <span>Posts publicados</span>
          <strong>{blogPosts.filter((post) => post.status === "published").length}</strong>
        </p>
        <p>
          <span>Home, rodapé e políticas</span>
          <strong>Editável</strong>
        </p>
        <p>
          <span>SEO, marcas e Instagram</span>
          <strong>Editável</strong>
        </p>
      </section>

      <section className="admin-panel wide">
        <div className="panel-title">
          <Edit3 size={20} />
          <strong>Conteúdo editável pelo admin</strong>
        </div>
        <div className="cms-tags">
          <span>Banners rotativos</span>
          <span>Home</span>
          <span>Produtos</span>
          <span>Categorias</span>
          <span>Marcas</span>
          <span>Aplicações</span>
          <span>Clientes</span>
          <span>Vendedores</span>
          <span>Pedidos</span>
          <span>Transportadoras</span>
          <span>Políticas</span>
          <span>Rodapé</span>
          <span>Blog</span>
          <span>Instagram</span>
          <span>SEO</span>
        </div>
      </section>
    </div>
  );
}

function ManagerDashboard() {
  return (
    <div className="dashboard-grid">
      <section className="admin-panel wide">
        <div className="panel-title">
          <UsersRound size={20} />
          <strong>Equipe comercial</strong>
        </div>
        <div className="table-like">
          {sellers.map((seller) => (
            <div key={seller.id}>
              <span>{seller.name}</span>
              <span>{seller.email}</span>
              <span>{customers.filter((customer) => customer.sellerId === seller.id).length} clientes</span>
              <strong>{orders.filter((order) => order.sellerId === seller.id).length} pedidos</strong>
            </div>
          ))}
        </div>
      </section>
      <section className="admin-panel">
        <div className="panel-title">
          <BarChart3 size={20} />
          <strong>Desempenho</strong>
        </div>
        <p>
          <span>Pedidos da equipe</span>
          <strong>{orders.length}</strong>
        </p>
        <p>
          <span>Clientes vinculados</span>
          <strong>{customers.filter((customer) => customer.sellerId).length}</strong>
        </p>
      </section>
    </div>
  );
}

function SellerDashboard() {
  return (
    <div className="dashboard-grid">
      <section className="admin-panel wide">
        <div className="panel-title">
          <UserCheck size={20} />
          <strong>Minha carteira</strong>
        </div>
        <div className="table-like">
          {customers.filter((customer) => customer.sellerId).map((customer) => (
            <div key={customer.id}>
              <span>{customer.company}</span>
              <span>{customer.phone}</span>
              <span>{customer.city}</span>
              <button type="button" className="primary-action small">
                WhatsApp
              </button>
            </div>
          ))}
        </div>
      </section>
      <section className="admin-panel">
        <div className="panel-title">
          <ClipboardList size={20} />
          <strong>Pedidos da carteira</strong>
        </div>
        {orders.map((order) => (
          <p key={order.id}>
            <span>{order.id}</span>
            <strong>{order.status}</strong>
          </p>
        ))}
      </section>
    </div>
  );
}

function CustomerDashboard() {
  return (
    <div className="dashboard-grid">
      <section className="admin-panel wide">
        <div className="panel-title">
          <Truck size={20} />
          <strong>Meus pedidos e rastreio</strong>
        </div>
        <div className="table-like">
          {orders.map((order) => (
            <div key={order.id}>
              <span>{order.id}</span>
              <span>{order.carrier}</span>
              <span>{order.deliveryEstimate}</span>
              <strong>{order.status}</strong>
            </div>
          ))}
        </div>
      </section>
      <section className="admin-panel">
        <div className="panel-title">
          <CheckCircle2 size={20} />
          <strong>Vendedor responsável</strong>
        </div>
        <p>
          <span>Carteira</span>
          <strong>Equipe Comercial Vix</strong>
        </p>
        <p>
          <span>Status</span>
          <strong>Cliente aprovado</strong>
        </p>
      </section>
    </div>
  );
}
