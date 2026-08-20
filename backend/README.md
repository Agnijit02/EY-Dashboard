# EY Enterprise Platform — Production Backend

An enterprise REST API built with Node.js, Express, TypeScript, Zod, and Prisma ORM.

## Architecture

```text
Request ➔ Middlewares (Helmet, CORS, RequestID, Pino) ➔ Routes ➔ Validation (Zod) ➔ Controller ➔ Service ➔ Repository ➔ Prisma ORM ➔ PostgreSQL
```

## Features

- **Layered Architecture**: Controller ➔ Service ➔ Repository ➔ Prisma ORM
- **Zod Validation**: Strict body & query parameters verification
- **Standardized API Responses**: `{ success: true, data: ..., meta: ... }`
- **Error Normalization**: Production-sanitized errors with custom `ApiError` & HTTP status codes
- **Pino Structured Logging**: `pino-http` request logger with request IDs (`x-request-id`)
- **Health Check**: `/health` endpoint for uptime monitoring

## API Endpoints

- **Health**: `GET /health`
- **Projects**: `GET, POST /api/v1/projects`, `GET, PATCH, DELETE /api/v1/projects/:id`
- **Clients**: `GET, POST /api/v1/clients`, `GET, PATCH, DELETE /api/v1/clients/:id`
- **Resources**: `GET, POST /api/v1/resources`, `GET, PATCH, DELETE /api/v1/resources/:id`
- **Risks**: `GET, POST /api/v1/risks`, `GET, PATCH, DELETE /api/v1/risks/:id` (with automatic server-side score computation: `probability × impact`)
- **Reports**: `GET /api/v1/reports/overview`

## Scripts

- `npm run dev`: Start development server with `tsx watch`
- `npm run build`: Compile TypeScript to `dist/`
- `npm start`: Start compiled server
- `npm run prisma:generate`: Generate Prisma Client
- `npm run prisma:migrate`: Run Prisma migrations
- `npm run prisma:seed`: Populate development seed data
- `npm run prisma:studio`: Open Prisma Studio visual database editor
