import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
} from "react-router-dom";
import { App } from "../App";

import { Availability } from "../pages/coach/Availability";
import { Bookings as CoachBookings } from "../pages/coach/Bookings";
import { CoachPlatform } from "../pages/coach/CoachPlatform";

import { Bookings as StudentBookings } from "../pages/student/Bookings";
import { Coaches as StudentCoaches } from "../pages/student/Coaches";
import { StudentPlatform } from "../pages/student/StudentPlatform";

import { AdminPlatform } from "../pages/admin";
import { Bookings as AdminBookings } from "../pages/admin/Bookings";
import { Coaches as AdminCoaches } from "../pages/admin/Coaches";
import { Students as AdminStudents } from "../pages/admin/Students";

import { Login } from "../pages/auth/Login";
import { UserRole } from "../types/roles";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

// eslint-disable-next-line react-refresh/only-export-components
const Home = () => (
    <section>
        <h1>Welcome to Coach Connect</h1>
        <p>This is the marketing site.</p>
    </section>
);

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            {/* Public Routes */}
            <Route
                index
                element={
                    <PublicRoute redirectIfAuthenticated={false}>
                        <Home />
                    </PublicRoute>
                }
            />
            <Route
                path="login"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />

            {/* Protected Student Routes */}
            <Route
                path="student"
                element={
                    <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
                        <StudentPlatform />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Navigate to="bookings" />} />
                <Route path="coaches" element={<StudentCoaches />} />
                <Route path="bookings" element={<StudentBookings />} />
            </Route>

            {/* Protected Coach Routes */}
            <Route
                path="coach"
                element={
                    <ProtectedRoute allowedRoles={[UserRole.COACH]}>
                        <CoachPlatform />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Navigate to="bookings" />} />
                <Route path="availability" element={<Availability />} />
                <Route path="bookings" element={<CoachBookings />} />
            </Route>

            {/* Protected Admin Routes */}
            <Route
                path="admin"
                element={
                    <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                        <AdminPlatform />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Navigate to="bookings" />} />
                <Route path="coaches" element={<AdminCoaches />} />
                <Route path="bookings" element={<AdminBookings />} />
                <Route path="students" element={<AdminStudents />} />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
    )
);
