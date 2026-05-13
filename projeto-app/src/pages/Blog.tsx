import { ArrowRight, Instagram } from "lucide-react";
import { blogPosts, instagramFallback } from "../lib/data";

export function Blog() {
  return (
    <section className="section blog-page">
      <div className="section-heading">
        <span className="eyebrow">Blog e SEO</span>
        <h1>Conteúdos para ranqueamento, autoridade local e suporte de venda.</h1>
        <p>Base para posts com título, slug, imagem, resumo, autor, categoria, SEO title, descrição e status de publicação.</p>
      </div>

      <div className="blog-grid">
        {blogPosts.map((post) => (
          <article key={post.id} className="blog-card">
            <img src={post.image} alt={post.title} loading="lazy" />
            <div>
              <span>{post.category}</span>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <button type="button" className="ghost-action">
                Abrir conteúdo
                <ArrowRight size={16} />
              </button>
            </div>
          </article>
        ))}
      </div>

      <section className="instagram-section">
        <div className="section-heading inline-heading">
          <div>
            <span className="eyebrow">Instagram</span>
            <h2>Feed com integração futura e fallback manual via CMS.</h2>
          </div>
          <Instagram size={30} />
        </div>

        <div className="instagram-grid">
          {instagramFallback.map((post) => (
            <a key={post.id} href={post.url} target="_blank" rel="noreferrer">
              <img src={post.image} alt={post.title} loading="lazy" />
              <strong>{post.title}</strong>
            </a>
          ))}
        </div>
      </section>
    </section>
  );
}
