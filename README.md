# TravelPaa - Global Visa Consultancy Platform

A full-stack visa consultancy platform with Next.js 16 frontend and Node.js/Express/Prisma backend. Features multi-step visa applications, Stripe payments, application tracking, and admin management.

## 🏗 Architecture

```
Frontend (Next.js 16 + TypeScript + Tailwind)
├── Port 3000
├── Pages: Home, Destinations, Apply, Track, About, Contact, Auth
├── API Proxies: /api/applications, /api/applications/track
└── Stripe: @stripe/react-stripe-js

Backend (Node.js + Express + Prisma + PostgreSQL)
├── Port 4000
├── API: /api/v1/auth, /api/v1/applications, /api/v1/payments, /api/v1/admin
├── Webhooks: /api/v1/payments/webhooks/stripe
├── Auth: JWT (access + refresh tokens with rotation)
└── Database: PostgreSQL (Docker)

Infrastructure
├── Frontend: Vercel
├── Backend: Render
├── Database: PostgreSQL (Docker)
└── Payments: Stripe
```

## ✨ Features

### User-Facing
- **Home**: Hero, Instant Visa Checker, Popular Destinations, Testimonials
- **Destinations**: 30 countries with search, detailed visa info per country
- **Apply**: 4-step form (Personal → Travel → Review → Payment) with Stripe
- **Track**: Application tracking by number + DOB + passport
- **Auth**: Register/Login with JWT, refresh token rotation, secure cookies
- **Contact**: Form + info cards + social links

### Admin
- Dashboard with stats (applications, revenue, approval rate)
- Application management (list, filter, update status)
- Contact message management

### Security
- JWT access (15min) + refresh tokens (7 days, rotated on use, SHA-256 hashed)
- Helmet CSP/HSTS, CORS, rate limiting
- PII sanitization in error logs
- Webhook deduplication (Stripe event ID unique constraint)

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL (Docker recommended)
- Stripe account

### Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env with your values
docker-compose up -d postgres
npm install
npx prisma migrate deploy
npm run dev  # or npm run build && npm start
```

### Frontend Setup
```bash
cd frontend
cp .env.example .env.local
# Edit .env.local with your values
npm install
npm run dev
```

### Environment Variables

**Backend (.env)**
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/visa_consultancy"
JWT_SECRET="your-32-char-secret"
JWT_REFRESH_SECRET="your-32-char-secret"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
CORS_ORIGIN="http://localhost:3000"
STRIPE_AMOUNT_CENTS=5000
```

**Frontend (.env.local)**
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
BACKEND_API_URL="http://localhost:4000/api/v1"
```

## 📁 Project Structure

```
Frontend_Project/
├── backend/
│   ├── prisma/schema.prisma          # Database schema
│   ├── src/
│   │   ├── config/                   # env, database, stripe
│   │   ├── modules/
│   │   │   ├── auth/                 # Register, login, refresh, logout
│   │   │   ├── application/          # CRUD, track, status updates
│   │   │   ├── payment/              # Stripe intents, confirm, webhooks
│   │   │   ├── admin/                # Dashboard, app management
│   │   │   └── contact/              # Contact form
│   │   ├── shared/
│   │   │   ├── middleware/           # auth, rateLimit, error, validate
│   │   │   └── utils/                # jwt, AppError, logger, asyncHandler
│   │   ├── app.ts                    # Express app with security headers
│   │   └── server.ts                 # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── app/                      # Next.js App Router pages
│   │   │   ├── (auth)/login, register
│   │   │   ├── apply/, track/, destinations/
│   │   │   ├── about/, contact/
│   │   │   └── api/                  # API proxies to backend
│   │   ├── components/
│   │   │   ├── sections/             # Hero, InstantVisaChecker, Testimonials...
│   │   │   ├── layout/               # Navbar, Footer, TopInfoBar
│   │   │   ├── payment/              # PaymentForm, StripeProvider
│   │   │   └── ui/                   # SectionHeading, SocialIcon
│   │   ├── contexts/                 # AuthContext
│   │   ├── lib/                      # data, stripe, api
│   │   └── providers/                # ThemeProvider
│   └── package.json
│
└── docs/plan/                        # Implementation plans
```

## 🔑 Key Flows

### Visa Application + Payment
1. User fills 4-step form → submits to `/api/v1/applications`
2. Frontend calls `/api/v1/payments/create-intent` → gets `clientSecret`
3. Stripe Elements renders → user submits card
4. On success: `onSuccess(paymentIntentId)` → calls `/api/v1/payments/confirm`
5. Backend verifies PI with Stripe → updates payment + app status atomically
6. Webhook (`payment_intent.succeeded`) provides backup confirmation

### Application Tracking
1. User enters App Number + DOB + Passport
2. Frontend calls `/api/applications/track` → backend `/api/v1/applications/track`
3. Backend validates by appNumber + passportNumber + DOB
4. Returns status + timeline (7 stages: Documents Pending → Delivered)

### Auth Flow
1. Register/Login → sets `accessToken` (15min) + `refreshToken` cookie (7 days, httpOnly)
2. Access token in Authorization header for protected routes
3. `/api/v1/auth/refresh` rotates refresh token (revokes old, issues new)
3. `/api/v1/auth/logout` revokes refresh token + clears cookie

## 📋 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/auth/register` | - | Register new user |
| POST | `/api/v1/auth/login` | - | Login user |
| POST | `/api/v1/auth/refresh` | Cookie | Rotate refresh token |
| POST | `/api/v1/auth/logout` | Cookie | Revoke refresh token |
| GET | `/api/v1/auth/me` | Bearer | Get current user |
| POST | `/api/v1/applications` | Bearer | Create application |
| GET | `/api/v1/applications` | Bearer | List user applications |
| GET | `/api/v1/applications/:id` | Bearer | Get application details |
| POST | `/api/v1/applications/track` | - | Track by app# + DOB + passport |
| POST | `/api/v1/payments/create-intent` | Bearer | Create Stripe PaymentIntent |
| POST | `/api/v1/payments/confirm` | Bearer | Confirm payment + update status |
| GET | `/api/v1/payments/history` | Bearer | User payment history |
| POST | `/api/v1/payments/webhooks/stripe` | Signature | Stripe webhooks |
| GET | `/api/v1/admin/stats` | Admin | Dashboard stats |
| GET | `/api/v1/admin/applications` | Admin | List all applications |
| PATCH | `/api/v1/admin/applications/:id/status` | Admin | Update application status |

## 🧪 Testing

```bash
# Backend
cd backend
npm run lint
npm run build

# Frontend
cd frontend
npm run lint
npm run build
```

## 🚢 Deployment

### Backend (Render)
1. Connect GitHub repo
2. Set environment variables
3. Build: `npm install && npx prisma migrate deploy && npm run build`
4. Start: `npm start`

### Frontend (Vercel)
1. Import GitHub repo
2. Set environment variables (`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `BACKEND_API_URL`)
3. Deploy

### Stripe Webhook
- URL: `https://your-backend.onrender.com/api/v1/payments/webhooks/stripe`
- Events: `payment_intent.succeeded`, `payment_intent.payment_failed`, `payment_intent.canceled`, `payment_intent.requires_action`, `charge.refunded`, `charge.dispute.created`

## 📄 License

MIT