# ORM Ecosystem - Online Reputation Management Platform

A comprehensive marketplace review management platform that connects brands with verified shoppers to generate authentic, compliant reviews in exchange for 100% cashback. Built with Next.js 16, React 19, and TypeScript.

## 🎯 Project Overview

ORM Ecosystem is a three-sided marketplace platform that facilitates authentic product reviews on major e-commerce marketplaces (Amazon, Flipkart, Myntra, Nykaa, Sephora, etc.). The platform ensures compliance with marketplace Terms of Service while helping brands build their online reputation through verified customer reviews.

### Core Concept

1. **Brands** create campaigns for products they want reviewed
2. **Shoppers** purchase products at full price from marketplaces
3. **Shoppers** post authentic reviews after receiving products
4. **Shoppers** upload proof (order screenshot, review screenshot, review link)
5. **Admins** verify submissions for compliance
6. **Shoppers** receive 100% cashback once approved

## 👥 User Roles

### 1. **Shoppers/Users** (`/user`, `/feed`)
- Browse deals with 100% cashback offers
- Purchase products from marketplaces (Amazon, Flipkart, Myntra, Nykaa, etc.)
- Upload proof of purchase and review
- Track purchase history and payment status
- Manage wallet and withdraw earnings
- View personalized dashboard with earnings and activity

### 2. **Brands** (`/dashboard`, `/brand`)
- Create and manage review campaigns
- Set budget and review requirements
- Track campaign performance and analytics
- Monitor review pipeline and sentiment analysis
- Manage products and storefronts
- View reports and ROI metrics
- Manage wallet and add funds

### 3. **Admins** (`/admin`)
- Verify shopper submissions (order proof, review proof)
- Approve or reject reviews based on brand requirements
- Manage user accounts and activities
- Process payout requests
- Monitor compliance alerts
- View system-wide analytics and activity feed

## 🏗️ Architecture & Tech Stack

### Frontend
- **Framework**: Next.js 16.0.3 (App Router)
- **UI Library**: React 19.2.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **State Management**: 
  - Zustand (global state)
  - React Context (Auth, Animation)
- **Data Fetching**: TanStack React Query 5
- **Forms**: React Hook Form 7
- **Icons**: React Icons, Lucide React
- **Charts**: Recharts 3
- **Animations**: TSParticles

### Development Tools
- **Mocking**: MSW (Mock Service Worker) 2
- **Data Generation**: Faker.js
- **Linting**: ESLint with Next.js config
- **Build Tool**: Next.js Turbopack

## 📁 Complete Project Structure

