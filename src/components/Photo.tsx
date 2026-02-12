import * as React from "react";
import { Box } from "@mui/material";

interface GroupPhotoProps {
  imageSrc: string;
  altText: string;
  centered?: string;
}

const Photo: React.FC<GroupPhotoProps> = ({ imageSrc, altText, centered = true }) => {
        return (
            <Box sx={{ display: "flex", justifyContent: centered ? "center" : "flex-end", mb: 4 }}>
                <img
                  src={imageSrc}
                  alt={altText}
                  style={{ maxWidth: "100%", borderRadius: "8px" }}
                />
          </Box>
        );
      };

export default Photo;