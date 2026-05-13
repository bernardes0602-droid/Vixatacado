# Conectar Supabase aos SQL pelo GitHub

## O que já está preparado

- SQL versionado em `supabase/migrations`.
- Configuração do Supabase CLI em `supabase/config.toml`.
- Workflow do GitHub Actions em `.github/workflows/supabase-db.yml`.
- Deploy manual ou automático das migrations para o Supabase.

## Configurar no GitHub

1. Abra o repositório no GitHub.
2. Vá em `Settings > Secrets and variables > Actions`.
3. Clique em `New repository secret`.
4. Crie o secret:

```text
SUPABASE_DB_URL
```

5. Cole a connection string do Supabase.

Formato esperado:

```text
postgresql://postgres.SEU_PROJECT_REF:SUA_SENHA_DO_BANCO@aws-0-sa-east-1.pooler.supabase.com:6543/postgres
```

## Onde pegar o DB URL no Supabase

No painel do Supabase:

```text
Project Settings > Database > Connection string
```

Use a senha do banco definida no projeto Supabase.

## Rodar pelo GitHub

Depois que o secret existir:

1. Vá em `Actions`.
2. Abra `Supabase DB Migrations`.
3. Clique em `Run workflow`.

O GitHub vai executar:

```bash
supabase db push --db-url "$SUPABASE_DB_URL" --include-all
```

## Rodar automaticamente

O workflow também roda automaticamente quando você enviar alterações em:

```text
supabase/**
```

para as branches:

```text
main
master
```

## Depois de aplicar o banco

Configure no Netlify:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

Essas variáveis conectam o frontend em `/projeto` ao Supabase.
