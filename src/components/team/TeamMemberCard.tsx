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
        <Stack
            spacing={1.25}
            alignItems="center"
            sx={{
                width: "100%",
                minHeight: 128, // reserve consistent space for name + chips
                justifyContent: "flex-start",
            }}
        >
            <Typography
                variant="h6"
                fontWeight={800}
                textAlign="center"
                sx={{
                    lineHeight: 1.15,
                    minHeight: 52, // keeps 1-line and 2-line names aligned
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {member.name}
            </Typography>

            <Stack
                spacing={1}
                alignItems="center"
                justifyContent="flex-start"
                sx={{
                    width: "100%",
                    minHeight: 64, // keeps chip area consistent
                }}
            >
                <Chip
                    label={member.degree || " "}
                    size="medium"
                    sx={{
                        borderRadius: 999,
                        fontWeight: 600,
                        bgcolor: "action.hover",
                        height: "auto",
                        maxWidth: 190,
                        "& .MuiChip-label": {
                            display: "block",
                            whiteSpace: "normal",
                            textAlign: "center",
                            lineHeight: 1.3,
                            paddingTop: "6px",
                            paddingBottom: "6px",
                            paddingLeft: "14px",
                            paddingRight: "14px",
                        },
                    }}
                />

                <Box sx={{ minHeight: 32, display: "flex", alignItems: "center" }}>
                    {member.minor ? (
                        <Chip
                            label={`Minor: ${member.minor}`}
                            size="small"
                            variant="outlined"
                            sx={{
                                borderRadius: 999,
                                fontWeight: 500,
                            }}
                        />
                    ) : (
                        // invisible placeholder so cards without a minor stay aligned
                        <Box sx={{ height: 32, visibility: "hidden" }}>
                            <Chip label="Minor placeholder" size="small" />
                        </Box>
                    )}
                </Box>
            </Stack>
        </Stack>
    );
}

function TeamMemberLinks({ member }: TeamMemberLinksProps) {
    return (
        <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            sx={{
                minHeight: 40,
            }}
        >
            <Box sx={{ width: 40, height: 40 }}>
                {member.links?.linkedin && (
                    <Tooltip title="LinkedIn">
                        <IconButton
                            component="a"
                            href={member.links.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${member.name} LinkedIn`}
                            sx={{
                                width: 40,
                                height: 40,
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
            </Box>

            <Box sx={{ width: 40, height: 40 }}>
                {member.links?.github && (
                    <Tooltip title="GitHub">
                        <IconButton
                            component="a"
                            href={member.links.github}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${member.name} GitHub`}
                            sx={{
                                width: 40,
                                height: 40,
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
            </Box>

            <Box sx={{ width: 40, height: 40 }}>
                {member.links?.email && (
                    <Tooltip title="Email">
                        <IconButton
                            component="a"
                            href={`mailto:${member.links.email}`}
                            aria-label={`${member.name} email`}
                            sx={{
                                width: 40,
                                height: 40,
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
            </Box>
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
                display: "flex",
                flexDirection: "column",
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

            <CardContent
                sx={{
                    px: 3,
                    pb: 3,
                    pt: 0,
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                }}
            >
                <Stack
                    alignItems="center"
                    sx={{
                        mt: -5,
                        height: "100%",
                    }}
                >
                    <TeamMemberAvatar member={member} />

                    <Box sx={{ mt: 2, width: "100%" }}>
                        <TeamMemberIdentity member={member} />
                    </Box>

                    <Divider flexItem sx={{ my: 2 }} />

                    <Box
                        sx={{
                            mt: "auto",
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <TeamMemberLinks member={member} />
                    </Box>
                </Stack>
            </CardContent>
        </TeamMemberCardShell>
    );
}
