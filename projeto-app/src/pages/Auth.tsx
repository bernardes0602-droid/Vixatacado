import { KeyRound, LockKeyhole, ShieldCheck, UserPlus } from "lucide-react";
import { isSupabaseConfigured } from "../lib/supabase";

type AuthProps = {
  onNavigate: (path: string) => void;
};

export function Auth({ onNavigate }: AuthProps) {
  return (
    <section className="section auth-page">
      <div className="auth-copy">
        <span className="eyebrow">Acesso controlado</span>
        <h1>Cadastro, aprovação do admin e vínculo com vendedor.</h1>
        <p>
          A arquitetura está preparada para autenticação Supabase, sessão persistente, recuperação de senha e liberação
          comercial somente após aprovação.
        </p>

        <div className="feature-list">
          <span>
            <ShieldCheck size={18} />
            RLS por perfil e carteira comercial
          </span>
          <span>
            <UserPlus size={18} />
            Cadastro pendente até aprovação
          </span>
          <span>
            <KeyRound size={18} />
            Recuperação de senha via Supabase Auth
          </span>
        </div>
      </div>

      <div className="auth-grid">
        <form className="auth-card">
          <h2>Entrar</h2>
          <label>
            E-mail
            <input type="email" placeholder="cliente@empresa.com.br" />
          </label>
          <label>
            Senha
            <input type="password" placeholder="Sua senha" />
          </label>
          <button type="button" className="primary-action full" onClick={() => onNavigate("/projeto/dashboard")}>
            <LockKeyhole size={18} />
            Acessar painel
          </button>
          <button type="button" className="text-action">
            Recuperar senha
          </button>
        </form>

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
      </div>

      <div className={isSupabaseConfigured ? "system-status online" : "system-status"}>
        <strong>{isSupabaseConfigured ? "Supabase configurado" : "Supabase aguardando variáveis de ambiente"}</strong>
        <span>Use `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` para conectar o projeto real.</span>
      </div>
    </section>
  );
}
