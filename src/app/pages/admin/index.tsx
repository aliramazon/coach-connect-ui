import React from "react";
import { UserRole } from "../../types/roles";
import { Platform } from "../components/Platform";

export const AdminPlatform: React.FC = () => {
    return <Platform role={UserRole.ADMIN} />;
};
