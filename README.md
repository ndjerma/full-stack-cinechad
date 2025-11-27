# CinechAD - Cinema Ticket Booking Application

> A full-stack cinema ticket booking application built with Angular 19, Node.js, Express, and MongoDB, organized as a monorepo.

[![Angular](https://img.shields.io/badge/Angular-19.2-red?logo=angular)](https://angular.io/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green?logo=node.js)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green?logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📖 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Development](#development)
- [Documentation](#documentation)
- [Technology Stack](#technology-stack)
- [Contributing](#contributing)
- [License](#license)

---

## 🎬 Overview

CinechAD is a modern cinema ticket booking platform that allows users to:
- Browse movies with detailed information
- Search and filter by genre
- View available showtimes (projections)
- Reserve tickets and manage shopping cart
- Submit reviews and ratings
- Manage user profiles

**Current Status:** Transitioning from frontend prototype to full-stack production application

**Architecture:** Monorepo structure with shared TypeScript types between frontend and backend

---

## ✨ Features

### Current (Frontend Prototype)
- ✅ User authentication (login/signup)
- ✅ Movie catalog with 20+ movies
- ✅ Search by title, filter by genre
- ✅ Movie details with projection listings
- ✅ Shopping cart functionality
- ✅ Reviews and ratings (1-10 scale)
- ✅ User profile management
- ✅ Protected routes with AuthGuard
- ✅ Responsive Material Design UI

### In Progress (Backend Integration)
- 🔄 MongoDB database integration
- 🔄 RESTful API with Express
- 🔄 JWT authentication
- 🔄 Password hashing with bcrypt
- 🔄 Data persistence for cart and reviews
- 🔄 Input validation and error handling
- 🔄 API rate limiting and security

### Future Enhancements
- 📅 Admin dashboard
- 📅 Payment integration (Stripe/PayPal)
- 📅 Email notifications
- 📅 QR code tickets
- 📅 Real-time seat selection

---

## 📁 Project Structure

```
cinechad-monorepo/
├── frontend/                    # Angular 19 Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/      # UI Components
│   │   │   ├── services/        # Business Logic Services
│   │   │   ├── interfaces/      # TypeScript Interfaces
│   │   │   ├── constants/       # Constants & Enums
│   │   │   └── ...
│   │   └── environments/        # Environment Configs
│   └── package.json
│
├── backend/                     # Node.js + Express API (in development)
│   ├── src/
│   │   ├── models/              # Mongoose Models
│   │   ├── routes/              # API Routes
│   │   ├── controllers/         # Request Handlers
│   │   ├── services/            # Business Logic
│   │   ├── middleware/          # Auth, Validation, Error Handling
│   │   └── ...
│   └── package.json
│
├── shared/                      # Shared TypeScript Types & Constants
│   ├── types/                   # Common Interfaces
│   │   ├── user.interface.ts
│   │   ├── movie.interface.ts
│   │   ├── reservation.interface.ts
│   │   └── review.interface.ts
│   └── constants/               # Shared Constants
│       ├── genres.ts
│       └── status.ts
│
├── docs/                        # Documentation
│   ├── PRD.md                   # Product Requirements Document
│   ├── IMPLEMENTATION-PLAN.md   # Development Roadmap
│   └── API-DOCUMENTATION.md     # API Reference (coming soon)
│
├── package.json                 # Root package.json (monorepo scripts)
└── README.md                    # This file
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js:** >= 20.0.0 ([Download](https://nodejs.org/))
- **npm:** >= 10.0.0 (comes with Node.js)
- **Angular CLI:** 19.x
  ```bash
  npm install -g @angular/cli
  ```
- **MongoDB:** >= 7.x (required for Phase 2+)
  - **Option 1:** [Download and install locally](https://www.mongodb.com/try/download/community)
  - **Option 2:** Use Docker:
    ```bash
    docker run -d -p 27017:27017 --name mongodb mongo:7
    ```
  - **Option 3:** Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free cloud)

---

## 🚀 Installation

### Quick Start (Frontend Only - Current State)

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/cinechad-monorepo.git
cd cinechad-monorepo

# 2. Install root dependencies
npm install

# 3. Install frontend dependencies
cd frontend
npm install
cd ..

# 4. Run the frontend
npm run dev:frontend
# OR
cd frontend && npm start

# 5. Open your browser
# Navigate to: http://localhost:4200
```

### Full Installation (Frontend + Backend - After Phase 2)

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/cinechad-monorepo.git
cd cinechad-monorepo

# 2. Install all dependencies (root, frontend, backend)
npm run install:all
# OR manually:
npm install
cd frontend && npm install && cd ..
cd backend && npm install && cd ..

# 3. Setup environment variables for backend
cd backend
cp .env.example .env
# Edit .env and add your MongoDB connection string

# 4. Start MongoDB (if running locally)
# Using Docker:
docker start mongodb
# OR if installed locally, MongoDB should be running as a service

# 5. Run both frontend and backend
cd ..
npm run dev

# Frontend: http://localhost:4200
# Backend:  http://localhost:3000
```

---

## 🎮 Running the Application

### Development Mode

#### Option 1: Run Both (Frontend + Backend)
```bash
npm run dev
```
This starts:
- **Frontend:** http://localhost:4200
- **Backend:** http://localhost:3000/api

#### Option 2: Run Frontend Only
```bash
npm run dev:frontend
# OR
cd frontend && npm start
```

#### Option 3: Run Backend Only
```bash
npm run dev:backend
# OR
cd backend && npm run dev
```

### Production Build

```bash
# Build frontend
npm run build:frontend

# Build backend
npm run build:backend

# Output:
# - frontend/dist/ (static files)
# - backend/dist/ (compiled JavaScript)
```

---

## 🛠️ Development

### Available Scripts

**Root-level scripts:**
```bash
npm run dev              # Run frontend + backend concurrently
npm run install:all      # Install all dependencies
npm run dev:frontend     # Run frontend only
npm run dev:backend      # Run backend only
npm run build:frontend   # Build frontend for production
npm run build:backend    # Build backend for production
npm run test:frontend    # Run frontend tests
npm run test:backend     # Run backend tests
npm run lint:frontend    # Lint frontend code
npm run lint:backend     # Lint backend code
```

**Frontend scripts:**
```bash
cd frontend
npm start                # Start dev server (http://localhost:4200)
npm test                 # Run unit tests with Karma
npm run build            # Build for production
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
```

**Backend scripts (Phase 2+):**
```bash
cd backend
npm run dev              # Start dev server with nodemon
npm test                 # Run unit tests with Jest
npm run build            # Compile TypeScript
npm start                # Run production build
npm run lint             # Run ESLint
```

### Code Quality

**ESLint:**
```bash
npm run lint:frontend
npm run lint:backend
```

**Prettier:**
```bash
npm run format:frontend
npm run format:backend
```

### Testing

**Frontend (Jasmine + Karma):**
```bash
cd frontend
npm test                 # Run tests
npm run test:coverage    # Run with coverage report
```

**Backend (Jest - Phase 2+):**
```bash
cd backend
npm test                 # Run tests
npm run test:coverage    # Run with coverage report
```

**E2E Tests (Cypress - Phase 4):**
```bash
npm run e2e              # Open Cypress test runner
npm run e2e:ci           # Run headless for CI/CD
```

---

## 📚 Documentation

Comprehensive documentation is available in the `docs/` folder:

- **[PRD.md](docs/PRD.md)** - Product Requirements Document
  - Features, requirements, technical architecture
  - Database schemas, API specifications
  - Security and testing requirements

- **[IMPLEMENTATION-PLAN.md](docs/IMPLEMENTATION-PLAN.md)** - Development Roadmap
  - 4-phase implementation plan
  - Step-by-step tasks with timelines
  - Success criteria and checkpoints

- **[API-DOCUMENTATION.md](docs/API-DOCUMENTATION.md)** - API Reference (Coming in Phase 2)
  - Endpoint specifications
  - Request/response examples
  - Authentication guide

---

## 🔧 Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| [Angular](https://angular.io/) | 19.2.0 | Frontend framework |
| [Angular Material](https://material.angular.io/) | 19.2.8 | UI component library |
| [TypeScript](https://www.typescriptlang.org/) | 5.7+ | Type-safe JavaScript |
| [RxJS](https://rxjs.dev/) | 7.8.0 | Reactive programming |
| [Jasmine](https://jasmine.github.io/) + [Karma](https://karma-runner.github.io/) | Latest | Unit testing |
| [Cypress](https://www.cypress.io/) | Latest | E2E testing |

### Backend (Phase 2+)
| Technology | Version | Purpose |
|------------|---------|---------|
| [Node.js](https://nodejs.org/) | 20.x LTS | Runtime environment |
| [Express](https://expressjs.com/) | 4.x | Web framework |
| [TypeScript](https://www.typescriptlang.org/) | 5.7+ | Type safety |
| [MongoDB](https://www.mongodb.com/) | 7.x | NoSQL database |
| [Mongoose](https://mongoosejs.com/) | 8.x | MongoDB ODM |
| [bcrypt](https://www.npmjs.com/package/bcrypt) | 5.x | Password hashing |
| [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) | 9.x | JWT authentication |
| [express-validator](https://express-validator.github.io/) | 7.x | Input validation |
| [Jest](https://jestjs.io/) | Latest | Unit testing |

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Nodemon** - Auto-restart server
- **Concurrently** - Run multiple scripts
- **Husky** - Git hooks (future)

---

## 🤝 Contributing

This is currently a university project, but contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style (ESLint + Prettier)
- Write tests for new features
- Update documentation as needed
- Keep it simple and beginner-friendly

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Nikola**
- University Project - 3rd Year
- Built with Angular, Node.js, and MongoDB

---

## 🙏 Acknowledgments

- Angular Team for the amazing framework
- Material Design for the UI components
- MongoDB for the database solution
- The open-source community

---

## 📞 Support

If you have any questions or need help, please:
1. Check the [documentation](docs/)
2. Look at existing [issues](https://github.com/yourusername/cinechad-monorepo/issues)
3. Create a new issue if needed

---

**Happy Coding! 🎬🍿**