```
orm-app/
├── src/
│   │
│   ├── app/                          # 📄 Next.js App Router (All Pages)
│   │   ├── layout.tsx               # Root layout - wraps entire app
│   │   ├── page.tsx                 # Home/Landing page (/)
│   │   ├── globals.css              # Global styles
│   │   │
│   │   ├── (auth)/                  # 🔐 Authentication Pages (Grouped Route)
│   │   │   ├── layout.tsx           # Auth layout wrapper
│   │   │   ├── login/
│   │   │   │   └── page.tsx         # Login page - Shoppers & Brands
│   │   │   └── signup/
│   │   │       └── page.tsx         # Signup page - Create account
│   │   │
│   │   ├── feed/                     # 🛍️ Shopper Deals Feed
│   │   │   ├── page.tsx             # Main deals feed page
│   │   │   └── [id]/
│   │   │       └── page.tsx         # Individual product detail page
│   │   │
│   │   ├── user/                     # 👤 Shopper/User Portal
│   │   │   ├── page.tsx             # User dashboard home
│   │   │   ├── deals/
│   │   │   │   ├── page.tsx         # Browse all deals
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx     # Deal detail page
│   │   │   ├── purchases/
│   │   │   │   ├── page.tsx         # Purchase history
│   │   │   │   └── track/
│   │   │   │       └── page.tsx     # Track purchases
│   │   │   ├── reviews/
│   │   │   │   └── page.tsx         # Review history
│   │   │   ├── wallet/
│   │   │   │   └── page.tsx         # Wallet & earnings
│   │   │   ├── payments/
│   │   │   │   └── page.tsx         # Payment status
│   │   │   ├── shop/
│   │   │   │   ├── page.tsx         # Browse shops
│   │   │   │   └── [storeId]/
│   │   │   │       └── page.tsx     # Shop products
│   │   │   └── upload-proof/
│   │   │       └── page.tsx         # Upload proof page
│   │   │
│   │   ├── dashboard/                # 🏢 Brand Dashboard (Alternative)
│   │   │   ├── layout.tsx           # Dashboard layout
│   │   │   ├── page.tsx              # Dashboard home
│   │   │   ├── create-campaign/
│   │   │   │   └── page.tsx         # Create campaign
│   │   │   ├── products/
│   │   │   │   └── page.tsx          # Product management
│   │   │   ├── analytics/
│   │   │   │   └── page.tsx          # Analytics dashboard
│   │   │   ├── reports/
│   │   │   │   └── page.tsx          # Reports
│   │   │   └── wallet/
│   │   │       └── page.tsx          # Brand wallet
│   │   │
│   │   ├── brand/                     # 🏢 Brand Portal (Main)
│   │   │   ├── page.tsx              # Brand home
│   │   │   ├── campaigns/
│   │   │   │   └── create/
│   │   │   │       └── page.tsx      # Create campaign wizard
│   │   │   ├── products/
│   │   │   │   ├── page.tsx          # Product list
│   │   │   │   └── select/
│   │   │   │       └── page.tsx      # Select products
│   │   │   ├── reviews/
│   │   │   │   └── page.tsx          # Review pipeline
│   │   │   ├── reports/
│   │   │   │   └── page.tsx          # Review reports
│   │   │   ├── storefront/
│   │   │   │   └── page.tsx          # Storefront management
│   │   │   ├── budget/
│   │   │   │   └── page.tsx          # Budget management
│   │   │   ├── orders/
│   │   │   │   └── page.tsx          # Order tracking
│   │   │   └── wallet/
│   │   │       └── page.tsx          # Brand wallet
│   │   │
│   │   ├── admin/                     # 👨‍💼 Admin Panel
│   │   │   ├── layout.tsx            # Admin layout
│   │   │   ├── page.tsx              # Admin home
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx          # Master dashboard
│   │   │   ├── verifier/
│   │   │   │   └── page.tsx          # Review verification tool
│   │   │   ├── review-pipeline/
│   │   │   │   └── page.tsx          # Review pipeline
│   │   │   ├── users/
│   │   │   │   └── page.tsx          # User management
│   │   │   ├── user-activities/
│   │   │   │   └── page.tsx          # Activity monitoring
│   │   │   ├── payouts/
│   │   │   │   └── page.tsx          # Payout processing
│   │   │   └── compliance-monitor/
│   │   │       └── page.tsx          # Compliance monitoring
│   │   │
│   │   ├── profile/                   # 👤 Profile Management
│   │   │   └── page.tsx              # Edit profile (all roles)
│   │   │
│   │   ├── upload/                    # 📤 Upload Proof
│   │   │   └── page.tsx               # Upload order/review proof
│   │   │
│   │   ├── wallet/                    # 💰 Wallet (Standalone)
│   │   │   └── page.tsx               # Wallet page
│   │   │
│   │   ├── how-it-works/              # ℹ️ Public Info
│   │   │   └── page.tsx               # How it works page
│   │   │
│   │   └── for-sellers/               # 📢 Brand Information
│   │       └── page.tsx               # For sellers page
│   │
│   ├── components/                     # 🧩 React Components
│   │   │
│   │   ├── layout/                     # 📐 Layout Components
│   │   │   ├── site-header.tsx        # Main site header (public pages)
│   │   │   ├── feed-header.tsx        # Header for feed page
│   │   │   ├── site-footer.tsx        # Site footer
│   │   │   └── social-sidebar.tsx     # Social media sidebar
│   │   │
│   │   ├── layouts/                    # 📄 Page Layouts
│   │   │   ├── MobileLayout.tsx       # Mobile layout wrapper
│   │   │   └── DashboardLayout.tsx    # Dashboard layout wrapper
│   │   │
│   │   ├── sections/                    # 🎨 Feature Sections
│   │   │   │
│   │   │   ├── landing/                # 🏠 Landing Page Sections
│   │   │   │   ├── hero-section.tsx    # Hero banner
│   │   │   │   ├── partners-section.tsx # Marketplace logos
│   │   │   │   ├── impact-section.tsx  # Impact metrics
│   │   │   │   ├── workflow-section.tsx # How it works
│   │   │   │   ├── ecosystem-section.tsx # Ecosystem features
│   │   │   │   ├── numbers-section.tsx  # Statistics
│   │   │   │   └── cta-section.tsx     # Call to action
│   │   │   │
│   │   │   ├── user/                    # 👤 User/Shopper Sections
│   │   │   │   ├── user-overview.tsx   # User dashboard overview
│   │   │   │   ├── deals-feed.tsx      # Deals feed component
│   │   │   │   ├── purchase-timeline.tsx # Purchase history
│   │   │   │   ├── payment-status.tsx  # Payment status
│   │   │   │   ├── wallet-view.tsx     # Wallet display
│   │   │   │   ├── upload-proof-form.tsx # Upload form
│   │   │   │   ├── review-history.tsx  # Review history
│   │   │   │   ├── product-detail.tsx  # Product details
│   │   │   │   ├── storefront-grid.tsx # Storefront grid
│   │   │   │   └── how-it-works-shopper.tsx # Shopper guide
│   │   │   │
│   │   │   ├── brand/                   # 🏢 Brand Sections
│   │   │   │   ├── brand-overview.tsx  # Brand dashboard overview
│   │   │   │   ├── create-campaign-wizard.tsx # Campaign wizard
│   │   │   │   ├── live-analytics-board.tsx # Analytics dashboard
│   │   │   │   ├── review-pipeline.tsx # Review pipeline
│   │   │   │   ├── review-report-list.tsx # Review reports
│   │   │   │   ├── budget-widget.tsx   # Budget widget
│   │   │   │   ├── live-orders-widget.tsx # Orders widget
│   │   │   │   └── add-funds-wallet.tsx # Add funds component
│   │   │   │
│   │   │   └── admin/                    # 👨‍💼 Admin Sections
│   │   │       ├── admin-overview.tsx  # Admin dashboard
│   │   │       ├── verifier-screen.tsx # Verification tool
│   │   │       ├── user-manager.tsx    # User management
│   │   │       ├── payout-manager.tsx  # Payout management
│   │   │       ├── compliance-panel.tsx # Compliance panel
│   │   │       └── activity-feed.tsx   # Activity feed
│   │   │
│   │   └── ui/                          # 🎨 Reusable UI Components
│   │       ├── logo-icon.tsx           # Logo component
│   │       ├── particle-background.tsx # Animated particles
│   │       ├── stat-card.tsx           # Statistics card
│   │       ├── status-badge.tsx         # Status badge
│   │       ├── progress-bar.tsx        # Progress bar
│   │       ├── section-heading.tsx    # Section heading
│   │       └── star-rating-graph-card.tsx # Rating graph
│   │
│   ├── contexts/                        # 🔄 React Context Providers
│   │   ├── AuthContext.tsx             # Authentication context
│   │   └── AnimationContext.tsx        # Animation context
│   │
│   ├── lib/                             # 📚 Utilities & Config
│   │   ├── types.ts                    # TypeScript type definitions
│   │   ├── api.ts                      # API client (mock)
│   │   ├── mock-data.ts                # Mock data generators
│   │   ├── analytics.ts                # Analytics utilities
│   │   └── constants.ts                # App constants
│   │
│   ├── providers/                       # 🔌 React Providers
│   │   └── query-provider.tsx          # React Query provider
│   │
│   ├── store/                           # 🗄️ State Management
│   │   └── use-ui-store.ts             # Zustand UI store
│   │
│   ├── mocks/                           # 🎭 Mock Data Setup
│   │   ├── browser.ts                  # MSW browser setup
│   │   └── handlers.ts                 # API mock handlers
│   │
│   └── middleware.ts                    # 🛡️ Next.js Middleware (Auth)
│
├── public/                              # 📁 Static Assets
│   ├── logos/                          # Marketplace logos
│   │   ├── Amazon_logo.svg.png
│   │   ├── Flipkart-Logo.wine.png
│   │   ├── nykalogo.png
│   │   ├── myntra.jpg
│   │   └── ... (other logos)
│   ├── arrow-bottom1.png               # Decorative image
│   ├── file.svg                        # Icons
│   ├── globe.svg
│   └── ... (other assets)
│
├── .next/                              # ⚙️ Next.js Build Output
├── node_modules/                       # 📦 Dependencies
├── package.json                        # 📋 Project config
├── tsconfig.json                       # 🔧 TypeScript config
├── next.config.ts                      # ⚙️ Next.js config
├── eslint.config.mjs                   # 🔍 ESLint config
├── postcss.config.mjs                  # 🎨 PostCSS config
└── README.md                           # 📖 This file
```

## 💡 Code Explanation - How Everything Works

### 🎯 Understanding the Application Flow

Think of this app like a **three-way marketplace**:
1. **Brands** want reviews for their products
2. **Shoppers** want to earn money by buying and reviewing
3. **Admins** make sure everything is fair and compliant

### 📦 How the Code is Organized

#### 1. **Entry Point: `src/app/layout.tsx`**
This is where everything starts! It's like the main wrapper for your entire app.

```typescript
// What it does:
- Sets up fonts (Inter, Poppins)
- Wraps app with providers (Query, Auth, Animation)
- Adds header and footer to all pages
- Defines global styles
```

**Simple Explanation**: This file is like the foundation of a house. Every page uses this layout as a base.

#### 2. **Authentication: `src/contexts/AuthContext.tsx`**
This manages who is logged in and what they can do.

```typescript
// What it does:
- Stores current user (shopper, brand, or admin)
- Handles login/logout
- Saves user info in browser storage
- Redirects users to correct pages based on role
```

**Simple Explanation**: Like a security guard that checks your ID and decides which rooms you can enter.

**How it works**:
- When you login, it saves your info
- When you visit a page, it checks if you're allowed
- If not logged in, redirects to login page

#### 3. **Route Protection: `src/middleware.ts`**
This is like a bouncer at a club - it checks if you can enter certain pages.

```typescript
// What it does:
- Checks if you're logged in
- Checks your role (user/brand/admin)
- Blocks access to pages you shouldn't see
- Redirects to correct pages
```

