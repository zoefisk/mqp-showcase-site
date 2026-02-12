import Image from "next/image";
import {Box, Container, Divider, Stack, Typography} from "@mui/material";
import TeamGrid from "@/components/team/TeamGrid";
import {TEAM_MEMBERS} from "@/data/team";
import * as React from "react";

export default function Home() {
  return (
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: { xs: 6, sm: 10 } }}>
        <Container maxWidth="md">
          <Stack spacing={3} alignItems="center" mb={6}>
            <Typography variant="h3" fontWeight={700}>
              About This Project
            </Typography>
            <Typography color="text.secondary" textAlign="center">
              INSERT ABSTRACT HERE
            </Typography>
            <Divider sx={{ width: "100%" }} />
          </Stack>

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
