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

/**
 * Team member card system
 *
 * This file contains the complete UI for presenting team members in a responsive
 * card-based layout. The card and grid are colocated because the grid is only
 * used to render TeamMemberCard instances and does not currently provide value
 * as a standalone reusable layout primitive.
 *
 * Exports:
 * - TeamMemberCard: renders a single team member
 * - TeamMemberCardGrid: renders a responsive grid of team member cards
 *
 * Internal composition:
 * - TeamMemberCardShell: outer container handling borders, background, and hover state
 * - TeamMemberHeader: decorative gradient banner
 * - TeamMemberAvatar: styled wrapper around TeamAvatar
 * - TeamMemberIdentity: name, degree, and optional minor
 * - TeamMemberLinks: external contact/profile links
 *
 * Design goals:
 * - Maintain consistent visual alignment across cards
 * - Handle incomplete member data gracefully
 * - Keep the layout readable across screen sizes
 * - Support accessibility through labels and tooltips
 */

type TeamMemberCardProps = {
    member: TeamMember;
};

type TeamMemberCardGridProps = {
    members: TeamMember[];
};

type TeamMemberLinksProps = {
    member: TeamMember;
};

type TeamMemberIdentityProps = {
    member: TeamMember;
};

/**
 * Decorative top banner for the card.
 * Falls back to default gradient values when custom member colors are absent.
 */
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

/**
 * Avatar presentation wrapper.
 * Adds a subtle frame and shadow around the shared TeamAvatar component.
 */
function TeamMemberAvatar({ member }: TeamMemberCardProps) {
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

/**
 * Identity block for the team member.
 * Uses reserved space so cards remain aligned even when text wraps
 * or optional fields are missing.
 */
function TeamMemberIdentity({ member }: TeamMemberIdentityProps) {
    return (
        <Stack
            spacing={1.25}
            alignItems="center"
            sx={{
                width: "100%",
                minHeight: 128,
                justifyContent: "flex-start",
            }}
        >
            <Typography
                variant="h6"
                fontWeight={800}
                textAlign="center"
                sx={{
                    lineHeight: 1.15,
                    minHeight: 52,
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
                sx={{
                    width: "100%",
                    minHeight: 64,
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
                            px: 1.75,
                            py: 0.75,
                        },
                    }}
                />

                <Box sx={{ minHeight: 32, display: "flex", alignItems: "center" }}>
                    {member.minor ? (
                        <Chip
                            label={`Minor: ${member.minor}`}
                            size="small"
                            variant="outlined"
                            sx={{ borderRadius: 999, fontWeight: 500 }}
                        />
                    ) : (
                        <Box sx={{ height: 32, visibility: "hidden" }}>
                            <Chip label="Minor placeholder" size="small" />
                        </Box>
                    )}
                </Box>
            </Stack>
        </Stack>
    );
}

/**
 * External profile and contact links.
 * Fixed-size icon slots help preserve consistent footer alignment.
 */
function TeamMemberLinks({ member }: TeamMemberLinksProps) {
    return (
        <Stack direction="row" spacing={1} justifyContent="center" sx={{ minHeight: 40 }}>
            <Box sx={{ width: 40, height: 40 }}>
                {member.links?.linkedin && (
                    <Tooltip title="LinkedIn">
                        <IconButton
                            component="a"
                            href={member.links.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
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
                            rel="noopener noreferrer"
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

/**
 * Shared outer shell for the card.
 */
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

/**
 * Renders a single team member card.
 *
 * @param member Team member data object
 */
export function TeamMemberCard({ member }: TeamMemberCardProps) {
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
                        flex: 1,
                        width: "100%",
                    }}
                >
                    <TeamMemberAvatar member={member} />

                    <Box sx={{ mt: 2, width: "100%" }}>
                        <TeamMemberIdentity member={member} />
                    </Box>

                    <Box
                        sx={{
                            mt: "auto",
                            width: "100%",
                        }}
                    >
                        <Divider sx={{ mb: 2, mt: 2 }} />

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <TeamMemberLinks member={member} />
                        </Box>
                    </Box>
                </Stack>
            </CardContent>
        </TeamMemberCardShell>
    );
}

/**
 * Renders a responsive grid of team member cards.
 *
 * Layout behavior:
 * - xs: 1 column
 * - sm: 2 columns
 * - md+: 4 columns
 *
 * @param members Array of team member objects to display
 */
export function TeamMemberCardGrid({ members }: TeamMemberCardGridProps) {
    return (
        <Box
            sx={{
                display: "grid",
                gap: 3,
                gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(4, 1fr)",
                },
            }}
        >
            {members.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
            ))}
        </Box>
    );
}

export default TeamMemberCard;
