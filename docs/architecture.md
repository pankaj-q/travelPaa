# Visa Consultancy — System Architecture

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, TypeScript, Tailwind CSS v4, Framer Motion |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | JWT (access + refresh tokens), httpOnly cookies |
| Payments | Stripe |
| Email | Resend |
| File Storage | AWS S3 (presigned URLs) |
| Cache | Interface-based (lru-cache day 1, Redis later) |
| Background Jobs | In-process queue day 1, BullMQ + Redis later |
| API Design | REST v1 (`/api/v1/*`) |
| Validation | Zod (shared between frontend + backend) |
| Logging | Pino (structured JSON) |
| Deployment | Docker, PostgreSQL RDS, CloudFront CDN |

---

## Architecture Pattern: Modular Monolith

Why not microservices:
- ~15 endpoints for a team of 1-3 devs
- Splitting adds Redis pub/sub, service discovery, distributed tracing
- Well-structured monolith with module boundaries splits cleanly later

---

## Project Structure

### Frontend (Next.js 16)

```
visa-consultancy/src/
├── app/
│   ├── api/                      # Next.js API routes (dev/proxy until Express is built)
│   ├── apply/                    # Multi-step application form (4 steps)
│   │   └── page.tsx
│   ├── payment/                  # (future) standalone payment page if needed
│   ├── login/                    # User login
│   ├── register/                 # User registration
│   ├── dashboard/                # User applications & payment history
│   ├── admin/                    # Admin panel
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles + CSS variables
├── components/
│   ├── layout/                   # Navbar, Footer, TopInfoBar
│   ├── sections/                 # Hero, Services, About, etc.
│   ├── payment/                  # Payment-specific components
│   │   ├── StripeProvider.tsx    # Stripe Elements wrapper
│   │   ├── PaymentForm.tsx       # Card input + submit button
│   │   └── OrderSummary.tsx      # Fee breakdown card
│   └── providers/                # ThemeProvider, etc.
└── lib/
    ├── data.ts                   # Mock data (countries, services, etc.)
    ├── stripe.ts                 # Stripe client helpers
    └── api.ts                    # Backend API client wrapper
```

### Backend (Express - to be built)

```
backend/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── config/
│   │   ├── env.ts              # Zod-validated env vars
│   │   ├── database.ts         # Prisma client singleton
│   │   ├── redis.ts            # ioredis + BullMQ connection (future)
│   │   └── stripe.ts           # Stripe server client
│   ├── modules/
│   │   ├── auth/               # auth.controller/service/routes/validation
│   │   ├── user/
│   │   ├── application/
│   │   ├── payment/
│   │   └── admin/
│   ├── shared/
│   │   ├── middleware/          # auth, admin, validate, error, rate-limit
│   │   ├── services/           # email.service (Resend), upload.service (S3)
│   │   ├── workers/            # BullMQ consumers (future)
│   │   └── utils/              # logger (Pino), AppError, helpers
│   ├── app.ts                  # Express setup
│   ├── server.ts               # Entry point
│   └── workers.ts              # Background worker entry (future)
├── docker-compose.yml           # PostgreSQL + Redis + App + Worker
├── Dockerfile
├── .env.example
├── package.json
└── tsconfig.json
```

---

## Database Schema (Prisma + PostgreSQL)

