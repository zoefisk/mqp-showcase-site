import * as React from "react";
import { TEAM_MEMBERS } from "@/data/team";
import PageHeader from "@/components/layout/PageHeader";
import { TeamMemberCardGrid } from "@/components/features/team/TeamMemberCard";
import PageShell from "@/components/layout/PageShell";

export default function MeetTheTeamPage() {
    return (
            <>
                    <PageHeader
                        eyebrowLabel={"OUR TEAM"}
                        mainHeader={"Meet The Team"}
                        subheader={"Get to know the people behind the project."}
                    />

                    <TeamMemberCardGrid members={TEAM_MEMBERS} />
            </>
    );
}
