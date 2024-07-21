import { Box } from "@mui/material";
import { CodeViewer } from "../components/CodeViewer";

const text = `import { Box } from "@mui/material";
import { CodeViewer } from "../components/CodeViewer";

export function Preview() {
    return <Box>
        <CodeViewer code="" />
    </Box>
}`

export function Preview() {
    return <Box>
        <CodeViewer code={text} lang="tsx" />
    </Box>
}