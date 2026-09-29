# PixelBay

A modern e-commerce marketplace built with Next.js 15, featuring user authentication, seller dashboards, product management, and a seamless shopping experience.

## Features

### 🛍️ Shopping Experience

- Browse products across multiple categories (Electronics, Gaming, Fashion, etc.)
- Advanced search and filtering
- Product details with images and specifications
- Personalized product recommendations
- Customer reviews and ratings

### 👤 User Features

- User authentication with NextAuth
- User profiles and dashboards
- Order tracking and history
- Wishlist functionality

### 🏪 Seller Dashboard

- Product listing management
- Order management
- Sales analytics with charts (Recharts)
- Inventory tracking

### 🎨 UI/UX

- Dark/Light theme support with next-themes
- Responsive design with Tailwind CSS 4
- Modern UI components with Radix UI
- Smooth animations with Framer Motion
- Toast notifications with Sonner
- Image carousels with Embla Carousel

## Tech Stack

- **Framework**: Next.js 15.5.3 with Turbopack
- **Language**: TypeScript
- **Database**: Neon PostgreSQL + Drizzle ORM
- **Authentication**: NextAuth 5.0
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI, shadcn/ui
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Charts**: Recharts
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm
- A Neon database instance

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd pixelbay
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Copy the demo template to `.env.local`, then replace its placeholders with your local database URL and OAuth credentials:

   ```env
   cp .env.example .env.local
   ```

4. **Run database migrations**

   ```bash
   pnpm drizzle-kit push
   ```

5. **Start the development server**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
pixelbay/
├── app/                      # Next.js 15 App Router
│   ├── (General)/           # Public pages (home, products, search)
│   ├── api/                 # API routes
│   └── auth/                # Authentication pages
├── components/
│   ├── customs/             # Custom components
│   │   ├── home/           # Home page sections
│   │   ├── navbar/         # Navigation components
│   │   ├── products/       # Product-related components
│   │   └── seller/         # Seller dashboard components
│   ├── themes/             # Theme provider
│   └── ui/                 # Reusable UI components (shadcn/ui)
├── lib/
│   ├── db/                 # Database schema and configuration
│   └── utils.ts            # Utility functions
├── pages/                  # Page components
├── types/                  # TypeScript type definitions
└── public/                 # Static assets
```

## Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server

## Key Features Implementation

### Authentication

NextAuth 5.0 with Drizzle adapter for database-backed sessions.

### Database

Drizzle ORM with Neon PostgreSQL for type-safe database operations. Schema includes:

- Users and authentication tables
- Products and categories
- Orders and order items
- Reviews and ratings

### Styling

Tailwind CSS 4 with custom configuration, utilizing:

- CSS variables for theming
- Radix UI for accessible components
- Custom utility classes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and proprietary.
