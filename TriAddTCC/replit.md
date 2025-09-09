# Overview

This is a full-stack web application built with React and Express, featuring user authentication via Replit's OpenID Connect system. The application uses a modern tech stack with PostgreSQL as the database, Drizzle ORM for database operations, and shadcn/ui components for the frontend interface. The project is structured as a monorepo with separate client and server directories, sharing common schema definitions.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for build tooling
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Authentication**: Passport.js with OpenID Connect strategy for Replit Auth
- **Session Management**: Express sessions with PostgreSQL storage via connect-pg-simple
- **Development**: Hot reload with Vite integration in development mode

## Database Design
- **Primary Database**: PostgreSQL via Neon serverless
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Core Tables**: 
  - `sessions` table for session storage (required for Replit Auth)
  - `users` table with OIDC user data (id, email, names, profile image)
- **Schema Location**: Shared schema definitions in `/shared/schema.ts`

## Authentication & Authorization
- **Strategy**: OpenID Connect via Replit's authentication system
- **Flow**: Redirect-based authentication with session persistence
- **User Management**: Automatic user creation/updates on successful authentication
- **Security**: HTTP-only cookies with secure flags, CSRF protection via session secrets

## Project Structure
- **Monorepo Layout**: Client, server, and shared code in separate directories
- **Client**: React SPA in `/client` directory with component-based architecture
- **Server**: Express API in `/server` directory with modular route handling
- **Shared**: Common TypeScript definitions and database schema in `/shared`
- **Build Process**: Separate build processes for client (Vite) and server (esbuild)

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Environment**: Requires `DATABASE_URL` environment variable

## Authentication Services
- **Replit Auth**: OpenID Connect provider for user authentication
- **Configuration**: Requires `REPL_ID`, `ISSUER_URL`, `SESSION_SECRET`, and `REPLIT_DOMAINS` environment variables

## UI & Styling Libraries
- **shadcn/ui**: Pre-built accessible components based on Radix UI
- **Radix UI**: Unstyled, accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Lucide React**: Icon library for UI components

## Development Tools
- **Vite**: Build tool and development server with hot module replacement
- **TypeScript**: Type checking and development experience
- **Replit Plugins**: Development banner and cartographer for Replit environment
- **ESBuild**: Server-side bundling for production builds

## Runtime Libraries
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form handling with validation
- **date-fns**: Date manipulation and formatting
- **Zod**: Runtime type validation and schema definition