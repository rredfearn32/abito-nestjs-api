# Abito Project overview

NestJS REST API for Abito.dev. Uses Prisma with PostgreSQL, deployed on Vercel as a serverless function. Local
development uses Docker for the database.

## Common commands

```bash
npm run start:dev       # Start with Docker + hot reload (ts-node, never touches dist/)
npm run build           # Compile to dist/ + copy swagger assets
npm run start:prod      # Run compiled output: node dist/main
npm run prisma:migrate  # Run a new migration: npm run prisma:migrate -- <name>
npm run prisma:generate # Regenerate Prisma client
npm run prisma:studio   # Open Prisma Studio
npm run export:openapi  # Export OpenAPI spec to file
```

## Architecture

### Directory structure

```
src/
  infrastructure/       # Shared data-access layer — thin Prisma wrappers, no business logic
    prisma/             # PrismaService (DB connection), PrismaModule
    users.repository-client.ts
    refresh-tokens.repository-client.ts
  modules/              # Feature modules — business logic, controllers, services
    auth/               # Register, login, refresh, delete account, token management
    users/              # User profile (get/update)
    goals/              # Goals and streaks
      repositories/     # Feature-specific repository clients (goals, streaks)
    cron/               # Scheduled jobs
  guards/               # AuthGuard, UserExistsGuard, GoalExistsGuard
  messages/             # Shared error enums (auth.errors, users.errors, etc.)
  utils/
    hashing.ts          # bcrypt hash/compare helpers
api/
  index.js              # Vercel serverless entry point — loads dist/bootstrap
```

### Layer responsibilities

- **Repository clients**: direct Prisma calls only. Accept and return Prisma types (
  `Prisma.UserCreateInput`, `User`, etc.). No exceptions, no business logic. Shared clients (users,
  refresh-tokens) live in `infrastructure/`; feature-specific clients live with their module (e.g.
  `modules/goals/repositories/`).
- **Services** (`modules/*/`): business logic, validation, exceptions. Call repository clients. Use `Prisma.*Input`
  types for writes, `User`/domain types for reads.
- **Controllers** (`modules/*/`): HTTP boundary only. Accept DTOs, call services, map responses with `plainToInstance`.
- **DTOs**: stop at the controller boundary. Services and repositories never accept or return DTOs.

### Module dependency rules

- `infrastructure/` must never import from `modules/`
- `modules/users` is imported by both `AuthModule` and `GoalsModule`
- `TokensService` and `RefreshTokensRepositoryClient` live inside `AuthModule` (not exported — auth-internal only)

## Key conventions

### DTOs

- **Request DTOs**: live in `modules/*/dtos/`, use `class-validator` decorators for validation
- **Response DTOs**: use `@ApiProperty()` for Swagger. Map with `plainToInstance()` in the controller. Sensitive
  fields (e.g. `password`) marked `@Exclude()`
- `UserResponseDto` is the single shared response shape for user profile data — used by both get and update profile
  endpoints
- Validation decorators (`@IsEmail()`, etc.) on response DTOs have no effect — don't add them

### Error messages

Domain-specific error enums live in `src/messages/`:

- `AUTH_ERRORS` — auth.errors.ts
- `USER_ERROR` — users.errors.ts
- `GOAL_ERRORS` — goals.errors.ts
- `STREAK_ERRORS` — streaks.errors.ts

### Prisma

- Client imported from `@prisma/client` (not a custom output path)
- Schema at `prisma/schema.prisma` with `binaryTargets: ["native", "rhel-openssl-3.0.x"]` for Vercel (Linux)
  compatibility
- `vercel-build` script runs `prisma generate` before the NestJS build

### Authentication

- JWT-based with access tokens (10 min) and refresh tokens (14 days) with rotation
- `AuthGuard` validates Bearer token from Authorization header, attaches decoded payload to `req.jwt`
- `req.jwt.sub` is the authenticated user's ID — pass this as `userId: string` to services, never pass the raw JWT
  object

### TypeScript compilation

- `tsconfig.build.json` sets `rootDir: "./src"` — compiled output goes to `dist/` (not `dist/src/`)
- `scripts/` is excluded from the build tsconfig — it runs via `ts-node` directly
- Import paths: relative only (no `src/` absolute paths — `baseUrl` is not supported at runtime in compiled output)

## Deployment (Vercel)

- Entry point: `api/index.js` → `require('../dist/bootstrap')`
- Build command: `npx prisma migrate deploy && npm run vercel-build`
- `vercel-build`: `prisma generate && nest build`
- Cron job configured in `vercel.json`: `/cron/expire-start-streaks` runs nightly at 23:00 UTC
