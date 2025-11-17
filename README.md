# Coach Connect UI

A modern web application for connecting students with expert coaches, enabling seamless booking management, session scheduling, and personalized coaching experiences.

## 🌐 Live Project

-   **Live Application**: [https://coachconnect.space](https://coachconnect.space)
-   **Backend Repository**: [coach-connect-api](https://github.com/aliramazon/coach-connect-api)

## 🚦 Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/aliramazon/coach-connect-ui.git
cd coach-connect-ui
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000
```

**Note**: Make sure the backend API is running. See the [backend repository](https://github.com/aliramazon/coach-connect-api) for setup instructions.

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🚀 Features

### For Students

-   **Browse Coaches**: View available coaches with ratings and availability
-   **Book Sessions**: Schedule coaching sessions with optional agenda
-   **Manage Bookings**: View, cancel, or report no-shows for your bookings
-   **Session Notes**: Add and update notes for completed sessions
-   **Rate Sessions**: Provide satisfaction ratings for completed bookings

### For Coaches

-   **Manage Availability**: Set and manage your available time slots
-   **View Bookings**: See all your scheduled sessions
-   **Session Management**: Cancel bookings or report no-shows
-   **Session Notes**: Add and update notes for coaching sessions
-   **Rate Sessions**: Provide satisfaction ratings for completed bookings

### For Admins

-   **Impersonation**: Impersonate users for support purposes ✅
-   **Manage Bookings**: View and manage all bookings across the platform (Not implemented)
-   **Manage Students**: View and manage student accounts (Not implemented)
-   **Manage Coaches**: View and manage coach accounts with ratings (Not implemented)
    m

## 🛠️ Tech Stack

### Frontend

-   **Framework**: React 19 with TypeScript
-   **Build Tool**: Vite
-   **Routing**: React Router v7
-   **State Management**: Zustand
-   **Styling**: Emotion (CSS-in-JS) + CSS Modules
-   **Icons**: Lucide React
-   **Notifications**: React Hot Toast
-   **Date Handling**: date-fns, react-datepicker
-   **Calendar**: react-big-calendar

### Backend

-   **Repository**: [coach-connect-api](https://github.com/aliramazon/coach-connect-api)
-   **Runtime**: Node.js
-   **Language**: TypeScript
-   **Framework**: Express.js
-   **ORM**: Prisma
-   **Database**: PostgreSQL
-   **Authentication**: JWT (JSON Web Tokens) with CSRF protection
-   **Validation**: Zod
-   **Scheduling**: node-cron
-   **Database Connection**: Prisma Accelerate

## 🏗️ System Architecture

### High-Level Flow

1. **Coaches** create availability slots (any hour time blocks)
2. **Students** browse and book available slots
3. When a slot is booked, both parties can view each other's contact information
4. After the session, bookings are automatically marked as `COMPLETED` (via backend cron job)
5. **Students and coaches** can submit reviews with satisfaction scores (1-5) and notes
6. **Coach statistics** are automatically updated based on completed bookings and reviews

For complete backend architecture and database design, refer to the [backend repository](https://github.com/aliramazon/coach-connect-api).

## 🏗️ Frontend Architecture & Data Flow

### Authentication Flow

The authentication system uses a **route-based approach** with conditional data fetching to optimize performance:

```
┌─────────────────────────────────────────────────────────┐
│                    App Component                        │
│              (No authentication check)                   │
│              Just renders <Outlet />                    │
└─────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┴─────────────────┐
        │                                     │
┌───────▼────────┐                  ┌───────▼────────┐
│  PublicRoute   │                  │ ProtectedRoute │
│                │                  │                │
│ • Landing Page │                  │ • useGetMe()   │
│ • Login Page   │                  │   (fetches     │
│                │                  │    user data)  │
│ • useGetMe()   │                  │                │
│   (only if     │                  │ • Checks role  │
│   redirectIf   │                  │ • Redirects if  │
│   Authenticated│                  │   unauthorized │
│   = true)      │                  │                │
└────────────────┘                  └────────────────┘
```

### State Management (Zustand)

The application uses **Zustand** for global state management with **domain-specific stores**. Each store manages a specific domain of the application:

### Reusable HTTP Request Utility

**Centralized HTTP Client** (`httpRequest`):

```typescript
// Located: src/app/utils/http-request.ts

export const httpRequest = async <T>(
    url: `/${string}`,
    options?: RequestInit
): Promise<T>
```

**Usage Pattern:**

```typescript
// Service Layer Example
// Located: src/app/services/booking/create.ts

export const create = (
    slotId: string,
    type: BookingTypeType,
    agenda?: string
): Promise<CreateBookingResponse> => {
    return httpRequest<CreateBookingResponse>("/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotId, type, agenda }),
    });
};
```

**Benefits:**

-   Single point of configuration for API calls
-   Consistent error handling across all requests
-   Automatic security token management
-   Type-safe responses

### Custom Hooks Pattern

Hooks encapsulate **business logic**, **state management**, and **API integration**. They follow a consistent pattern:

**Hook Responsibilities:**

1. **State Management**: Loading, error states
2. **Service Integration**: Calls service layer functions
3. **Store Updates**: Updates global Zustand stores (optimistic updates)
4. **User Feedback**: Toast notifications for success/error
5. **Callbacks**: Optional success/error callbacks for component-specific logic

**Example Hooks:**

-   `useCreateBooking` - Creates booking, updates coach slots store
-   `useGetBookings` - Fetches bookings, updates bookings store
-   `useCreateOrUpdateCallReview` - Creates/updates review, updates booking store
-   `useUpdateBookingStatus` - Updates booking status, updates bookings store
-   `useGetMe` - Fetches user data, updates user store
-   `useCoachesSlots` - Fetches coach availability, updates coaches slots store

### Complete Data Flow Example

**Scenario: Student creates a booking**

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Component Layer                                          │
│    CreateBookingModal.tsx                                   │
│    User clicks "Book" button                                │
│    → Calls: createBooking(slotId, type, agenda)             │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. Hook Layer                                               │
│    useCreateBooking.tsx                                     │
│    • Sets isSubmitting = true                               │
│    • Calls: bookingService.create()                         │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. Service Layer                                            │
│    bookingService.create()                                  │
│    • Builds request payload                                 │
│    • Calls: httpRequest("/bookings", {...})                 │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. HTTP Request Utility                                     │
│    httpRequest()                                            │
│    • Reads CSRF token from useUserStore                     │
│    • Adds "x-csrf-token" header                             │
│    • Sends POST request with credentials: "include"         │
│    • Handles response/error                                 │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. API Backend                                              │
│    POST /api/bookings                                       │
│    • Validates request                                      │
│    • Creates booking                                        │
│    • Returns success response                               │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│ 6. Hook Success Handler                                     │
│    useCreateBooking.tsx                                     │
│    • Shows success toast                                    │
│    • Updates useCoachesSlotsStore (markSlotAsUnavailable)   │
│    • Calls onSuccess callback                               │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│ 7. Component Update                                         │
│    CreateBookingModal.tsx                                   │
│    • Modal closes (onSuccess callback)                      │
│    • CoachesAvailabilityContainer re-renders                │
│    • Slot marked as unavailable (from store)                │
└─────────────────────────────────────────────────────────────┘
```