**Simple Explanation**: 
- Public pages (home, login) = Anyone can visit
- User pages = Only shoppers can visit
- Brand pages = Only brands can visit
- Admin pages = Only admins can visit

#### 4. **Data Management: `src/lib/api.ts`**
This is where all the "fake" data comes from (ready to connect to real API).

```typescript
// What it does:
- Provides functions to get data (products, users, campaigns)
- Simulates network delay (like real API)
- Returns mock data for development
```

**Simple Explanation**: Like a library that gives you books (data) when you ask. Currently has fake books, but can easily swap to real ones.

**Example**:
```typescript
api.fetchProducts()  // Gets list of products
api.fetchDeals()     // Gets deals for shoppers
api.fetchCampaigns() // Gets campaigns for brands
```

#### 5. **Type Definitions: `src/lib/types.ts`**
This defines what data looks like - like a blueprint.

```typescript
// What it does:
- Defines structure of User, Product, Campaign, etc.
- Ensures TypeScript knows what data to expect
- Prevents errors from wrong data types
```

**Simple Explanation**: Like a form template. It says "A User must have: name, email, role" - nothing else allowed!

**Key Types**:
- `AuthUser` - Who is logged in
- `Deal` - Product with cashback offer
- `Campaign` - Brand's review campaign
- `PendingReview` - Review waiting for admin approval

#### 6. **Pages: `src/app/*/page.tsx`**
Each folder in `app/` becomes a page on the website.

**How Next.js Routing Works**:
```
src/app/feed/page.tsx          → /feed
src/app/user/page.tsx           → /user
src/app/user/wallet/page.tsx    → /user/wallet
src/app/user/deals/[id]/page.tsx → /user/deals/123 (dynamic)
```

**Simple Explanation**: 
- Folder name = URL path
- `page.tsx` = The actual page content
- `[id]` = Dynamic route (like `/user/deals/123`)

#### 7. **Components: `src/components/`**
Reusable pieces of UI that can be used anywhere.

**Component Structure**:
```
components/
├── layout/        → Headers, footers (used on every page)
├── sections/      → Big feature sections (dashboard cards, forms)
└── ui/            → Small reusable pieces (buttons, cards, badges)
```

**Simple Explanation**: 
- **Layout components** = Building structure (walls, roof)
- **Section components** = Rooms (kitchen, bedroom)
- **UI components** = Furniture (chair, table) - can move anywhere

**Example Component**:
```typescript
// components/sections/user/user-overview.tsx
export function UserOverview() {
  // Gets data
  const purchases = api.fetchPurchaseHistory()
  
  // Shows it on screen
  return (
    <div>
      <h1>Your Earnings</h1>
      <p>Total: ₹{purchases.total}</p>
    </div>
  )
}
```

#### 8. **State Management**

**Three ways to manage state**:

