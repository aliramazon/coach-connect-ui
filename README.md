# Coach Connect UI

A modern web application for connecting students with expert coaches, enabling seamless booking management, session scheduling, and personalized coaching experiences.

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

-   **Manage Bookings**: View and manage all bookings across the platform
-   **Manage Students**: View and manage student accounts
-   **Manage Coaches**: View and manage coach accounts with ratings
-   **Impersonation**: Impersonate users for support purposes

### General Features

-   **Landing Page**: Marketing site with feature highlights
-   **Authentication**: Secure login with session management
-   **Role-Based Access Control**: Protected routes based on user roles
-   **Real-time Updates**: Zustand store for state management
-   **Responsive Design**: Modern UI with custom design system

## 🛠️ Tech Stack

-   **Framework**: React 19 with TypeScript
-   **Build Tool**: Vite
-   **Routing**: React Router v7
-   **State Management**: Zustand
-   **Styling**: Emotion (CSS-in-JS) + CSS Modules
-   **Icons**: Lucide React
-   **Notifications**: React Hot Toast
-   **Date Handling**: date-fns, react-datepicker
-   **Calendar**: react-big-calendar

## 📁 Project Structure

```
src/
├── app/                    # Application logic
│   ├── components/         # Shared components (Layout, Platform, Modals)
│   ├── hooks/             # Custom React hooks
│   │   ├── auth/         # Authentication hooks
│   │   ├── booking/      # Booking management hooks
│   │   ├── call-review/  # Review/rating hooks
│   │   ├── coaches-slots/# Coach availability hooks
│   │   ├── slot/         # Time slot management hooks
│   │   └── user/         # User management hooks
│   ├── pages/            # Page components
│   │   ├── admin/        # Admin pages
│   │   ├── auth/         # Authentication pages
│   │   ├── coach/        # Coach pages
│   │   ├── common/       # Shared booking components
│   │   └── student/      # Student pages
│   ├── services/          # API service layer
│   ├── store/            # Zustand stores
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── design-system/         # Reusable UI components
│   ├── Avatar/
│   ├── Badge/
│   ├── Button/
│   ├── Card/
│   ├── Input/
│   ├── Modal/
│   ├── Rating/
│   ├── Select/
│   ├── Table/
│   └── ... (30+ components)
├── landing-page/         # Marketing landing page
│   ├── components/       # Landing page components
│   └── sections/        # Landing page sections
└── router/              # Route configuration
    ├── ProtectedRoute.tsx
    └── PublicRoute.tsx
```

## 🚦 Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
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

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📜 Available Scripts

-   `npm run dev` - Start development server
-   `npm run build` - Build for production
-   `npm run preview` - Preview production build
-   `npm run lint` - Run ESLint

## 🏗️ Architecture & Data Flow

### Authentication Flow

The authentication system uses a **route-based approach** with lazy loading to optimize performance:

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

**Key Design Decisions:**

-   ✅ `useGetMe` is called **only** in `ProtectedRoute` and `PublicRoute` (when `redirectIfAuthenticated={true}`)
-   ✅ Public routes like landing page (`redirectIfAuthenticated={false}`) don't make authentication calls
-   ✅ Hook checks if user exists in store before making API call (prevents duplicate requests)
-   ✅ Authentication errors on public routes don't show toasts (better UX on login page)
-   ✅ Session validation happens only when needed

**Authentication Hook (`useGetMe`):**

```typescript
// Located: src/app/hooks/user/useGetMe.tsx

// Responsibilities:
// - Fetches user data from /users/me endpoint
// - Handles impersonation state (admin feature)
// - Manages CSRF token for API security
// - Updates user store on success
// - Handles errors gracefully (no toasts on public routes)
// - Optimizes by checking store first (avoids duplicate calls)
```

### State Management (Zustand)

The application uses **Zustand** for global state management with **domain-specific stores**. Each store manages a specific domain of the application:

#### 1. **User Store** (`useUserStore`)

