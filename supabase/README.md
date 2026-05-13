# Supabase SQL

Esta pasta guarda os SQL versionados da plataforma Vix Atacado.

## Migration principal

- `migrations/202605120001_vix_platform_schema.sql`

Essa migration cria:

- perfis e roles;
- clientes, vendedores e gerentes;
- produtos, categorias, marcas e aplicações automotivas;
- carrinhos, pedidos e itens;
- frete, transportadoras, rastreio e histórico de status;
- banners, páginas, políticas, blog, Instagram e configurações;
- funções auxiliares e políticas RLS.

## Como o GitHub aplica no Supabase

O workflow `.github/workflows/supabase-db.yml` executa:

```bash
supabase db push --db-url "$SUPABASE_DB_URL" --include-all
```

Ele roda automaticamente quando houver alteração dentro de `supabase/**` nas branches `main` ou `master`, e também pode ser executado manualmente em `Actions > Supabase DB Migrations > Run workflow`.

## Secret obrigatório no GitHub

Crie este secret no repositório:

```text
SUPABASE_DB_URL
```

Formato:

```text
postgresql://postgres.SEU_PROJECT_REF:SUA_SENHA_DO_BANCO@aws-0-sa-east-1.pooler.supabase.com:6543/postgres
```

Use a connection string do Supabase em:

```text
Project Settings > Database > Connection string
```

Prefira a opção `Transaction pooler` para GitHub Actions.

## Atenção

Antes de rodar no banco de produção, revise a migration. Ela cria tabelas, funções, índices e regras RLS.
