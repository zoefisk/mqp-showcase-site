"use client";

import * as React from "react";
import { CodeBlock, dracula } from "react-code-blocks";
import {IconButton, Tooltip, Typography} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditNoteSharp from "@mui/icons-material/EditNoteSharp";

type EditableCodeProps = {
    code: string;
    language?: string;
    showLineNumbers?: boolean;
};

export default function EditableCode({
    code,
    language = "python",
    showLineNumbers = false,
}: EditableCodeProps) {

    const [copied, setCopied] = React.useState(false);
    const [edited, setEdited] = React.useState(false);
    const [currentCode, setCurrentCode] = React.useState(code);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const handleEdit = async () => {
        if (edited) {
            setEdited(false);
        } else {
            setEdited(true);
        }

        setEdited((prev) => !prev);
    };

    return (
        <>
            <Tooltip title={copied ? "Copied!" : "Copy code"}>
                <IconButton onClick={handleCopy} size="small">
                    {copied ? (
                        <>
                            <CheckIcon fontSize="small" color="success" />
                            <Typography variant="body2" sx={{ ml: 0.5 }}>Copied!</Typography>
                        </>
                    ) : (
                        <>
                            <ContentCopyIcon fontSize="small" />
                            <Typography variant="body2" sx={{ ml: 0.5 }}>Copy code</Typography>
                        </>
                    )}
                </IconButton>
            </Tooltip>

            <Tooltip title={edited ? "Editing" : "Edit"}>
                <IconButton onClick={handleEdit} size="small">
                    {edited ? (
                        <>
                            <CheckIcon fontSize="small" color="success" />
                            <Typography variant="body2" sx={{ ml: 0.5 }}>Editing</Typography>
                        </>
                    ) : (
                        <>
                            <EditNoteSharp fontSize="small" />
                            <Typography variant="body2" sx={{ ml: 0.5 }}>Edit</Typography>
                        </>
                    )}
                </IconButton>
            </Tooltip>
            <CodeBlock
                text={code}
                language={language}
                showLineNumbers={showLineNumbers}
                theme={dracula}
            />
        </>
    );
}