# Implementation Plan
## CinechAD - Cinema Ticket Booking Application

**Document Version:** 1.0
**Last Updated:** 2025-11-27
**Estimated Total Time:** 40-60 hours (spread across 4-6 weeks)
**Complexity:** Moderate (beginner-friendly approach)

---

## Table of Contents
1. [Overview](#overview)
2. [Phase 1: Code Cleanup & Refactoring](#phase-1-code-cleanup--refactoring)
3. [Phase 2: Backend Development](#phase-2-backend-development)
4. [Phase 3: Frontend Integration](#phase-3-frontend-integration)
5. [Phase 4: Testing & Polish](#phase-4-testing--polish)
6. [Timeline & Milestones](#timeline--milestones)
7. [Risk Mitigation](#risk-mitigation)

---

## Overview

### Implementation Strategy
We'll follow a **4-phase approach** prioritizing simplicity and maintainability:

1. **Phase 1:** Clean up existing code (no backend yet)
2. **Phase 2:** Build backend from scratch
3. **Phase 3:** Connect frontend to backend
4. **Phase 4:** Add tests and polish

### Guiding Principles
- ✅ **Simple First:** Start with easiest tasks to build momentum
- ✅ **Incremental:** Test after each major change
- ✅ **Type-Safe:** Fix type issues before adding features
- ✅ **Educational:** Code should be readable by beginners
- ✅ **Documented:** Comment complex logic
- ✅ **Monorepo:** Share code between frontend and backend

---

## Phase 0: Monorepo Setup (COMPLETED ✅)
**Duration:** 1 hour
**Goal:** Convert project to monorepo structure

### What Was Done:
✅ **Created folder structure:**
```
cinechad-monorepo/
├── frontend/         # Moved Angular app here
├── backend/          # Empty (will be created in Phase 2)
├── shared/           # Shared TypeScript types & constants
│   ├── types/
│   │   ├── user.interface.ts
│   │   ├── movie.interface.ts
│   │   ├── reservation.interface.ts
│   │   ├── review.interface.ts
│   │   └── index.ts
│   └── constants/
│       ├── genres.ts
│       └── status.ts
├── docs/             # Moved PRD and Implementation Plan here
├── package.json      # Root package.json with monorepo scripts
└── README.md         # New README with monorepo instructions
```

✅ **Created shared types** that both frontend and backend will use

✅ **Created root `package.json`** with scripts:
```bash
npm run dev              # Run both frontend + backend
npm run dev:frontend     # Run frontend only
npm run dev:backend      # Run backend only
npm install:all          # Install all dependencies
```

### New Installation Instructions:
```bash
# 1. Install root dependencies
npm install

# 2. Install frontend dependencies
cd frontend && npm install && cd ..

# 3. Install backend dependencies (later in Phase 2)
cd backend && npm install && cd ..

# OR use the helper script:
npm run install:all
```

---

## Phase 1: Code Cleanup & Refactoring
**Duration:** 8-12 hours (1-2 weeks)
**Goal:** Improve code quality without changing functionality

### Step 1.1: Setup Tools & Configuration
**Duration:** 1 hour
**Priority:** P0

**Tasks:**
1. Install ESLint and Prettier
   ```bash
   cd frontend
   npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser prettier eslint-config-prettier
   ```

2. Create `.eslintrc.json` in frontend root:
   ```json
   {
       "extends": [
           "eslint:recommended",
           "plugin:@typescript-eslint/recommended"
       ],
       "rules": {
           "no-console": "warn",
           "@typescript-eslint/no-explicit-any": "error",
           "max-len": ["error", { "code": 120 }]
       }
   }
   ```

3. Create `.prettierrc` in frontend root:
   ```json
   {
       "singleQuote": true,
       "trailingComma": "es5",
       "tabWidth": 4,
       "semi": true,
       "printWidth": 120
   }
   ```

4. Add scripts to `package.json`:
   ```json
   {
       "scripts": {
           "lint": "eslint src/**/*.ts",
           "format": "prettier --write \"src/**/*.ts\"",
           "format:check": "prettier --check \"src/**/*.ts\""
       }
   }
   ```

**Acceptance Criteria:**
- ✅ ESLint and Prettier installed
- ✅ Configuration files created
- ✅ `npm run lint` runs without crashing
- ✅ `npm run format` formats all files

---

### Step 1.2: Create Constants Files
**Duration:** 1 hour
**Priority:** P0

**Tasks:**

1. **Create `src/app/constants/routes.constants.ts`:**
   ```typescript
   export const ROUTES = {
       HOME: '',
       WELCOME: 'welcome',
       SIGNUP: 'signup',
       LOGIN: 'login',
       MOVIES: 'movies',
       MOVIE_DETAILS: 'movies/:id',
       CART: 'cart',
       REVIEWS: 'reviews'
   } as const;
   ```

2. **Create `src/app/constants/status.constants.ts`:**
   ```typescript
   export enum ReservationStatus {
       RESERVED = 'reserved',
       WATCHED = 'watched',
       CANCELED = 'canceled'
   }

   export enum ProjectionStatus {
       AVAILABLE = 'available',
       SOLD_OUT = 'sold_out',
       PAST = 'past'
   }

   export const STATUS_COLORS = {
       [ReservationStatus.RESERVED]: 'primary',
       [ReservationStatus.WATCHED]: 'accent',
       [ReservationStatus.CANCELED]: 'warn'
   } as const;
   ```

3. **Update `src/app/constants/genres.constants.ts`:**
   ```typescript
   export const ALL_GENRES = [
       'Action', 'Drama', 'Horror', 'Thriller', 'Sci-Fi',
       'Romance', 'History', 'Comedy', 'Crime', 'Mystery',
       'Adventure', 'Fantasy', 'Biography', 'Music', 'Western'
   ] as const;

   export type Genre = typeof ALL_GENRES[number];
   ```

4. **Update all components to use constants:**
   - `app-routing.module.ts`: Import ROUTES
   - `signup.component.ts`: Import ALL_GENRES
   - `movie-list.component.ts`: Import ALL_GENRES
   - `cart.component.ts`: Import STATUS_COLORS

**Acceptance Criteria:**
- ✅ All 3 constant files created
- ✅ No hardcoded route strings in routing module
- ✅ No duplicate genre arrays
- ✅ Status values use enums

---

### Step 1.3: Fix Type Safety Issues
**Duration:** 2 hours
**Priority:** P0

**Tasks:**

1. **Fix `movie-details.component.ts`:**
   ```typescript
   // Line 22: BEFORE
   dataSource!: MatTableDataSource<any>;

   // AFTER
   dataSource!: MatTableDataSource<Projection>;

   // Line 79: BEFORE
   reserveProjection(projection: any): void {

   // AFTER
   reserveProjection(projection: Projection): void {

   // Line 32-33: BEFORE
   currentUserId = 1;
   currentUserName = 'John Doe';

   // AFTER - inject AuthService
   constructor(
       private authService: AuthService,
       // ... other deps
   ) {}

   ngOnInit() {
       const currentUser = this.authService.currentUser;
       this.currentUserId = currentUser?.id || 0;
       this.currentUserName = currentUser?.name || 'Guest';
   }
   ```

2. **Fix `profile.component.ts`:**
   ```typescript
   // Create interface for dialog data
   export interface ProfileDialogData {
       user: User;
   }

   // Line 17: BEFORE
   constructor(@Inject(MAT_DIALOG_DATA) public data: any, ...)

   // AFTER
   constructor(
       @Inject(MAT_DIALOG_DATA) public data: ProfileDialogData,
       private dialogRef: MatDialogRef<ProfileComponent>,
       private authService: AuthService
   ) {}
   ```

3. **Fix all other `any` types:**
   - Search codebase for `: any`
   - Replace with proper interfaces
   - Run `npm run lint` to find remaining issues

4. **Update `tsconfig.json` to enable strict mode:**
   ```json
   {
       "compilerOptions": {
           "strict": true,
           "noImplicitAny": true,
           "strictNullChecks": true
       }
   }
   ```

**Acceptance Criteria:**
- ✅ Zero `any` types in codebase
- ✅ TypeScript strict mode enabled
- ✅ No TypeScript compilation errors
- ✅ `npm run lint` shows no type errors

---

### Step 1.4: Create Logger Service
**Duration:** 1 hour
**Priority:** P1

**Tasks:**

1. **Generate service:**
   ```bash
   cd src/app/services
   ng generate service logger
   ```

2. **Implement `logger.service.ts`:**
   ```typescript
   import { Injectable } from '@angular/core';
   import { environment } from '../../environments/environment';

   @Injectable({
       providedIn: 'root'
   })
   export class LoggerService {
       log(message: string, data?: any): void {
           if (!environment.production) {
               console.log(`[LOG] ${new Date().toISOString()} - ${message}`, data || '');
           }
       }

       error(message: string, error?: any): void {
           console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error || '');
           // Future: Send to error tracking (Sentry, LogRocket, etc.)
       }

       warn(message: string, data?: any): void {
           if (!environment.production) {
               console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, data || '');
           }
       }

       info(message: string, data?: any): void {
           if (!environment.production) {
               console.info(`[INFO] ${new Date().toISOString()} - ${message}`, data || '');
           }
       }
   }
   ```

3. **Replace all `console.log` statements:**
   - `auth.service.ts`: `console.log(user)` → `this.logger.log('User found', user)`
   - `app.component.ts`: `console.log('No user')` → `this.logger.warn('No user logged in')`
   - `signup.component.ts`: `console.log('Poslata forma')` → `this.logger.info('Signup form submitted', form.value)`
   - Remove all commented `console.log` statements

4. **Inject LoggerService everywhere:**
   ```typescript
   constructor(
       private logger: LoggerService,
       // ... other deps
   ) {}
   ```

**Acceptance Criteria:**
- ✅ LoggerService created
- ✅ All `console.log` replaced
- ✅ No raw console statements (run: `grep -r "console\." src/app`)
- ✅ Logs only appear in development mode

---

### Step 1.5: Remove Code Duplication
**Duration:** 2 hours
**Priority:** P1

**Tasks:**

1. **Create `src/app/utils/date-formatter.ts`:**
   ```typescript
   export class DateFormatter {
       static formatDate(date: Date | string): string {
           return new Date(date).toLocaleDateString('en-US', {
               year: 'numeric',
               month: 'long',
               day: 'numeric'
           });
       }

       static formatDateTime(date: Date | string): string {
           return new Date(date).toLocaleDateString('en-US', {
               year: 'numeric',
               month: 'long',
               day: 'numeric',
               hour: '2-digit',
               minute: '2-digit'
           });
       }

       static formatTime(date: Date | string): string {
           return new Date(date).toLocaleTimeString('en-US', {
               hour: '2-digit',
               minute: '2-digit'
           });
       }
   }
   ```

2. **Update `movie-card.component.ts`:**
   ```typescript
   // BEFORE (lines 32-39)
   getFormattedDate(date: Date) {
       return new Date(date).toLocaleDateString('en-US', {...});
   }

   // AFTER
   import { DateFormatter } from '../../utils/date-formatter';

   getFormattedDate(date: Date): string {
       return DateFormatter.formatDateTime(date);
   }
   ```

3. **Remove duplicate search logic in `movie.service.ts`:**
   ```typescript
   // DELETE this method (lines 776-787)
   searchMovies(searchTerm: string, selectedGenre?: string): Movie[] {
       // ... this code
   }

   // Keep only:
   getAllMovies(): Movie[] {
       return MovieService.dummyData;
   }

   getMovieById(id: number): Movie | undefined {
       return MovieService.dummyData.find(movie => movie.id === id);
   }
   ```

4. **Clean up `movie-list.component.ts`:**
   ```typescript
   // Keep search logic ONLY in component (not service)
   searchMoviesByTerm(searchTerm: string): void {
       this.filteredMovies = this.allMovies.filter(movie =>
           movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
           (this.selectedGenre === 'All' || movie.genre.includes(this.selectedGenre))
       );
   }
   ```

5. **Remove commented code blocks:**
   - Delete commented code in `movie-details.component.ts` (lines 59-68)
   - Delete commented code in `movie-card.component.ts` (lines 65-93)

**Acceptance Criteria:**
- ✅ DateFormatter utility created
- ✅ All date formatting uses utility
- ✅ Duplicate search method removed
- ✅ All commented code deleted
- ✅ No duplicate genre arrays (all use constants)

---

### Step 1.6: Clean Up Code Style
**Duration:** 1 hour
**Priority:** P2

**Tasks:**

1. **Replace `var` with `const`/`let` in `auth.service.ts`:**
   ```typescript
   // Lines 105-113: BEFORE
   var maxId: number = 0;
   var id = ++maxId;
   var user: User = {...};

   // AFTER
   const maxId: number = AuthService.dummyUserList.reduce((max, u) =>
       u.id > max ? u.id : max, 0);
   const id = maxId + 1;
   const user: User = {...};
   ```

2. **Use template literals for strings:**
   ```typescript
   // signup.component.ts line 43: BEFORE
   this.errorText = "User " + email + " isn't registered. ";

   // AFTER
   this.errorText = `User ${email} isn't registered.`;
   ```

3. **Run Prettier to format all files:**
   ```bash
   npm run format
   ```

4. **Fix any remaining ESLint errors:**
   ```bash
   npm run lint -- --fix
   ```

**Acceptance Criteria:**
- ✅ No `var` usage (only `const`/`let`)
- ✅ Template literals for string concatenation
- ✅ All files formatted with Prettier
- ✅ Zero ESLint errors

---

### Phase 1 Checkpoint
**Duration:** 1 hour
**What to do:**
1. Run `npm run lint` - should pass
2. Run `npm run format:check` - should pass
3. Run `ng build` - should succeed
4. Run `ng serve` - app should work normally
5. Test all features manually - nothing should break
6. Commit changes:
   ```bash
   git add .
   git commit -m "Phase 1: Code cleanup and refactoring

   - Added ESLint and Prettier
   - Created constants files for routes, status, genres
   - Fixed all type safety issues (removed 'any' types)
   - Created LoggerService to replace console.log
   - Removed code duplication
   - Cleaned up code style (var → const/let, template literals)
   - Enabled TypeScript strict mode"
   ```

**Success Criteria:**
- ✅ All Phase 1 tasks completed
- ✅ App runs without errors
- ✅ No functionality broken
- ✅ Code is cleaner and more maintainable

---

## Phase 2: Backend Development
**Duration:** 16-20 hours (2-3 weeks)
**Goal:** Build Node.js/Express backend with MongoDB

### Step 2.1: Backend Project Setup
**Duration:** 1 hour
**Priority:** P0

**Tasks:**

1. **Create backend folder structure:**
   ```bash
   cd /home/nikola/Documents/1. Project/app-cinechad-main
   mkdir backend
   cd backend
   npm init -y
   ```

2. **Install dependencies:**
   ```bash
   npm install express mongoose bcrypt jsonwebtoken express-validator cors helmet morgan dotenv
   npm install --save-dev typescript @types/node @types/express @types/bcrypt @types/jsonwebtoken @types/cors ts-node nodemon
   ```

3. **Create `tsconfig.json`:**
   ```json
   {
       "compilerOptions": {
           "target": "ES2020",
           "module": "commonjs",
           "outDir": "./dist",
           "rootDir": "./src",
           "strict": true,
           "esModuleInterop": true,
           "skipLibCheck": true,
           "forceConsistentCasingInFileNames": true,
           "resolveJsonModule": true
       },
       "include": ["src/**/*"],
       "exclude": ["node_modules"]
   }
   ```

4. **Create `nodemon.json`:**
   ```json
   {
       "watch": ["src"],
       "ext": "ts",
       "exec": "ts-node src/server.ts"
   }
   ```

5. **Update `package.json` scripts:**
   ```json
   {
       "scripts": {
           "dev": "nodemon",
           "build": "tsc",
           "start": "node dist/server.js"
       }
   }
   ```

6. **Create `.env` file:**
   ```env
   PORT=3000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/cinechad
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-256-bits
   JWT_EXPIRES_IN=24h
   FRONTEND_URL=http://localhost:4200
   ```

7. **Create `.env.example`:**
   ```env
   PORT=3000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/cinechad
   JWT_SECRET=your-secret-key-here
   JWT_EXPIRES_IN=24h
   FRONTEND_URL=http://localhost:4200
   ```

8. **Create folder structure:**
   ```bash
   mkdir -p src/{models,routes,controllers,services,middleware,validators,utils,config}
   touch src/{server.ts,app.ts}
   ```

**Acceptance Criteria:**
- ✅ Backend folder created with all dependencies
- ✅ TypeScript configured
- ✅ `.env` file created (add to `.gitignore`)
- ✅ Folder structure ready

---

### Step 2.2: Database Configuration & Models
**Duration:** 3 hours
**Priority:** P0

**Tasks:**

1. **Create `src/config/database.ts`:**
   ```typescript
   import mongoose from 'mongoose';
   import dotenv from 'dotenv';

   dotenv.config();

   const connectDB = async (): Promise<void> => {
       try {
           await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/cinechad');
           console.log('MongoDB connected successfully');
       } catch (error) {
           console.error('MongoDB connection error:', error);
           process.exit(1);
       }
   };

   export default connectDB;
   ```

2. **Create `src/models/User.model.ts`:**
   ```typescript
   import mongoose, { Schema, Document } from 'mongoose';

   export interface IUser extends Document {
       email: string;
       password: string;
       name: string;
       surname: string;
       birthDate: Date;
       phoneNumber: string;
       address?: string;
       favGenres: string[];
       createdAt: Date;
       updatedAt: Date;
   }

   const UserSchema = new Schema<IUser>({
       email: {
           type: String,
           required: true,
           unique: true,
           lowercase: true,
           trim: true,
           index: true
       },
       password: {
           type: String,
           required: true,
           select: false  // Never return password by default
       },
       name: { type: String, required: true, trim: true },
       surname: { type: String, required: true, trim: true },
       birthDate: { type: Date, required: true },
       phoneNumber: { type: String, required: true },
       address: { type: String, trim: true },
       favGenres: [{
           type: String,
           enum: ['Action', 'Drama', 'Horror', 'Thriller', 'Sci-Fi', 'Romance',
                  'History', 'Comedy', 'Crime', 'Mystery', 'Adventure', 'Fantasy',
                  'Biography', 'Music', 'Western']
       }]
   }, {
       timestamps: true,
       toJSON: {
           transform: (doc, ret) => {
               delete ret.password;
               ret.id = ret._id;
               delete ret._id;
               delete ret.__v;
               return ret;
           }
       }
   });

   UserSchema.index({ email: 1 });

   export default mongoose.model<IUser>('User', UserSchema);
   ```

3. **Create `src/models/Movie.model.ts`:**
   ```typescript
   import mongoose, { Schema, Document } from 'mongoose';

   export interface IMovie extends Document {
       title: string;
       description: string;
       director: string;
       cast: string[];
       genres: string[];
       duration: number;
       releaseDate: Date;
       imageUrl: string;
       price: number;
       averageRating: number;
       totalReviews: number;
   }

   const MovieSchema = new Schema<IMovie>({
       title: { type: String, required: true, trim: true, index: true },
       description: { type: String, required: true },
       director: { type: String, required: true },
       cast: [{ type: String, required: true }],
       genres: [{
           type: String,
           enum: ['Action', 'Drama', 'Horror', 'Thriller', 'Sci-Fi', 'Romance',
                  'History', 'Comedy', 'Crime', 'Mystery', 'Adventure', 'Fantasy',
                  'Biography', 'Music', 'Western'],
           required: true
       }],
       duration: { type: Number, required: true, min: 1 },
       releaseDate: { type: Date, required: true },
       imageUrl: { type: String, required: true },
       price: { type: Number, required: true, min: 0 },
       averageRating: { type: Number, default: 0, min: 0, max: 10 },
       totalReviews: { type: Number, default: 0, min: 0 }
   }, { timestamps: true });

   MovieSchema.index({ title: 'text' });
   MovieSchema.index({ genres: 1 });
   MovieSchema.index({ releaseDate: -1 });

   export default mongoose.model<IMovie>('Movie', MovieSchema);
   ```

4. **Create other models:**
   - `src/models/Projection.model.ts` (see PRD schema)
   - `src/models/Reservation.model.ts` (see PRD schema)
   - `src/models/Review.model.ts` (see PRD schema)

**Acceptance Criteria:**
- ✅ Database connection file created
- ✅ All 5 models created with proper schemas
- ✅ Indexes defined on frequently queried fields
- ✅ TypeScript interfaces match schemas

---

### Step 2.3: Authentication System
**Duration:** 4 hours
**Priority:** P0

**Tasks:**

1. **Create `src/utils/logger.ts`:**
   ```typescript
   export const logger = {
       info: (message: string, data?: any) => console.log(`[INFO] ${message}`, data || ''),
       error: (message: string, error?: any) => console.error(`[ERROR] ${message}`, error || ''),
       warn: (message: string, data?: any) => console.warn(`[WARN] ${message}`, data || '')
   };
   ```

2. **Create `src/validators/auth.validator.ts`:**
   ```typescript
   import { body } from 'express-validator';

   export const signupValidator = [
       body('email').isEmail().normalizeEmail(),
       body('password')
           .isLength({ min: 8 })
           .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
           .withMessage('Password must contain uppercase, number, and special char'),
       body('name').trim().notEmpty(),
       body('surname').trim().notEmpty(),
       body('birthDate').isISO8601().toDate(),
       body('phoneNumber').isMobilePhone('any'),
       body('address').optional().trim(),
       body('favGenres').isArray()
   ];

   export const loginValidator = [
       body('email').isEmail().normalizeEmail(),
       body('password').notEmpty()
   ];
   ```

3. **Create `src/middleware/validation.middleware.ts`:**
   ```typescript
   import { Request, Response, NextFunction } from 'express';
   import { validationResult } from 'express-validator';

   export const validationMiddleware = (req: Request, res: Response, next: NextFunction): void => {
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
           res.status(400).json({
               success: false,
               error: {
                   message: 'Validation failed',
                   code: 'VALIDATION_ERROR',
                   details: errors.mapped()
               }
           });
           return;
       }
       next();
   };
   ```

4. **Create `src/services/auth.service.ts`:**
   ```typescript
   import bcrypt from 'bcrypt';
   import jwt from 'jsonwebtoken';
   import User, { IUser } from '../models/User.model';

   export class AuthService {
       async signup(userData: any): Promise<IUser> {
           const existingUser = await User.findOne({ email: userData.email });
           if (existingUser) {
               throw new Error('Email already exists');
           }

           const hashedPassword = await bcrypt.hash(userData.password, 10);
           const user = await User.create({
               ...userData,
               password: hashedPassword
           });

           return user;
       }

       async login(email: string, password: string): Promise<{ user: IUser; token: string }> {
           const user = await User.findOne({ email }).select('+password');
           if (!user) {
               throw new Error('Invalid credentials');
           }

           const isPasswordValid = await bcrypt.compare(password, user.password);
           if (!isPasswordValid) {
               throw new Error('Invalid credentials');
           }

           const token = jwt.sign(
               { userId: user._id, email: user.email, name: user.name },
               process.env.JWT_SECRET!,
               { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
           );

           return { user, token };
       }
   }
   ```

5. **Create `src/controllers/auth.controller.ts`:**
   ```typescript
   import { Request, Response } from 'express';
   import { AuthService } from '../services/auth.service';
   import { logger } from '../utils/logger';

   const authService = new AuthService();

   export class AuthController {
       async signup(req: Request, res: Response): Promise<void> {
           try {
               const user = await authService.signup(req.body);
               logger.info('User registered', { email: user.email });

               res.status(201).json({
                   success: true,
                   message: 'User registered successfully',
                   data: { user }
               });
           } catch (error: any) {
               logger.error('Signup error', error);
               res.status(400).json({
                   success: false,
                   error: {
                       message: error.message || 'Signup failed',
                       code: 'SIGNUP_ERROR'
                   }
               });
           }
       }

       async login(req: Request, res: Response): Promise<void> {
           try {
               const { email, password } = req.body;
               const { user, token } = await authService.login(email, password);
               logger.info('User logged in', { email });

               res.status(200).json({
                   success: true,
                   message: 'Login successful',
                   data: { user, token }
               });
           } catch (error: any) {
               logger.error('Login error', error);
               res.status(401).json({
                   success: false,
                   error: {
                       message: error.message || 'Login failed',
                       code: 'LOGIN_ERROR'
                   }
               });
           }
       }
   }
   ```

6. **Create `src/routes/auth.routes.ts`:**
   ```typescript
   import { Router } from 'express';
   import { AuthController } from '../controllers/auth.controller';
   import { signupValidator, loginValidator } from '../validators/auth.validator';
   import { validationMiddleware } from '../middleware/validation.middleware';

   const router = Router();
   const authController = new AuthController();

   router.post('/signup', signupValidator, validationMiddleware, (req, res) => authController.signup(req, res));
   router.post('/login', loginValidator, validationMiddleware, (req, res) => authController.login(req, res));

   export default router;
   ```

7. **Create `src/middleware/auth.middleware.ts`:**
   ```typescript
   import { Request, Response, NextFunction } from 'express';
   import jwt from 'jsonwebtoken';

   export interface AuthRequest extends Request {
       user?: {
           userId: string;
           email: string;
           name: string;
       };
   }

   export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
       const token = req.headers.authorization?.split(' ')[1];

       if (!token) {
           res.status(401).json({
               success: false,
               error: { message: 'No token provided', code: 'UNAUTHORIZED' }
           });
           return;
       }

       try {
           const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
           req.user = decoded;
           next();
       } catch (error) {
           res.status(401).json({
               success: false,
               error: { message: 'Invalid token', code: 'UNAUTHORIZED' }
           });
       }
   };
   ```

**Acceptance Criteria:**
- ✅ Signup endpoint created
- ✅ Login endpoint created
- ✅ Password hashing with bcrypt
- ✅ JWT token generation
- ✅ Auth middleware for protected routes
- ✅ Input validation working

---

### Step 2.4: Movie & Projection Endpoints
**Duration:** 3 hours
**Priority:** P0

**Tasks:**

1. **Create movie service, controller, routes** (similar pattern to auth)
2. **Implement endpoints:**
   - `GET /api/movies` (with pagination, search, filter)
   - `GET /api/movies/:id` (with projections)
3. **Create seed script to migrate 20 movies from frontend**
4. **Test endpoints with Postman/Thunder Client**

**Acceptance Criteria:**
- ✅ Movie endpoints working
- ✅ Pagination implemented
- ✅ Search by title working
- ✅ Filter by genre working
- ✅ 20 movies seeded in database

---

### Step 2.5: Cart & Reservation Endpoints
**Duration:** 3 hours
**Priority:** P0

**Tasks:**

1. **Create reservation service, controller, routes**
2. **Implement endpoints:**
   - `POST /api/cart` (add reservation)
   - `GET /api/cart` (get user's cart)
   - `PUT /api/cart/:id` (update quantity)
   - `DELETE /api/cart/:id` (remove item)
3. **Implement seat availability validation**
4. **Test all cart operations**

**Acceptance Criteria:**
- ✅ Cart endpoints working
- ✅ Seat availability checked
- ✅ Reservations persist to database
- ✅ Status management working

---

### Step 2.6: Review Endpoints
**Duration:** 2 hours
**Priority:** P1

**Tasks:**

1. **Create review service, controller, routes**
2. **Implement endpoints:**
   - `POST /api/reviews` (submit review)
   - `GET /api/movies/:movieId/reviews` (get reviews)
3. **Implement watched status validation**
4. **Calculate average ratings**

**Acceptance Criteria:**
- ✅ Review endpoints working
- ✅ Can only review watched movies
- ✅ No duplicate reviews
- ✅ Average rating calculated

---

### Step 2.7: Server Setup & Middleware
**Duration:** 2 hours
**Priority:** P0

**Tasks:**

1. **Create `src/app.ts`:**
   ```typescript
   import express from 'express';
   import cors from 'cors';
   import helmet from 'helmet';
   import morgan from 'morgan';
   import authRoutes from './routes/auth.routes';
   // ... import other routes

   const app = express();

   // Middleware
   app.use(helmet());
   app.use(cors({ origin: process.env.FRONTEND_URL }));
   app.use(express.json());
   app.use(morgan('combined'));

   // Routes
   app.use('/api/auth', authRoutes);
   // ... other routes

   // Health check
   app.get('/health', (req, res) => {
       res.json({ status: 'OK', timestamp: new Date().toISOString() });
   });

   export default app;
   ```

2. **Create `src/server.ts`:**
   ```typescript
   import app from './app';
   import connectDB from './config/database';
   import dotenv from 'dotenv';

   dotenv.config();

   const PORT = process.env.PORT || 3000;

   connectDB().then(() => {
       app.listen(PORT, () => {
           console.log(`Server running on http://localhost:${PORT}`);
           console.log(`Environment: ${process.env.NODE_ENV}`);
       });
   });
   ```

3. **Add error handling middleware**
4. **Add rate limiting**

**Acceptance Criteria:**
- ✅ Server starts without errors
- ✅ All middleware configured
- ✅ Health check endpoint works
- ✅ CORS configured for frontend

---

### Phase 2 Checkpoint
**Duration:** 1 hour
**What to do:**
1. Install and run MongoDB locally
2. Run `npm run dev` in backend folder
3. Test all endpoints with Postman:
   - Signup new user
   - Login (get JWT)
   - Get movies (no auth)
   - Add to cart (with auth)
   - Submit review (with auth)
4. Check database in MongoDB Compass
5. Commit changes:
   ```bash
   git add .
   git commit -m "Phase 2: Backend development complete

   - Node.js + Express + TypeScript setup
   - MongoDB with Mongoose ODM
   - 5 database models (User, Movie, Projection, Reservation, Review)
   - Authentication with bcrypt + JWT
   - All API endpoints implemented
   - Input validation with express-validator
   - Security middleware (helmet, cors, rate limiting)"
   ```

**Success Criteria:**
- ✅ Backend server runs
- ✅ All API endpoints work
- ✅ Database connection stable
- ✅ JWT authentication working
- ✅ Data persists to MongoDB

---

## Phase 3: Frontend Integration
**Duration:** 12-16 hours (2 weeks)
**Goal:** Connect Angular frontend to backend API

### Step 3.1: Environment & HTTP Setup
**Duration:** 1 hour
**Priority:** P0

**Tasks:**

1. **Update `src/environments/environment.ts`:**
   ```typescript
   export const environment = {
       production: false,
       apiUrl: 'http://localhost:3000/api'
   };
   ```

2. **Create `src/app/constants/api.constants.ts`:**
   ```typescript
   import { environment } from '../../environments/environment';

   export const API_BASE_URL = environment.apiUrl;

   export const API_ENDPOINTS = {
       AUTH: {
           SIGNUP: '/auth/signup',
           LOGIN: '/auth/login'
       },
       MOVIES: {
           LIST: '/movies',
           DETAILS: '/movies/:id',
           REVIEWS: '/movies/:movieId/reviews'
       },
       CART: {
           LIST: '/cart',
           ADD: '/cart',
           UPDATE: '/cart/:id',
           DELETE: '/cart/:id'
       },
       USER: {
           PROFILE: '/user/profile'
       }
   } as const;
   ```

3. **Add HttpClientModule to `app.module.ts`:**
   ```typescript
   import { HttpClientModule } from '@angular/common/http';

   @NgModule({
       imports: [
           // ... existing imports
           HttpClientModule
       ]
   })
   ```

**Acceptance Criteria:**
- ✅ Environment configured
- ✅ API constants created
- ✅ HttpClientModule imported

---

### Step 3.2: Create HTTP Interceptors
**Duration:** 2 hours
**Priority:** P0

**Tasks:**

1. **Generate interceptors:**
   ```bash
   ng generate interceptor interceptors/auth
   ng generate interceptor interceptors/error
   ```

2. **Implement `auth.interceptor.ts`:**
   ```typescript
   import { Injectable } from '@angular/core';
   import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
   import { Observable } from 'rxjs';

   @Injectable()
   export class AuthInterceptor implements HttpInterceptor {
       intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
           const token = localStorage.getItem('token');

           if (token) {
               const clonedReq = req.clone({
                   headers: req.headers.set('Authorization', `Bearer ${token}`)
               });
               return next.handle(clonedReq);
           }

           return next.handle(req);
       }
   }
   ```

3. **Implement `error.interceptor.ts`:**
   ```typescript
   import { Injectable } from '@angular/core';
   import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
   import { Observable, throwError } from 'rxjs';
   import { catchError } from 'rxjs/operators';
   import { Router } from '@angular/router';
   import { LoggerService } from '../services/logger.service';

   @Injectable()
   export class ErrorInterceptor implements HttpInterceptor {
       constructor(
           private router: Router,
           private logger: LoggerService
       ) {}

       intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
           return next.handle(req).pipe(
               catchError((error: HttpErrorResponse) => {
                   if (error.status === 401) {
                       this.logger.warn('Unauthorized, redirecting to login');
                       localStorage.removeItem('token');
                       localStorage.removeItem('user');
                       this.router.navigate(['/login']);
                   }

                   this.logger.error('HTTP Error', {
                       url: req.url,
                       status: error.status,
                       message: error.error?.error?.message || error.message
                   });

                   return throwError(() => error);
               })
           );
       }
   }
   ```

4. **Register interceptors in `app.module.ts`:**
   ```typescript
   import { HTTP_INTERCEPTORS } from '@angular/common/http';
   import { AuthInterceptor } from './interceptors/auth.interceptor';
   import { ErrorInterceptor } from './interceptors/error.interceptor';

   providers: [
       { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
       { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
   ]
   ```

**Acceptance Criteria:**
- ✅ Auth interceptor adds JWT to requests
- ✅ Error interceptor handles 401
- ✅ Interceptors registered in app module

---

### Step 3.3: Refactor AuthService (Observable-based)
**Duration:** 3 hours
**Priority:** P0

**Tasks:**

1. **Update `auth.service.ts`:**
   ```typescript
   import { Injectable } from '@angular/core';
   import { HttpClient } from '@angular/common/http';
   import { BehaviorSubject, Observable } from 'rxjs';
   import { tap, catchError } from 'rxjs/operators';
   import { User } from '../interfaces/user.interface';
   import { API_BASE_URL, API_ENDPOINTS } from '../constants/api.constants';
   import { LoggerService } from './logger.service';

   interface LoginResponse {
       success: boolean;
       data: {
           user: User;
           token: string;
       };
   }

   @Injectable({ providedIn: 'root' })
   export class AuthService {
       private currentUserSubject = new BehaviorSubject<User | null>(null);
       public currentUser$ = this.currentUserSubject.asObservable();

       constructor(
           private http: HttpClient,
           private logger: LoggerService
       ) {
           this.loadUserFromStorage();
       }

       private loadUserFromStorage(): void {
           const userStr = localStorage.getItem('user');
           if (userStr) {
               try {
                   const user = JSON.parse(userStr);
                   this.currentUserSubject.next(user);
                   this.logger.info('User loaded from storage', { email: user.email });
               } catch (error) {
                   this.logger.error('Failed to parse user from storage', error);
                   localStorage.removeItem('user');
               }
           }
       }

       signup(userData: any): Observable<any> {
           return this.http.post(`${API_BASE_URL}${API_ENDPOINTS.AUTH.SIGNUP}`, userData).pipe(
               tap(() => this.logger.info('User signed up successfully')),
               catchError(error => {
                   this.logger.error('Signup failed', error);
                   throw error;
               })
           );
       }

       login(email: string, password: string): Observable<LoginResponse> {
           return this.http.post<LoginResponse>(`${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`, { email, password }).pipe(
               tap(response => {
                   const { user, token } = response.data;
                   localStorage.setItem('token', token);
                   localStorage.setItem('user', JSON.stringify(user));
                   this.currentUserSubject.next(user);
                   this.logger.info('User logged in', { email: user.email });
               }),
               catchError(error => {
                   this.logger.error('Login failed', error);
                   throw error;
               })
           );
       }

       logout(): void {
           localStorage.removeItem('token');
           localStorage.removeItem('user');
           this.currentUserSubject.next(null);
           this.logger.info('User logged out');
       }

       get currentUser(): User | null {
           return this.currentUserSubject.value;
       }

       isAuthenticated(): boolean {
           return this.currentUserSubject.value !== null;
       }
   }
   ```

2. **Update `login.component.ts` to use Observable:**
   ```typescript
   onSubmit(): void {
       if (!this.email || !this.password) {
           this.errorMessage = 'Email and password are required';
           return;
       }

       this.isLoading = true;
       this.authService.login(this.email, this.password).subscribe({
           next: (response) => {
               this.logger.info('Login successful');
               this.router.navigate(['/movies']);
               this.isLoading = false;
           },
           error: (error) => {
               this.errorMessage = error.error?.error?.message || 'Login failed';
               this.isLoading = false;
           }
       });
   }
   ```

3. **Update `signup.component.ts` similarly**

**Acceptance Criteria:**
- ✅ AuthService uses HttpClient
- ✅ Login/signup call backend API
- ✅ JWT token stored in localStorage
- ✅ User data persists across refresh
- ✅ Loading states implemented

---

### Step 3.4: Refactor MovieService
**Duration:** 2 hours
**Priority:** P0

**Tasks:**

1. **Update `movie.service.ts`:**
   ```typescript
   import { Injectable } from '@angular/core';
   import { HttpClient, HttpParams } from '@angular/common/http';
   import { Observable } from 'rxjs';
   import { tap, catchError } from 'rxjs/operators';
   import { Movie } from '../interfaces/movie.interface';
   import { API_BASE_URL, API_ENDPOINTS } from '../constants/api.constants';
   import { LoggerService } from './logger.service';

   interface MoviesResponse {
       success: boolean;
       data: {
           movies: Movie[];
           pagination: {
               currentPage: number;
               totalPages: number;
               totalItems: number;
               itemsPerPage: number;
           };
       };
   }

   interface MovieDetailsResponse {
       success: boolean;
       data: {
           movie: Movie;
           projections: any[];
       };
   }

   @Injectable({ providedIn: 'root' })
   export class MovieService {
       constructor(
           private http: HttpClient,
           private logger: LoggerService
       ) {}

       getAllMovies(page = 1, limit = 20, search?: string, genre?: string): Observable<MoviesResponse> {
           let params = new HttpParams()
               .set('page', page.toString())
               .set('limit', limit.toString());

           if (search) params = params.set('search', search);
           if (genre && genre !== 'All') params = params.set('genre', genre);

           return this.http.get<MoviesResponse>(`${API_BASE_URL}${API_ENDPOINTS.MOVIES.LIST}`, { params }).pipe(
               tap(response => this.logger.info('Movies loaded', { count: response.data.movies.length })),
               catchError(error => {
                   this.logger.error('Failed to load movies', error);
                   throw error;
               })
           );
       }

       getMovieById(id: string): Observable<MovieDetailsResponse> {
           const url = `${API_BASE_URL}${API_ENDPOINTS.MOVIES.DETAILS.replace(':id', id)}`;
           return this.http.get<MovieDetailsResponse>(url).pipe(
               tap(response => this.logger.info('Movie details loaded', { title: response.data.movie.title })),
               catchError(error => {
                   this.logger.error('Failed to load movie details', error);
                   throw error;
               })
           );
       }
   }
   ```

2. **Update `movie-list.component.ts`:**
   ```typescript
   ngOnInit(): void {
       this.loadMovies();
   }

   loadMovies(): void {
       this.isLoading = true;
       this.error = null;

       this.movieService.getAllMovies(1, 20, this.searchTerm, this.selectedGenre).subscribe({
           next: (response) => {
               this.allMovies = response.data.movies;
               this.filteredMovies = [...this.allMovies];
               this.isLoading = false;
           },
           error: (error) => {
               this.error = 'Failed to load movies. Please try again.';
               this.isLoading = false;
           }
       });
   }
   ```

3. **Add loading spinner to template**

**Acceptance Criteria:**
- ✅ MovieService uses HttpClient
- ✅ Movies loaded from backend
- ✅ Search and filter work
- ✅ Loading states visible
- ✅ Error handling implemented

---

### Step 3.5: Refactor CartService
**Duration:** 3 hours
**Priority:** P0

**Tasks:**

1. **Update `cart.service.ts` to use HttpClient**
2. **Update `cart.component.ts` to load from API**
3. **Implement add/update/delete operations**
4. **Test cart persistence across refresh**

**Acceptance Criteria:**
- ✅ CartService uses HttpClient
- ✅ Cart loads from backend
- ✅ Add to cart works
- ✅ Update quantity works
- ✅ Remove item works
- ✅ Cart persists across refresh

---

### Step 3.6: Refactor ReviewService
**Duration:** 2 hours
**Priority:** P1

**Tasks:**

1. **Update `review.service.ts` to use HttpClient**
2. **Update `review.component.ts` to load/submit via API**
3. **Test review submission and display**

**Acceptance Criteria:**
- ✅ ReviewService uses HttpClient
- ✅ Reviews load from backend
- ✅ Submit review works
- ✅ Reviews persist to database

---

### Phase 3 Checkpoint
**Duration:** 1 hour
**What to do:**
1. Start backend: `npm run dev`
2. Start frontend: `ng serve`
3. Test full user flow:
   - Signup → Login → Browse → Search → Filter
   - Add to cart → View cart → Update quantity
   - Submit review → View reviews
4. Check browser DevTools for errors
5. Check backend logs
6. Commit changes:
   ```bash
   git commit -m "Phase 3: Frontend integration complete

   - Angular services refactored to use HttpClient
   - All services now Observable-based
   - HTTP interceptors for auth and error handling
   - Loading states and error messages added
   - Full integration with backend API
   - Cart and reviews now persist to database"
   ```

**Success Criteria:**
- ✅ Frontend connects to backend
- ✅ All features work end-to-end
- ✅ Data persists across refresh
- ✅ No console errors
- ✅ JWT authentication working

---

## Phase 4: Testing & Polish
**Duration:** 8-12 hours (1-2 weeks)
**Goal:** Add tests, improve UX, finalize

### Step 4.1: Unit Tests (Frontend)
**Duration:** 4 hours
**Priority:** P1

**Tasks:**

1. **Write tests for AuthService:**
   ```typescript
   describe('AuthService', () => {
       it('should login successfully', () => {
           // Test implementation
       });
   });
   ```

2. **Write tests for MovieService**
3. **Write tests for CartService**
4. **Run coverage:** `ng test --code-coverage`
5. **Aim for >80% coverage**

**Acceptance Criteria:**
- ✅ Service tests written
- ✅ Coverage >80%
- ✅ All tests pass

---

### Step 4.2: E2E Tests
**Duration:** 3 hours
**Priority:** P2

**Tasks:**

1. **Install Cypress:**
   ```bash
   npm install --save-dev cypress
   ```

2. **Write E2E test for user flow:**
   ```typescript
   describe('Booking Flow', () => {
       it('should complete full booking', () => {
           cy.visit('/signup');
           // ... test steps
       });
   });
   ```

3. **Test critical paths**

**Acceptance Criteria:**
- ✅ Cypress configured
- ✅ Main user flow tested
- ✅ Tests pass

---

### Step 4.3: UI/UX Polish
**Duration:** 3 hours
**Priority:** P1

**Tasks:**

1. **Add loading spinners everywhere**
2. **Improve error messages**
3. **Add success toast notifications**
4. **Fix responsive design issues**
5. **Add empty states**
6. **Improve accessibility**

**Acceptance Criteria:**
- ✅ No jarring UX issues
- ✅ Loading states consistent
- ✅ Error messages clear
- ✅ Works on mobile

---

### Step 4.4: Documentation
**Duration:** 2 hours
**Priority:** P1

**Tasks:**

1. **Update README.md with:**
   - Setup instructions
   - How to run frontend/backend
   - Environment variables
   - API documentation link

2. **Add code comments to complex logic**

3. **Create API documentation (optional - use Swagger)**

**Acceptance Criteria:**
- ✅ README complete
- ✅ Setup instructions tested
- ✅ Comments on complex code

---

### Final Checkpoint
**What to do:**
1. Run all tests
2. Build for production: `ng build --configuration production`
3. Test production build
4. Run backend in production mode
5. Final manual testing
6. Final commit:
   ```bash
   git commit -m "Phase 4: Testing and polish complete

   - Unit tests for all services
   - E2E tests for critical paths
   - UI/UX improvements
   - Documentation updated
   - Production build tested"
   ```

---

## Timeline & Milestones

### Week 1-2: Code Cleanup (Phase 1)
- **Days 1-2:** Setup tools, create constants
- **Days 3-4:** Fix type safety, create logger
- **Days 5-7:** Remove duplication, clean code style
- **Milestone:** Clean, maintainable frontend code

### Week 3-5: Backend Development (Phase 2)
- **Days 8-9:** Backend setup, database config
- **Days 10-12:** Authentication system
- **Days 13-15:** Movie & projection endpoints
- **Days 16-18:** Cart & reservation endpoints
- **Days 19-21:** Review endpoints, server setup
- **Milestone:** Fully functional backend API

### Week 6-7: Frontend Integration (Phase 3)
- **Days 22-23:** HTTP setup, interceptors
- **Days 24-26:** Refactor services to Observable-based
- **Days 27-29:** Connect all components to backend
- **Milestone:** Full-stack application working

### Week 8: Testing & Polish (Phase 4)
- **Days 30-32:** Write unit tests
- **Days 33-34:** E2E tests
- **Days 35-36:** UI polish, documentation
- **Milestone:** Production-ready application

---

## Risk Mitigation

### Risk 1: MongoDB Setup Issues
**Mitigation:**
- Use Docker for MongoDB: `docker run -d -p 27017:27017 mongo`
- Or use MongoDB Atlas (cloud, free tier)
- Document setup steps clearly

### Risk 2: CORS Errors
**Mitigation:**
- Configure CORS properly in backend
- Use proxy in Angular: `angular.json` proxy config
- Test with browser DevTools Network tab

### Risk 3: JWT Token Issues
**Mitigation:**
- Test token expiration handling
- Implement refresh token (future)
- Clear localStorage on 401 errors

### Risk 4: Type Safety Breaking Changes
**Mitigation:**
- Test after each type change
- Enable strict mode gradually
- Use TypeScript compiler to catch errors

### Risk 5: Data Migration
**Mitigation:**
- Create seed scripts for movies
- Test migration with sample data first
- Keep backup of original data

---

## Success Criteria

### Phase 1 Success
- [ ] Zero ESLint errors
- [ ] Zero TypeScript `any` types
- [ ] Strict mode enabled
- [ ] All constants extracted
- [ ] LoggerService in use

### Phase 2 Success
- [ ] Backend server runs
- [ ] All API endpoints tested
- [ ] MongoDB connection stable
- [ ] JWT authentication working
- [ ] Data persists correctly

### Phase 3 Success
- [ ] Frontend connects to backend
- [ ] All features work end-to-end
- [ ] Cart persists across refresh
- [ ] Reviews persist to database
- [ ] No console errors

### Phase 4 Success
- [ ] Tests passing (>80% coverage)
- [ ] Production build works
- [ ] Documentation complete
- [ ] No critical bugs
- [ ] Ready for deployment

---

**END OF IMPLEMENTATION PLAN**

You can now begin Phase 1! Start with Step 1.1 (Setup Tools) and work through each task sequentially. Test frequently and commit after each major step.

Good luck! 🚀
