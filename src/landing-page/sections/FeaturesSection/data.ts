import type { LucideIcon } from "lucide-react";
import { Calendar, MessageSquare, Users } from "lucide-react";
import type { BaseCardColor } from "../../../design-system";

interface FeatureData {
    icon: LucideIcon;
    title: string;
    text: string;
}

export interface FeatureItem {
    color: BaseCardColor;
    data: FeatureData;
}

export const data: FeatureItem[] = [
    {
        color: "green-light",
        data: {
            icon: Calendar,
            title: "Easy Scheduling",
            text: "Book coaching sessions at your convenience. View available time slots and reserve your preferred session instantly.",
        },
    },
    {
        color: "sunglow-light",
        data: {
            icon: MessageSquare,
            title: "Personalized Sessions",
            text: "Set agendas for your sessions and take notes. Get tailored guidance that fits your specific needs and goals.",
        },
    },
    {
        color: "primary-light",
        data: {
            icon: Users,
            title: "Expert Coaches",
            text: "Connect with experienced professionals who are committed to helping you succeed and reach your potential.",
        },
    },
];
