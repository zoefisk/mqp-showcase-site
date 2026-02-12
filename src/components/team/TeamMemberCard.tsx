"use client";

import * as React from "react";
import { Card, CardContent, IconButton, Stack, Typography } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TeamAvatar from "./TeamAvatar";
import type { TeamMember } from "@/types/team_member";

type Props = {
    member: TeamMember;
};

export default function TeamMemberCard({ member }: Props) {
    return (
        <Card variant="outlined" sx={{ height: "100%", borderRadius: 3 }}>
            <CardContent>
                <Stack spacing={1.5} alignItems="center">
                    <TeamAvatar name={member.name} src={member.photoSrc} />

                    <Typography variant="h6" fontWeight={700}>
                        {member.name}
                    </Typography>

                    {member.degree && <Typography variant="body2">— {member.degree}</Typography>}
                    {member.minor && <Typography variant="body2">— {member.minor}</Typography>}

                    {member.blurb && (
                        <Typography variant="body2" color="text.secondary" textAlign="center">
                            {member.blurb}
                        </Typography>
                    )}

                    {(member.links?.linkedin || member.links?.github) && (
                        <Stack direction="row" spacing={1}>
                            {member.links?.linkedin && (
                                <IconButton
                                    component="a"
                                    href={member.links.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    size="small"
                                    aria-label={`${member.name} LinkedIn`}
                                >
                                    <LinkedInIcon fontSize="small" />
                                </IconButton>
                            )}

                            {member.links?.github && (
                                <IconButton
                                    component="a"
                                    href={member.links.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    size="small"
                                    aria-label={`${member.name} GitHub`}
                                >
                                    <GitHubIcon fontSize="small" />
                                </IconButton>
                            )}
                        </Stack>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
}