```prisma
model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String
  phone     String?
  role      Role     @default(USER)
  deletedAt DateTime?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  applications Application[]
  payments     Payment[]
}

enum Role { USER ADMIN }

model Application {
  id           String   @id @default(cuid())
  userId       String
  status       AppStatus @default(PENDING)
  firstName    String
  lastName     String
  email        String
  phone        String
  dateOfBirth  DateTime
  nationality  String
  passportNumber String
  source       String
  destination  String
  visaType     String
  travelDate   DateTime
  duration     String
  purpose      String
  previousVisa Boolean  @default(false)
  additionalInfo String?
  adminNotes   String?
  deletedAt    DateTime?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  user      User      @relation(fields: [userId], references: [id])
  payment   Payment?
  documents Document[]

  @@index([userId])
  @@index([status])
  @@index([destination, visaType, createdAt])
}

enum AppStatus { PENDING REVIEWED APPROVED REJECTED }

model Payment {
  id                   String   @id @default(cuid())
  userId               String
  applicationId        String   @unique
  amount               Int      // stored in cents
  currency             String   @default("usd")
  stripePaymentIntentId String  @unique
  status               PayStatus @default(PENDING)
  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt

  user        User        @relation(fields: [userId], references: [id])
  application Application @relation(fields: [applicationId], references: [id])

  @@index([userId])
  @@index([status])
  @@index([stripePaymentIntentId])
}

enum PayStatus { PENDING COMPLETED FAILED REFUNDED }

model Document {
  id            String   @id @default(cuid())
  applicationId String
  name          String
  url           String
  type          String   // passport, photo, bank_statement, etc.
  createdAt     DateTime @default(now())

  application Application @relation(fields: [applicationId], references: [id])

  @@index([applicationId])
}

model Contact {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String?
  message   String
  createdAt DateTime @default(now())
}
```

### Key Design Decisions

| Decision | Rationale |
|---|---|
| **Explicit columns** for queryable fields (firstName, destination, status) | Enables fast indexed queries. JSONB only for truly dynamic data. |
| **Amount in cents** | Avoids floating-point errors. Format on frontend with `Intl.NumberFormat`. |
| **Soft deletes** (`deletedAt`) | GDPR compliance — anonymize data, never hard-delete financial records. |
| **Compound indexes** | `(destination, visaType, createdAt)` powers the admin reporting query. |
| **CUID over UUID** | Shorter, URL-safe, collision-resistant. |

---

## API Contract (v1)

### Auth

| Method | Endpoint | Auth | Body | Response |
|---|---|---|---|---|
| POST | `/api/v1/auth/register` | No | `{ name, email, password }` | `{ user, accessToken }` |
| POST | `/api/v1/auth/login` | No | `{ email, password }` | `{ user, accessToken }` |
| POST | `/api/v1/auth/logout` | Yes | — | `{ message }` |
| GET | `/api/v1/auth/me` | Yes | — | `{ user }` |
| POST | `/api/v1/auth/refresh` | Cookie | — | `{ accessToken }` |

### Applications

| Method | Endpoint | Auth | Body | Response |
|---|---|---|---|---|
| POST | `/api/v1/applications` | Yes | `{ personalInfo, travelDetails }` | `{ application }` |
| GET | `/api/v1/applications` | Yes | — | `{ applications[] }` |
| GET | `/api/v1/applications/:id` | Yes | — | `{ application }` |
| PATCH | `/api/v1/applications/:id/status` | Admin | `{ status, notes? }` | `{ application }` |

### Payment

| Method | Endpoint | Auth | Body | Response |
|---|---|---|---|---|
| POST | `/api/v1/payments/create-intent` | Yes | `{ applicationId }` | `{ clientSecret, amount }` |
| POST | `/api/v1/payments/confirm` | Yes | `{ paymentIntentId, applicationId }` | `{ status }` |
| GET | `/api/v1/payments/history` | Yes | — | `{ payments[] }` |
| POST | `/api/v1/webhooks/stripe` | Signature | Raw Stripe event | `200` |

### Admin

| Method | Endpoint | Auth | Query | Response |
|---|---|---|---|---|
| GET | `/api/v1/admin/applications` | Admin | `status, destination, from, to, page` | `{ applications[], total, page }` |
| GET | `/api/v1/admin/stats` | Admin | — | `{ total, pending, revenue, approvalRate }` |

### Contact

| Method | Endpoint | Auth | Body | Response |
|---|---|---|---|---|
| POST | `/api/v1/contact` | No | `{ name, email, phone?, message }` | `{ message }` |

---

## Security Architecture

### Payment Security (Preventing Fraud)

