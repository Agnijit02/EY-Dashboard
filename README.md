# 🏢 EY Enterprise Delivery & Governance Command Center

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4+-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933.svg?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748.svg?logo=prisma&logoColor=white)](https://www.prisma.io/)

An enterprise project management and governance platform built with React, TypeScript, Vite, Tailwind CSS, and Node.js. Features executive KPI dashboards, commercial financial waterfall analytics, resource allocation, a 5x5 risk matrix heatmap, live activity feeds, and strict Role-Based Access Control (Admin, Manager, Viewer).

---

## ✨ Key Features

### 📊 1. Executive Intelligence & Dashboard
- **Real-Time KPIs**: Live tracking of Total Revenue recognized, Active Projects, Practice Utilization Rate, and Client CSAT.
- **Regional Performance**: Interactive geographic distribution with drill-down tooltips and 1-click filtered redirection.
- **Live Activity Feed**: Audited event stream with dynamically calculated relative timestamps (`Just now`, `8m ago`, `2h ago`) and exact localized time tooltips.

### 💰 2. Financial Analytics & Commercial Waterfall
- **Financial Waterfall Chart**: Multi-stage commercial flow breakdown across Approved Budget, Cost Incurred, Revenue Recognized, Invoiced Amount, and Cash Collected.
- **Profitability Matrix**: Practice-level margin tracking with gross profit calculations and cost-burn analysis.

### 📁 3. Project Delivery & Dossier Management
- **End-to-End Project Lifecycle**: Track projects across Planning, In-Progress, At-Risk, and Completed states.
- **Project Dossier Drawer**: Deep-dive delivery metrics, team allocation, budget vs. spend, and phase milestone trackers.
- **Export Capabilities**: Generate executive project dossiers in PDF and CSV format.

### 👥 4. Resource Allocation & Skills Matrix
- **Talent Pool Capacity**: Practice-wide resource availability, billable rate tracking, and workload allocation percentages.
- **Skill Taxonomy**: Search and filter specialists by core competencies, certifications, and project assignments.

### 🛡️ 5. Governance & Risk Management
- **5×5 Risk Matrix Heatmap**: Visualize delivery risks across Probability and Impact severity dimensions.
- **Risk Register**: Track mitigation plans, severity scores (1–25), risk owners, and target due dates.

### 🔐 6. Role-Based Access Control (RBAC)
- **Multi-Tier Hierarchy**: `ADMIN`, `MANAGER`, and `VIEWER` roles.
- **Granular Mutation Gates**: Strict view-only mode for `VIEWER` users across all UI components, modals, and backend API routes.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, TanStack React Query, Zustand, Lucide React, Recharts, Sonner |
| **Backend** | Node.js, Express, TypeScript, Prisma ORM, JWT Authentication, Zod Validation |
| **Architecture** | Feature-based modular architecture, RESTful API, Schema-driven validation |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### 2. Frontend Setup
```bash
cd my-dashboard
npm install
cp .env.example .env
npm run dev
```

### 3. Access Application
Open `http://localhost:5173` in your browser.
