import { TeamMember } from "@/types/team_member";

export const TEAM_MEMBERS: TeamMember[] = [
    {
        id: "morgan",
        name: "Morgan Vasiliou",
        degree: "Bioinformatics & Computational Biology",
        minor: "Data Science",
        blurb: "",
        photoSrc: "/team-images/morgan.png",
        gradient: {
            from: "rgba(0, 150, 136, 0.25)", // teal
            to: "rgba(76, 175, 80, 0.25)", // green
        },
        links: {
            linkedin: "https://www.linkedin.com/in/morgan-vasiliou-b75091245",
            github: "https://github.com/morganvazy",
            email: "morgan.vasiliou@gmail.com",
        },
    },
    {
        id: "skyler",
        name: "Skyler Lin",
        degree: "Computer Science",
        minor: "Data Science",
        blurb: "",
        photoSrc: "/team-images/skyler.jpg",
        gradient: {
            from: "rgba(63, 81, 181, 0.25)", // indigo
            to: "rgba(0, 188, 212, 0.25)", // cyan
        },
        links: {
            linkedin: "https://linkedin.com",
            github: "https://github.com",
        },
    },
    {
        id: "zach",
        name: "Zachary Medailleu",
        degree: "Computer Science",
        blurb: "",
        photoSrc: "/team-images/zach.png",
        gradient: {
            from: "rgba(255, 152, 0, 0.25)", // orange
            to: "rgba(244, 67, 54, 0.25)", // red
        },
        links: {
            linkedin: "https://www.linkedin.com/in/zachary-medailleu-340036249/",
            github: "https://github.com/zmedailleu",
            email: "zacharymedailleu@gmail.com",
        },
    },
    {
        id: "zoe",
        name: "Zoë Fisk",
        degree: "Computer Science",
        blurb: "",
        photoSrc: "/team-images/zoe.jpg",
        gradient: {
            from: "rgba(33, 150, 243, 0.25)", // blue
            to: "rgba(156, 39, 176, 0.25)", // purple
        },
        links: {
            linkedin: "https://www.linkedin.com/in/zjfisk/",
            github: "https://github.com/zoefisk",
            email: "zoejewelfisk@gmail.com",
        },
    },
];
