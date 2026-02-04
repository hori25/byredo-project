# Byredo Project

A modern e-commerce website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🛍️ Shop page with product listings
- 📦 Dynamic product detail pages
- 🏪 Offline store locator
- 📍 Store detail pages with location information
- 🎨 Modern, responsive UI with Tailwind CSS
- ⚡ Built with Next.js 14 App Router
- 🔒 Type-safe with TypeScript

## Project Structure

```
byredo-project/
├── src/
│   ├── app/                  # Next.js 14 App Router pages
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   ├── globals.css      # Global styles
│   │   ├── shop/            # Shop pages
│   │   │   ├── page.tsx     # Shop listing
│   │   │   └── [product]/   # Dynamic product pages
│   │   │       └── page.tsx
│   │   └── offline-store/   # Store locator
│   │       ├── page.tsx     # Store listing
│   │       └── [place]/     # Dynamic store pages
│   │           └── page.tsx
│   ├── components/          # Reusable React components
│   ├── lib/                 # Utility functions
│   ├── types/               # TypeScript type definitions
│   └── styles/              # Additional styles
├── public/                  # Static assets
├── figma_assets/           # Design assets from Figma
└── prd.md                  # Product requirements document
```

## Pages

- `/` - Home page
- `/shop` - Product listing page
- `/shop/[product]` - Individual product detail page
- `/offline-store` - Store locator page
- `/offline-store/[place]` - Individual store detail page

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build the application for production:

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Linting**: ESLint
- **Package Manager**: npm

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## LicenseISC
