# Boite-Com Web Application

This is a Next.js web application with TypeScript and Tailwind CSS.

## Project Structure

```
web/
├── app/                    # Next.js 13+ app directory
│   ├── contact/           # Contact page
│   ├── dashboard/         # Dashboard pages
│   ├── message/          # Message related pages
│   ├── services/         # Services pages
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── navigation/       # Navigation components
│   ├── contact/         # Contact form components
│   ├── home/            # Home page components
│   ├── ui/              # Reusable UI components
│   ├── Providers.tsx    # App providers
│   └── theme-provider.tsx # Theme provider
├── config/               # Configuration files
├── constants/            # Constant values
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and shared logic
├── public/              # Static assets
├── styles/              # Global styles
│   └── globals.css      # Global CSS
└── types/               # TypeScript type definitions
```

## Directory Structure Explanation

- `app/`: Contains all the pages and routes of the application using Next.js 13+ app directory structure
- `components/`: Reusable React components organized by feature/domain
- `config/`: Configuration files for the application
- `constants/`: Constant values used throughout the application
- `hooks/`: Custom React hooks
- `lib/`: Utility functions and shared logic
- `public/`: Static assets like images, fonts, etc.
- `styles/`: Global styles and CSS modules
- `types/`: TypeScript type definitions and interfaces

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Run the development server:
```bash
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Technologies Used

- Next.js 13+
- TypeScript
- Tailwind CSS
- React 