
# Lovable + Supabase Starter (React 18 + TS + Vite)

- Frontend: React 18 + TypeScript, Vite, Tailwind, shadcn/ui, React Router v6, React Query
- Backend: Supabase (Postgres, Auth, Edge Functions, Realtime)
- Charts: Recharts
- Icons: Lucide
- Animations: tailwindcss-animate

## Quick start

```bash
npm i
cp .env.example .env.local
# fill VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY
npm run dev
```

## Supabase (CLI)

```bash
supabase login           # paste PAT
supabase link --project-ref <your-project-ref>
supabase db push
supabase functions deploy hello-world
```

## GitHub Actions

- `.github/workflows/ci.yml` builds the web app.
- `.github/workflows/supabase-infra.yml` applies migrations and deploys edge functions.

## UPDATE