```typescript
// Located: src/app/store/useUserStore.tsx

{
    // State
    user: User | null; // Authenticated user
    impersonatedUser: User | null; // Admin impersonation target
    csrfToken: string | null; // CSRF token for API requests
    isImpersonating: boolean; // Impersonation flag
    isProfileLoading: boolean; // Loading state for profile

    // Actions
    setUser(user); // Set authenticated user
    setImpersonatedUser(user); // Set impersonated user (admin)
    clearImpersonatedUser(); // Stop impersonation
    setCsrfToken(token); // Set CSRF token from API
    logout(); // Clear all auth state
    getEffectiveUser(); // Returns impersonatedUser || user
}
```

**Usage:** Used across the app for authentication checks, user profile display, and CSRF token management.

#### 2. **Bookings Store** (`useBookingsStore`)

```typescript
// Located: src/app/store/useBookingsStore.tsx

{
  // State
  bookings: Booking[]            // All bookings for current user
  isLoading: boolean              // Loading state
  error: string | null            // Error message

  // Actions
  setBookings(bookings)           // Set all bookings
  clearBookings()                 // Clear bookings
  updateBookingStatus(id, status) // Optimistic update (status change)
  updateBookingReview(id, review) // Update review in booking
}
```

**Usage:** Used in booking pages to display and manage bookings. Supports optimistic updates for better UX.

#### 3. **Coaches Slots Store** (`useCoachesSlotsStore`)

```typescript
// Located: src/app/store/useCoachesSlotsStore.tsx

{
  // State
  coaches: CoachWithSlots[]      // Coaches with their available slots
  currentDate: Date | null       // Currently viewed date
  isLoading: boolean
  error: string | null

  // Actions
  setCoaches(coaches, date)      // Set coaches and date
  clearCoaches()                 // Clear coaches
  markSlotAsUnavailable(slotId)  // Optimistic update when slot is booked
}
```

**Usage:** Used in student coach browsing to display available coaches and their slots. Optimistically updates when a slot is booked.

#### 4. **Slot Store** (`useSlotStore`)

```typescript
// Located: src/app/store/useSlotStore.tsx

{
  // State
  slots: Slot[]                  // Coach's own time slots
  currentDate: Date | null       // Currently viewed date
  isLoading: boolean
  error: string | null

  // Actions
  setSlots(slots, date)          // Set slots for a date
  addSlot(slot)                  // Add new slot (if same date)
  removeSlot(slotId)             // Remove slot
  clearSlots()                   // Clear all slots
  getSortedSlots()               // Returns slots sorted by time
}
```

**Usage:** Used in coach availability management to display and manage their own time slots.

### Reusable HTTP Request Utility

**Centralized HTTP Client** (`httpRequest`):

```typescript
// Located: src/app/utils/http-request.ts

export const httpRequest = async <T>(
    url: `/${string}`,
    options?: RequestInit
): Promise<T>
```

**Key Features:**

-   ✅ **Automatic CSRF Token**: Reads from `useUserStore.getState()` and includes in headers
-   ✅ **Cookie-based Auth**: Uses `credentials: "include"` for session cookies
-   ✅ **Error Handling**: Converts API errors to `ApiError` class with error codes
-   ✅ **Type Safety**: Generic type parameter `<T>` for response typing
-   ✅ **Base URL**: Configurable via `VITE_API_BASE_URL` environment variable
-   ✅ **Centralized**: All API calls go through this utility

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

**Hook Structure:**

```typescript
// Pattern: src/app/hooks/{domain}/{hookName}.tsx

export const useCreateBooking = (options?: UseCreateBookingOptions) => {
    // 1. Local State
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 2. Store Access
    const { markSlotAsUnavailable } = useCoachesSlotsStore();

    // 3. Business Logic Function
    const createBooking = (slotId, type, agenda?) => {
        setIsSubmitting(true);
        setError(null);

        // 4. Service Call
        bookingService
            .create(slotId, type, agenda)
            .then((response) => {
                // 5. Success Handling
                toast.success(response.message);

                // 6. Store Update (Optimistic Update)
                markSlotAsUnavailable(slotId);

                // 7. Callback
                options?.onSuccess?.();
            })
            .catch((err) => {
                // 8. Error Handling
                toast.error(err.message);
                setError(err.message);
                options?.onError?.();
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    // 9. Return API
    return { createBooking, isSubmitting, error };
};
```

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
│    CreateBookingModal.tsx                                    │
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
│    • Adds "x-csrf-token" header                            │
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
│    • Updates useCoachesSlotsStore (markSlotAsUnavailable)  │
│    • Calls onSuccess callback                               │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│ 7. Component Update                                         │
│    CreateBookingModal.tsx                                    │
│    • Modal closes (onSuccess callback)                      │
│    • CoachesAvailabilityContainer re-renders                │
│    • Slot marked as unavailable (from store)                │
└─────────────────────────────────────────────────────────────┘
```

**Key Benefits of This Architecture:**

-   ✅ **Separation of Concerns**: Each layer has a single responsibility
-   ✅ **Reusability**: Hooks can be used across multiple components
-   ✅ **Type Safety**: Full TypeScript coverage from API to UI
-   ✅ **Optimistic Updates**: UI updates immediately, syncs with server
-   ✅ **Error Handling**: Centralized error handling with user-friendly messages
-   ✅ **Testability**: Each layer can be tested independently

### Error Handling

**Custom ApiError Class:**

```typescript
// Located: src/app/utils/api-error.ts

