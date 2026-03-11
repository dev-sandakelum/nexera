# NexEra — Comprehensive Project Report

**Generated:** March 2026  
**Project Status:** In Development (Wireframe Review Phase)  
**Repository:** https://github.com/dev-sandakelum/nexera

---

## 1. Project Overview

### Project Name
**NexEra** — A Full-Stack Educational Notes and Quiz Management Platform

### Short Description
NexEra is a modern, multi-user web application designed to facilitate note-taking, knowledge organization, and interactive quiz assessment. It integrates a sophisticated design system with real-time data synchronization, supporting multiple themes and accessibility standards.

### Problem Statement
Educational platforms often lack cohesive user experiences that combine intuitive note management with seamless quiz functionality. Users struggle with scattered tools, poor interface consistency, and limited personalization. NexEra addresses this by providing:
- Unified notes and quiz management
- Responsive design across all devices
- Multi-theme support for accessibility
- Real-time data synchronization
- Admin oversight capabilities

### Purpose of the Project
To create a production-ready platform that empowers students and educators with an elegant, accessible system for collaborative learning and assessment. The platform emphasizes user experience, security, and scalability while maintaining professional code standards.

---

## 2. Introduction

### Background of the Project
NexEra emerged from the need for a modern educational tool that goes beyond basic note-taking. The project combines contemporary web technologies with carefully designed UX patterns to create a learning platform that feels natural and intuitive. The development follows a design-first approach, with wireframes, theme specifications, and architectural blueprints completed before implementation.

### Why This System Was Developed
- **Fragmentation Problem:** Students use multiple disjointed tools for note-taking, organization, and testing
- **Accessibility Gap:** Many educational platforms lack comprehensive theme and dark mode support
- **Scalability Needs:** Educational institutions require systems that grow with their users
- **Modern Expectations:** Users expect responsive, beautiful, and fast applications

### Target Users
1. **Students** — Ages 14-30, using notes and self-assessment tools
2. **Teachers/Educators** — Creating content, managing classes, and tracking progress
3. **Administrators** — System oversight, user management, analytics
4. **Institution Administrators** — Bulk management and compliance monitoring

---

## 3. Objectives

### Main Objective
Develop a comprehensive, scalable, full-stack web application that provides an exceptional experience for note management, quiz assessment, and user collaboration with enterprise-grade security and accessibility.

### Specific Objectives
1. **User Experience** — Create an intuitive interface across mobile and desktop platforms
2. **Theme System** — Implement 4 distinct visual themes (Light, Dark, Contrast, Unique) with dynamic switching
3. **Feature Completeness** — Build all core features: notes, quizzes, user profiles, admin dashboard
4. **Authentication** — Implement secure, scalable user authentication and authorization
5. **Real-Time Sync** — Enable seamless data synchronization across user devices
6. **Performance** — Achieve optimized load times and responsive interactions
7. **Accessibility** — Meet WCAG 2.1 AA standards with semantic HTML and proper ARIA attributes
8. **Scalability** — Design architecture supporting thousands of concurrent users

---

## 4. Technologies Used

### Frontend Technologies
| Technology | Version | Purpose | Reasoning |
|-----------|---------|---------|-----------|
| **Next.js** | 16.1.1 | Full-stack React framework | Modern app routing, server components, built-in optimization, API routes integration |
| **React** | 19.2.3 | UI library | Component-based architecture, hooks support, excellent performance |
| **React DOM** | 19.2.3 | React rendering | Essential for React functionality in browsers |
| **Tailwind CSS** | 4.0 | Utility-first CSS framework | Rapid styling, design consistency, responsive utilities, theming support |
| **Framer Motion** | 12.23.26 | Animation library | Smooth transitions, gesture support, UI polish |
| **React Icons** | 5.5.0 | Icon library | Consistent iconography, easy customization |
| **React Markdown** | 10.1.0 | Markdown rendering | Content display, note rendering |
| **React PDF** | 10.3.0 | PDF viewer | Quiz and document viewing |

### Backend/Server Technologies
| Technology | Version | Purpose | Reasoning |
|-----------|---------|---------|-----------|
| **Clerk** | 6.36.5 | Authentication service | Enterprise-grade auth, social login, user management, session handling |
| **Firebase** | 12.7.0 | Backend service | Real-time database, file storage, serverless functions |
| **Firebase Admin** | 13.6.0 | Server-side Firebase | Admin operations, batch processes |
| **Supabase** | 0.8.0/2.90.1 | PostgreSQL BaaS | Relational database, RLS policies, real-time subscriptions |
| **Elysia** | 1.4.21 | Bun web framework | TypeScript-first API framework, fast performance |
| **Elysia Node** | 1.4.3 | Node.js integration | Node compatibility with Elysia |

### Development Technologies
| Technology | Version | Purpose | Reasoning |
|-----------|---------|---------|-----------|
| **TypeScript** | 5.9.3 | Language | Type safety, improved DX, reduced bugs |
| **ESLint** | 9 | Code linting | Code quality enforcement |
| **TSX** | 4.21.0 | TypeScript executor | Running TypeScript scripts without compilation |
| **Vercel Analytics** | 1.6.1 | Monitoring | Performance and usage tracking |

### Utilities & Processing
| Technology | Version | Purpose | Reasoning |
|-----------|---------|---------|-----------|
| **browser-image-compression** | 2.0.2 | Image optimization | Client-side image compression for storage efficiency |
| **Shiki** | 3.21.0 | Syntax highlighting | Code block rendering in notes |
| **Unified** | 11.0.5 | Text processing | Markdown AST manipulation |
| **Remark/Rehype** | Latest | Markdown pipeline | Content transformation and rendering |
| **UUID** | 13.0.0 | ID generation | Unique identifiers for notes, quizzes, users |

---

## 5. System Architecture

### High-Level Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER (Browser)                       │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ React 19 Components | Tailwind CSS | Framer Motion       │   │
│  │ SPA with Next.js App Router                              │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────────────┬────────────────────────────────────────────────┘
                 │ HTTPS/WebSocket
