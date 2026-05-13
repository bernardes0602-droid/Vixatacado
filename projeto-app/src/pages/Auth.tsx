import { KeyRound, LockKeyhole, ShieldCheck, UserPlus } from "lucide-react";
import { isSupabaseConfigured } from "../lib/supabase";
import type { UserRole } from "../lib/types";

type AuthMode = "admin" | "client";

type AuthProps = {
  mode: AuthMode;
  onNavigate: (path: string) => void;
  onLogin: (role: UserRole, target: string) => void;
};

export function Auth({ mode, onNavigate, onLogin }: AuthProps) {
  const isAdmin = mode === "admin";

  return (
    <section className="section auth-page">
      <div className="auth-copy">
        <span className="eyebrow">{isAdmin ? "Acesso interno" : "Área do cliente"}</span>
        <h1>{isAdmin ? "Painel restrito para equipe Vix." : "Acompanhe seus pedidos e orçamento."}</h1>
        <p>
          {isAdmin
            ? "Entrada reservada para admin, gerentes e vendedores. Todo conteúdo do site, catálogo, banners, políticas e pedidos deve ser controlado por este painel."
            : "Clientes aprovados acessam carrinho, histórico, vendedor responsável, pedidos e rastreio dentro da conta."}
        </p>

        <div className="feature-list">
          <span>
            <ShieldCheck size={18} />
            Permissões separadas por perfil
          </span>
          <span>
            <UserPlus size={18} />
            Cadastro aprovado antes de comprar
          </span>
          <span>
            <KeyRound size={18} />
            Recuperação de senha via Supabase Auth
          </span>
        </div>
      </div>

      <div className="auth-grid">
        <form className="auth-card">
          <h2>{isAdmin ? "Login administrativo" : "Login do cliente"}</h2>
          <label>
            E-mail
            <input type="email" placeholder={isAdmin ? "admin@vixatacado.com.br" : "cliente@empresa.com.br"} />
          </label>
          <label>
            Senha
            <input type="password" placeholder="Sua senha" />
          </label>

          {isAdmin ? (
            <div className="admin-login-actions">
              <button type="button" className="primary-action full" onClick={() => onLogin("admin", "/projeto/admin")}>
                <LockKeyhole size={18} />
                Entrar como admin
              </button>
              <button type="button" className="ghost-action full" onClick={() => onLogin("manager", "/projeto/admin")}>
                Entrar como gerente
              </button>
              <button type="button" className="ghost-action full" onClick={() => onLogin("seller", "/projeto/admin")}>
                Entrar como vendedor
              </button>
            </div>
          ) : (
            <button type="button" className="primary-action full" onClick={() => onLogin("customer", "/projeto/cliente")}>
              <LockKeyhole size={18} />
              Entrar na conta
            </button>
          )}

          <button type="button" className="text-action">
            Recuperar senha
          </button>
        </form>

        {!isAdmin ? (
          <form className="auth-card">
            <h2>Cadastro de cliente</h2>
            <label>
              Nome / Empresa
              <input placeholder="Nome da empresa ou responsável" />
            </label>
            <label>
              CNPJ / CPF
              <input placeholder="Documento" />
            </label>
            <label>
              Telefone
              <input placeholder="(27) 99999-9999" />
            </label>
            <label>
              Segmento
              <select>
                <option>Oficina</option>
                <option>Centro automotivo</option>
                <option>Varejo</option>
                <option>Cliente final</option>
              </select>
            </label>
            <button type="button" className="primary-action full">
              Enviar para aprovação
            </button>
          </form>
        ) : (
          <div className="auth-card cms-access-card">
            <h2>CMS da Vix</h2>
            <p>Depois do login, o admin controla sem mexer em código:</p>
            <div className="cms-tags">
              <span>Banners</span>
              <span>Home</span>
              <span>Produtos</span>
              <span>Marcas</span>
              <span>Categorias</span>
              <span>Pedidos</span>
              <span>Clientes</span>
              <span>Rodapé</span>
              <span>Políticas</span>
              <span>SEO</span>
              <span>Blog</span>
              <span>Instagram</span>
            </div>
          </div>
        )}
      </div>

      <div className={isSupabaseConfigured ? "system-status online" : "system-status"}>
        <strong>{isSupabaseConfigured ? "Supabase configurado" : "Supabase aguardando variáveis de ambiente"}</strong>
        <span>
          {isSupabaseConfigured
            ? "Login real pronto para conexão com Auth e RLS."
            : "Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY para autenticação real."}
        </span>
      </div>

      {!isAdmin ? (
        <button type="button" className="text-action auth-admin-shortcut" onClick={() => onNavigate("/projeto/loginadmin")}>
          Acesso interno
        </button>
      ) : null}
    </section>
  );
}
