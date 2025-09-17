import { UserRole } from "../../types/roles";
import { Platform } from "../components/Platform";

export const StudentPlatform: React.FC = () => {
    return <Platform role={UserRole.STUDENT} />;
};
