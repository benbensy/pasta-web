import { Box, Stack, Typography } from "@mui/material";
import { Highlight, PrismTheme, themes } from "prism-react-renderer";

interface Props {
  code: string;
  lang: string;
  theme?: PrismTheme;
}

export function CodeViewer({ code, lang, theme = themes.oneLight }: Props) {
  return (
    <Highlight theme={theme} code={code} language={lang}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <Typography component={"pre"} fontFamily='"IBM Plex Mono"' width="100%">
          {tokens.map((line, i) => (
            <Stack
            direction='row'
              key={i}
              {...getLineProps({ line })}
              fontFamily="inherit"
              sx={{
                wordBreak: "break-all",
                wordWrap: "break-word",
                width: "inherit",
                whiteSpace: "pre-wrap",
              }}
              spacing={1}
            >
              {/* <Typography
                component="div"
                fontFamily="inherit"
                sx={{ userSelect: "none" }}
                textAlign='right'
                
              >
                {i + 1}
              </Typography> */}
              <Box flex={1}>
                {line.map((token, key) => (
                  <Typography
                    component="span"
                    key={key}
                    {...getTokenProps({ token })}
                    fontFamily="inherit"
                  />
                ))}
              </Box>
            </Stack>
          ))}
        </Typography>
      )}
    </Highlight>
  );
}
