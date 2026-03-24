import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import Typography from "@mui/material/Typography";

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: (props) => <Typography variant="h3" fontWeight={700} gutterBottom {...props} />,
        h2: (props) => <Typography variant="h4" fontWeight={600} gutterBottom sx={{ mt: 4 }} {...props} />,
        p: (props) => <Typography sx={{ mb: 2 }} {...props} />,
        a: (props) => (
            <Link href={props.href ?? "#"} target="_blank" rel="noreferrer">
                {props.children}
            </Link>
        ),
        ...components,
    };
}
