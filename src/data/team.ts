import {TeamMember} from "@/types/team_member";

export const TEAM_MEMBERS: TeamMember[] = [
    {
        id: "morgan",
        name: "Morgan",
        degree: "BS",
        minor: "Minor",
        blurb: "Additional text",
        photoSrc: "@/images/morgan.jpg",
        links: {
            linkedin: "https://linkedin.com",
            github: "https://github.com",
        },
    },
    {
        id: "skylar",
        name: "Skylar",
        degree: "BS",
        minor: "Minor",
        blurb: "Additional text",
        photoSrc: "/team/skylar.jpg",
        links: {
            linkedin: "https://linkedin.com",
            github: "https://github.com",
        },
    },
    {
        id: "zach",
        name: "Zach",
        degree: "BS",
        minor: "Minor",
        blurb: "Additional text",
        photoSrc: "/team/zach.jpg",
        links: {
            linkedin: "https://linkedin.com",
            github: "https://github.com",
        },
    },
    {
        id: "zoe",
        name: "Zoë Fisk",
        degree: "Computer Science BS",
        blurb: "AI: Zoë is a senior majoring in CS with a passion for data visualization and human-computer interaction. She has experience in web development and UI/UX design, and is excited to apply her skills to create intuitive and engaging visualizations for this project.",
        photoSrc: "/team/zoe.jpg",
        links: {
            linkedin: "https://www.linkedin.com/in/zjfisk/",
            github: "https://github.com/zoefisk",
        },
    },
];
