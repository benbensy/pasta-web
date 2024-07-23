import { Box, Stack, Text } from "@chakra-ui/react";
import { Highlight, PrismTheme, themes } from "prism-react-renderer";

interface Props {
  content: string;
  lang: string;
  theme?: PrismTheme;
}

export function ContentViewer({
  content,
  lang,
  theme = themes.oneLight,
}: Props) {
  return (
    <Box p={2} border='1px dashed'>
      <Highlight theme={theme} code={content} language={lang}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <Text as="pre" fontFamily='"IBM Plex Mono"' width="100%">
            {tokens.map((line, i) => (
              <Stack
                direction="row"
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
                    <Text
                      as="span"
                      key={key}
                      {...getTokenProps({ token })}
                      fontFamily="inherit"
                    />
                  ))}
                </Box>
              </Stack>
            ))}
          </Text>
        )}
      </Highlight>
    </Box>
  );
}
