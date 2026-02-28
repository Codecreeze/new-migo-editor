# Auth SaaS Application

A production-grade authentication and authorization SaaS application with role-based access control.

## Features

- 🔐 Complete Authentication Flow (Signup, Login, OTP, Forgot/Reset Password)
- 👥 Company & Individual User Types
- 🏢 Team Management with Role-Based Permissions
- 📧 Email Invitation System with Expiry
- 🎨 Image Gallery with Free API Integration
- 🎯 Protected Routes & Role Guards
- 🌓 Dark/Light Theme Toggle
- 📱 Fully Responsive Design
- ⚡ Performance Optimized
- 🎭 Mock API Layer

## Tech Stack

- **Vite** - Build Tool
- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Redux Toolkit** - State Management
- **React Router v7** - Routing
- **MUI v7.3+** - UI Components
- **SCSS Modules** - Styling
- **Axios** - HTTP Client
- **React Hook Form** - Form Management
- **Zod** - Validation

## Setup

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```


## Roles & Permissions

| Role | Permissions |
|------|-------------|
| Company Admin | Full Access |
| Project Manager | View/Create Projects, Manage Team |
| Team Lead | View Projects, View Team |
| Employee | View Gallery Only |

## Project Structure

```
src/
├── app/              # Redux store and hooks
├── features/         # Feature-based modules
│   ├── auth/        # Authentication
│   ├── dashboard/   # Dashboard
│   ├── team/        # Team Management
│   └── gallery/     # Image Gallery
├── components/       # Reusable components
├── layouts/          # Layout components
├── routes/           # Routing configuration
├── services/         # API services
├── utils/            # Utility functions
├── context/          # React Context
└── styles/           # Global styles
```

## Features Overview

### Authentication
- Company Signup (Company + Admin)
- Individual Signup
- Email OTP Verification (6-digit)
- Login with Session Management
- Forgot Password Flow
- Reset Password with Token
- Change Password (Authenticated)

### Authorization
- Role-Based Access Control (RBAC)
- Permission Guards
- Protected Routes
- Feature Locking with Upgrade Popups

### Team Management
- Create Teams
- Invite Members via Email
- Assign Roles & Permissions
- Invitation Expiry (7 days)
- Re-invite Functionality

### Dashboard
- Permission-Based Sidebar
- Image Gallery (Unsplash API)
- Team Management
- Profile Settings
- Theme Toggle

### Landing Pages
- Home with Hero Section
- About Page
- Contact Form
- SEO Optimized
- Fully Accessible

## Error Handling

All errors are handled via MUI Alerts:
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 409 Conflict
- 422 Validation Error
- 500 Server Error

## Performance

- ⚡ Code Splitting
- 🔄 Lazy Loading Routes
- 💾 Memoized Selectors
- 🎯 Optimized Re-renders
- 🖼️ Image Lazy Loading
- ⏳ Skeleton Loading

## License

MIT