class ApiError extends Error {
    status: number; // HTTP status code
    errorCode: ErrorCode; // "AUTHENTICATION_ERROR", "VALIDATION_ERROR", etc.
    isOperational: boolean; // Whether error is expected/operational
}
```

**Error Flow:**

1. `httpRequest` catches API errors (non-200 responses)
2. Converts to `ApiError` with error code and status
3. Hooks catch `ApiError` and handle based on `errorCode`
4. **Authentication errors** → Trigger logout, redirect to login
5. **Other errors** → Show toast notifications, store in hook state
6. Components can access error state from hooks

**Error Handling Example:**

```typescript
// In useGetMe hook
.catch((err: unknown) => {
    if (err instanceof ApiError) {
        if (err.errorCode === "AUTHENTICATION_ERROR") {
            logout(); // Clear auth state
            // Only show toast if not on public route
            if (!isPublicRoute) {
                toast.error("Session expired, please log in again.");
            }
        } else {
            toast.error(err.message);
            setError(err.message);
        }
    }
});
```

### Service Layer Organization

Services are organized by **domain** (booking, user, slot, call-review, coaches-slots):

```
src/app/services/
├── booking/
│   ├── create.ts           # POST /bookings
│   ├── get-all.ts          # GET /bookings
│   ├── update-status.ts    # PATCH /bookings/:id/status
│   └── index.ts            # Exports bookingService
├── user/
│   ├── get-me.ts           # GET /users/me
│   ├── login.ts            # POST /auth/login
│   └── ...
├── call-review/
│   ├── create-or-update.ts # POST /call-reviews
│   └── index.ts
└── ...
```

**Service Pattern:**

-   Each service file exports a single function
-   Functions use `httpRequest` utility
-   Type-safe request/response interfaces
-   Services are grouped in `index.ts` for easy imports

## 🎨 Key Features

### Booking System

-   Create bookings with optional agenda
-   Multiple booking types support
-   Status management (Active, Completed, Cancelled, No Show)
-   Real-time availability checking
-   Optimistic UI updates

### Review & Rating System

-   Session notes for students and coaches (separate)
-   Satisfaction ratings (1-5 stars) with interactive component
-   Separate review data for students and coaches
-   Reviews linked to bookings

### Coach Discovery

-   Browse coaches with availability
-   View coach ratings (average rating badges)
-   Filter by date
-   Real-time slot availability updates

## 🔐 User Roles

-   **Student**: Book sessions, manage bookings, rate coaches
-   **Coach**: Manage availability, view bookings, rate students
-   **Admin**: Full platform access, user management, impersonation

## 🌐 Environment Variables

Create a `.env` file with:

```env
VITE_API_BASE_URL=your-api-base-url
```

## 📝 Code Style

-   TypeScript for type safety
-   ESLint for code quality
-   Emotion for component styling
-   Functional components with hooks
-   Custom hooks for reusable logic
-   Service layer for API calls
-   Zustand for global state

## 🤝 Contributing

1. Follow the existing code structure and patterns
2. Use TypeScript for all new code
3. Follow the design system for UI components
4. Write reusable hooks for business logic
5. Maintain type safety throughout
6. Use the service layer for all API calls
7. Update Zustand stores for global state

## 📄 License

Private project
