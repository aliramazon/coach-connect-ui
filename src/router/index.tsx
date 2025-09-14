import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
} from "react-router-dom";
import { App } from "../App";

import { Availability } from "../pages/coach/Availability";
import { Bookings as CoachBookings } from "../pages/coach/Bookings";
import { Bookings as StudentBookings } from "../pages/student/Booking";

import { Login } from "../pages/auth/Login";
import { CoachPlatform } from "../pages/coach/CoachPlatform";
import { Coaches } from "../pages/student/Coaches";
import { StudentPlatform } from "../pages/student/StudentPlatform";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<App />} />
            <Route path="login" element={<Login />} />
            <Route path="student" element={<StudentPlatform />}>
                <Route index element={<Navigate to="bookings" />} />
                <Route path="coaches" element={<Coaches />} />
                <Route path="bookings" element={<StudentBookings />} />
            </Route>
            <Route path="coach" element={<CoachPlatform />}>
                <Route index element={<Navigate to="booking" />} />
                <Route path="availability" element={<Availability />} />
                <Route path="bookings" element={<CoachBookings />} />
            </Route>
        </>
    )
);
