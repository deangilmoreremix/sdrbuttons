# Smart CRM - AI-Powered Customer Relationship Management

## Overview

Smart CRM is a full-stack web application that combines traditional CRM functionality with advanced AI capabilities. Built with React/TypeScript frontend and Express.js backend, it provides sales teams with intelligent tools for managing contacts, deals, tasks, and customer interactions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: Zustand stores for different domains (contacts, deals, tasks, auth, etc.)
- **Routing**: React Router for client-side navigation
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Session Management**: PostgreSQL-based session storage
- **API Design**: RESTful endpoints with `/api` prefix

### Database Schema
- **Users Table**: Basic user authentication (id, username, password)
- **Schema Location**: `shared/schema.ts` using Drizzle ORM
- **Migrations**: Managed through `drizzle-kit` in `./migrations` folder

## Key Components

### Authentication System
- **Strategy**: Session-based authentication with in-memory storage (development mode)
- **Development Mode**: Authentication bypass for easier development
- **Storage Interface**: Abstracted storage layer supporting both memory and database implementations

### AI Integration
- **Primary Providers**: OpenAI and Google Gemini APIs
- **Agent System**: Modular AI agents for different sales tasks (lead enrichment, email generation, proposal creation, etc.)
- **Real-time Processing**: Streaming responses for AI-powered features
- **API Key Management**: Secure storage in application settings

### Contact Management
- **Features**: Contact creation, editing, enrichment, and AI-powered insights
- **Lead Scoring**: Automated lead scoring with AI analysis
- **Enrichment**: AI-powered contact data enhancement

### Deal Pipeline
- **Kanban Interface**: Visual pipeline management with drag-and-drop
- **Analytics**: Deal progression tracking and forecasting
- **AI Insights**: Automated deal analysis and recommendations

### Task Management
- **Calendar Integration**: Task scheduling with calendar view
- **Automation**: AI-powered task creation and follow-up reminders
- **Categories**: Organized task management by type and priority

## Data Flow

### Client-Server Communication
1. Frontend makes API calls to `/api` endpoints
2. Express server processes requests and interacts with database
3. Responses sent back to client with appropriate status codes
4. Error handling middleware catches and formats errors

### AI Processing Flow
1. User initiates AI action through UI
2. Frontend calls agent orchestrator with input data
3. Agent processes request through appropriate AI service
4. Results streamed back to frontend with step-by-step updates
5. Final results displayed in UI with formatted output

### Database Operations
1. Drizzle ORM handles database queries and migrations
2. Connection pooling through Neon serverless driver
3. Schema changes managed through migration files
4. Type-safe database operations with TypeScript

## External Dependencies

### AI Services
- **OpenAI**: GPT models for text generation and analysis
- **Google Gemini**: Alternative AI provider for diverse capabilities
- **Composio**: Third-party service integrations (Gmail, Slack, etc.)

### Database
- **Neon**: Serverless PostgreSQL hosting
- **Connection**: WebSocket-based connection for serverless environments

### UI Libraries
- **Radix UI**: Accessible component primitives
- **shadcn/ui**: Pre-built component library
- **Tailwind CSS**: Utility-first CSS framework
- **React Big Calendar**: Calendar component for task management

### Development Tools
- **Vite**: Fast development server and build tool
- **Replit Integration**: Development environment optimizations
- **TypeScript**: Type safety across the application

## Deployment Strategy

### Development
- **Server**: Runs on Node.js with tsx for TypeScript execution
- **Client**: Vite dev server with HMR and React refresh
- **Database**: Neon serverless PostgreSQL with connection pooling

### Production Build
- **Frontend**: Vite builds to `dist/public` directory
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Assets**: Static files served from build directory
- **Environment**: Production mode with optimized builds

### Environment Configuration
- **Database URL**: Required environment variable for PostgreSQL connection
- **API Keys**: Stored in application settings, not environment variables
- **Session Secret**: Generated for session management
- **CORS**: Configured for appropriate origins in production

### Scalability Considerations
- **Database**: Serverless PostgreSQL scales automatically
- **Session Storage**: PostgreSQL-based sessions for horizontal scaling
- **Static Assets**: Served efficiently through build optimization
- **API Design**: RESTful structure supports load balancing and caching