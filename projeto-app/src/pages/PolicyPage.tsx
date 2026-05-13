import { ArrowLeft } from "lucide-react";
import { policies } from "../lib/data";

type PolicyPageProps = {
  slug?: string;
  onNavigate: (path: string) => void;
};

export function PolicyPage({ slug, onNavigate }: PolicyPageProps) {
  const policy = policies.find((item) => item.slug === slug) ?? policies[0];

  return (
    <section className="section policy-page">
      <button type="button" className="ghost-action" onClick={() => onNavigate("/projeto")}>
        <ArrowLeft size={16} />
        Voltar
      </button>

      <div className="section-heading">
        <span className="eyebrow">Políticas Vix</span>
        <h1>{policy.title}</h1>
        <p>{policy.summary}</p>
      </div>

      <div className="policy-layout">
        <article className="policy-content">
          {policy.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.text}</p>
            </section>
          ))}
        </article>

        <aside className="policy-nav">
          <h3>Outras políticas</h3>
          {policies.map((item) => (
            <button
              key={item.slug}
              type="button"
              className={item.slug === policy.slug ? "is-active" : ""}
              onClick={() => onNavigate(`/projeto/politicas/${item.slug}`)}
            >
              {item.title}
            </button>
          ))}
        </aside>
      </div>
    </section>
  );
}
