export type TeamMember = {
    id: string;
    name: string;
    degree: string;
    minor?: string;
    blurb: string;
    photoSrc?: string;
    gradient?: {
        from: string;
        to: string;
    };
    links: {
        linkedin?: string;
        github?: string;
        email?: string;
    };
};
