import React from "react";
import { Platform } from "../../components/Platform";
import { UserRole } from "../../types/roles";

export const AdminPlatform: React.FC = () => {
    return <Platform role={UserRole.ADMIN} />;
};
