import { Platform } from "../../components/Platform";
import { UserRole } from "../../types/roles";

export const StudentPlatform: React.FC = () => {
    return <Platform role={UserRole.STUDENT} />;
};
