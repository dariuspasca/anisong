# Anisong - Your personal anime playlist creator 

Anisong is a web app to create personalized playlists featuring the very best opening and ending theme songs from your favorite anime series.

![cover-image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/u0mwg8eoodtqz0ogfgjy.png)

### Backend

- CRUD (Query + Mutation Operations)
- Authorization / Postgres Row Level Security
- [Supabase](https://supabase.com) - Backend with a Postgres Database, Authentication, instant APIs and Edge Functions.
- [Edge Functions](https://supabase.com/docs/guides/functions) - Server-side TypeScript functions, distributed globally at the edge
- [Postgres Triggers](https://supabase.com/blog/2021/07/30/supabase-functions-updates) and [Postgres Functions](https://supabase.com/docs/guides/database/functions) - When a user logs in for the first time, creates a profile

### Frontend

- [Refine](https://refine.dev/) - React-based framework that enables rapid development of web applications
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

# Install Project

### Clone repository

```
git clone https://github.com/dariuspasca/anisong.git
```

### Change directory

```
cd app
```

### Install dependencies

```
pnpm install
```

or

```
npm install
```

### Setup env vars

`cp app/.env.example app/.env.local`

### Run app

```bash
pnpm dev
```

or

```bash
npm dev
```
