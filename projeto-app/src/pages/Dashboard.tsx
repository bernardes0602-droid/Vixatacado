import { useState, type FormEvent } from "react";
import {
  BarChart3,
  Boxes,
  CheckCircle2,
  ClipboardList,
  Edit3,
  KeyRound,
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
  userId?: string;
  onNavigate: (path: string) => void;
};

const roleTitle: Record<UserRole, string> = {
  guest: "Painel bloqueado",
  admin: "Painel administrativo CMS",
  manager: "Painel do gerente",
  seller: "Painel do vendedor",
  customer: "Painel do cliente"
};

export function Dashboard({ role, userId, onNavigate }: DashboardProps) {
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
      {role === "customer" ? <CustomerDashboard userId={userId} /> : null}
    </section>
  );
}

function AdminDashboard({ pendingCustomers }: { pendingCustomers: typeof customers }) {
  const selectableCustomers = customers.filter((customer) => customer.status === "approved");
  const [selectedCustomerId, setSelectedCustomerId] = useState(selectableCustomers[0]?.id ?? "");
  const [newCustomerPassword, setNewCustomerPassword] = useState("");
  const [passwordNotice, setPasswordNotice] = useState("");

  function handleCustomerPasswordReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPasswordNotice("");

    if (!selectedCustomerId || newCustomerPassword.trim().length < 6) {
      setPasswordNotice("Informe um cliente aprovado e uma senha com pelo menos 6 caracteres.");
      return;
    }

    const selectedCustomer = customers.find((customer) => customer.id === selectedCustomerId);
    setPasswordNotice(`Senha de ${selectedCustomer?.company ?? "cliente"} atualizada no ambiente de teste.`);
    setNewCustomerPassword("");
  }

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

      <section className="admin-panel wide">
        <div className="panel-title">
          <KeyRound size={20} />
          <strong>Redefinir senha de cliente</strong>
        </div>
        <form className="password-form" onSubmit={handleCustomerPasswordReset}>
          <label>
            Cliente aprovado
            <select value={selectedCustomerId} onChange={(event) => setSelectedCustomerId(event.target.value)}>
              {selectableCustomers.map((customer) => (
                <option value={customer.id} key={customer.id}>
                  {customer.company} - {customer.document}
                </option>
              ))}
            </select>
          </label>
          <label>
            Nova senha
            <input
              type="password"
              value={newCustomerPassword}
              onChange={(event) => setNewCustomerPassword(event.target.value)}
              placeholder="Defina uma nova senha"
              autoComplete="new-password"
            />
          </label>
          <button type="submit" className="primary-action full">
            Alterar senha do cliente
          </button>
          {passwordNotice ? <div className="form-alert">{passwordNotice}</div> : null}
          <small>
            No Supabase real essa ação deve chamar uma função segura com service role. O painel não deve salvar senha em texto puro.
          </small>
        </form>
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

function CustomerDashboard({ userId }: { userId?: string }) {
  const customer = customers.find((item) => item.id === userId) ?? customers.find((item) => item.id === "customer-03") ?? customers[0];
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  function handlePasswordChange(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPasswordMessage("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage("Preencha a senha atual, a nova senha e a confirmação.");
      return;
    }

    if (currentPassword !== customer.password) {
      setPasswordMessage("Senha atual incorreta para o cliente de teste.");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMessage("A nova senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage("A confirmação não confere com a nova senha.");
      return;
    }

    setPasswordMessage("Senha alterada no ambiente de teste.");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

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
        <p>
          <span>CPF/CNPJ</span>
          <strong>{customer.document}</strong>
        </p>
      </section>
      <section className="admin-panel">
        <div className="panel-title">
          <KeyRound size={20} />
          <strong>Alterar minha senha</strong>
        </div>
        <form className="password-form" onSubmit={handlePasswordChange}>
          <label>
            Senha atual
            <input
              type="password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              placeholder="Senha atual"
              autoComplete="current-password"
            />
          </label>
          <label>
            Nova senha
            <input
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder="Nova senha"
              autoComplete="new-password"
            />
          </label>
          <label>
            Confirmar nova senha
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Repita a nova senha"
              autoComplete="new-password"
            />
          </label>
          <button type="submit" className="primary-action full">
            Alterar senha
          </button>
          {passwordMessage ? <div className="form-alert">{passwordMessage}</div> : null}
        </form>
      </section>
    </div>
  );
}
