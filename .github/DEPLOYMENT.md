# GitHub Deployment Guide (Vercel)

## Required GitHub Secrets

Go to your repository **Settings → Secrets and variables → Actions** and add these secrets:

### Vercel (Required)
| Secret | Description |
|--------|-------------|
| `VERCEL_TOKEN` | Get from https://vercel.com/account/tokens |
| `VERCEL_ORG_ID` | Found in Vercel project settings |
| `VERCEL_PROJECT_ID` | Found in Vercel project settings |

### Database
| Secret | Description |
|--------|-------------|
| `DATABASE_URL` | PostgreSQL connection string for Prisma |
| `DIRECT_URL` | Direct PostgreSQL URL (same as DATABASE_URL for most setups) |

### NextAuth
| Secret | Description |
|--------|-------------|
| `NEXTAUTH_URL` | Your production URL (e.g., `https://yourdomain.com`) |
| `NEXTAUTH_SECRET` | Generate with: `openssl rand -base64 32` |

### Supabase (if using file uploads)
| Secret | Description |
|--------|-------------|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_ANON_KEY` | Your Supabase anon/public key |

## Generate NEXTAUTH_SECRET

Run this command locally:
```bash
openssl rand -base64 32
```

## Setup Steps

1. **Push your code to GitHub**

2. **Create a Vercel project:**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Add environment variables in Vercel settings (DATABASE_URL, DIRECT_URL, NEXTAUTH_SECRET, etc.)
   - Deploy once to get your project ID

3. **Get Vercel credentials:**
   - `VERCEL_TOKEN`: https://vercel.com/account/tokens (create a new token)
   - `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`: Found in your Vercel project dashboard URL or settings

4. **Add all secrets to GitHub** (Settings → Secrets and variables → Actions)

5. **Push to main** - The workflow will automatically deploy!

## Database Setup

Since this project uses Prisma with PostgreSQL:

1. **Create a PostgreSQL database** (Supabase, Railway, Render, or Neon)
2. **Run migrations** after deployment:
   ```bash
   npx prisma migrate deploy
   ```

For platforms that don't support Prisma Migrate in build, add a deployment script that runs migrations post-deploy.

## Environment Variables Summary

```bash
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-generated-secret
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```
