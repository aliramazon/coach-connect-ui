import { Platform } from "../../components/Platform";
import { UserRole } from "../../types/roles";

export const CoachPlatform = () => {
    return <Platform role={UserRole.COACH} />;
};
