import { useState, type FormEvent } from "react";
import { KeyRound, LockKeyhole, ShieldCheck, UserPlus } from "lucide-react";
import { customers, testLogins } from "../lib/data";
import { onlyDigits } from "../lib/format";
import type { TestLogin, UserRole } from "../lib/types";

type AuthMode = "admin" | "client";

type AuthProps = {
  mode: AuthMode;
  onLogin: (role: UserRole, target: string, userId?: string) => void;
};

export function Auth({ mode, onLogin }: AuthProps) {
  const isAdmin = mode === "admin";
  const visibleCredentials = testLogins.filter((credential) => (isAdmin ? credential.role !== "customer" : credential.role === "customer"));
  const defaultCredential = visibleCredentials[0];
  const [identifier, setIdentifier] = useState(defaultCredential?.login ?? "");
  const [password, setPassword] = useState(defaultCredential?.password ?? "");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  function fillCredential(credential: TestLogin) {
    setIdentifier(credential.login);
    setPassword(credential.password);
    setError("");
    setNotice(`Dados de ${credential.label.toLowerCase()} preenchidos para teste.`);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");

    if (!identifier.trim() || !password.trim()) {
      setError("Informe o login e a senha para continuar.");
      return;
    }

    if (isAdmin) {
      const matchedCredential = testLogins.find(
        (credential) =>
          credential.role !== "customer" &&
          credential.login.toLowerCase() === identifier.trim().toLowerCase() &&
          credential.password === password
      );

      if (!matchedCredential) {
        setError("E-mail ou senha inválidos para o acesso interno.");
        return;
      }

      onLogin(matchedCredential.role, matchedCredential.target);
      return;
    }

    const documentDigits = onlyDigits(identifier);
    const matchedCustomer = customers.find((customer) => onlyDigits(customer.document) === documentDigits);

    if (!matchedCustomer || matchedCustomer.password !== password) {
      setError("CPF/CNPJ ou senha inválidos.");
      return;
    }

    if (matchedCustomer.status !== "approved") {
      setError("Cadastro localizado, mas ainda não aprovado pelo administrador.");
      return;
    }

    onLogin("customer", "/projeto/cliente", matchedCustomer.id);
  }

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
        <form className="auth-card" onSubmit={handleSubmit}>
          <h2>{isAdmin ? "Login administrativo" : "Login do cliente"}</h2>
          <label>
            {isAdmin ? "E-mail" : "CPF ou CNPJ cadastrado"}
            <input
              type={isAdmin ? "email" : "text"}
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              placeholder={isAdmin ? "admin@vixatacado.com.br" : "123.456.789-09 ou 12.345.678/0001-90"}
              autoComplete={isAdmin ? "username" : "off"}
            />
          </label>
          <label>
            Senha
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Sua senha"
              autoComplete="current-password"
            />
          </label>

          {error ? <div className="form-alert is-error">{error}</div> : null}
          {notice ? <div className="form-alert">{notice}</div> : null}

          <button type="submit" className="primary-action full">
            <LockKeyhole size={18} />
            Entrar
          </button>

          <button
            type="button"
            className="text-action"
            onClick={() =>
              setNotice(
                isAdmin
                  ? "Recuperação interna deve ser feita pelo administrador principal ou Supabase Auth."
                  : "Recuperação de senha: informe CPF/CNPJ e solicite redefinição ao atendimento Vix."
              )
            }
          >
            Recuperar senha
          </button>

          <div className="test-credential-list">
            <strong>Acessos de teste</strong>
            {visibleCredentials.map((credential) => (
              <div className="credential-card" key={credential.id}>
                <div>
                  <span>{credential.label}</span>
                  <small>{credential.login}</small>
                  <small>Senha: {credential.password}</small>
                </div>
                <button type="button" className="ghost-action small" onClick={() => fillCredential(credential)}>
                  Usar dados
                </button>
              </div>
            ))}
          </div>
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
              Senha de acesso
              <input type="password" placeholder="Crie uma senha" autoComplete="new-password" />
            </label>
            <label>
              Confirmar senha
              <input type="password" placeholder="Repita a senha" autoComplete="new-password" />
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

    </section>
  );
}
