import Image from "next/image";
import {Box, Container, Divider, Stack, Typography} from "@mui/material";
import TeamGrid from "@/components/team/TeamGrid";
import {TEAM_MEMBERS} from "@/data/team";
import * as React from "react";
import PageHeader from "@/components/PageHeader";

export default function Home() {
  return (
      <Box sx={{ minHeight: "100vh", py: { xs: 6, sm: 10 } }}>
        <Container maxWidth="md">
          <PageHeader
              eyebrowLabel={"A Declarative Specification for Clinical RRNL Visualizations"}
              mainHeader={"About This Project"}
              subheader={"For patients with chronic diseases, reference range number lines (RRNLs) can be useful tools in monitoring their health. Existing studies on RRNLs explore how design influences the patient’s understanding of health status, risk, and resulting behaviors. Despite their usefulness in healthcare contexts, there are few visualization tools for creating RRNLs. In this paper, we introduce a new domain-specific language (DSL) that streamlines the creation of reference range number lines. This DSL is based on examples of RRNLs in literature, and supports the reproduction of these graphs with the input of a few data points, balancing usability and customization. Future iterations may support more expansive customization, including visual embellishments."}
          />

          <Typography color="text.secondary" textAlign="center" marginBottom={2}>
            <b>More details about this project</b>
          </Typography>
          <Typography marginBottom={8}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Typography>

          <Typography color="text.secondary" textAlign="center" marginBottom={2}>
            <b>Project Resources</b>
          </Typography>
          <Typography marginBottom={8}>
            - Resource 1: Description and link
            <br />
            - Resource 2: Description and link
            <br />
            - Resource 3: Description and link
          </Typography>


          <Typography color="text.secondary" textAlign="center" marginBottom={2}>
            <b>About Worcester Polytechnic Institute</b>
          </Typography>
          <Typography>
            Worcester Polytechnic Institute (WPI) is a top-tier, STEM-focused university with an R1 research classification and global leadership in project-based learning. Founded in 1865, WPI’s distinctive approach integrates classroom theory with real-world practice, preparing students to tackle critical challenges through inclusive education, impactful projects, and interdisciplinary research. With more than 70 bachelor’s, master’s, and doctoral degree programs across 18 academic departments and over 50 global project centers, WPI advances knowledge and innovation in fields such as life sciences, smart technologies, advanced materials and manufacturing, and global innovation. Learn more at www.wpi.edu.
          </Typography>
        </Container>
      </Box>
  );
}
