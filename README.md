# DevPulse — Agile Sprint & Kanban Management Platform

> **Technical Assessment Submission for StartupMeu**  
> **Candidate:** Indla Mohana Venkata Mani Deep  
> **Email:** [indlachinnu123@gmail.com](mailto:indlachinnu123@gmail.com) | **Phone:** +91 7661822103  
> **GitHub:** [https://github.com/ManiDeep1822](https://github.com/ManiDeep1822) | **LinkedIn:** [https://linkedin.com/in/manideep-developer](https://linkedin.com/in/manideep-developer)  

---

## 📌 Executive Summary

**DevPulse** is a full-stack MERN application built for engineering teams to plan, track, and execute software sprints through an intuitive, Linear/Trello-inspired Kanban board. It combines an Express/MongoDB REST backend with an accessible, high-performance React (Vite) interface styled with Tailwind CSS.

Designed with reviewer convenience in mind, the platform features a **"1-Click Demo Login"** button alongside full JWT authentication, an automated **`npm run seed`** script populating realistic engineering tasks, optimistic drag-and-drop state synchronization, real-time search & filtering, live audit activity logging, and complete integration test coverage with Jest and Supertest.

```
       ┌────────────────────────────────────────────────────────┐
       │                 DevPulse Architecture                  │
       └────────────────────────────────────────────────────────┘
                                │
        ┌───────────────────────┴───────────────────────┐
        ▼                                               ▼
┌──────────────────────────────┐       ┌──────────────────────────────┐
│        React Frontend        │       │       Node/Express API       │
│  • Vite + React 18           │◄─────►│  • RESTful Controllers       │
│  • Tailwind CSS Dark Theme   │ (JWT) │  • Mongoose ODM              │
│  • HTML5 Drag-and-Drop       │       │  • Bcrypt + JWT Auth         │
│  • React Context State       │       │  • Activity Audit Logger     │
└──────────────────────────────┘       └──────────────┬───────────────┘
                                                      │
                                                      ▼
                                       ┌──────────────────────────────┐
                                       │       MongoDB Database       │
                                       │  • Users (Hashed Passwords)  │
                                       │  • Tasks (Columns & Orders)  │
                                       │  • ActivityLogs (Audit Log)  │
                                       └──────────────────────────────┘
```

---

## ✨ Key Features

### 1. Dual View Switcher (Kanban Board + Enterprise List View)
- **Interactive Kanban Board**: Four distinct lifecycle columns (**To Do**, **In Progress**, **In Review**, **Done**) with smooth HTML5 **Drag-and-Drop**, optimistic UI state synchronization, and resilient server rollback if a network issue occurs.
- **Enterprise List / Table View**: High-density engineering backlog grid displaying issue IDs (`DEV-104`), titles, editable status tokens, priority badges, target due dates, and assignee avatars with sorting.

### 2. Enterprise App Shell & Navigation
- **Collapsible Sidebar**: Workspace switcher (`StartupMeu PROD`), quick view selector (Board, List, Audit Trail), active sprint cycle completion bar, and quick priority filters.
- **Top Context Bar**: Interactive breadcrumb navigation, search bar with filter matching, column dropdowns, audit log launcher, and "+ New Issue" trigger.

### 3. Task Lifecycle & High-Density Attributes
- **Priority Matrix**: Visual badges for `Urgent` (red), `High` (amber), `Medium` (sky), and `Low` (slate).
- **Due Date Tracking**: Calendar date formatting with automatic visual alerts for overdue tasks.
- **Tagging System**: Multi-tag classification (e.g., `#Backend`, `#UI/UX`, `#Auth`, `#Performance`).
- **Assignee Avatars**: Clear issue ownership with initials/avatar on every card and row.

### 4. Real-Time Search & Multi-Axis Filtering
- Instant, client-side debounced search filtering tasks across title, description, tags, and assignee.
- Quick priority dropdown selector (`All`, `Urgent`, `High`, `Medium`, `Low`) and column status filter.

### 5. Live Activity Audit Log (Immutable Event Ledger)
- Built-in audit trail recording every task creation, column move, attribute update, and deletion.
- Slide-over drawer with timestamped actions, actor identities, and status transitions.

### 6. Reviewer-First Enterprise Authentication
- **1-Click Demo Reviewer Access**: Allows StartupMeu reviewers to evaluate the full application with admin privileges in one click without registering a throwaway account.
- **Full JWT Authentication**: Secure registration and login with `bcryptjs` (salt rounds: 10) password hashing and token expiration.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 18 + Vite | Lightning-fast build tooling, HMR, and component tree |
| **Styling** | Tailwind CSS | Sleek, modern, Linear-inspired dark UI theme |
| **Icons** | Lucide React | Consistent, lightweight iconography |
| **Backend** | Node.js & Express.js | Robust, modular REST API with MVC pattern |
| **Database** | MongoDB & Mongoose ODM | Document storage, validation rules, and schema hooks |
| **Security** | JWT & BcryptJS | Stateless authorization and secure password hashing |
| **Testing** | Jest & Supertest | Automated endpoint integration testing |
| **Process** | Concurrently | Single-command root runner for server and client |

---

## 🚀 Quick Start & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended; tested on v24)
- [MongoDB](https://www.mongodb.com/) running locally (`mongodb://localhost:27017`) or a [MongoDB Atlas](https://www.mongodb.com/atlas) connection URI

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/ManiDeep1822/StartMeu.git
cd StartMeu
```

### Step 2: Install All Dependencies
Install dependencies for the root orchestrator, backend server, and frontend client:
```bash
npm run install:all
```
*(Or install individually: `npm install`, `cd server && npm install`, `cd client && npm install`)*

### Step 3: Configure Environment Variables
A pre-configured `.env` is already provided in the `server/` folder. If needed, customize `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/devpulse
JWT_SECRET=devpulse_super_secret_jwt_key_2025_change_in_production
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

### Step 4: Seed Database with Realistic Sprint Data
Populate default users, sprint tasks, and audit logs:
```bash
npm run seed
```

> **Pre-Seeded Credentials:**
> - **Demo Reviewer:** `demo@devpulse.io` / `Password123!` *(or simply click the "1-Click Demo Login" button)*
> - **Developer:** `manideep@devpulse.io` / `Password123!`

### Step 5: Start Development Application
Run both backend API (port 5000) and frontend client (port 5173) simultaneously:
```bash
npm run dev
```

Open your browser and navigate to:
👉 **[http://localhost:5173](http://localhost:5173)**

---

## 🧪 Running Automated Tests

DevPulse includes an automated integration test suite written with **Jest** and **Supertest** covering authentication routes, task CRUD, status shifts, and activity logs.

Run backend test suite:
```bash
npm test
```

Expected output:
```
PASS src/tests/task.test.js
PASS src/tests/auth.test.js

Test Suites: 2 passed, 2 total
Tests:       13 passed, 13 total
Snapshots:   0 total
Time:        16.446 s
```

---

## 📡 REST API Reference

All protected endpoints require an `Authorization: Bearer <token>` header.

### Authentication Endpoints (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register new user account | No |
| `POST` | `/api/auth/login` | Authenticate with email/password | No |
| `POST` | `/api/auth/demo-login` | 1-Click login as pre-seeded reviewer | No |
| `GET` | `/api/auth/me` | Fetch authenticated profile | Yes |

### Task Management Endpoints (`/api/tasks`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/tasks` | Get all tasks (supports `?search=`, `?priority=`, `?status=`) | Yes |
| `GET` | `/api/tasks/:id` | Get single task details | Yes |
| `POST` | `/api/tasks` | Create new task (triggers activity log) | Yes |
| `PUT` | `/api/tasks/:id` | Update task details | Yes |
| `PATCH` | `/api/tasks/:id/status` | Move task to a new status column | Yes |
| `DELETE` | `/api/tasks/:id` | Delete task (triggers activity log) | Yes |

### Activity Endpoints (`/api/activities`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/activities` | Retrieve recent audit logs (supports `?limit=`) | Yes |
| `GET` | `/api/health` | Service health status check | No |

---

## 🤖 AI Development Experience (Code0)

As specified in the technical assessment guidelines, **[Code0](https://marketplace.visualstudio.com/items?itemName=frigga.code0)** (VS Code AI Extension by Frigga) was utilized as the primary AI development tool during the implementation of DevPulse.

### Overview of AI Workflow
Code0 was integrated directly into the VS Code development environment. It acted as an intelligent pair programmer for drafting boilerplate, scaffolding REST controllers, generating test cases, and refactoring UI components. Crucially, human engineering oversight was maintained to review every suggestion, enforce secure password hashing, handle optimistic UI race conditions, and architect a robust project structure.

Below are **5 specific tasks** where Code0 was utilized during development:

---

### Task 1: API Controller & Route Scaffolding
- **Objective:** Rapidly scaffold Express route handlers for Task CRUD operations with Mongoose ODM methods and input validation.
- **Code0 Prompt Used:**
  > *"Generate an Express controller for Task management in a MERN stack app with Mongoose. Include endpoints for getting all tasks with search query filtering, creating a task, updating details, and moving column status with proper error handling."*
- **Implementation & Human Refinement:**
  Code0 generated the initial CRUD boilerplate. However, the initial output lacked user ownership references and audit logging. I refined the code by integrating `req.user._id` extraction from the JWT middleware, added sanitization for tags, and introduced the automated `ActivityLog.create()` trigger inside each mutation.

---

### Task 2: Modular Kanban Component Development & Tailwind Styling
- **Objective:** Create modern, accessible Kanban column and task card UI components with Tailwind CSS following Linear/Raycast design aesthetics.
- **Code0 Prompt Used:**
  > *"Create a React component for a Kanban Task Card using Tailwind CSS. Include priority badges (Urgent, High, Medium, Low), tag pills, due date, assignee initials avatar, and a three-dot quick menu with 'Move to...' options."*
- **Implementation & Human Refinement:**
  Code0 provided the JSX structure and color badge mappings. I enhanced the component with standard HTML5 drag event handlers (`draggable`, `onDragStart`, `onDragEnd`), added overdue date detection logic (`isOverdue`), and implemented click-outside handling for the dropdown menu.

---

### Task 3: Automated Database Seeder Script
- **Objective:** Build an idempotent database seeding script (`server/src/seed.js`) that clears previous collections and populates realistic software sprint tasks and users.
- **Code0 Prompt Used:**
  > *"Write a Node.js seed script for MongoDB using Mongoose. Clear User, Task, and ActivityLog collections, then create a Demo Reviewer user with a hashed password, 10 realistic sprint tasks distributed across 'todo', 'in_progress', 'in_review', and 'done', and sample audit logs."*
- **Implementation & Human Refinement:**
  Code0 created the task objects and date offset helpers. I refined the script to connect to `process.env.MONGODB_URI` with fallback support, ensured password hashing through the Mongoose model hooks was preserved, and added helpful formatted terminal output displaying login credentials for the evaluator.

---

### Task 4: Drag-and-Drop Optimistic UI Debugging & Race Condition Fix
- **Objective:** Diagnose and resolve a state desynchronization issue when moving cards across Kanban columns.
- **Code0 Prompt Used:**
  > *"In my React Kanban board, when I drag a task to a new column, the UI flickers and sometimes snaps back if the server response takes 200ms. How can I implement optimistic updates with rollback on API failure?"*
- **Implementation & Human Refinement:**
  Code0 recommended saving a snapshot of `originalTasks` before updating state and calling `setTasks(originalTasks)` inside the `catch` block. I adopted this pattern in `TaskContext.jsx`, ensuring that cards move instantly with zero latency while guaranteeing database consistency if a server error occurs.

---

### Task 5: Automated Integration Test Harness (Jest & Supertest)
- **Objective:** Generate integration tests for REST API endpoints verifying authentication, authorization guards, and status transitions.
- **Code0 Prompt Used:**
  > *"Write a Supertest test suite for an Express app testing /api/auth/register, /api/auth/login, /api/auth/demo-login, and /api/tasks CRUD operations using Jest with an isolated test database."*
- **Implementation & Human Refinement:**
  Code0 generated the test template. I configured `beforeAll` and `afterAll` hooks to connect to `devpulse_test`, added assertions verifying that protected routes reject requests without a valid JWT, and verified that deleted tasks properly clean up test data.

---

## 📂 Repository Organization

```
StartMeu/
├── client/                     # Frontend Application (React 18 + Vite)
│   ├── src/
│   │   ├── components/         # Reusable Enterprise UI Components
│   │   │   ├── ActivityDrawer.jsx
│   │   │   ├── Board.jsx
│   │   │   ├── Column.jsx
│   │   │   ├── MetricsBar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskListView.jsx
│   │   │   ├── TaskModal.jsx
│   │   │   └── TopHeader.jsx
│   │   ├── context/            # React Context State Management
│   │   │   ├── AuthContext.jsx
│   │   │   └── TaskContext.jsx
│   │   ├── pages/              # View Pages
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── services/           # Axios HTTP Client & Interceptors
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                     # Backend Application (Node.js + Express)
│   ├── src/
│   │   ├── config/             # Database Connection (Mongoose)
│   │   │   └── db.js
│   │   ├── controllers/        # REST Route Controllers
│   │   │   ├── activityController.js
│   │   │   ├── authController.js
│   │   │   └── taskController.js
│   │   ├── middleware/         # Auth & Error Handling Middleware
│   │   │   ├── authMiddleware.js
│   │   │   └── errorMiddleware.js
│   │   ├── models/             # Mongoose Data Models
│   │   │   ├── ActivityLog.js
│   │   │   ├── Task.js
│   │   │   └── User.js
│   │   ├── routes/             # Express Route Definitions
│   │   │   ├── activityRoutes.js
│   │   │   ├── authRoutes.js
│   │   │   └── taskRoutes.js
│   │   ├── tests/              # Automated Integration Tests
│   │   │   ├── auth.test.js
│   │   │   └── task.test.js
│   │   ├── app.js              # Express App Configuration
│   │   ├── seed.js             # Automated Database Seeder
│   │   └── server.js           # Server Entrypoint
│   ├── .env.example
│   ├── .env
│   └── package.json
│
├── .gitignore                  # Git Ignore Configuration
├── package.json                # Root Concurrently Orchestrator
└── README.md                   # Project Documentation & Evaluation Guide
```

---

## 👨‍💻 Author & Contact

**Indla Mohana Venkata Mani Deep**  
- **Degree:** B.Tech in Computer Science and Engineering, Lovely Professional University  
- **Email:** [indlachinnu123@gmail.com](mailto:indlachinnu123@gmail.com)  
- **Phone:** +91 7661822103  
- **GitHub:** [@ManiDeep1822](https://github.com/ManiDeep1822)  
- **LinkedIn:** [in/manideep-developer](https://linkedin.com/in/manideep-developer)  

*Thank you for reviewing DevPulse. I look forward to discussing the implementation with the StartupMeu team!*
