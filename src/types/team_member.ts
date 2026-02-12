export type TeamMember = {
    id: string;
    name: string;
    degree: string;
    minor?: string;
    blurb: string;
    photoSrc?: string;
    links: {
        linkedin?: string;
        github?: string;
    };
};