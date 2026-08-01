# Zahara College of Skills

The initial public website for Zahara College of Skills, built with Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui-compatible components.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Content model

Editable homepage data lives in `src/data/*.json`; UI components consume it via `src/services/home.service.ts`. When a CMS/API is added, replace that service implementation while retaining the components.

## Deploy to Vercel

Import this repository in Vercel, use the default Next.js build settings, and deploy. No environment variables are required for this static initial version.