┌────────────────▼────────────────────────────────────────────────┐
│              NEXT.JS SERVER LAYER (Node.js)                     │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ API Routes (/api/*) | Server Components | Auth Middleware│   │
│  │ Image Optimization | Static Generation | ISR             │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────────────┬────────────────────────────────────────────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
┌───▼──┐    ┌────▼──┐   ┌────▼──┐
│Clerk │    │Firebase│   │Supabase│
│Auth  │    │/Firestore  │PostgreSQL
└──────┘    └────────┘   └────────┘
```

### Frontend Architecture
- **Framework:** Next.js 16 with React Server Components (RSC)
- **State Management:** React Context + SWR for data fetching
- **Styling:** Tailwind CSS v4 with CSS-in-JS for theming
- **Animations:** Framer Motion for interactive elements
- **Routing:** File-based routing in `/app` directory

### Backend Architecture
- **API Layer:** Next.js API routes (`/app/api/*`)
- **Authentication:** Clerk integration for user management
- **Database:** Dual database approach:
  - **Firebase Firestore:** Real-time data, document-oriented
  - **Supabase PostgreSQL:** Relational data, RLS policies
- **File Storage:** Firebase Storage for documents, images
- **Middleware:** Clerk middleware for route protection

### Data Flow

```
User Action → React Component → API Route 
  → Authentication Check (Clerk)
  → Business Logic
  → Database Operations (Firebase/Supabase)
  → Response → State Update → Re-render
```

---

## 6. Themes & Design System

### Theme Architecture
NexEra implements 4 comprehensive themes accessible via a theme switcher:

#### 1. **Light Theme** — Clean, professional
- **Background:** `#f2f1ee` (warm off-white)
- **Surface:** `#ffffff` (pure white)
- **Primary Accent:** `#2563eb` (blue)
- **Typography:** Syne (sans-serif), Space Mono (mono)
- **Use Case:** Daytime, professional environments

#### 2. **Dark Theme** — Modern, eye-friendly
- **Background:** `#0f1117` (deep navy)
- **Surface:** `#181c27` (lighter navy)
- **Primary Accent:** `#6c63ff` (purple)
- **Typography:** Syne (sans-serif), Space Mono (mono)
- **Use Case:** Evening, reduced eye strain

#### 3. **Contrast Theme** — Accessibility-focused
- **Background:** `#000000` (pure black)
- **Surface:** `#0a0a0a` (near-black)
- **Primary Accent:** `#ffff00` (bright yellow)
- **Typography:** Space Mono (monospace, uniform)
- **Use Case:** Users with visual impairments

#### 4. **Unique Theme** — Warm editorial aesthetic
- **Background:** `#1a0f0a` (warm brown)
- **Surface:** `#2c1a10` (medium brown)
- **Primary Accent:** `#f59e0b` (amber)
- **Typography:** Fraunces (serif), Space Mono (mono)
- **Use Case:** Premium, distinctive branding

### Design System Tokens

| Token | Purpose | Values |
|-------|---------|--------|
| `--bg`, `--bg2` | Page backgrounds | Theme-specific |
| `--surface`, `--surface2`, `--surface3` | Component surfaces | Layered depth |
| `--border`, `--border2` | Dividers, outlines | Semantic intensity |
| `--text`, `--text2`, `--text3` | Text colors | Hierarchy: primary, secondary, tertiary |
| `--accent`, `--accent-lt` | Interactive elements | Brand colors |
| `--green`, `--yellow`, `--red` | Status indicators | Semantic (success, warning, error) |
| `--shadow`, `--shadow-lg` | Depth effects | Elevation layers |

### Typography System

| Role | Font | Sizes | Weight | Use Case |
|------|------|-------|--------|----------|
| **Display** | Syne/Fraunces | clamp(24px, 3.5vw, 42px) | 800 | Page titles |
| **Heading** | Syne/Fraunces | 18px-24px | 700 | Section headers |
| **Body** | Syne/Fraunces | 14px-16px | 400-500 | Main content |
| **Label** | Space Mono | 12px-13px | 700 | UI labels, metadata |
| **Code** | Space Mono | 10px-12px | 400 | Code blocks, paths |

### Design Principles

1. **Consistency** — Unified visual language across all pages
2. **Hierarchy** — Clear visual distinction between elements
3. **Accessibility** — WCAG AA compliance, sufficient contrast
4. **Responsiveness** — Mobile-first approach, 320px+ support
5. **Performance** — Minimal CSS, utility-first methodology

---

## 7. Project Folder Structure

```
nexera/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout, theme provider
│   ├── page.tsx                 # Home page
│   ├── (public)/                # Public routes group
│   │   ├── page.tsx             # Landing page
│   │   ├── login/page.tsx        # Login page
│   │   └── signup/page.tsx       # Registration page
│   ├── (dashboard)/             # Protected dashboard group
│   │   ├── page.tsx             # Main dashboard
│   │   ├── profile/page.tsx      # User profile
│   │   ├── settings/page.tsx     # User settings
│   │   └── layout.tsx           # Dashboard layout wrapper
│   ├── (notes)/                 # Notes group
│   │   ├── page.tsx             # Notes list/explore
│   │   ├── [id]/page.tsx        # Note detail/editor
│   │   └── create/page.tsx       # Create new note
│   ├── (quiz)/                  # Quiz group
│   │   ├── page.tsx             # Quiz list
│   │   ├── [id]/page.tsx        # Quiz attempt
│   │   └── results/[id]/page.tsx # Quiz results view
│   ├── (admin)/                 # Admin group (protected)
│   │   ├── page.tsx             # Admin dashboard
│   │   ├── users/page.tsx        # User management
│   │   ├── content/page.tsx      # Content moderation
│   │   └── analytics/page.tsx    # Analytics dashboard
│   ├── api/                      # API routes
│   │   ├── auth/                # Authentication endpoints
│   │   │   ├── login.ts         # POST /api/auth/login
│   │   │   └── logout.ts        # POST /api/auth/logout
│   │   ├── notes/               # Notes endpoints
│   │   │   ├── route.ts         # GET, POST /api/notes
│   │   │   └── [id].ts          # GET, PUT, DELETE /api/notes/[id]
│   │   ├── quiz/                # Quiz endpoints
│   │   │   ├── route.ts         # GET, POST /api/quiz
│   │   │   └── [id]/route.ts    # Quiz detail, submission
│   │   ├── users/               # User endpoints
│   │   │   └── [id].ts          # GET, PUT /api/users/[id]
│   │   └── admin/               # Admin endpoints
│   │       ├── users.ts         # Admin user management
│   │       └── analytics.ts     # Analytics data
│   └── middleware.ts            # Route protection, auth checks
│
├── components/                   # Reusable React components
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx           # Top navigation bar
│   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   ├── Footer.tsx           # Footer component
│   │   └── ThemeSwitcher.tsx    # Theme selector
│   ├── common/                  # Shared UI components
│   │   ├── Button.tsx           # Reusable button
│   │   ├── Card.tsx             # Card wrapper
│   │   ├── Modal.tsx            # Modal dialog
│   │   ├── Alert.tsx            # Alert messages
│   │   ├── Badge.tsx            # Status badges
│   │   ├── Spinner.tsx          # Loading spinner
│   │   └── Input.tsx            # Form input
│   ├── forms/                   # Form components
│   │   ├── LoginForm.tsx        # Login form
│   │   ├── NoteForm.tsx         # Note editor
│   │   ├── QuizForm.tsx         # Quiz creation
│   │   └── ProfileForm.tsx      # Profile settings
│   ├── notes/                   # Note-specific components
│   │   ├── NoteList.tsx         # Notes grid/list
│   │   ├── NoteCard.tsx         # Single note preview
│   │   ├── NoteEditor.tsx       # Rich text editor
│   │   └── NoteViewer.tsx       # Note display
│   ├── quiz/                    # Quiz-specific components
│   │   ├── QuizList.tsx         # Quiz directory
│   │   ├── QuizCard.tsx         # Quiz preview card
│   │   ├── QuestionRenderer.tsx # Single question display
│   │   ├── QuizAttempt.tsx      # Quiz taking interface
│   │   └── ResultsView.tsx      # Results summary
│   ├── dashboard/               # Dashboard components
│   │   ├── StatsPanel.tsx       # Statistics display
│   │   ├── RecentActivity.tsx   # Activity feed
│   │   └── QuickActions.tsx     # Quick action buttons
│   └── admin/                   # Admin-specific components
│       ├── UserTable.tsx        # User management table
│       ├── AnalyticChart.tsx    # Analytics visualization
│       ├── ModerationPanel.tsx  # Content moderation
│       └── SystemHealth.tsx     # System status
│
├── lib/                          # Utility functions and helpers
│   ├── auth.ts                  # Authentication utilities
│   │   ├── clerk-client.ts      # Clerk setup
│   │   ├── session.ts           # Session management
│   │   └── permissions.ts       # Role-based access
│   ├── db.ts                    # Database clients
│   │   ├── firebase.ts          # Firebase initialization
│   │   ├── firestore.ts         # Firestore queries
│   │   └── supabase.ts          # Supabase initialization
│   ├── api/                     # API utilities
│   │   ├── fetch.ts             # HTTP request wrapper
│   │   ├── error-handler.ts     # Error handling
│   │   └── validators.ts        # Input validation
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAuth.ts           # Auth context hook
│   │   ├── useNotes.ts          # Notes data hook
│   │   ├── useQuiz.ts           # Quiz data hook
│   │   ├── useTheme.ts          # Theme management
│   │   └── usePagination.ts     # Pagination logic
│   ├── utils/                   # Utility functions
│   │   ├── cn.ts                # Classname helper
│   │   ├── date-format.ts       # Date formatting
│   │   ├── markdown.ts          # Markdown processing
│   │   ├── pdf-utils.ts         # PDF handling
│   │   └── storage.ts           # Local storage helpers
│   └── types.ts                 # TypeScript type definitions
│
├── public/                       # Static assets
│   ├── md/                      # Markdown content files
│   │   ├── 1.md, 4.md, 5.md     # Sample notes
│   │   └── [multiple].md        # Demo content
│   ├── images/                  # Images and icons
│   └── fonts/                   # Custom fonts (if any)
│
├── styles/                       # Global styles
│   ├── globals.css              # Tailwind imports, theme vars
│   ├── components.css           # Component-specific styles
│   └── animations.css           # Framer Motion utilities
│
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # (v4: in globals.css)
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies, scripts
├── .env.local                  # Environment variables (local)
├── .env.example                # Environment template
└── README.md                   # Project documentation
```

---

## 8. Routing System

### Route Groups & Organization

NexEra implements 4 logical route groups for organization:

#### **Group 1: Public Routes** (Authentication & Landing)
Access: Public (no authentication required)

| Route | Purpose | Components | Features |
|-------|---------|-----------|----------|
| `/` | Landing page | Hero, CTAs, Feature showcase | Responsive, fast loading |
| `/login` | User login | LoginForm, Theme switcher | Clerk integration |
| `/signup` | User registration | SignupForm, Terms acceptance | Social login support |
| `/forgot-password` | Password recovery | EmailInput, Recovery flow | Email verification |

#### **Group 2: Dashboard Routes** (User Hub)
Access: Authenticated users only

| Route | Purpose | Components | Features |
|-------|---------|-----------|----------|
| `/dashboard` | Main dashboard | StatsPanel, RecentActivity | Personalized overview |
| `/dashboard/profile` | User profile | ProfileForm, AvatarUpload | Editable settings |
| `/dashboard/settings` | Account settings | PreferenceForm, ThemeSwitcher | User preferences |
| `/dashboard/notifications` | Notification center | NotificationList, MarkAsRead | Real-time updates |

#### **Group 3: Notes Routes** (Content Management)
Access: Authenticated users

| Route | Purpose | Components | Features |
|-------|---------|-----------|----------|
| `/notes` | Notes directory | NoteList, SearchBar, Filter | Browsable collection |
| `/notes/create` | Create new note | NoteEditor, MarkdownPreview | Rich text editing |
| `/notes/[id]` | View/edit note | NoteViewer, NoteEditor | Version history |
| `/notes/[id]/share` | Share settings | ShareForm, PermissionMatrix | Access control |

#### **Group 4: Quiz Routes** (Assessment)
Access: Authenticated users

| Route | Purpose | Components | Features |
|-------|---------|-----------|----------|
| `/quiz` | Quiz directory | QuizList, DifficultyFilter | Browsable assessments |
| `/quiz/[id]` | Quiz attempt | QuestionRenderer, Timer | Timed testing |
| `/quiz/[id]/preview` | Quiz preview | QuizSummary, QuestionPreview | Read-only overview |
| `/quiz/results/[id]` | Results viewer | ResultsView, ScoreAnalysis | Performance breakdown |

#### **Group 5: Admin Routes** (System Management)
Access: Admin users only (middleware-protected)

| Route | Purpose | Components | Features |
|-------|---------|-----------|----------|
| `/admin` | Admin dashboard | StatsPanel, QuickActions | System overview |
| `/admin/users` | User management | UserTable, BulkActions | CRUD operations |
| `/admin/content` | Content moderation | ModerationPanel, ApprovalQueue | Quality control |
| `/admin/analytics` | Analytics dashboard | AnalyticChart, DateRangePicker | Data visualization |
| `/admin/settings` | System config | ConfigForm, FeatureFlags | Admin settings |

### Middleware & Route Protection

```typescript
// Next.js middleware.ts
- Intercepts all requests
- Validates Clerk session
- Redirects unauthenticated users to /login
- Checks admin roles for /admin routes
- Applies CORS headers if needed
```

### Dynamic Routes & Parameters

| Pattern | Example | Purpose |
|---------|---------|---------|
| `[id]` | `/notes/abc123` | Single resource by ID |
| `[...slug]` | `/docs/guides/getting-started` | Catch-all nested routes |
| `[[...optional]]` | `/search[[...params]]` | Optional nested segments |

---

## 9. UI Components

### Core Reusable Components

#### **Layout Components**
| Component | Purpose | Props | Example Usage |
|-----------|---------|-------|---|
| **Header** | Top navigation bar | theme, user, onLogout | Header.tsx — displays nav, user menu |
| **Sidebar** | Left navigation panel | routes, active, collapsed | Sidebar.tsx — expandable menu |
| **Footer** | Page footer | links, copyright | Footer.tsx — consistent footer |
| **ThemeSwitcher** | Theme selector | currentTheme, onThemeChange | Sticky theme bar control |

#### **Common UI Elements**
| Component | Purpose | Props | Variants |
|-----------|---------|-------|----------|
| **Button** | Clickable action | variant, size, onClick, disabled | primary, secondary, tertiary, danger |
| **Card** | Content container | title, children, elevation | elevated, flat, outlined |
| **Modal** | Dialog window | isOpen, title, onClose, children | centered, full-width, side-sheet |
| **Alert** | Status message | type, message, dismissible | success, warning, error, info |
| **Badge** | Label tag | variant, size | default, primary, success, warning |
| **Input** | Form field | type, label, value, onChange | text, email, password, textarea |
| **Spinner** | Loading indicator | size, color | sizes: sm, md, lg |

#### **Notes Components**
| Component | Purpose | Features |
|-----------|---------|----------|
| **NoteList** | Notes grid/list | Search, filtering, sorting, pagination |
| **NoteCard** | Note preview | Title, excerpt, metadata, quick actions |
| **NoteEditor** | Rich text editor | Markdown support, auto-save, formatting toolbar |
| **NoteViewer** | Read-only display | Syntax highlighting, responsive layout |

#### **Quiz Components**
| Component | Purpose | Features |
|-----------|---------|----------|
| **QuizList** | Quiz directory | Category filter, difficulty levels |
| **QuizCard** | Quiz preview | Duration, question count, pass rate |
| **QuestionRenderer** | Single question | MCQ, true/false, essay types |
| **QuizAttempt** | Quiz interface | Timer, progress bar, answer submission |
| **ResultsView** | Score report | Breakdown by category, performance graph |

#### **Dashboard Components**
| Component | Purpose | Content |
|-----------|---------|---------|
| **StatsPanel** | Statistics display | Notes count, quizzes completed, avg score |
| **RecentActivity** | Activity feed | Recent notes, quiz attempts, achievements |
| **QuickActions** | Action shortcuts | Create note, Start quiz, View profile |

#### **Admin Components**
| Component | Purpose | Features |
|-----------|---------|----------|
| **UserTable** | User management | Pagination, search, bulk actions, filters |
| **AnalyticChart** | Data visualization | Line/bar charts, date ranges, export |
| **ModerationPanel** | Content review | Flagged content, approval workflow |
| **SystemHealth** | System status | Database health, API status, performance metrics |

---

## 10. API Documentation

### Authentication APIs

```
POST /api/auth/login
- Description: User login with credentials
- Request Body: { email, password }
- Response: { user, sessionToken, expiresAt }
- Auth: None (public)
- Status Codes: 200 (success), 401 (invalid), 429 (rate limit)

POST /api/auth/logout
- Description: Invalidate user session
- Request Body: {}
- Response: { success: true }
- Auth: Required
- Status Codes: 200 (success)

POST /api/auth/refresh
- Description: Refresh authentication token
- Request Body: { refreshToken }
- Response: { accessToken, expiresAt }
- Auth: None (public)
- Status Codes: 200 (success), 401 (invalid token)
```

### Notes APIs

```
GET /api/notes
- Description: Fetch user's notes
- Query Params: { skip, take, search, sort }
- Response: { notes: [], total, hasMore }
- Auth: Required
- Status Codes: 200 (success), 401 (unauthorized)

POST /api/notes
- Description: Create new note
- Request Body: { title, content, tags, isPublic }
- Response: { id, title, content, createdAt, updatedAt }
- Auth: Required
- Status Codes: 201 (created), 400 (bad request), 413 (too large)

GET /api/notes/[id]
- Description: Fetch specific note by ID
- Path Params: id (string)
- Response: { id, title, content, tags, author, createdAt, updatedAt }
- Auth: Required (owner or public)
- Status Codes: 200 (success), 404 (not found)

PUT /api/notes/[id]
- Description: Update existing note
- Path Params: id
- Request Body: { title, content, tags, isPublic }
- Response: { id, ...updated fields }
- Auth: Required (owner only)
- Status Codes: 200 (updated), 404 (not found), 403 (forbidden)

DELETE /api/notes/[id]
- Description: Delete note
- Path Params: id
- Response: { success: true }
- Auth: Required (owner only)
- Status Codes: 204 (deleted), 404 (not found), 403 (forbidden)
```

### Quiz APIs

```
GET /api/quiz
- Description: Fetch available quizzes
- Query Params: { skip, take, category, difficulty }
- Response: { quizzes: [], total, categories: [] }
- Auth: Required
- Status Codes: 200 (success)

POST /api/quiz
- Description: Create new quiz
- Request Body: { title, description, questions: [], timeLimit, passingScore }
- Response: { id, title, createdBy, createdAt }
- Auth: Required (instructor)
- Status Codes: 201 (created), 400 (bad request)

GET /api/quiz/[id]
- Description: Fetch quiz details
- Path Params: id
- Response: { id, title, questions: [], timeLimit, passingScore }
- Auth: Required
- Status Codes: 200 (success), 404 (not found)

POST /api/quiz/[id]/submit
- Description: Submit quiz responses
- Path Params: id
- Request Body: { responses: { questionId: answer } }
- Response: { score, passPassed: boolean, resultId }
- Auth: Required
- Status Codes: 200 (submitted), 400 (invalid), 404 (quiz not found)

GET /api/quiz/results/[resultId]
- Description: Fetch quiz results
- Path Params: resultId
- Response: { score, passPassed, submittedAt, answers: [] }
- Auth: Required (owner or instructor)
- Status Codes: 200 (success), 404 (not found)
```

### User APIs

```
GET /api/users/[id]
- Description: Fetch user profile
- Path Params: id (user ID)
- Response: { id, email, name, avatar, bio, createdAt }
- Auth: Required (self or admin)
- Status Codes: 200 (success), 404 (not found)

PUT /api/users/[id]
- Description: Update user profile
- Path Params: id
- Request Body: { name, bio, avatar, preferences }
- Response: { ...updated user data }
- Auth: Required (self or admin)
- Status Codes: 200 (updated), 400 (bad request), 403 (forbidden)

GET /api/users/[id]/stats
- Description: User statistics
- Path Params: id
- Response: { notesCount, quizzesAttempted, averageScore, streak }
- Auth: Required (self or admin)
- Status Codes: 200 (success)
```

### Admin APIs

```
GET /api/admin/users
- Description: List all users (paginated)
- Query Params: { skip, take, role, status }
- Response: { users: [], total }
- Auth: Required (admin)
- Status Codes: 200 (success), 403 (forbidden)

POST /api/admin/users/[id]/disable
- Description: Disable user account
- Path Params: id
- Request Body: { reason }
- Response: { success: true, user }
- Auth: Required (admin)
- Status Codes: 200 (success), 403 (forbidden)

GET /api/admin/analytics
- Description: System analytics
- Query Params: { from, to, metric }
- Response: { metric: number, trend: string, breakdown: [] }
- Auth: Required (admin)
- Status Codes: 200 (success), 403 (forbidden)

POST /api/admin/settings
- Description: Update system settings
- Request Body: { key, value }
- Response: { success: true, setting }
- Auth: Required (super admin)
- Status Codes: 200 (updated), 403 (forbidden)
```

---

## 11. Database Design

### Database Architecture (Multi-Store)

**Primary Databases:**
1. **Firebase Firestore** — Real-time document database
2. **Supabase PostgreSQL** — Relational database with RLS

### Firestore Collections Schema

#### **users** Collection
```
├── userId (document ID)
│   ├── email: string
│   ├── displayName: string
│   ├── avatar: string (Storage URL)
│   ├── bio: string
│   ├── role: "student" | "instructor" | "admin"
│   ├── preferences: {
│   │   ├── theme: "light" | "dark" | "contrast" | "unique"
│   │   ├── notifications: boolean
│   │   └── emailDigest: boolean
│   ├── createdAt: timestamp
│   ├── updatedAt: timestamp
│   └── deletedAt: timestamp (soft delete)
```

#### **notes** Collection
```
├── noteId (document ID)
│   ├── title: string
│   ├── content: string (markdown)
│   ├── authorId: string (reference to users)
│   ├── tags: string[]
│   ├── isPublic: boolean
│   ├── viewCount: integer
│   ├── likes: integer
│   ├── metadata: {
│   │   ├── wordCount: integer
│   │   ├── readingTime: integer (minutes)
│   │   └── language: string
│   ├── createdAt: timestamp
│   ├── updatedAt: timestamp
│   └── deletedAt: timestamp (soft delete)
```

#### **quizzes** Collection
```
├── quizId (document ID)
│   ├── title: string
│   ├── description: string
│   ├── category: string
│   ├── difficulty: "easy" | "medium" | "hard"
│   ├── createdBy: string (reference to users)
│   ├── questions: {
│   │   ├── questionId: string
│   │   ├── type: "mcq" | "true-false" | "essay"
│   │   ├── question: string
│   │   ├── options: string[] (for MCQ)
│   │   ├── correctAnswer: string | string[]
│   │   └── explanation: string
│   ├── timeLimit: integer (seconds)
│   ├── passingScore: integer (0-100)
│   ├── attempts: integer
│   ├── createdAt: timestamp
│   ├── updatedAt: timestamp
│   └── isArchived: boolean
```

#### **quizResults** Collection
```
├── resultId (document ID)
│   ├── quizId: string (reference to quizzes)
│   ├── userId: string (reference to users)
│   ├── score: integer
│   ├── passed: boolean
│   ├── timeSpent: integer (seconds)
│   ├── answers: {
│   │   ├── questionId: string
│   │   ├── userAnswer: string | string[]
│   │   ├── isCorrect: boolean
│   │   └── timeSpent: integer
│   ├── startedAt: timestamp
│   ├── submittedAt: timestamp
│   └── feedback: string (optional)
```

### Supabase PostgreSQL Tables

```sql
-- users table (synced with Firestore)
CREATE TABLE users (
  id UUID PRIMARY KEY (from Clerk),
  email VARCHAR UNIQUE NOT NULL,
  display_name VARCHAR,
  avatar_url VARCHAR,
  bio TEXT,
  role VARCHAR DEFAULT 'student',
  preferences JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  RLS: authenticated users can read/update own
);

-- notes table
CREATE TABLE notes (
  id UUID PRIMARY KEY,
  title VARCHAR NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES users(id),
  tags TEXT[],
  is_public BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  RLS: authors can CRUD, public notes readable by all
);

-- quizzes table
CREATE TABLE quizzes (
  id UUID PRIMARY KEY,
  title VARCHAR NOT NULL,
  description TEXT,
  category VARCHAR,
  difficulty VARCHAR,
  created_by UUID REFERENCES users(id),
  questions JSONB NOT NULL,
  time_limit INTEGER,
  passing_score INTEGER,
  is_archived BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  RLS: creators can CRUD, visible to authenticated users
);

-- quiz_results table
CREATE TABLE quiz_results (
  id UUID PRIMARY KEY,
  quiz_id UUID REFERENCES quizzes(id),
  user_id UUID REFERENCES users(id),
  score INTEGER,
  passed BOOLEAN,
  time_spent INTEGER,
  answers JSONB,
  feedback TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  RLS: users can read own results, creators can read all for their quizzes
);
```

### Data Flow & Synchronization

```
┌─────────────────────────────────────────────────┐
│  Client Application (React)                      │
└────────────────────┬────────────────────────────┘
                     │
      ┌──────────────┼──────────────┐
      │              │              │
   (Write)      (Write)         (Read)
      │              │              │
┌─────▼──┐   ┌──────▼──┐   ┌──────▼──┐
│Firestore│   │Supabase │   │ Cache   │
│(Real-   │   │PostgreSQL   │(SWR)    │
│ time)   │   │(RLS)    │   └─────────┘
└────┬────┘   └────┬────┘
     │             │
  Sync via    Sync via
  Cloud Functions
```

---

## 12. Page Wireframes

### Wireframe Overview

All pages follow a consistent 4-theme visual system. Below are low-fidelity layouts:

#### **Landing Page** (`/`)
```
┌─────────────────────────────────────────────────┐
│ Logo    Navigation                  Login | Sign │
├─────────────────────────────────────────────────┤
│                                                  │
│  ┌─────────────────────────────────────────────┐ │
│  │ NexEra — Your Learning Platform             │ │
│  │                                              │ │
│  │ [CTA Button: Get Started]                   │ │
│  └─────────────────────────────────────────────┘ │
│                                                  │
├─────────────────────────────────────────────────┤
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│ │ Icon │ │ Icon │ │ Icon │ │ Icon │ │ Icon │  │
│ │Feature│ │Feature│ │Feature│ │Feature│ │Feature│  │
│ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘  │
│                                                  │
├─────────────────────────────────────────────────┤
│ Testimonials / Social Proof Section             │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│ │ Comment  │ │ Comment  │ │ Comment  │        │
│ └──────────┘ └──────────┘ └──────────┘        │
│                                                  │
├─────────────────────────────────────────────────┤
│ Footer | Links | Copyright                      │
└─────────────────────────────────────────────────┘
```

#### **Dashboard** (`/dashboard`)
```
┌─────────────────────────────────────────────────┐
│ Header with User Menu                           │
├─────────────────────────────────────────────────┤
│  ┌────────┐  ┌──────────────────────────────┐  │
│  │Sidebar │  │ Welcome, [User]!             │  │
│  │        │  │                              │  │
│  │- Notes │  │ ┌──────┐ ┌──────┐ ┌──────┐ │  │
│  │- Quizzes   │ │Stat  │ │Stat  │ │Stat  │ │  │
│  │- Admin │  │ └──────┘ └──────┘ └──────┘ │  │
│  │        │  │                              │  │
│  │Settings│  │ Recent Activity              │  │
│  │        │  │ ┌────────────────────────┐  │  │
│  └────────┘  │ │• Activity 1            │  │  │
│              │ │• Activity 2            │  │  │
│              │ │• Activity 3            │  │  │
│              │ └────────────────────────┘  │  │
│              └──────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

#### **Notes List** (`/notes`)
```
┌─────────────────────────────────────────────────┐
│ Header [Create Note] [Search...] [Filter ▼]    │
├─────────────────────────────────────────────────┤
│  ┌──────────────┐ ┌──────────────┐            │
│  │ Note Title   │ │ Note Title   │            │
│  │ Excerpt...   │ │ Excerpt...   │            │
│  │ Date | Tags  │ │ Date | Tags  │            │
│  └──────────────┘ └──────────────┘            │
│                                                │
│  ┌──────────────┐ ┌──────────────┐            │
│  │ Note Title   │ │ Note Title   │            │
│  │ Excerpt...   │ │ Excerpt...   │            │
│  │ Date | Tags  │ │ Date | Tags  │            │
│  └──────────────┘ └──────────────┘            │
│                                                │
│  [Previous] [1] [2] [3] [Next]               │
└─────────────────────────────────────────────────┘
```

#### **Quiz List** (`/quiz`)
```
┌─────────────────────────────────────────────────┐
│ [All Categories ▼] [All Difficulties ▼]        │
├─────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────┐ │
│  │ Quiz Title                      [Start]    │ │
│  │ Category | Difficulty | 10 Qs | 15 mins   │ │
│  │ Avg Score: 85% | 234 attempts             │ │
│  └────────────────────────────────────────────┘ │
│                                                 │
│  ┌────────────────────────────────────────────┐ │
│  │ Quiz Title                      [Start]    │ │
│  │ Category | Difficulty | 20 Qs | 30 mins   │ │
│  └────────────────────────────────────────────┘ │
│                                                 │
│  [Load More]                                    │
└─────────────────────────────────────────────────┘
```

#### **Quiz Attempt** (`/quiz/[id]`)
```
┌─────────────────────────────────────────────────┐
│ Quiz Title | Progress: [===>   ] 3/10 | ⏱ 12:34 │
├─────────────────────────────────────────────────┤
│                                                  │
│  Question 3 of 10 (Multiple Choice)             │
│  ──────────────────────────────────────────────  │
│                                                  │
│  Question text goes here with full context...  │
│                                                  │
│  ◯ Option A                                     │
│  ◯ Option B (selected)                         │
│  ◯ Option C                                     │
│  ◯ Option D                                     │
│                                                  │
│  [Previous] [Next >]                           │
│                                                  │
│  [Save & Exit] [Submit Quiz]                   │
└─────────────────────────────────────────────────┘
```

#### **User Profile** (`/dashboard/profile`)
```
┌─────────────────────────────────────────────────┐
│ Edit Profile                                    │
├─────────────────────────────────────────────────┤
│                                                  │
│  [Avatar Image] [Change Avatar]                │
│                                                  │
│  Full Name: [________________]                  │
│  Email: user@example.com (from Clerk)          │
│  Bio: [_________________________]               │
│  Theme: [Light ▼]                              │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │ Statistics                                  │ │
│  │ Notes Created: 24 | Quizzes Attempted: 15  │ │
│  │ Average Score: 87% | Streak: 7 days        │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  [Save Changes] [Cancel]                       │
│                                                  │
└─────────────────────────────────────────────────┘
```

#### **Admin Dashboard** (`/admin`)
```
┌─────────────────────────────────────────────────┐
│ Admin Dashboard                                 │
├─────────────────────────────────────────────────┤
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          │
│  │Total │ │Active│ │Notes │ │Quizzes          │
│  │Users │ │Today │ │      │ │      │          │
│  │ 2.4K │ │ 342  │ │ 1.2K │ │  856 │          │
│  └──────┘ └──────┘ └──────┘ └──────┘          │
│                                                  │
│  ┌─────────────────────────────────────────┐   │
│  │ User Growth (Last 30 Days)               │   │
│  │ ┌──────────────────────────────────────┐│   │
│  │ │  /\        /\        /\               ││   │
│  │ │ /  \  /\  /  \  /\  /  \              ││   │
│  │ │/    \/  \/    \/  \/    \             ││   │
│  │ └──────────────────────────────────────┘│   │
│  └─────────────────────────────────────────┘   │
│                                                  │
│  [Users Management] [Content Review] [Settings] │
│                                                  │
└─────────────────────────────────────────────────┘
```

**Mobile Layout Notes:**
- Single column layout on <768px
- Sidebar becomes hamburger menu
- Cards stack vertically
- Touch-friendly button sizing (minimum 44x44px)

---

## 13. User Flow

### Primary User Journeys

#### **Journey 1: New User Signup → First Quiz**
```
Landing Page
    ↓
[Click "Get Started"]
    ↓
Signup Page (with social login)
    ↓
Email Verification (Clerk handles)
    ↓
Complete Profile Setup
    ↓
Dashboard (onboarding tour)
    ↓
Browse Quizzes
    ↓
Start Quiz
    ↓
Submit Answers
    ↓
View Results
    ↓
Optional: Retry or Try Another
```

#### **Journey 2: Existing Student → Study Routine**
```
Login Page
    ↓
Dashboard (shows recent activity)
    ↓
[Option A: Continue with Notes]
    ├─→ Notes List
    ├─→ View/Edit Note
    ├─→ Save Changes
    └─→ Share with Classmates
    
[Option B: Practice Quizzes]
    ├─→ Quiz List
    ├─→ Filter by Category/Difficulty
    ├─→ Start Quiz
    ├─→ Submit Answers
    └─→ Analyze Results
```

#### **Journey 3: Instructor → Create & Manage Content**
```
Dashboard
    ↓
[Create Quiz]
    ├─→ Quiz Creation Form
    ├─→ Add Questions
    ├─→ Set Difficulty & Time Limit
    ├─→ Preview & Publish
    └─→ Quiz List (manage)
    
[Create Notes]
    ├─→ Rich Text Editor
    ├─→ Add Tags
    ├─→ Set Visibility
    └─→ Publish
```

#### **Journey 4: Admin → System Management**
```
Admin Dashboard
    ↓
[View System Stats]
    ├─→ User Count, Activity, Performance
    └─→ Export Reports
    
[User Management]
    ├─→ Search Users
    ├─→ View User Details
    ├─→ Disable/Enable Accounts
    └─→ Assign Roles
    
[Content Moderation]
    ├─→ Review Flagged Content
    ├─→ Approve/Reject
    └─→ Send Feedback
```

---

## 14. Key Features

### Core Features (MVP)

1. **User Authentication**
   - Secure login via Clerk
   - Social login (Google, GitHub)
   - Session management
   - Role-based access control

2. **Notes Management**
   - Create, read, update, delete notes
   - Rich markdown editor
   - Tag-based organization
   - Search and filter
   - Share notes with specific users
   - Public/private visibility

3. **Quiz System**
   - Quiz creation and management
   - Multiple question types (MCQ, true/false, essay)
   - Timed quizzes
   - Automatic scoring for objective questions
   - Results tracking and history
   - Performance analytics

4. **User Dashboard**
   - Personal statistics (notes, quizzes, scores)
   - Recent activity feed
   - Quick access to saved content
   - Profile customization
   - Theme preferences

5. **Theme System**
   - 4 complete visual themes
   - One-click theme switching
   - Persistent user preference
   - System-wide theme consistency

### Advanced Features

6. **Search & Filtering**
   - Full-text search across notes
   - Category filters
   - Difficulty levels for quizzes
   - Tag-based organization

7. **Real-Time Sync**
   - Auto-save for notes
   - Live collaboration (future)
   - Instant updates across tabs

8. **Analytics**
   - User engagement metrics
   - Quiz performance trends
   - Content popularity
   - Admin dashboards

9. **Content Moderation**
   - Flag inappropriate content
   - Admin review queue
   - Automatic detection (future)

10. **Responsive Design**
    - Mobile-first approach
    - Tablet optimization
    - Desktop experience
    - Touch-friendly interface

---

## 15. Challenges Faced

### Development Challenges

1. **Multi-Database Synchronization**
   - Challenge: Keeping Firestore and Supabase in sync
   - Solution: Event-driven architecture with Cloud Functions

2. **Real-Time Updates**
   - Challenge: Managing live updates across multiple clients
   - Solution: WebSocket integration with SWR for fallback

3. **Theme System Implementation**
   - Challenge: 4 comprehensive themes with dynamic switching
   - Solution: CSS custom properties + React context provider

4. **Authentication & Authorization**
   - Challenge: Integrating Clerk with custom role-based access
   - Solution: Middleware-based route protection + Firestore roles

5. **PDF Rendering Performance**
   - Challenge: Large PDF files causing slowdown
   - Solution: Virtual scrolling, lazy loading, worker threads

6. **Type Safety with Dynamic Data**
   - Challenge: Ensuring TypeScript safety with Firestore data
   - Solution: Generated types from schemas, Zod validation

### Infrastructure Challenges

7. **Deployment & Hosting**
   - Multi-environment management (dev, staging, prod)
   - Environment variable management across services

8. **API Rate Limiting**
   - Protecting endpoints from abuse
   - Fair usage policies

9. **Database Query Optimization**
   - Indexing strategy for Firebase
   - N+1 query prevention in Supabase

---

## 16. Future Improvements

### Phase 2 Features (Post-MVP)

1. **Collaboration Features**
   - Real-time collaborative note editing
   - Group study rooms
   - Peer review system

2. **Advanced Analytics**
   - Predictive performance scoring
   - Learning pattern analysis
   - Personalized recommendations

3. **AI Integration**
   - Auto-generated quizzes from notes
   - AI tutoring assistant
   - Smart content suggestions

4. **Mobile Apps**
   - Native iOS application
   - Native Android application
   - Offline-first functionality

5. **Social Features**
   - User profiles with achievements
   - Leaderboards
   - Study groups
   - Discussion forums

6. **Advanced Assessments**
   - Video submission questions
   - Code challenge questions
   - Drawing/diagram questions

7. **Content Marketplace**
   - Monetization for creators
   - Subscription tiers
   - Premium content access

8. **Accessibility Enhancements**
   - Screen reader optimization
   - Keyboard navigation improvements
   - Captions for video content

9. **Blockchain Integration**
   - Credential verification
   - Certificate of completion
   - NFT badges (optional)

10. **API & Integrations**
    - LMS integration (Canvas, Blackboard)
    - Zapier integration
    - Webhooks for third-party apps

---

## 17. Conclusion

### Summary
NexEra represents a modern approach to educational technology, combining elegant design with robust functionality. The project demonstrates professional full-stack development practices including:

- **Architecture:** Scalable, modular, and maintainable
- **Design:** Comprehensive theme system with accessibility focus
- **Technology:** Industry-standard stack (Next.js, Firebase, Supabase, Clerk)
- **UX:** User-centric with mobile-first responsive design
- **Code Quality:** TypeScript, component-based, proper separation of concerns

### Project Significance
As an educational platform, NexEra bridges the gap between feature-rich applications and user-friendly interfaces. Its emphasis on multiple themes ensures inclusivity, while the focus on real-time synchronization provides seamless experiences across devices.

### Timeline & Status
- **Current Phase:** Wireframe & Architecture Review
- **Next Phases:** Component Development → Integration → Testing → Deployment
- **Estimated Launch:** Q3 2026

### Recommendations
1. **Priority 1:** Finalize component library and complete all wireframes
2. **Priority 2:** Establish database schemas and API contracts
3. **Priority 3:** Begin authentication and dashboard implementation
4. **Priority 4:** Integrate real-time features for notes and quizzes
5. **Priority 5:** Comprehensive testing and performance optimization

### Final Notes
NexEra is positioned to become a leading educational platform through its commitment to user experience, accessibility, and modern technology. The comprehensive design system and clear architecture provide a solid foundation for scalable development and future enhancements.

---

**Report Generated:** March 11, 2026  
**Repository:** https://github.com/dev-sandakelum/nexera  
**Document Version:** 1.0 (Initial Comprehensive Report)

---

## Appendix: Quick Reference

### Key Configuration Files
- `package.json` — Dependencies and scripts
- `tsconfig.json` — TypeScript configuration
- `tailwind.config.js` — Tailwind CSS config (v4: in globals.css)
- `next.config.js` — Next.js settings
- `.env.local` — Environment variables (local development)

### Important Directory Paths
- `/app` — Next.js app directory
- `/components` — Reusable components
- `/lib` — Utilities and helpers
- `/public` — Static assets
- `/styles` — Global styles

### Team Resources
- **GitHub:** dev-sandakelum/nexera
- **Documentation:** See attached wireframes and design docs
- **Design System:** 4-theme system with full specifications
- **Database Schema:** Firebase Firestore + Supabase PostgreSQL

---

*This report serves as comprehensive technical documentation for the NexEra project, suitable for university submission, stakeholder review, and team reference.*