| Threat | Mitigation |
|---|---|
| Amount tampering | Amount set server-side in Stripe PaymentIntent. Client cannot modify. |
| Fake payment confirmation | Backend verifies payment with Stripe API (`pi.status === 'succeeded'`) before updating DB. |
| Webhook spoofing | Stripe signature verification (`stripe.webhooks.constructEvent()`). |
| Webhook replay | Store processed event IDs, skip duplicates. |
| IDOR (cross-user access) | Every query filters by `userId` from JWT. |
| CSRF | httpOnly cookies + `Authorization` header + CSRF tokens. |
| Brute force | Rate limiting on all auth + payment endpoints. |
| XSS | Input sanitization, never render raw HTML. |
| SQL injection | Prisma parameterized queries (not raw SQL except admin reports). |

### Payment Flow

```
Client                          Server                          Stripe
  │                               │                               │
  ├── Submit application ────────►│                               │
  │                               ├── Create PaymentIntent ──────►│
  │                               │◄── { clientSecret } ──────────│
  │◄── { clientSecret } ─────────│                               │
  │                               │                               │
  ├── Show Elements card form     │                               │
  ├── User fills card info        │                               │
  ├── stripe.confirmCardPayment ──┼──────────────────────────────►│
  │◄── { paymentIntent } ────────┼───────────────────────────────│
  │                               │                               │
  ├── POST /confirm ─────────────►│                               │
  │   { piId, appId }             ├── Verify with Stripe API ────►│
  │                               │◄── { verified } ──────────────│
  │                               ├── Prisma.$transaction([      │
  │                               │     create payment,          │
  │                               │     update application,      │
  │                               │     queue email              │
  │                               │   ])                          │
  │◄── { success } ──────────────│                               │
```

### Webhook Fallback

If the user closes the browser after `confirmCardPayment` but before the `/confirm` call:

```
Stripe ──► POST /api/v1/webhooks/stripe (signed)
Server  ──► Verify signature
        ──► Check event id (idempotency)
        ──► Find PaymentIntent
        ──► Mark payment completed
        ──► Update application status
        ──► Queue confirmation email
```

---

## CacheService Interface

All ephemeral data uses this interface — swap implementation without touching business logic.

```typescript
interface CacheService {
  get<T>(key: string): Promise<T | null>;
  set(key: string, value: unknown, ttlSeconds: number): Promise<void>;
  del(key: string): Promise<void>;
}
```

Day 1: `LruCacheService` (in-memory)
Future: `RedisCacheService` (distributed)

**Cache use cases:** OTP codes, password reset tokens, rate limit counters, idempotency keys, refresh token blacklist.

---

## UI Performance Strategy

| Technique | Application |
|---|---|
| GPU-accelerated animations | `will-change: transform`, `translateZ(0)` on animated elements |
| prefers-reduced-motion | Respect OS accessibility setting for all animations |
| Passive scroll listeners | `{ passive: true }` on all scroll/wheel events |
| CSS transforms only | Never animate `height`, `width`, `top`, `left` — use `transform` + `opacity` |
| Debounced scroll handlers | Navbar background change throttled to 100ms |
| React.memo on expensive lists | Country cards, service cards, review fields |
| useCallback on event handlers | Prevent re-renders of child components in forms |
| Dynamic imports | `next/dynamic` for heavy components (Framer Motion sections) |
| Image optimization | `next/image` with lazy loading, explicit aspect ratios |
| Code-split Framer Motion | Only load animation library on pages that use it |
| Turbopack defaults | Already enabled in Next.js 16 for faster dev builds |

---

## Build Order

| Phase | Tasks |
|---|---|
| 1 | ✅ Payment frontend page (Stripe Elements, secure Step 4 in apply form) |
| 2 | 🔲 UI optimization pass (Hero, Navbar, sections, animations) |
| 3 | 🔲 Backend setup (Express + Prisma + PostgreSQL + JWT auth) |
| 4 | 🔲 Stripe integration (create-intent endpoint + webhook handler) |
| 5 | 🔲 Auth pages (login/register UI + backend endpoints) |
| 6 | 🔲 Document upload (S3 presigned URLs) |
| 7 | 🔲 Email service (Resend — confirmation, status updates, receipts) |
| 8 | 🔲 User dashboard (application history, payment history) |
| 9 | 🔲 Admin panel (manage apps, view stats, update status) |
| 10 | 🔲 Connect existing apply form to live backend API |
