# HostelHub - Smart Hostel Management System

HostelHub is a complete, production-ready full-stack web application designed to digitize and manage hostel activities for students, wardens, and administrators. 

## 🚀 Features

### For Students:
- **Dashboard:** Overview of room, complaints, leave requests, and announcements.
- **Room Details:** View assigned block and room information.
- **Complaints:** Submit, track, and manage complaints.
- **Leaves:** Apply for leave and track approval status.
- **Mess Menu:** View daily mess menus and submit feedback.
- **Lost & Found:** Report lost items or post found items.

### For Wardens:
- **Dashboard:** Monitor students, rooms, and pending tasks in their assigned block.
- **Complaint Management:** Update status of student complaints.
- **Leave Management:** Approve or reject student leave requests.
- **Announcements:** Create and manage hostel announcements.
- **Mess Management:** Update menus and review student feedback.

### For Administrators:
- **Analytics Dashboard:** Complete statistics across all hostels/blocks.
- **User Management:** Manage students, wardens, and other admins.
- **Room Management:** Add/edit rooms and assign students to rooms.
- **Global Oversight:** View all complaints, leave requests, and announcements.

## 🛠️ Technology Stack

**Frontend:**
- React.js (Vite)
- Tailwind CSS v4
- React Router DOM
- Axios
- Recharts (Analytics)
- Lucide React (Icons)

**Backend:**
- Node.js
- Express.js
- REST API Architecture
- JWT Authentication & bcrypt
- MySQL2 (Promises)

**Database:**
- MySQL (Relational DB structure)

## 📁 Folder Structure

```
HostelHub/
├── backend/                  # Express.js API
│   ├── scripts/              # DB Seeding & Setup scripts
│   ├── src/
│   │   ├── config/           # Database configuration
│   │   ├── controllers/      # Route controllers (Logic)
│   │   ├── middleware/       # Auth and Role middlewares
│   │   ├── routes/           # API routes definitions
│   │   └── utils/            # Helper functions
│   ├── .env                  # Environment variables
│   ├── database.sql          # DB Schema definition
│   └── server.js             # Entry point
└── frontend/                 # React UI
    ├── src/
    │   ├── assets/
    │   ├── components/       # Reusable UI components
    │   ├── context/          # React Context (Auth, etc.)
    │   ├── layouts/          # Dashboard & Auth layouts
    │   ├── lib/              # Axios and utility config
    │   ├── pages/            # Application pages (Student, Warden, Admin)
    │   ├── App.jsx           # Main App & Routing
    │   └── main.jsx          # Entry point
    ├── vite.config.js        # Vite & Tailwind configuration
    └── package.json
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- MySQL Server

### 1. Database Setup
Ensure MySQL is running. The default setup assumes `root` user with no password. If your setup is different, update the `.env` file in the backend.

### 2. Backend Setup
```bash
cd backend
npm install
# Set up environment variables
cp .env.example .env
# Seed the database (creates tables and demo data)
node scripts/seed.js
# Start the backend server
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
# Start the development server
npm run dev
```

## 🔑 Demo Credentials

Demo accounts are available for testing. All passwords are `password123`.

- **Admin:** `admin@hostelhub.com`
- **Warden:** `warden@hostelhub.com`
- **Student:** `student@hostelhub.com`

## 🌍 Deployment

**Backend (Railway/Render):**
1. Push the repository to GitHub.
2. Connect the `backend` folder to your PaaS of choice.
3. Add a MySQL database instance.
4. Set the environment variables (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`, `NODE_ENV=production`).

**Frontend (Vercel/Netlify):**
1. Connect the repository and set the root directory to `frontend`.
2. Add environment variable for `VITE_API_URL` pointing to your deployed backend URL.
3. Build command: `npm run build`
4. Output directory: `dist`
