---
project_name: 'PropertyDrop'
user_name: 'qaki'
date: '2025-12-07'
sections_completed: ['technology_stack']
existing_patterns_found: 4
---

# Project Context: PropertyDrop

## 1. Technology Stack

### Core Architecture
*   **Framework:** Next.js 14+ (App Router)
*   **Language:** TypeScript (Strict Mode)
*   **Styling:** Tailwind CSS
*   **Database:** PostgreSQL (via Prisma ORM)
*   **State Management:** React Server Components (RSC) + React Hooks

### Critical Dependencies
*   **Auth:** NextAuth.js (Session Management)
*   **API Layer:** Hybrid (tRPC for Reads, Server Actions for Writes)
*   **Async Processing:** Inngest (Serverless Queues)
*   **Storage:** AWS S3 (Direct Upload)
*   **Payments:** Stripe (Checkout + Webhooks)
*   **Testing:** Playwright (E2E), Vitest (Unit)

## 2. Implementation Rules

### Coding Conventions
*   **Database Naming:** `snake_case` for DB tables/columns.
*   **Client Mapping:** Map DB fields to `camelCase` in Prisma schema using `@map`.
*   **Component Structure:** Co-locate feature-specific components in `_components` folder within route directory.
*   **Global Components:** Only truly shared UI primitives go in `src/components`.

### Architectural Patterns
*   **API Separation:** Use `tRPC` for data fetching (Queries) and `Server Actions` for mutations (Writes).
*   **Error Handling:** Server Actions MUST return a standardized `Result` object (`{ success: boolean, error?: string }`). NEVER throw errors in Actions.
*   **Async Workflows:** All long-running tasks (Image Resizing, Webhook Processing) MUST be handled by Inngest functions, not synchronous API routes.

### Security & Reliability
*   **Tenancy:** Every DB query must be scoped by `photographer_id` where applicable.
*   **Asset Access:** Raw S3 assets are private; access via pre-signed URLs only.
*   **Payment Verification:** Webhooks must rely on Inngest for durability (retries) and idempotency.

## 3. Development Workflow

### Initialization
*   **Starter:** `npm create t3-app@latest`
*   **Env:** Use `.env` for secrets, `.env.example` for public templates.
*   **Linting:** Follow standard T3 ESLint/Prettier configs.

