# Product Requirements Document (PRD)
## CinechAD - Cinema Ticket Booking Application

**Document Version:** 1.0
**Last Updated:** 2025-11-27
**Project Status:** Refactoring & Backend Integration Phase
**Target:** University prototype → Production-ready application

---

## Table of Contents
1. [Executive Summary](#1-executive-summary)
2. [Current State Analysis](#2-current-state-analysis)
3. [Product Vision & Goals](#3-product-vision--goals)
4. [User Personas](#4-user-personas)
5. [Functional Requirements](#5-functional-requirements)
6. [Technical Architecture](#6-technical-architecture)
7. [Backend Specifications](#7-backend-specifications)
8. [Database Schema Design](#8-database-schema-design)
9. [API Specifications](#9-api-specifications)
10. [Frontend Improvements](#10-frontend-improvements)
11. [Security Requirements](#11-security-requirements)
12. [Code Quality Standards](#12-code-quality-standards)
13. [Testing Strategy](#13-testing-strategy)
14. [Success Metrics](#14-success-metrics)
15. [Future Enhancements](#15-future-enhancements)

---

## 1. Executive Summary

### Project Overview
CinechAD is a cinema ticket booking application built with Angular 19 and Material Design. The application currently operates as a frontend-only prototype with hardcoded data and in-memory storage. This PRD outlines the transformation to a production-ready full-stack application with MongoDB backend, organized as a **monorepo** for better code sharing and maintainability.

### Key Objectives
1. **Convert to monorepo structure** with shared TypeScript types between frontend and backend
2. **Add backend infrastructure** using Node.js, Express, and MongoDB
3. **Improve code quality** by eliminating anti-patterns and type safety issues
4. **Implement data persistence** for all user interactions (cart, reviews, reservations)
5. **Maintain simplicity** to keep the codebase accessible to Angular beginners
6. **Add proper authentication** with JWT and password hashing
7. **Establish testing framework** for long-term maintainability

### Current State
- **2,162 lines** of TypeScript code
- **20 hardcoded movies** with 70+ projections
- **Frontend-only** (no backend)
- **No data persistence** (cart/reviews lost on refresh)
- **Type safety issues** (20+ uses of `any`)
- **No tests** written
- **Plain text passwords** in localStorage

### Scope
- **In Scope:** Backend development, code refactoring, database integration, authentication, testing
- **Out of Scope:** Payment integration, mobile apps, admin panel (future phases)

---

## 2. Current State Analysis

### 2.1 Existing Features

| Feature | Status | Quality | Critical Issues |
|---------|--------|---------|----------------|
| User Registration | ✅ Working | Medium | No password hashing, localStorage only |
| User Login | ✅ Working | Medium | Plain text passwords, no JWT |
| Movie Catalog | ✅ Working | Low | 20 hardcoded movies in TypeScript |
| Search & Filter | ✅ Working | Low | Duplicate logic, client-side only |
| Movie Details | ✅ Working | Medium | Hardcoded user IDs, `any` types |
| Shopping Cart | ✅ Working | Low | **No persistence** - lost on refresh |
| Reservations | ✅ Working | Low | Mock status system |
| Reviews & Ratings | ✅ Working | Low | **No persistence** - lost on refresh |
| User Profile | ✅ Working | Medium | Edits not saved |
| Route Guards | ✅ Working | High | ✓ Working correctly |

### 2.2 Technical Debt

**Type Safety Issues:**
- 20+ instances of `any` type usage
- Missing interfaces for dialog data
- Weak typing on projection objects

**Code Quality Issues:**
- Duplicate search logic in service AND component
- Genre lists hardcoded in 3 different places
- Date formatting duplicated across components
- Console.log statements scattered everywhere
- No error handling (zero try-catch blocks)

**Architecture Issues:**
- No backend API
- No database
- No state management (minimal RxJS usage)
- Services return arrays directly (not Observables)
- No HTTP interceptors

**Security Issues:**
- Passwords stored in plain text
- No input validation on backend (no backend!)
- No rate limiting
- No CSRF protection

---

## 3. Product Vision & Goals

### 3.1 Vision Statement
**"Create a simple, clean, and beginner-friendly cinema booking application that demonstrates modern full-stack development practices while maintaining code readability and simplicity."**

### 3.2 Primary Goals
1. ✅ **Educational Value** - Code easy to understand for Angular beginners
2. ✅ **Production Quality** - Deployable and usable in real scenarios
3. ✅ **Best Practices** - Follow Angular and Node.js standards
4. ✅ **Maintainability** - Simple architecture, easy to extend
5. ✅ **Type Safety** - Leverage TypeScript fully

### 3.3 Non-Goals
- ❌ Complex microservices architecture
- ❌ Advanced state management (NgRx)
- ❌ Real payment processing
- ❌ Real-time seat availability (WebSockets)
- ❌ Mobile apps

---

## 4. User Personas

### Primary Persona: Movie Enthusiast (Marina, 22-35)
**Goals:** Browse movies, book tickets easily, leave reviews
**Pain Points:** Complicated booking, losing cart items
**Frequency:** 2-4 bookings/month

**User Story:** *"As a movie enthusiast, I want to browse available movies, select a showtime, and reserve tickets without losing my selections if I accidentally refresh the page."*

### Secondary Persona: Casual Viewer (Marko, 18-25)
**Goals:** Find popular movies quickly, book for weekend
**Pain Points:** Too many options, confusing interfaces
**Frequency:** 1-2 bookings/month

### Tertiary Persona: Developer/Student (20-24)
**Goals:** Learn Angular/MongoDB from clean code example
**Pain Points:** Overcomplicated codebases, poor documentation
**Frequency:** One-time learning

---

## 5. Functional Requirements

### 5.1 Authentication & User Management

#### FR-1.1: User Registration
**Priority:** P0 (Critical)

**Requirements:**
- User creates account with: email, password, name, surname, birthdate, phone, address
- System validates email format and checks duplicates
- Password requirements: min 8 chars, 1 uppercase, 1 number, 1 special char
- User selects favorite genres (multi-select)
- Password hashed with bcrypt (10 salt rounds)
- User record created in MongoDB

**Acceptance Criteria:**
- ✅ Form validates all fields before submission
- ✅ Email uniqueness check prevents duplicates
- ✅ Passwords hashed with bcrypt
- ✅ User redirected to login after successful registration
- ✅ Clear, specific error messages

#### FR-1.2: User Login
**Priority:** P0 (Critical)

**Requirements:**
- User logs in with email and password
- System validates against MongoDB
- Returns JWT token (24-hour expiration)
- Token stored in localStorage or httpOnly cookie
- Redirects to `/movies` on success
- Specific error messages (user not found vs wrong password)

**Acceptance Criteria:**
- ✅ Email validated before API call
- ✅ JWT token returned on success
- ✅ Token includes user ID, email, name
- ✅ Invalid credentials show appropriate error
- ✅ Login button disabled during API call
- ✅ Session persists across browser tabs

#### FR-1.3: User Profile Management
**Priority:** P1 (High)

**Requirements:**
- View profile in dialog modal
- Edit: name, surname, phone, address, favorite genres
- Cannot edit: email, birthdate
- Changes persist to MongoDB
- Success/error toast notifications

#### FR-1.4: User Logout
**Priority:** P0 (Critical)

**Requirements:**
- Logout from navigation bar
- Clear JWT token and cached data
- Redirect to welcome page
- Protected routes redirect to login

### 5.2 Movie Catalog & Discovery

#### FR-2.1: Browse Movies
**Priority:** P0 (Critical)

**Requirements:**
- Display all movies in responsive grid
- Each card shows: poster, title, genres, price, first projection
- Load from MongoDB via API
- Pagination (20 per page)
- Loading spinner during fetch
- Error handling

**Acceptance Criteria:**
- ✅ Responsive grid (1-4 columns)
- ✅ All movie info displayed
- ✅ Loading spinner visible
- ✅ Error message on API failure
- ✅ Pagination when >20 movies

#### FR-2.2: Search Movies
**Priority:** P1 (High)

**Requirements:**
- Search by title (case-insensitive)
- 300ms debounce
- Partial matches included
- Works with genre filter (AND logic)
- "No results" message
- Optional: URL query params

**Acceptance Criteria:**
- ✅ Updates after 300ms of no typing
- ✅ Case-insensitive
- ✅ Partial matches work
- ✅ Search + filter combined
- ✅ Clear button resets

#### FR-2.3: Filter by Genre
**Priority:** P1 (High)

**Requirements:**
- Filter by single genre
- "All Genres" shows all
- Integrates with search
- Genre list from constants

#### FR-2.4: View Movie Details
**Priority:** P0 (Critical)

**Requirements:**
- Click card → details page
- Shows: description, director, cast, duration, release date, genres, poster
- All projections in table (date/time, seats, status, price)
- Select projection to reserve
- AuthGuard protected

### 5.3 Shopping Cart & Reservations

#### FR-3.1: Add to Cart
**Priority:** P0 (Critical)

**Requirements:**
- Add projection from movie details
- Decrement available seats
- Prevent if no seats available
- Quantity selection (1-10)
- Validate seat availability
- Persist to MongoDB (user-specific)
- Success toast, cart badge updates

#### FR-3.2: View Cart
**Priority:** P0 (Critical)

**Requirements:**
- View from navigation
- Table: movie, date/time, quantity, price, total, status
- Modify quantity (+/- buttons, reserved only)
- Remove items (watched only)
- Total price calculated
- Load from MongoDB
- AuthGuard protected

#### FR-3.3: Manage Cart Items
**Priority:** P1 (High)

**Requirements:**
- Increase/decrease quantity (check seats)
- Remove (watched status only)
- Update available seats
- Auto-recalculate totals
- Save to MongoDB immediately

#### FR-3.4: Reservation Status
**Priority:** P1 (High)

**Requirements:**
- Initial status: `reserved`
- Transitions:
  - `reserved` → `watched` (after projection date)
  - `reserved` → `canceled` (user cancels)
  - `canceled`/`watched` → final (no changes)
- Status determines actions:
  - `reserved`: modify quantity, can't remove
  - `watched`: can't modify, can remove
  - `canceled`: can't modify, can't remove
- Color-coded UI

### 5.4 Reviews & Ratings

#### FR-4.1: Submit Review
**Priority:** P1 (High)

**Requirements:**
- Review for `watched` projections only
- Rating (1-10), comment (optional, 500 char max)
- Validate user watched movie
- Prevent duplicate reviews
- Auto-timestamp
- Save to MongoDB

**Acceptance Criteria:**
- ✅ Form only for watched projections
- ✅ Rating required, comment optional
- ✅ 1-10 scale
- ✅ 500 char limit
- ✅ No duplicates
- ✅ Immediate display

#### FR-4.2: View Reviews
**Priority:** P1 (High)

**Requirements:**
- View all reviews for movie
- Display: username, rating, comment, date
- Calculate average rating (1 decimal)
- Sort by date (newest first)
- Load from MongoDB

#### FR-4.3: Review Validation
**Priority:** P1 (High)

**Requirements:**
- Only review watched movies
- One review per projection
- Rating 1-10 integer
- Sanitize comment (prevent XSS)

---

## 6. Technical Architecture

### 6.1 Technology Stack

#### Frontend
- **Angular:** 19.2.0
- **TypeScript:** 5.7+
- **Angular Material:** 19.2.8
- **RxJS:** 7.8.0
- **Testing:** Jasmine, Karma, Cypress

#### Backend
- **Node.js:** 20.x LTS
- **Express:** 4.x
- **TypeScript:** 5.7+
- **MongoDB:** 7.x
- **Mongoose:** 8.x
- **bcrypt:** 5.x
- **jsonwebtoken:** 9.x
- **express-validator:** 7.x

### 6.2 High-Level Architecture

```
┌──────────────────────────────────────┐
│      Angular 19 Frontend             │
│  ┌────────────────────────────┐     │
│  │  Components                 │     │
│  │  - Auth, Movies, Cart       │     │
│  │  - Reviews, Profile         │     │
│  └────────────────────────────┘     │
│  ┌────────────────────────────┐     │
│  │  Services                   │     │
│  │  - Observable-based         │     │
│  │  - HttpClient calls         │     │
│  └────────────────────────────┘     │
│  ┌────────────────────────────┐     │
│  │  Interceptors               │     │
│  │  - Auth (JWT injection)     │     │
│  │  - Error handling           │     │
│  └────────────────────────────┘     │
└──────────────────────────────────────┘
              │
              │ HTTP/REST (JSON)
              ▼
┌──────────────────────────────────────┐
│   Node.js + Express API              │
│  ┌────────────────────────────┐     │
│  │  Routes                     │     │
│  │  /api/auth, /api/movies     │     │
│  │  /api/cart, /api/reviews    │     │
│  └────────────────────────────┘     │
│  ┌────────────────────────────┐     │
│  │  Middleware                 │     │
│  │  - JWT verify               │     │
│  │  - Validation               │     │
│  │  - Rate limiting            │     │
│  └────────────────────────────┘     │
│  ┌────────────────────────────┐     │
│  │  Controllers                │     │
│  │  - Request handlers         │     │
│  └────────────────────────────┘     │
│  ┌────────────────────────────┐     │
│  │  Services                   │     │
│  │  - Business logic           │     │
│  └────────────────────────────┘     │
└──────────────────────────────────────┘
              │
              │ Mongoose ODM
              ▼
┌──────────────────────────────────────┐
│      MongoDB Database                │
│  Collections:                        │
│  - users                             │
│  - movies                            │
│  - projections                       │
│  - reservations                      │
│  - reviews                           │
└──────────────────────────────────────┘
```

### 6.3 Folder Structure (Monorepo)

```
cinechad-monorepo/
├── frontend/                    # Angular 19 Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── auth/
│   │   │   │   ├── movies/
│   │   │   │   ├── cart/
│   │   │   │   └── review/
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── movie.service.ts
│   │   │   │   ├── cart.service.ts
│   │   │   │   ├── review.service.ts
│   │   │   │   └── logger.service.ts (new)
│   │   │   ├── interceptors/     # NEW
│   │   │   │   ├── auth.interceptor.ts
│   │   │   │   └── error.interceptor.ts
│   │   │   ├── interfaces/       # Will use shared types
│   │   │   ├── constants/
│   │   │   ├── validators/       # NEW
│   │   │   └── utils/            # NEW
│   │   ├── environments/
│   │   └── assets/
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                     # Node.js + Express API (NEW)
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.model.ts
│   │   │   ├── Movie.model.ts
│   │   │   ├── Projection.model.ts
│   │   │   ├── Reservation.model.ts
│   │   │   └── Review.model.ts
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── movie.routes.ts
│   │   │   ├── cart.routes.ts
│   │   │   └── review.routes.ts
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   ├── movie.controller.ts
│   │   │   ├── cart.controller.ts
│   │   │   └── review.controller.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── movie.service.ts
│   │   │   └── cart.service.ts
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts
│   │   │   ├── validation.middleware.ts
│   │   │   └── error.middleware.ts
│   │   ├── validators/
│   │   │   ├── auth.validator.ts
│   │   │   ├── movie.validator.ts
│   │   │   └── cart.validator.ts
│   │   ├── utils/
│   │   │   └── logger.ts
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── app.ts
│   │   └── server.ts
│   ├── tests/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── shared/                      # Shared TypeScript Types & Constants (NEW)
│   ├── types/
│   │   ├── user.interface.ts
│   │   ├── movie.interface.ts
│   │   ├── reservation.interface.ts
│   │   ├── review.interface.ts
│   │   └── index.ts
│   └── constants/
│       ├── genres.ts
│       └── status.ts
│
├── docs/
│   ├── PRD.md
│   ├── IMPLEMENTATION-PLAN.md
│   └── API-DOCUMENTATION.md
│
├── package.json                 # Root package.json (monorepo scripts)
├── .gitignore
└── README.md

# Monorepo Benefits:
# ✅ Single repository for frontend + backend + shared code
# ✅ Shared TypeScript types (no duplication)
# ✅ Single command to run both servers: npm run dev
# ✅ Easier for AI tools to understand full context
# ✅ Better for version control and deployment
```

---

## 7. Backend Specifications

### 7.1 Server Configuration

```typescript
// Development
PORT: 3000
HOST: localhost
MONGO_URI: mongodb://localhost:27017/cinechad
JWT_SECRET: [256-bit secret]
JWT_EXPIRES_IN: 24h
```

### 7.2 Middleware Stack

```typescript
app.use(helmet());              // Security headers
app.use(cors(corsOptions));     // CORS
app.use(express.json());        // JSON parser
app.use(morgan('combined'));    // HTTP logging
app.use(rateLimiter);           // 100 req/15min

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/cart', authMiddleware, cartRoutes);
app.use('/api/reviews', authMiddleware, reviewRoutes);
app.use('/api/user', authMiddleware, userRoutes);

// Error handling
app.use(errorMiddleware);
```

### 7.3 Authentication

**JWT Payload:**
```typescript
{
    userId: string,
    email: string,
    name: string,
    iat: number,
    exp: number
}
```

**Password Hashing:**
```typescript
// Registration
const hashedPassword = await bcrypt.hash(password, 10);

// Login
const isValid = await bcrypt.compare(password, user.password);
```

### 7.4 Error Handling

**Standard Error Response:**
```json
{
    "success": false,
    "error": {
        "message": "Validation failed",
        "code": "VALIDATION_ERROR",
        "details": { "email": "Email is required" }
    },
    "timestamp": "2025-11-27T10:30:00.000Z"
}
```

**Error Codes:**
- 400: VALIDATION_ERROR
- 401: UNAUTHORIZED
- 403: FORBIDDEN
- 404: NOT_FOUND
- 409: CONFLICT
- 429: RATE_LIMIT_EXCEEDED
- 500: INTERNAL_SERVER_ERROR

---

## 8. Database Schema Design

### 8.1 Users Collection

```typescript
{
    _id: ObjectId,
    email: String (unique, indexed),
    password: String (hashed, never returned),
    name: String,
    surname: String,
    birthDate: Date,
    phoneNumber: String,
    address: String,
    favGenres: [String],
    createdAt: Date,
    updatedAt: Date
}
```

**Indexes:** `{ email: 1 }`

### 8.2 Movies Collection

```typescript
{
    _id: ObjectId,
    title: String (indexed, text search),
    description: String,
    director: String,
    cast: [String],
    genres: [String] (indexed),
    duration: Number (minutes),
    releaseDate: Date,
    imageUrl: String,
    price: Number,
    averageRating: Number (0-10),
    totalReviews: Number,
    createdAt: Date,
    updatedAt: Date
}
```

**Indexes:**
- `{ title: 'text' }`
- `{ genres: 1 }`
- `{ releaseDate: -1 }`

### 8.3 Projections Collection

```typescript
{
    _id: ObjectId,
    movieId: ObjectId (ref: Movie, indexed),
    dateTime: Date (indexed),
    totalSeats: Number (default: 100),
    availableSeats: Number,
    status: 'available' | 'sold_out' | 'past',
    createdAt: Date,
    updatedAt: Date
}
```

**Indexes:**
- `{ movieId: 1, dateTime: 1 }`
- `{ dateTime: 1, status: 1 }`

### 8.4 Reservations Collection

```typescript
{
    _id: ObjectId,
    userId: ObjectId (ref: User, indexed),
    projectionId: ObjectId (ref: Projection, indexed),
    movieId: ObjectId (ref: Movie),
    quantity: Number (1-10),
    totalPrice: Number,
    status: 'reserved' | 'watched' | 'canceled',
    expiresAt: Date,
    createdAt: Date,
    updatedAt: Date
}
```

**Indexes:**
- `{ userId: 1, status: 1 }`
- `{ projectionId: 1, status: 1 }`
- `{ userId: 1, projectionId: 1 }` (unique for reserved)

### 8.5 Reviews Collection

```typescript
{
    _id: ObjectId,
    userId: ObjectId (ref: User, indexed),
    movieId: ObjectId (ref: Movie, indexed),
    projectionId: ObjectId (ref: Projection),
    rating: Number (1-10),
    comment: String (max 500 chars),
    createdAt: Date,
    updatedAt: Date
}
```

**Indexes:**
- `{ userId: 1, projectionId: 1 }` (unique)
- `{ movieId: 1, createdAt: -1 }`

---

## 9. API Specifications

### 9.1 Authentication Endpoints

#### POST /api/auth/signup
Register new user

**Request:**
```json
{
    "email": "john@example.com",
    "password": "SecurePass123!",
    "name": "John",
    "surname": "Doe",
    "birthDate": "1995-05-15",
    "phoneNumber": "+381641234567",
    "address": "Belgrade",
    "favGenres": ["Action", "Sci-Fi"]
}
```

**Response (201):**
```json
{
    "success": true,
    "message": "User registered successfully",
    "data": {
        "user": {
            "id": "...",
            "email": "john@example.com",
            "name": "John"
        }
    }
}
```

#### POST /api/auth/login
Login user

**Request:**
```json
{
    "email": "john@example.com",
    "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
    "success": true,
    "data": {
        "token": "eyJhbGc...",
        "user": {
            "id": "...",
            "email": "john@example.com",
            "name": "John",
            "surname": "Doe"
        }
    }
}
```

### 9.2 Movie Endpoints

#### GET /api/movies
Get all movies (paginated, filterable)

**Query Params:**
- page (default: 1)
- limit (default: 20, max: 100)
- search (title search)
- genre (filter)
- sortBy (releaseDate, averageRating, title)
- sortOrder (asc, desc)

**Response (200):**
```json
{
    "success": true,
    "data": {
        "movies": [...],
        "pagination": {
            "currentPage": 1,
            "totalPages": 2,
            "totalItems": 35,
            "itemsPerPage": 20
        }
    }
}
```

#### GET /api/movies/:id
Get movie details with projections

**Response (200):**
```json
{
    "success": true,
    "data": {
        "movie": {
            "id": "...",
            "title": "The Godfather",
            "description": "...",
            "director": "Francis Ford Coppola",
            "averageRating": 9.2
        },
        "projections": [
            {
                "id": "...",
                "dateTime": "2025-12-05T19:30:00.000Z",
                "availableSeats": 78,
                "status": "available"
            }
        ]
    }
}
```

### 9.3 Cart Endpoints

#### POST /api/cart
Add to cart (requires auth)

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
    "projectionId": "...",
    "quantity": 2
}
```

**Response (201):**
```json
{
    "success": true,
    "message": "Reservation created successfully",
    "data": {
        "reservation": {
            "id": "...",
            "quantity": 2,
            "totalPrice": 1000,
            "status": "reserved"
        }
    }
}
```

#### GET /api/cart
Get user's cart (requires auth)

**Response (200):**
```json
{
    "success": true,
    "data": {
        "items": [
            {
                "id": "...",
                "movie": { "title": "...", "imageUrl": "..." },
                "projection": { "dateTime": "..." },
                "quantity": 2,
                "totalPrice": 1000,
                "status": "reserved"
            }
        ],
        "grandTotal": 1000
    }
}
```

#### PUT /api/cart/:id
Update cart item quantity (requires auth)

**Request:**
```json
{
    "quantity": 3
}
```

#### DELETE /api/cart/:id
Remove cart item (requires auth, watched only)

**Response (200):**
```json
{
    "success": true,
    "message": "Cart item removed successfully"
}
```

### 9.4 Review Endpoints

#### POST /api/reviews
Submit review (requires auth)

**Request:**
```json
{
    "movieId": "...",
    "projectionId": "...",
    "rating": 9,
    "comment": "Great movie!"
}
```

**Response (201):**
```json
{
    "success": true,
    "data": {
        "review": {
            "id": "...",
            "rating": 9,
            "comment": "Great movie!",
            "createdAt": "..."
        }
    }
}
```

#### GET /api/movies/:movieId/reviews
Get reviews for movie

**Query Params:**
- page (default: 1)
- limit (default: 10)

**Response (200):**
```json
{
    "success": true,
    "data": {
        "reviews": [
            {
                "id": "...",
                "user": { "name": "John", "surname": "Doe" },
                "rating": 9,
                "comment": "...",
                "createdAt": "..."
            }
        ],
        "averageRating": 9.2,
        "totalReviews": 1547
    }
}
```

### 9.5 User Profile Endpoints

#### GET /api/user/profile
Get current user profile (requires auth)

#### PUT /api/user/profile
Update user profile (requires auth)

**Request:**
```json
{
    "name": "John",
    "surname": "Doe",
    "phoneNumber": "+381641234567",
    "address": "New address",
    "favGenres": ["Action", "Drama"]
}
```

---

## 10. Frontend Improvements

### 10.1 Code Refactoring Priority List

#### P0 (Critical) - Must Fix
1. **Fix Type Safety**
   - Replace all `any` types with proper interfaces
   - Enable TypeScript strict mode

2. **Create Constants Files**
   - Routes constants
   - API endpoints constants
   - Status enums
   - Consolidate genre lists

3. **Add Logging Service**
   - Replace all console.log
   - Centralized error logging

4. **Convert Services to Observable-based**
   - AuthService with BehaviorSubject
   - CartService with BehaviorSubject
   - All services return Observables

5. **Create HTTP Interceptors**
   - Auth interceptor (JWT injection)
   - Error interceptor (401 handling)

#### P1 (High) - Should Fix
6. **Remove Code Duplication**
   - Centralize search logic
   - Date formatting utility
   - Remove duplicate genre arrays

7. **Add Loading States**
   - Spinners for API calls
   - Disable buttons during requests
   - Error messages

8. **Reactive Forms**
   - Convert signup to reactive forms
   - Add custom validators
   - Real-time validation

9. **Error Handling**
   - Try-catch blocks
   - User-friendly error messages
   - Retry mechanisms

### 10.2 New Services to Create

**LoggerService:**
```typescript
@Injectable({ providedIn: 'root' })
export class LoggerService {
    log(message: string, data?: any): void
    error(message: string, error?: any): void
    warn(message: string, data?: any): void
}
```

**Updated AuthService:**
```typescript
private currentUserSubject = new BehaviorSubject<User | null>(null);
public currentUser$ = this.currentUserSubject.asObservable();

login(email: string, password: string): Observable<LoginResponse>
logout(): void
isAuthenticated(): boolean
```

### 10.3 Component Improvements

**Loading State Pattern:**
```typescript
export class MovieListComponent {
    movies: Movie[] = [];
    isLoading = false;
    error: string | null = null;

    loadMovies(): void {
        this.isLoading = true;
        this.movieService.getAllMovies().subscribe({
            next: (response) => {
                this.movies = response.data.movies;
                this.isLoading = false;
            },
            error: (error) => {
                this.error = 'Failed to load movies';
                this.isLoading = false;
            }
        });
    }
}
```

---

## 11. Security Requirements

### 11.1 Authentication Security
- Password hashing: bcrypt (10 salt rounds)
- JWT tokens: 24-hour expiration
- Password requirements: min 8 chars, 1 uppercase, 1 number, 1 special
- Never return passwords in API responses
- Use `.select('-password')` in queries

### 11.2 API Security
- **Rate Limiting:** 100 requests/15min per IP
- **CORS:** Restrict to frontend URL only
- **Helmet:** Security headers enabled
- **Input Validation:** express-validator on all inputs
- **XSS Prevention:** Sanitize HTML in comments
- **NoSQL Injection:** Validate ObjectIds

### 11.3 Data Security
- Environment variables for secrets
- Never log passwords
- Sanitize error messages (no stack traces in production)
- HTTPS in production
- MongoDB authentication enabled

---

## 12. Code Quality Standards

### 12.1 TypeScript Configuration

```json
{
    "compilerOptions": {
        "strict": true,
        "noImplicitAny": true,
        "strictNullChecks": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true
    }
}
```

### 12.2 ESLint Rules

```json
{
    "rules": {
        "no-console": "warn",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/explicit-function-return-type": "warn",
        "max-len": ["error", { "code": 120 }]
    }
}
```

### 12.3 Code Review Checklist

- [ ] No `any` types
- [ ] All functions have return types
- [ ] Error handling present
- [ ] Logging (not console.log)
- [ ] No hardcoded values
- [ ] No code duplication
- [ ] Tests written
- [ ] Comments on complex logic
- [ ] Accessible HTML
- [ ] Responsive design

---

## 13. Testing Strategy

### 13.1 Unit Tests

**Coverage Requirements:**
- Services: 100%
- Components: 80%
- Overall: >80%

**Test Frameworks:**
- Frontend: Jasmine + Karma
- Backend: Jest

### 13.2 Integration Tests

**Backend API Tests:**
- Supertest for API endpoints
- Test all CRUD operations
- Test error scenarios
- Test authentication flows

### 13.3 E2E Tests

**Cypress User Flows:**
1. Signup → Login → Browse → Reserve → Cart
2. Login → Movie Details → Review
3. Login → Profile → Edit → Save

---

## 14. Success Metrics

### 14.1 Technical Metrics
- ✅ Zero `any` types (100% type safety)
- ✅ >80% test coverage
- ✅ Lighthouse performance >80
- ✅ Lighthouse accessibility >90
- ✅ Zero ESLint errors
- ✅ API response <500ms (p95)

### 14.2 Code Quality Metrics
- ✅ All services use Observables
- ✅ All API calls via HttpClient
- ✅ All constants extracted
- ✅ All logging uses LoggerService
- ✅ All forms use Reactive Forms
- ✅ All errors handled gracefully

### 14.3 Functional Metrics
- ✅ Full booking flow works without errors
- ✅ Cart persists across sessions
- ✅ Reviews persist to database
- ✅ JWT authentication works
- ✅ Password hashing implemented
- ✅ 20 movies migrated to MongoDB

---

## 15. Future Enhancements

### Phase 5: Post-MVP Features

**Admin Dashboard:**
- Add/edit/delete movies
- Manage projections
- View reservations
- User management
- Analytics

**Payment Integration:**
- Stripe/PayPal
- Email receipts
- Refund system

**Advanced Features:**
- Email notifications
- QR code tickets
- Real-time seat selection
- Movie recommendations
- Loyalty points

**Technical Improvements:**
- Standalone Angular components
- Server-side rendering (SSR)
- GraphQL API
- Redis caching
- CI/CD pipeline

---

## Appendix A: File Changes Summary

### Files to Create (NEW)
**Backend (50+ files):**
- All backend folder structure
- Models, routes, controllers, services, middleware

**Frontend (10 files):**
- `services/logger.service.ts`
- `interceptors/auth.interceptor.ts`
- `interceptors/error.interceptor.ts`
- `constants/routes.constants.ts`
- `constants/api.constants.ts`
- `constants/status.constants.ts`
- `utils/date-formatter.ts`
- `validators/custom-validators.ts`

**Config:**
- `.eslintrc.json`
- `.prettierrc`
- `backend/.env`
- `backend/tsconfig.json`

**Docs:**
- `PRD.md` (this file)
- `IMPLEMENTATION-PLAN.md`

### Files to Modify (EXISTING)
- All 4 services (convert to Observable-based)
- All components (fix types, add loading states)
- `signup.component.ts` (reactive forms)
- All interfaces (proper typing)
- `app.module.ts` (add HttpClient, interceptors)
- `tsconfig.json` (enable strict mode)

### Files to Delete
- Commented code blocks
- Duplicate search logic
- Unused methods

---

## Document Approval

**Product Owner:** Nikola
**Date:** 2025-11-27
**Version:** 1.0
**Status:** Ready for Implementation

**Next Steps:**
1. ✅ Review and approve PRD
2. Create Implementation Plan
3. Begin Phase 1: Code Cleanup
4. Proceed to Phase 2: Backend Development

---

**END OF PRODUCT REQUIREMENTS DOCUMENT**
