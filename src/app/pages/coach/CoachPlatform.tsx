import { UserRole } from "../../types/roles";
import { Platform } from "../components/Platform";

export const CoachPlatform = () => {
    return <Platform role={UserRole.COACH} />;
};
