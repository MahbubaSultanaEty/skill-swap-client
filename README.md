# SkillSwap — Freelance Micro-Task Platform

SkillSwap is a full-stack freelance marketplace where clients post small tasks, freelancers apply with proposals, and payments are handled securely via Stripe. Built as a portfolio project demonstrating real-world full-stack development skills.

🌐 **Live Site:** [https://skill-swap-by-mahbuba.vercel.app/](https://skill-swap-by-mahbuba.vercel.app/)

---

## 👩‍💻 Author

**Mahbuba Sultana**

---

## 🎯 Purpose

Many people need quick help with small online tasks but don't have the budget for large agencies. SkillSwap bridges that gap by connecting clients with skilled freelancers for fast, one-time micro-tasks — a simpler, more focused alternative to Fiverr or Freelancer.com.

---

## ✨ Key Features

### 🔐 Authentication
- Email/password registration and login via **BetterAuth**
- Google OAuth sign-in
- JWT-based session management with HTTPOnly cookies
- Role-based access: **Client**, **Freelancer**, **Admin**

### 👤 Client Dashboard
- Post tasks with title, category, description, budget, and deadline
- View and manage all posted tasks with live status tracking
- Review freelancer proposals — accept or reject
- Pay securely via **Stripe Checkout** upon accepting a proposal
- Track task progress from Open → In Progress → Completed

### 💼 Freelancer Dashboard
- Browse all open tasks with search and category filtering
- Submit proposals with budget bid, estimated days, and cover note
- Track proposals (Pending / Accepted / Rejected / Completed)
- View active projects and submit deliverable URLs
- Track earnings from completed projects
- Edit public profile (skills, bio, hourly rate, photo)

### 🛡️ Admin Dashboard
- Overview statistics with interactive charts
- Manage all users — block/unblock accounts
- Manage all tasks — delete policy-violating posts
- View complete transaction history

### 🎨 UI/UX
- Consistent green & white design system across all pages
- Fully responsive — mobile, tablet, and desktop
- Role-specific dashboard charts (different chart types per role)
- Smooth animations and transitions
- Category slider with Swiper.js autoplay
- HeroUI component library throughout

### 🔒 Security
- JWT verification via BetterAuth JWKS on every protected route
- Role-based middleware (`verifyClient`, `verifyFreelancer`, `verifyAdmin`)
- Environment variables for all secrets

---

## 🛠️ Tech Stack

### Frontend
| Package | Purpose |
|---|---|
| `next` | React framework (App Router) |
| `better-auth` | Authentication (Email + Google OAuth) |
| `@heroui/react` | UI component library |
| `tailwindcss` | Utility-first CSS |
| `swiper` | Category slider |
| `lucide-react` | Icons |
| `react-toastify` | Toast notifications |
| `stripe` | Payment integration |
| `recharts` | Dashboard charts |

### Backend
| Package | Purpose |
|---|---|
| `express` | Node.js web framework |
| `mongodb` | Database driver |
| `jose-cjs` | JWT verification via JWKS |
| `cors` | Cross-origin resource sharing |
| `dotenv` | Environment variable management |
| `stripe` | Stripe payment processing |

---

## 📁 Project Structure

```
skill-swap-client/          # Next.js Frontend
├── app/
│   ├── (public)/
│   │   ├── page.jsx                  # Home
│   │   ├── tasks/                    # Browse Tasks
│   │   ├── freelancers/              # Browse Freelancers
│   │   └── how-it-works/            # How It Works
│   ├── dashboard/
│   │   ├── client/                   # Client Dashboard
│   │   ├── freelancer/               # Freelancer Dashboard
│   │   └── admin/                    # Admin Dashboard
│   └── auth/                         # Login & Register
├── components/
│   ├── shared/                       # Navbar, Footer, Sidebar
│   ├── dashboard/                    # Dashboard components
│   └── tasks/                        # Task & Proposal forms
└── lib/
    ├── auth.js                       # BetterAuth config
    ├── auth-client.js                # Client-side auth
    ├── core/                         # Fetch utilities
    └── api/                          # API helper functions

skill-swap-server/          # Express.js Backend
├── index.js                          # Main server file
└── .env                              # Environment variables
```

---

## 🗄️ Database Collections (MongoDB)

```
users         — name, email, image, role, skills, bio, isBlocked, createdAt
tasks         — title, category, description, budget, deadline, clientId,
                clientName, clientEmail, status, deliverable_url, createdAt
proposals     — taskId, taskTitle, clientName, clientEmail, freelancerId,
                freelancerName, freelancerEmail, proposedBudget, estimatedDays,
                coverNote, status, submittedAt, deliverableUrl, completionDate
payments      — clientEmail, freelancerEmail, taskId, amount,
                transaction_id, payment_status, paid_at
reviews       — taskId, reviewerEmail, revieweeEmail, rating, comment, createdAt
```

---

## 🔌 API Endpoints

### Tasks
```
GET    /api/tasks                    # Browse tasks (search, filter, paginate)
POST   /api/tasks                    # Create task (client only)
GET    /api/tasks/currentTask/:id    # Get single task
GET    /api/tasks/:clientId          # Get client's tasks
PATCH  /api/tasks/:id/status         # Update task status
DELETE /api/tasks/:id                # Delete task (admin)
```

### Proposals
```
GET    /api/proposals                # Get proposals (filter by role)
POST   /api/proposals                # Submit proposal (freelancer only)
PATCH  /api/proposals/:id/status     # Accept/Reject (client) or Complete (freelancer)
```

### Users
```
GET    /api/users                    # Get all users (admin)
GET    /api/users/email/:email       # Get user by email
PATCH  /api/users/:id                # Update profile
PATCH  /api/users/:id/block          # Block/unblock user (admin)
GET    /api/freelancers              # Get all freelancers
```

### Payments & Reviews
```
GET    /api/payments                 # Transaction history
POST   /api/payments                 # Save payment record
GET    /api/reviews                  # Get reviews
POST   /api/reviews                  # Submit review (client only)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Stripe account
- Google OAuth credentials

### Frontend Setup

```bash
git clone https://github.com/username/skillswap-client
cd skillswap-client
npm install
```

Create `.env.local`:
```env
NEXT_PUBLIC_BASE_URL=http://localhost:5000
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

```bash
npm run dev
```

### Backend Setup

```bash
git clone https://github.com/username/skillswap-server
cd skillswap-server
npm install
```

Create `.env`:
```env
MONGO_URI=your_mongodb_uri
CLIENT_URL=http://localhost:3000
STRIPE_SECRET_KEY=your_stripe_secret
```

```bash
node index.js
```

---

## 🧪 Test Accounts

| Role | Email | Password |
|---|---|---|
| Admin | admin1@taskhive.com | admin1@taskhive.com |
| Freelancer | freelanceruser3@gmail.com | freelanceruser3@gmail.com |

---

## 📄 License

This project is for educational and portfolio purposes.
