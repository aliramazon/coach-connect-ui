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

import { AdminPlatform } from "../pages/admin/AdminPlatform";
import { Bookings as AdminBookings } from "../pages/admin/Bookings";
import { Coaches as AdminCoaches } from "../pages/admin/Coaches";
import { Students as AdminStudents } from "../pages/admin/Students";

import { Login } from "../pages/auth/Login";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<App />} />
            <Route path="login" element={<Login />} />
            <Route path="student" element={<StudentPlatform />}>
                <Route index element={<Navigate to="bookings" />} />
                <Route path="coaches" element={<StudentCoaches />} />
                <Route path="bookings" element={<StudentBookings />} />
            </Route>
            <Route path="coach" element={<CoachPlatform />}>
                <Route index element={<Navigate to="bookings" />} />
                <Route path="availability" element={<Availability />} />
                <Route path="bookings" element={<CoachBookings />} />
            </Route>
            <Route path="admin" element={<AdminPlatform />}>
                <Route index element={<Navigate to="bookings" />} />
                <Route path="coaches" element={<AdminCoaches />} />
                <Route path="bookings" element={<AdminBookings />} />
                <Route path="students" element={<AdminStudents />} />
            </Route>
        </>
    )
);
