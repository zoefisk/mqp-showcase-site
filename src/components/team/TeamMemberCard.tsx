"use client";

import * as React from "react";
import {
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    IconButton,
    Stack,
    Typography,
    Tooltip,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import TeamAvatar from "./TeamAvatar";
import type { TeamMember } from "@/types/team_member";

type Props = {
    member: TeamMember;
};

type TeamMemberLinksProps = {
    member: TeamMember;
};

type TeamMemberIdentityProps = {
    member: TeamMember;
};

type TeamMemberBioProps = {
    blurb: string;
};

function TeamMemberHeader({ member }: { member: TeamMember }) {
    const from = member.gradient?.from ?? "rgba(25,118,210,0.16)";
    const to = member.gradient?.to ?? "rgba(156,39,176,0.10)";

    return (
        <Box
            sx={{
                height: 88,
                background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
                borderBottom: "1px solid",
                borderColor: "divider",
            }}
        />
    );
}

function TeamMemberAvatar({ member }: Props) {
    return (
        <Box
            sx={{
                p: 0.5,
                borderRadius: "50%",
                bgcolor: "background.paper",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
            }}
        >
            <TeamAvatar name={member.name} src={member.photoSrc} />
        </Box>
    );
}

function TeamMemberIdentity({ member }: TeamMemberIdentityProps) {
    return (
        <Stack spacing={0.75} alignItems="center">
            <Typography
                variant="h6"
                fontWeight={800}
                textAlign="center"
                sx={{ lineHeight: 1.15 }}
            >
                {member.name}
            </Typography>

            <Stack
                direction="row"
                spacing={1}
                useFlexGap
                flexWrap="wrap"
                justifyContent="center"
            >
                {member.degree && (
                    <Chip
                        label={member.degree}
                        size="medium"
                        sx={{
                            borderRadius: 999,
                            fontWeight: 600,
                            bgcolor: "action.hover",

                            height: "auto",                // allow chip to grow
                            maxWidth: 180,                 // 👈 controls when it wraps (adjust this)

                            "& .MuiChip-label": {
                                display: "block",
                                whiteSpace: "normal",      // 👈 enables wrapping
                                textAlign: "center",
                                lineHeight: 1.3,
                                paddingTop: "4px",
                                paddingBottom: "4px",
                            },
                        }}
                    />
                )}

                {member.minor && (
                    <Chip
                        label={`Minor: ${member.minor}`}
                        size="small"
                        variant="outlined"
                        sx={{
                            borderRadius: 999,
                            fontWeight: 500,
                        }}
                    />
                )}
            </Stack>
        </Stack>
    );
}

function TeamMemberBio({ blurb }: TeamMemberBioProps) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            sx={{
                lineHeight: 1.7,
                minHeight: 88,
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
            }}
        >
            {blurb}
        </Typography>
    );
}

function TeamMemberLinks({ member }: TeamMemberLinksProps) {
    const hasLinks = member.links?.linkedin || member.links?.github || member.links?.email;

    if (!hasLinks) return null;

    return (
        <Stack direction="row" spacing={1}>
            {member.links?.linkedin && (
                <Tooltip title="LinkedIn">
                    <IconButton
                        component="a"
                        href={member.links.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${member.name} LinkedIn`}
                        sx={{
                            bgcolor: "action.hover",
                            border: "1px solid",
                            borderColor: "divider",
                            "&:hover": {
                                bgcolor: "primary.50",
                                borderColor: "primary.light",
                            },
                        }}
                    >
                        <LinkedInIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            )}

            {member.links?.github && (
                <Tooltip title="GitHub">
                    <IconButton
                        component="a"
                        href={member.links.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${member.name} GitHub`}
                        sx={{
                            bgcolor: "action.hover",
                            border: "1px solid",
                            borderColor: "divider",
                            "&:hover": {
                                bgcolor: "action.selected",
                                borderColor: "text.primary",
                            },
                        }}
                    >
                        <GitHubIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            )}

            {member.links?.email && (
                <Tooltip title="Email">
                    <IconButton
                        component="a"
                        href={`mailto:${member.links.email}`}
                        aria-label={`${member.name} email`}
                        sx={{
                            bgcolor: "action.hover",
                            border: "1px solid",
                            borderColor: "divider",
                            "&:hover": {
                                bgcolor: "secondary.50",
                                borderColor: "secondary.light",
                            },
                        }}
                    >
                        <EmailOutlinedIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            )}
        </Stack>
    );
}

function TeamMemberCardShell({ children }: React.PropsWithChildren) {
    return (
        <Card
            elevation={0}
            sx={{
                height: "100%",
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                background:
                    "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(250,250,252,1) 100%)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
                overflow: "hidden",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 14px 30px rgba(0,0,0,0.08)",
                    borderColor: "primary.light",
                },
            }}
        >
            {children}
        </Card>
    );
}

export default function TeamMemberCard({ member }: Props) {
    return (
        <TeamMemberCardShell>
            <TeamMemberHeader member={member} />

            <CardContent sx={{ px: 3, pb: 3, pt: 0 }}>
                <Stack spacing={2} alignItems="center" sx={{ mt: -5 }}>
                    <TeamMemberAvatar member={member} />
                    <TeamMemberIdentity member={member} />
                    <Divider flexItem />
                    <TeamMemberBio blurb={member.blurb} />
                    <TeamMemberLinks member={member} />
                </Stack>
            </CardContent>
        </TeamMemberCardShell>
    );
}