1. **React Context** (`contexts/`)
   - For global app state (who's logged in, animations)
   - Available everywhere in the app

2. **Zustand** (`store/use-ui-store.ts`)
   - For UI state (mobile menu open/closed, selected country)
   - Lightweight, easy to use

3. **React Query** (`providers/query-provider.tsx`)
   - For server data (products, campaigns, users)
   - Handles loading, caching, refetching

**Simple Explanation**:
- **Context** = Global settings everyone needs
- **Zustand** = UI preferences (like dark mode)
- **React Query** = Data from server (like products list)

### 🔄 How Data Flows Through the App

#### Example: Shopper Views Deals Feed

```
1. User visits /feed
   ↓
2. middleware.ts checks: Is user logged in? ✅
   ↓
3. feed/page.tsx loads
   ↓
4. Component calls api.fetchDeals()
   ↓
5. api.ts returns mock data (or real API)
   ↓
6. Component displays deals on screen
   ↓
7. User clicks "Get Deal"
   ↓
8. Opens marketplace link in new tab
```

#### Example: Brand Creates Campaign

```
1. Brand visits /dashboard/create-campaign
   ↓
2. middleware.ts checks: Is user a brand? ✅
   ↓
3. create-campaign-wizard.tsx loads
   ↓
4. Brand fills form (product, budget, requirements)
   ↓
5. Form submits → api.createCampaign()
   ↓
6. Campaign saved (mock or real API)
   ↓
7. Campaign appears in deals feed
   ↓
8. Shoppers can now see and purchase
```

#### Example: Shopper Uploads Proof

```
1. Shopper visits /upload
   ↓
2. upload-proof-form.tsx shows form
   ↓
3. Shopper uploads:
   - Order screenshot
   - Review screenshot  
   - Review link
   ↓
4. Form submits → api.uploadProof()
   ↓
5. Data saved as PendingReview
   ↓
6. Admin sees in /admin/verifier
   ↓
7. Admin approves/rejects
   ↓
8. If approved → Shopper gets cashback
```

### 🎨 How Styling Works

**Tailwind CSS** - Utility-first CSS framework

```typescript
// Instead of writing CSS files, you use classes:
<div className="bg-blue-500 text-white p-4 rounded-lg">
  // bg-blue-500 = background blue
  // text-white = white text
  // p-4 = padding
  // rounded-lg = rounded corners
</div>
```

**Simple Explanation**: Like LEGO blocks. Each class is a small piece you combine to build the design.

### 🔐 Authentication Flow Explained Simply

```
1. User clicks "Login"
   ↓
2. Enters email/password (or selects role for demo)
   ↓
3. AuthContext.login() is called
   ↓
4. User data saved in:
   - React state (for current session)
   - localStorage (persists after refresh)
   - Cookie (for middleware to check)
   ↓
5. User redirected based on role:
   - Shopper → /user
   - Brand → /dashboard
   - Admin → /admin
   ↓
6. Every page visit:
   - middleware.ts checks cookie
   - If no cookie → redirect to /login
   - If wrong role → redirect to correct page
```

### 📱 Responsive Design

**Mobile-First Approach**:
- All components work on mobile first
- Then enhanced for tablets and desktops
- Uses Tailwind breakpoints:
  - `sm:` = 640px+
  - `md:` = 768px+
  - `lg:` = 1024px+
  - `xl:` = 1280px+

**Example**:
```typescript
<div className="text-sm md:text-base lg:text-lg">
  // Small text on mobile
  // Medium text on tablet
  // Large text on desktop
</div>
```

### 🧩 Component Reusability

**Good Practice**: Build small, reusable components

```typescript
// Instead of repeating code:
<StatCard title="Total Earnings" value="₹5000" />
<StatCard title="Pending" value="₹2000" />
<StatCard title="Withdrawn" value="₹3000" />

// Instead of writing 3 separate divs each time
```

### 🎯 Key Concepts Explained Simply

1. **Server vs Client Components**
   - **Server Component** (default): Renders on server, faster
   - **Client Component** (`"use client"`): Renders in browser, interactive

2. **Dynamic Routes**
   - `[id]` in folder name = dynamic parameter
   - `/user/deals/123` → `id = "123"`

3. **Layouts**
   - `layout.tsx` wraps all pages in that folder
   - Nested layouts stack (parent → child)

4. **Loading States**
   - Show spinner while data loads
   - Better user experience

5. **Error Handling**
   - Try/catch blocks
   - Show error messages to user
   - Don't crash the app

## 🔐 Authentication & Authorization

### Authentication Flow
- Mock authentication system (ready for real API integration)
- Role-based access control (User, Brand, Admin)
- Session persistence via localStorage and cookies
- Protected routes with Next.js middleware

### Route Protection
- **Public Routes**: `/`, `/login`, `/signup`, `/how-it-works`, `/for-sellers`
- **User Routes**: `/feed`, `/user/*`, `/wallet`, `/upload`, `/profile`
- **Brand Routes**: `/dashboard/*`, `/brand/*`, `/profile`
- **Admin Routes**: `/admin/*`, `/profile`

## 🚀 Key Features

### For Shoppers
- ✅ Browse deals feed with 100% cashback offers
- ✅ Purchase tracking and history
- ✅ Proof upload (order screenshot, review screenshot, review link)
- ✅ Wallet management with withdrawal options
- ✅ Payment status tracking
- ✅ Personalized dashboard with earnings overview

### For Brands
- ✅ Campaign creation wizard
- ✅ Product management
- ✅ Budget allocation and tracking
- ✅ Real-time analytics dashboard
- ✅ Review pipeline monitoring
- ✅ Sentiment analysis
- ✅ Compliance monitoring
- ✅ Storefront management
- ✅ Review reports

### For Admins
- ✅ Review verification tool
- ✅ User management
- ✅ Payout request processing
- ✅ Compliance monitoring
- ✅ Activity feed
- ✅ System-wide analytics

## 📖 Detailed File Explanations

### Core Files

#### `src/app/layout.tsx` - Root Layout
**Purpose**: The main wrapper for your entire application
- Sets up fonts (Inter, Poppins)
- Wraps app with providers (QueryProvider, AuthProvider, AnimationProvider)
- Adds SiteHeader and SiteFooter to all pages
- Defines global metadata (title, description)

**Why it matters**: Every page inherits from this layout. It's like the foundation of a building.

#### `src/middleware.ts` - Route Protection
**Purpose**: Protects routes based on authentication and role
- Checks if user is logged in (reads cookie)
- Verifies user role (user/brand/admin)
- Redirects unauthorized users
- Allows public routes without auth

**How it works**:
1. Every request goes through middleware first
2. Checks `auth_user` cookie
3. If no cookie → redirect to `/login`
4. If wrong role → redirect to correct dashboard
5. If authorized → allow access

#### `src/contexts/AuthContext.tsx` - Authentication
**Purpose**: Manages user authentication state
- Stores current user (name, email, role, balance)
- Handles login/logout
- Persists session (localStorage + cookie)
- Updates user info

**Key Functions**:
- `login(role)` - Logs in user with specific role
- `logout()` - Clears session and redirects
- `updateUser(updates)` - Updates user info

#### `src/lib/api.ts` - API Client
**Purpose**: Centralized API functions (currently mock)
- All data fetching functions in one place
- Simulates network latency
- Easy to swap with real API later

**Example Functions**:
```typescript
api.fetchDeals()        // Get deals for shoppers
api.fetchCampaigns()    // Get campaigns for brands
api.fetchPendingReviews() // Get reviews for admin
```

#### `src/lib/types.ts` - Type Definitions
**Purpose**: TypeScript type definitions for all data structures
- Ensures type safety
- Prevents bugs from wrong data
- Auto-completion in IDE

**Key Types**:
- `AuthUser` - Logged in user
- `Deal` - Product with cashback
- `Campaign` - Brand's review campaign
- `PendingReview` - Review awaiting approval
- `PurchaseHistory` - Shopper's purchases
- `Wallet` - User's wallet balance

### Page Files Explained

#### Shopper Pages

**`src/app/feed/page.tsx`** - Deals Feed
- Shows all products with 100% cashback
- Grid layout with product cards
- Each card has: image, name, price, marketplace, "Get Deal" button
- Clicking "Get Deal" opens marketplace link

**`src/app/user/page.tsx`** - User Dashboard
- Overview of shopper's activity
- Shows: total earnings, pending cashback, purchase timeline
- Links to other user pages

**`src/app/user/wallet/page.tsx`** - Wallet Page
- Shows wallet balance
- Pending vs withdrawable cash
- Withdrawal form (UPI/bank)
- Transaction history

**`src/app/upload/page.tsx`** - Upload Proof
- Form to upload:
  - Order screenshot
  - Review screenshot
  - Review link
- Submits to admin for verification

#### Brand Pages

**`src/app/dashboard/page.tsx`** - Brand Dashboard
- Overview of all campaigns
- Analytics widgets
- Budget summary
- Recent reviews

**`src/app/dashboard/create-campaign/page.tsx`** - Create Campaign
- Multi-step wizard:
  1. Select product
  2. Set budget
  3. Define requirements
  4. Launch campaign
- Creates new campaign

**`src/app/brand/reviews/page.tsx`** - Review Pipeline
- Shows all reviews for brand's products
- Filter by status (pending/approved/rejected)
- Review details and metrics

#### Admin Pages

**`src/app/admin/verifier/page.tsx`** - Verification Tool
- Shows pending reviews
- Admin can:
  - View order screenshot
  - View review screenshot
  - Check review link
  - Approve or reject
- Most important admin page!

**`src/app/admin/payouts/page.tsx`** - Payout Management
- List of withdrawal requests
- Process payouts
- Update status (pending → processing → completed)

### Component Files Explained

#### Layout Components

**`components/layout/site-header.tsx`** - Main Header
- Logo and navigation
- User menu dropdown
- Mobile hamburger menu
- Different for each role

**`components/layout/feed-header.tsx`** - Feed Header
- Simplified header for feed page
- Mobile-optimized
- User avatar and menu

**`components/layout/site-footer.tsx`** - Footer
- Company links
- Social media icons
- Legal links
- Hidden on auth/feed pages

#### Section Components

**`components/sections/user/user-overview.tsx`** - User Dashboard Card
- Shows earnings summary
- Quick stats (total earned, pending, withdrawn)
- Visual cards with icons

**`components/sections/brand/create-campaign-wizard.tsx`** - Campaign Wizard
- Multi-step form
- Step 1: Product selection
- Step 2: Budget setup
- Step 3: Requirements
- Step 4: Review and launch

**`components/sections/admin/verifier-screen.tsx`** - Verification Screen
- Main admin tool
- Shows pending review details
- Side-by-side comparison
- Approve/reject buttons

#### UI Components

**`components/ui/stat-card.tsx`** - Statistics Card
- Reusable card for displaying stats
- Icon, title, value, trend
- Used throughout dashboards

**`components/ui/status-badge.tsx`** - Status Badge
- Color-coded status indicators
- "Pending", "Approved", "Rejected", etc.
- Small, reusable component

### Utility Files

#### `src/lib/mock-data.ts` - Mock Data Generator
**Purpose**: Generates fake data for development
- Uses Faker.js to create realistic data
- Products, users, campaigns, reviews
- Seeded for consistent data

#### `src/lib/analytics.ts` - Analytics Utilities
**Purpose**: Calculates analytics metrics
- Sentiment totals
- Order status grouping
- Velocity index
- Used in dashboards

#### `src/lib/constants.ts` - Constants
**Purpose**: App-wide constants
- Country list
- Navigation links
- Service highlights
- Reusable values

### Provider Files

#### `src/providers/query-provider.tsx` - React Query Setup
**Purpose**: Configures React Query for data fetching
- Sets up QueryClient
- Configures caching
- Wraps app for data fetching

#### `src/contexts/AnimationContext.tsx` - Animation Control
**Purpose**: Controls animations across app
- Triggers graph animations
- Manages animation state
- Used for landing page effects

### Store Files

#### `src/store/use-ui-store.ts` - UI State
**Purpose**: Global UI state (Zustand)
- Mobile menu open/closed
- Selected country
- Lightweight state management

### Mock Files

#### `src/mocks/handlers.ts` - API Mock Handlers
**Purpose**: MSW handlers for mocking API
- Intercepts API calls
- Returns mock data
- Simulates real API behavior

#### `src/mocks/browser.ts` - MSW Browser Setup
**Purpose**: Sets up Mock Service Worker in browser
- Initializes MSW
- Registers handlers
- Only runs in development

## 🛠️ Getting Started

### Prerequisites
- Node.js 20+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd orm-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:4000](http://localhost:4000)

### Available Scripts

- `npm run dev` - Start development server on port 4000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Pages & Routes

### Public Pages
- `/` - Landing page with hero, features, and CTA
- `/login` - Login page (Shoppers/Brands)
- `/signup` - Signup page (Shoppers/Brands)
- `/how-it-works` - How the platform works (for brands)
- `/for-sellers` - Information page for brands

### Shopper Pages
- `/feed` - Browse deals with 100% cashback
- `/user` - Shopper dashboard
- `/user/purchases` - Purchase history
- `/user/purchases/track` - Track purchases
- `/user/reviews` - Review history
- `/user/wallet` - Wallet and earnings
- `/user/payments` - Payment status
- `/upload` - Upload proof of purchase and review
- `/profile` - Edit profile

### Brand Pages
- `/dashboard` - Brand dashboard
- `/dashboard/create-campaign` - Create new campaign
- `/dashboard/products` - Product management
- `/dashboard/analytics` - Analytics dashboard
- `/dashboard/reports` - Review reports
- `/dashboard/wallet` - Brand wallet
- `/brand` - Brand portal home
- `/brand/campaigns/create` - Campaign creation
- `/brand/products` - Product management
- `/brand/reviews` - Review pipeline
- `/brand/reports` - Reports
- `/brand/storefront` - Storefront management
- `/brand/budget` - Budget management
- `/brand/orders` - Order tracking
- `/brand/wallet` - Wallet management

### Admin Pages
- `/admin` - Admin dashboard
- `/admin/dashboard` - Master view
- `/admin/verifier` - Review verification tool
- `/admin/review-pipeline` - Review pipeline management
- `/admin/users` - User management
- `/admin/user-activities` - Activity monitoring
- `/admin/payouts` - Payout processing
- `/admin/compliance-monitor` - Compliance monitoring

## 🎨 Design System

### Colors
- Primary: Indigo/Purple gradients
- Accent: Orange/Red gradients
- Background: Slate (50-950)
- Success: Green
- Warning: Yellow
- Error: Red

### Typography
- **Primary Font**: Inter (via Next.js font optimization)
- **Secondary Font**: Poppins

### Components
- Responsive design (mobile-first)
- Modern gradient backgrounds
- Glassmorphism effects
- Smooth animations and transitions
- Particle background effects

## 🔄 Workflow

### Brand Workflow
1. Brand creates campaign → Sets budget and requirements
2. Campaign goes live → Products appear in shopper feed
3. Shoppers purchase products → From marketplaces
4. Shoppers post reviews → Authentic reviews
5. Shoppers upload proof → Order + review screenshots
6. Admin verifies → Checks compliance
7. Brand sees reviews → In dashboard and reports

### Shopper Workflow
1. Browse deals feed → See 100% cashback offers
2. Click "Get Deal" → Redirected to marketplace
3. Purchase product → At full price
4. Receive product → Wait for delivery
5. Post review → Authentic review on marketplace
6. Upload proof → Order screenshot, review screenshot, review link
7. Wait for verification → Admin reviews submission
8. Receive cashback → 100% refund to wallet
9. Withdraw funds → Via UPI or bank transfer

## 🔒 Compliance & Security

- **Marketplace Compliance**: All reviews are from real customers who purchased at full price
- **Verification System**: Multi-layer verification (pre-screening, automated analysis, manual review)
- **Terms of Service**: Compliant with Amazon, Flipkart, Myntra, Nykaa, and other marketplace TOS
- **No Fake Reviews**: No bots, fake accounts, or incentivized reviews that violate policies

## 📊 Data & Analytics

- Real-time campaign performance tracking
- Sentiment analysis (positive/neutral/negative)
- Review growth trends
- Reputation score tracking
- ROI metrics
- Search rank improvements
- Cross-marketplace insights

## 🧪 Development Notes

### Mock Data
- Currently uses mock data via MSW (Mock Service Worker)
- All API calls simulate network latency
- Ready for real API integration

### Authentication
- Mock authentication system
- Role-based routing
- Session persistence
- Ready for JWT/real auth integration

### State Management
- React Context for auth and animations
- Zustand for UI state
- React Query for server state

## 🚧 Future Enhancements

- [ ] Real API integration
- [ ] Real authentication (JWT/OAuth)
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Real-time updates (WebSockets)
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Multi-language support

## 📝 License

This project is private and proprietary.

## 👨‍💻 Development

### Code Style
- TypeScript strict mode
- ESLint with Next.js config
- Consistent component structure
- Reusable UI components

### Best Practices
- Server and Client Components separation
- Type-safe API calls
- Responsive design
- Accessibility considerations
- Performance optimization

## 🧭 How to Read and Understand This Codebase

### Step-by-Step Guide for New Developers

#### 1. **Start with the Entry Point**
```
Read: src/app/layout.tsx
- Understand how the app is structured
- See what providers wrap the app
- Understand global setup
```

#### 2. **Understand Authentication**
```
Read: src/contexts/AuthContext.tsx
- See how login/logout works
- Understand user roles
- See how session is stored

Then: src/middleware.ts
- See how routes are protected
- Understand role-based access
```

#### 3. **Explore Data Flow**
```
Read: src/lib/types.ts
- Understand data structures
- See what data the app uses

Then: src/lib/api.ts
- See how data is fetched
- Understand API structure

Then: src/lib/mock-data.ts
- See what fake data looks like
- Understand data generation
```

#### 4. **Study Page Structure**
```
Start with: src/app/page.tsx (Home page)
- See how pages are structured
- Understand component composition

Then: src/app/feed/page.tsx (Simple page)
- See a straightforward page example

Then: src/app/user/page.tsx (Complex page)
- See how data is fetched
- Understand component usage
```

#### 5. **Learn Component Patterns**
```
Read: src/components/ui/stat-card.tsx
- Simple, reusable component
- Good example of component structure

Then: src/components/sections/user/user-overview.tsx
- More complex component
- Uses data fetching
- Shows component composition
```

#### 6. **Understand State Management**
```
Read: src/contexts/AuthContext.tsx
- React Context example

Read: src/store/use-ui-store.ts
- Zustand example

Read: src/providers/query-provider.tsx
- React Query setup
```

### 🎯 Common Patterns in This Codebase

#### Pattern 1: Page with Data Fetching
```typescript
// Most pages follow this pattern:
export default async function Page() {
  // 1. Fetch data (server component)
  const data = await api.fetchData()
  
  // 2. Pass to components
  return (
    <Layout>
      <Component data={data} />
    </Layout>
  )
}
```

#### Pattern 2: Client Component with State
```typescript
"use client" // Must add this for interactivity

export function Component() {
  // 1. Use hooks
  const [state, setState] = useState()
  const { user } = useAuth()
  
  // 2. Handle events
  const handleClick = () => { ... }
  
  // 3. Return JSX
  return <div onClick={handleClick}>...</div>
}
```

#### Pattern 3: Form Component
```typescript
export function Form() {
  const [formData, setFormData] = useState({})
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    await api.submitForm(formData)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
      />
      <button type="submit">Submit</button>
    </form>
  )
}
```

### 🔍 How to Find What You're Looking For

#### Want to change the header?
→ `src/components/layout/site-header.tsx`

#### Want to add a new page?
→ Create `src/app/your-page/page.tsx`

#### Want to change authentication?
→ `src/contexts/AuthContext.tsx`

#### Want to add a new data type?
→ `src/lib/types.ts`

#### Want to change API calls?
→ `src/lib/api.ts`

#### Want to modify a dashboard?
→ `src/components/sections/[role]/[component].tsx`

### 📝 Code Conventions

1. **File Naming**
   - Components: `kebab-case.tsx` (e.g., `user-overview.tsx`)
   - Pages: `page.tsx` (Next.js convention)
   - Types: `types.ts`

2. **Component Structure**
   ```typescript
   // 1. Imports
   import ...
   
   // 2. Types/Interfaces
   type Props = { ... }
   
   // 3. Component
   export function Component({ prop }: Props) {
     // 4. Hooks
     const [state, setState] = useState()
     
     // 5. Functions
     const handleClick = () => { ... }
     
     // 6. Return
     return <div>...</div>
   }
   ```

3. **Styling**
   - Use Tailwind classes
   - Mobile-first approach
   - Consistent spacing (p-4, p-6, etc.)

4. **TypeScript**
   - Always type props
   - Use interfaces for objects
   - Use types for unions

### 🐛 Debugging Tips

1. **Check Browser Console**
   - Errors appear here
   - Check Network tab for API calls

2. **Check Terminal**
   - Next.js errors show here
   - Build errors appear here

3. **Use React DevTools**
   - Inspect component state
   - See props and hooks

4. **Check Middleware**
   - If page redirects unexpectedly
   - Check `src/middleware.ts`

5. **Check Auth Context**
   - If login doesn't work
   - Check `src/contexts/AuthContext.tsx`

### 🚀 Next Steps for Development

1. **Understand the Flow**
   - Read this README completely
   - Explore the file structure
   - Run the app and click around

2. **Make Small Changes**
   - Change text in a component
   - Modify styles
   - Add a new button

3. **Understand Data Flow**
   - Trace how data moves
   - From API → Component → Screen

4. **Build New Features**
   - Start with simple pages
   - Add components gradually
   - Test as you go

## 🔬 Algorithms & Technical Implementation

### 📊 Analytics Algorithms

#### 1. **Utilization Calculation Algorithm**
**Location**: `src/lib/analytics.ts`

```typescript
function calculateUtilization(productId: string) {
  const product = productMap.get(productId);
  if (!product) return 0;
  return Math.min((product.reviews / product.targetReviews) * 100, 100);
}
```

**Purpose**: Calculates how close a product is to its review target
**Algorithm**: 
- Divides current reviews by target reviews
- Multiplies by 100 for percentage
- Caps at 100% using `Math.min()`
- **Time Complexity**: O(1) - Constant time lookup
- **Space Complexity**: O(1)

**Use Case**: Shows progress bars in brand dashboard

#### 2. **Order Status Grouping Algorithm**
**Location**: `src/lib/analytics.ts`

```typescript
function groupOrdersByStatus(items: OrderItem[]) {
  return items.reduce<Record<string, number>>((acc, item) => {
    acc[item.status] = (acc[item.status] ?? 0) + 1;
    return acc;
  }, {});
}
```

**Purpose**: Groups orders by status and counts them
**Algorithm**: 
- Uses `reduce()` to iterate through orders
- Creates accumulator object with status as key
- Increments count for each status
- **Time Complexity**: O(n) - Linear time, n = number of orders
- **Space Complexity**: O(k) - k = number of unique statuses

**Use Case**: Dashboard statistics showing "awaiting", "verified", "reimbursed" counts

#### 3. **Sentiment Aggregation Algorithm**
**Location**: `src/lib/analytics.ts`

```typescript
function sentimentTotals(data: SentimentInsight[]) {
  return data.reduce(
    (totals, insight) => {
      totals.positive += insight.positive;
      totals.neutral += insight.neutral;
      totals.negative += insight.negative;
      return totals;
    },
    { positive: 0, neutral: 0, negative: 0 }
  );
}
```

**Purpose**: Aggregates sentiment data across all marketplaces
**Algorithm**: 
- Reduces array of sentiment insights into single totals object
- Sums positive, neutral, and negative counts
- **Time Complexity**: O(n) - n = number of marketplaces
- **Space Complexity**: O(1) - Fixed size output

**Use Case**: Brand dashboard showing overall sentiment across all marketplaces

#### 4. **Velocity Index Algorithm**
**Location**: `src/lib/analytics.ts`

```typescript
function velocityIndex(items: OrderItem[] = orderItems) {
  const recent = items.filter((item) => {
    const diff = Date.now() - new Date(item.submittedAt).getTime();
    return diff < 1000 * 60 * 60 * 24 * 7; // 7 days
  });
  return recent.length / Math.max(products.length, 1);
}
```

**Purpose**: Calculates review submission velocity (reviews per product in last 7 days)
**Algorithm**: 
- Filters items submitted in last 7 days
- Divides recent count by total products
- **Time Complexity**: O(n) - n = number of orders
- **Space Complexity**: O(m) - m = recent items (worst case n)

**Use Case**: Shows how fast reviews are coming in

#### 5. **Average Rating Calculation**
**Location**: `src/components/sections/brand/live-analytics-board.tsx`

```typescript
const averageRating = campaigns.length > 0
  ? (campaigns.reduce((sum, c) => sum + c.averageRating, 0) / campaigns.length).toFixed(1)
  : "0.0";
```

**Purpose**: Calculates average rating across all campaigns
**Algorithm**: 
- Sums all campaign ratings
- Divides by number of campaigns
- Rounds to 1 decimal place
- **Time Complexity**: O(n) - n = number of campaigns
- **Space Complexity**: O(1)

**Use Case**: Brand dashboard showing overall average rating

#### 6. **Data Structure: Product Map**
**Location**: `src/lib/analytics.ts`

```typescript
export const productMap: Map<string, Product> = new Map(
  products.map((product) => [product.id, product])
);
```

**Purpose**: Creates hash map for O(1) product lookup
**Algorithm**: 
- Converts array to Map data structure
- Key: product ID, Value: Product object
- **Time Complexity**: O(n) for creation, O(1) for lookup
- **Space Complexity**: O(n)

**Use Case**: Fast product lookups instead of O(n) array searches

#### 7. **Review Request Queue Algorithm**
**Location**: `src/lib/analytics.ts`

```typescript
export const reviewRequestQueue: Map<string, ReviewRequest[]> = reviewRequests.reduce(
  (queue, request) => {
    const existing = queue.get(request.productId) ?? [];
    queue.set(request.productId, [...existing, request]);
    return queue;
  },
  new Map<string, ReviewRequest[]>()
);
```

**Purpose**: Groups review requests by product ID
**Algorithm**: 
- Creates Map with productId as key
- Each value is array of review requests for that product
- **Time Complexity**: O(n) - n = number of review requests
- **Space Complexity**: O(n)

**Use Case**: Efficiently find all review requests for a specific product

### 🔐 Authentication & Login Mechanisms

#### **Complete Authentication Flow**

**1. Login Process** (`src/app/(auth)/login/page.tsx`)

```typescript
// Step 1: User selects role (Shopper or Brand)
const [activeTab, setActiveTab] = useState<"shoppers" | "brands">("shoppers");

// Step 2: Form submission
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  
  // Step 3: Simulate API call (500ms delay)
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // Step 4: Call AuthContext login
  if (activeTab === "shoppers") {
    login("user");  // Logs in as shopper
  } else {
    login("brand"); // Logs in as brand
  }
};
```

**2. AuthContext Login Function** (`src/contexts/AuthContext.tsx`)

```typescript
const login = (role: UserRole) => {
  // Step 1: Get mock user for role
  const mockUser = mockUsers[role];
  
  // Step 2: Set React state
  setUser(mockUser);
  
  // Step 3: Persist to localStorage
  const userJson = JSON.stringify(mockUser);
  localStorage.setItem("auth_user", userJson);
  
  // Step 4: Set cookie for middleware
  document.cookie = `auth_user=${userJson}; path=/; max-age=86400`;
  
  // Step 5: Redirect based on role
  if (role === "user") router.push("/user");
  else if (role === "brand") router.push("/dashboard");
  else if (role === "admin") router.push("/admin");
};
```

**3. Session Persistence**

**Storage Mechanisms**:
- **localStorage**: Persists across browser sessions
- **Cookie**: Used by middleware for server-side route protection
- **React State**: For immediate UI updates

**Session Duration**: 
- Cookie expires after 24 hours (`max-age=86400`)
- localStorage persists until manually cleared

**4. Signup Process** (`src/app/(auth)/signup/page.tsx`)

```typescript
const handleSubmit = async () => {
  // Step 1: Validate form fields
  if (activeTab === "shoppers") {
    if (!shopperName || !shopperEmail || !shopperPassword) {
      alert("Please fill in all fields");
      return;
    }
  } else {
    if (!brandName || !brandEmail || !brandPhone || !brandPassword) {
      alert("Please fill in all fields");
      return;
    }
  }
  
  // Step 2: Simulate API call (1000ms delay)
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Step 3: Show success message
  alert("Account Created Successfully!");
  
  // Step 4: Auto-login user
  if (activeTab === "shoppers") {
    login("user");
  } else {
    login("brand");
  }
};
```

**5. Logout Process**

```typescript
const logout = () => {
  // Step 1: Clear React state
  setUser(null);
  
  // Step 2: Remove from localStorage
  localStorage.removeItem("auth_user");
  
  // Step 3: Redirect to login
  router.push("/login");
};
```

**6. Route Protection Algorithm** (`src/middleware.ts`)

```typescript
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Step 1: Check if public route
  if (publicRoutes.some((route) => pathname === route || pathname.startsWith(route))) {
    return NextResponse.next(); // Allow access
  }
  
  // Step 2: Get user from cookie
  const authCookie = request.cookies.get("auth_user");
  let user = null;
  if (authCookie) {
    try {
      user = JSON.parse(authCookie.value);
    } catch (e) {
      // Invalid cookie
    }
  }
  
  // Step 3: Check authentication
  if (!user && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  // Step 4: Check admin routes
  if (pathname.startsWith("/admin")) {
    if (!user || user.role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  
  // Step 5: Check role-based access
  if (user) {
    const allowedRoutes = roleRoutes[user.role] || [];
    const hasAccess = allowedRoutes.some((route) => pathname.startsWith(route));
    
    if (!hasAccess && !publicRoutes.includes(pathname)) {
      // Redirect to default route for role
      const defaultRoute = user.role === "user" ? "/feed" 
                        : user.role === "brand" ? "/dashboard"
                        : "/admin/dashboard";
      return NextResponse.redirect(new URL(defaultRoute, request.url));
    }
  }
  
  return NextResponse.next();
}
```

**Algorithm Complexity**:
- **Time Complexity**: O(n) where n = number of routes to check
- **Space Complexity**: O(1)

### 🔄 State Management Patterns

#### **1. React Context Pattern** (Global State)

**AuthContext**:
```typescript
// Provider wraps entire app
<AuthProvider>
  <App />
</AuthProvider>

// Any component can access
const { user, login, logout } = useAuth();
```

**AnimationContext**:
```typescript
// Controls animations globally
const { triggerGraphAnimation, shouldAnimate } = useAnimation();
```

#### **2. Zustand Pattern** (UI State)

```typescript
// Lightweight state management
const { mobileNavOpen, toggleMobileNav } = useUIStore();
```

**Use Cases**:
- Mobile menu open/closed
- Selected country
- UI preferences

#### **3. React Query Pattern** (Server State)

```typescript
// Automatic caching, refetching, loading states
const { data, isLoading, error } = useQuery({
  queryKey: ['campaigns'],
  queryFn: () => api.fetchCampaigns()
});
```

**Features**:
- Automatic caching (1 minute stale time)
- Background refetching
- Loading/error states
- Request deduplication

### 📈 Data Processing Algorithms

#### **1. Filtering Algorithms**

**Active Campaigns Filter**:
```typescript
const activeCampaigns = campaigns.filter((c) => c.status === "active");
```
- **Time Complexity**: O(n)
- **Use Case**: Show only active campaigns in dashboard

**Pending Reviews Filter**:
```typescript
const pendingReviews = reviews.filter((r) => r.status === "pending");
```
- **Time Complexity**: O(n)
- **Use Case**: Admin verifier screen

**Recent Items Filter** (7 days):
```typescript
const recent = items.filter((item) => {
  const diff = Date.now() - new Date(item.submittedAt).getTime();
  return diff < 1000 * 60 * 60 * 24 * 7; // 7 days in milliseconds
});
```
- **Time Complexity**: O(n)
- **Use Case**: Show recent activity

#### **2. Aggregation Algorithms**

**Sum Calculation**:
```typescript
const total = items.reduce((sum, item) => sum + item.amount, 0);
```
- **Time Complexity**: O(n)
- **Use Case**: Calculate total earnings, total budget

**Count Calculation**:
```typescript
const count = items.filter(item => item.status === "pending").length;
```
- **Time Complexity**: O(n)
- **Use Case**: Count pending reviews, active campaigns

**Average Calculation**:
```typescript
const average = items.reduce((sum, item) => sum + item.value, 0) / items.length;
```
- **Time Complexity**: O(n)
- **Use Case**: Average rating, average cashback

#### **3. Data Transformation Algorithms**

**Array to Map Conversion**:
```typescript
const productMap = new Map(
  products.map((product) => [product.id, product])
);
```
- **Time Complexity**: O(n)
- **Space Complexity**: O(n)
- **Use Case**: Fast O(1) product lookups

**Grouping Algorithm**:
```typescript
const grouped = items.reduce((acc, item) => {
  const key = item.category;
  if (!acc[key]) acc[key] = [];
  acc[key].push(item);
  return acc;
}, {});
```
- **Time Complexity**: O(n)
- **Space Complexity**: O(n)
- **Use Case**: Group orders by status, reviews by product

### 🎯 Component Algorithms

#### **1. Verifier Screen Algorithm** (`src/components/sections/admin/verifier-screen.tsx`)

**Purpose**: Efficiently process reviews one at a time

```typescript
// State management
const [currentIndex, setCurrentIndex] = useState(0);
const [processedReviews, setProcessedReviews] = useState<Set<string>>(new Set());

// Get current review
const currentReview = reviews[currentIndex];

// Count pending
const pendingCount = reviews.filter((r) => !processedReviews.has(r.id)).length;

// Approve action
const handleApprove = () => {
  setProcessedReviews((prev) => new Set([...prev, currentReview.id]));
  if (currentIndex < reviews.length - 1) {
    setCurrentIndex((prev) => prev + 1);
  }
};
```

**Algorithm Features**:
- Uses Set for O(1) lookup of processed reviews
- Incremental processing (one at a time)
- Prevents duplicate processing
- **Time Complexity**: O(1) for approve/reject, O(n) for pending count
- **Space Complexity**: O(n) for Set storage

#### **2. Campaign Wizard Algorithm** (`src/components/sections/brand/create-campaign-wizard.tsx`)

**Purpose**: Multi-step form with validation

```typescript
// Step management
const [currentStep, setCurrentStep] = useState<Step>(1);

// Navigation
const nextStep = () => {
  if (currentStep < 3) {
    setCurrentStep((prev) => (prev + 1) as Step);
  }
};

const prevStep = () => {
  if (currentStep > 1) {
    setCurrentStep((prev) => (prev - 1) as Step);
  }
};
```

**Algorithm Features**:
- Linear step progression
- Validation at each step
- State preservation across steps
- **Time Complexity**: O(1) for navigation

### 🔒 Security Mechanisms

#### **1. Route Protection**
- **Middleware-based**: Runs on every request
- **Role-based**: Different routes for different roles
- **Cookie-based**: Server-side authentication check
- **Redirect logic**: Unauthorized users redirected to login

#### **2. Data Validation**
- **Form validation**: Required fields checked before submission
- **Type safety**: TypeScript ensures type correctness
- **Input sanitization**: Ready for XSS prevention (currently mock)

#### **3. Session Management**
- **Cookie expiration**: 24-hour session timeout
- **localStorage backup**: Persists across browser sessions
- **State synchronization**: React state, localStorage, and cookie kept in sync

### ⚡ Performance Optimizations

#### **1. Data Structure Optimizations**
- **Map for O(1) lookups**: `productMap` instead of O(n) array searches
- **Set for O(1) membership**: `processedReviews` Set for fast checks
- **Memoization ready**: Components can use `useMemo` for expensive calculations

#### **2. React Optimizations**
- **Server Components**: Default in Next.js 13+ (faster initial load)
- **Code Splitting**: Automatic with Next.js App Router
- **Image Optimization**: Next.js Image component with lazy loading
- **Query Caching**: React Query caches API responses

#### **3. Network Optimizations**
- **Request Deduplication**: React Query prevents duplicate requests
- **Stale-While-Revalidate**: Shows cached data while fetching fresh
- **Background Refetching**: Updates data in background

### 📐 Data Structures Used

#### **1. Arrays**
- Products, campaigns, reviews, orders
- **Operations**: map, filter, reduce, find
- **Use Cases**: Lists, collections, iterations

#### **2. Maps**
- `productMap`: Product ID → Product object
- `reviewRequestQueue`: Product ID → ReviewRequest[]
- **Operations**: get, set, has
- **Use Cases**: Fast lookups, grouping

#### **3. Sets**
- `processedReviews`: Set of processed review IDs
- **Operations**: add, has, delete
- **Use Cases**: Membership testing, deduplication

#### **4. Objects/Records**
- User data, campaign data, analytics results
- **Operations**: Property access, spread operator
- **Use Cases**: Structured data, configuration

### 🧮 Mathematical Calculations

#### **1. Percentage Calculations**
```typescript
// Utilization percentage
const utilization = (current / target) * 100;

// Cashback percentage
const cashbackPercent = (cashbackAmount / price) * 100;
```

#### **2. Average Calculations**
```typescript
// Average rating
const avgRating = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;

// Average across campaigns
const avg = campaigns.reduce((sum, c) => sum + c.value, 0) / campaigns.length;
```

#### **3. Time-based Calculations**
```typescript
// Days since submission
const daysDiff = (Date.now() - new Date(submittedAt).getTime()) / (1000 * 60 * 60 * 24);

// Recent items (last 7 days)
const isRecent = diff < 7;
```

#### **4. Budget Calculations**
```typescript
// Total budget
const totalBudget = campaigns.reduce((sum, c) => sum + c.totalBudget, 0);

// Budget utilization
const utilized = campaigns.reduce((sum, c) => sum + c.budgetPerReview * c.reviewsReceived, 0);
const utilizationPercent = (utilized / totalBudget) * 100;
```

### 🔄 Async Operations & Promises

#### **1. API Simulation**
```typescript
const simulateLatency = async <T,>(payload: T, wait = 300): Promise<T> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(payload), wait);
  });
```

**Purpose**: Simulates network latency for realistic development
**Delay Times**:
- Default: 300ms
- Login: 500ms
- Signup: 1000ms
- Profile update: 800ms

#### **2. Promise Patterns**
```typescript
// Sequential
const data1 = await api.fetchData1();
const data2 = await api.fetchData2();

// Parallel
const [data1, data2] = await Promise.all([
  api.fetchData1(),
  api.fetchData2()
]);
```

### 📊 Summary of Algorithms

| Algorithm | Location | Complexity | Purpose |
|-----------|----------|------------|---------|
| Utilization Calculation | `analytics.ts` | O(1) | Calculate review progress |
| Order Grouping | `analytics.ts` | O(n) | Group orders by status |
| Sentiment Aggregation | `analytics.ts` | O(n) | Sum sentiment across marketplaces |
| Velocity Index | `analytics.ts` | O(n) | Calculate review velocity |
| Route Protection | `middleware.ts` | O(n) | Protect routes by role |
| Product Map | `analytics.ts` | O(n) creation, O(1) lookup | Fast product lookups |
| Review Queue | `analytics.ts` | O(n) | Group reviews by product |
| Verifier Processing | `verifier-screen.tsx` | O(1) per action | Process reviews efficiently |
| Filtering | Various | O(n) | Filter data by criteria |
| Aggregation | Various | O(n) | Sum, count, average |

### 🎓 Technical Stack Summary

**Frontend Framework**: Next.js 16 (App Router)
- Server Components (default)
- Client Components (`"use client"`)
- Automatic code splitting
- Image optimization

**State Management**:
- React Context (Auth, Animation)
- Zustand (UI state)
- React Query (Server state)

**Data Structures**:
- Arrays (lists, collections)
- Maps (fast lookups)
- Sets (membership testing)
- Objects (structured data)

**Algorithms**:
- Filtering (O(n))
- Aggregation (O(n))
- Grouping (O(n))
- Lookup optimization (O(1) with Maps)

**Performance**:
- O(1) lookups with Maps
- O(n) filtering/aggregation
- Caching with React Query
- Lazy loading with Next.js

---

**Built with ❤️ using Next.js, React, and TypeScript**
