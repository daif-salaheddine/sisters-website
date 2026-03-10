# CV Website - Ibtissam

A modern, responsive CV/portfolio website with an admin panel for easy content management.

## Features

- **Public CV Website**: Clean, professional design with all essential sections
  - Hero section with profile photo
  - About section
  - Skills with progress bars
  - Work experience timeline
  - Education timeline
  - Certificates gallery
  - Languages section
  - Contact information

- **Admin Panel**: Secure dashboard for content management
  - Login authentication
  - Profile editing with photo upload
  - CRUD operations for all sections
  - File upload for certificates

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Database

```bash
npm run db:push
npm run db:seed
```

### 3. Configure Environment

The `.env.local` file is already configured with default values:
- Database URL
- NextAuth secret
- Admin credentials (change these in production!)

### 4. Run Development Server

```bash
npm run dev
```

### 5. Access the Site

- **Public CV**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin

Default admin credentials:
- Email: `admin@example.com`
- Password: `admin123`

## Project Structure

```
cv-website/
├── prisma/
│   ├── schema.prisma      # Database models
│   └── seed.ts            # Initial data
├── public/
│   └── uploads/           # Uploaded files
├── src/
│   ├── app/
│   │   ├── api/          # API routes
│   │   ├── admin/        # Admin pages
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Public CV
│   ├── components/
│   │   ├── admin/        # Admin components
│   │   ├── sections/     # CV sections
│   │   └── ui/           # Reusable UI
│   └── lib/
│       ├── auth.ts       # NextAuth config
│       ├── db.ts         # Prisma client
│       └── utils.ts      # Utilities
└── package.json
```

## Customization

### Changing Admin Credentials

Edit `.env.local`:
```
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=your-secure-password
```

### Changing Theme Colors

Edit `tailwind.config.ts` to customize colors.

### Adding Profile Photo

1. Login to admin panel
2. Go to Profile section
3. Upload your photo

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy

### Other Platforms

The app uses SQLite which works great for simple deployments. For production with higher traffic, consider migrating to PostgreSQL.

## License

MIT