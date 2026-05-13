# Plataforma Vix Atacado

## Publicação atual

O domínio principal continua protegido pela página de construção.

- `https://vixatacado.com.br/` mostra `em-construcao/index.html`.
- `https://vixatacado.com.br/projeto` mostra a nova plataforma em teste.
- O site institucional antigo continua preservado na raiz do projeto, mas os redirects impedem que clientes externos vejam essas páginas agora.

## Estrutura criada

- `projeto-app/`: app React, Vite, TypeScript e Tailwind.
- `projeto/`: build estático gerado para ser acessado em `/projeto`.
- `supabase/migrations/202605120001_vix_platform_schema.sql`: schema PostgreSQL e RLS.
- `em-construcao/`: página temporária que permanece na raiz do domínio.
- `netlify.toml`: build Netlify com `npm run build` e publicação da raiz.
- `_redirects`: regras que deixam raiz em construção e liberam somente `/projeto`.

## Variáveis de ambiente

Crie um `.env` local ou configure no Netlify:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-publica-anon
VITE_APP_PUBLIC_BASE=/projeto
```

## Supabase

A migration cria:

- perfis e roles: admin, gerente, vendedor e cliente;
- clientes com aprovação;
- vendedores e gerentes;
- produtos, categorias, marcas e aplicações automotivas;
- carrinhos, itens, pedidos e itens do pedido;
- transportadoras, frete, rastreio e histórico de status;
- banners, blog, páginas, configurações e Instagram manual.
- políticas comerciais, frete, devolução, privacidade, reembolso e termos.

RLS:

- visitantes podem ler catálogo público ativo, banners, páginas e posts publicados;
- clientes aprovados acessam seus carrinhos e pedidos;
- vendedores acessam clientes e pedidos vinculados;
- gerentes acessam equipe e dados da equipe;
- admins gerenciam CMS, produtos, clientes, pedidos e configurações.

## Fluxo comercial

1. Visitante acessa `/projeto`.
2. Pesquisa produtos no catálogo.
3. Cliente se cadastra.
4. Admin aprova o cadastro e vincula a um vendedor.
5. Cliente adiciona produtos ao carrinho.
6. Pedido é registrado no banco e enviado ao WhatsApp do vendedor.
7. Vendedor/admin atualiza status, frete, transportadora e rastreio.
8. Cliente acompanha pedidos e rastreio somente dentro do painel autenticado.

## Acessos de teste

Área interna: `https://vixatacado.com.br/projeto/loginadmin`

- Admin: `admin@vixatacado.com.br` / `admin123`
- Gerente: `gerente@vixatacado.com.br` / `gerente123`
- Vendedor: `vendedor@vixatacado.com.br` / `vendedor123`

Área do cliente: `https://vixatacado.com.br/projeto/loginclientes`

- Cliente aprovado: `123.456.789-09` / `cliente123`

O login do cliente é por CPF ou CNPJ cadastrado. No mock local as senhas ficam apenas em dados de teste; na integração final devem ser tratadas pelo Supabase Auth. Cliente pode alterar a própria senha no painel e admin pode solicitar redefinição pelo painel interno.

## Deploy Netlify

O Netlify deve usar:

- Build command: `npm run build`
- Publish directory: `.`

As rotas são controladas por `_redirects`.

## Testes executados

- `npm.cmd run build`
- `npx.cmd tsc --noEmit -p projeto-app\tsconfig.json`
- `npm.cmd audit --audit-level=moderate`

## Como publicar a versão final depois

Quando a plataforma estiver aprovada:

1. Remover ou alterar o wildcard final de `_redirects`.
2. Trocar a rota raiz para servir o app ou o site institucional definitivo.
3. Ajustar `robots.txt` para permitir indexação.
4. Enviar `sitemap.xml` final no Google Search Console.
