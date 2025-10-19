# My AWESOME Pet Site 🐾

A modern pet management website built with Next.js and Supabase.

## Features

- **Pet Management**: Create, read, update, and delete pet profiles
- **Appointments**: Schedule and manage pet appointments
- **Photo Gallery**: Upload and manage pet photos
- **User Authentication**: Secure user authentication with Supabase Auth
- **Real-time Updates**: Powered by Supabase's real-time capabilities

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL database, Authentication, Storage)
- **Hosting**: Deploy on Vercel (recommended)

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier available at [supabase.com](https://supabase.com))

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/0800petsitter-bit/My-AWESOME-Pet-Site.git
cd My-AWESOME-Pet-Site
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

1. Create a new project at [supabase.com](https://app.supabase.com)
2. Go to Project Settings > API
3. Copy your project URL and anon/public key

### 4. Configure environment variables

1. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

2. Edit `.env.local` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 5. Set up the database

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy the contents of `supabase/schema.sql`
4. Paste and run the SQL to create tables and policies

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
My-AWESOME-Pet-Site/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── lib/              # Utility functions
│   │   └── supabase.ts   # Supabase client configuration
│   └── types/            # TypeScript type definitions
│       └── database.ts   # Database types
├── supabase/
│   └── schema.sql        # Database schema
├── .env.example          # Environment variables template
├── .env.local            # Local environment variables (not in git)
└── package.json          # Project dependencies
```

## Database Schema

The application uses three main tables:

- **pets**: Store pet information (name, type, breed, age, etc.)
- **appointments**: Manage pet appointments and services
- **pet_photos**: Store additional photos for each pet

Row Level Security (RLS) is enabled to ensure users can only access their own data.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Supabase Features Used

- **Database**: PostgreSQL with Row Level Security
- **Authentication**: User sign-up and login (ready to implement)
- **Storage**: File storage for pet images (ready to implement)
- **Real-time**: Subscribe to database changes (ready to implement)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue on GitHub.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Backend powered by [Supabase](https://supabase.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
