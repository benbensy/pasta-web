import { Box, Button, Stack, Typography } from "@mui/material";
import { CodeViewer } from "../components/CodeViewer";
import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { getPasta, GetPastaData } from "../data/pasta";

function useData(id: string) {
  const [data, setData] = useState<GetPastaData | null>(null);

  useEffect(() => {
    (async () => {
      setData(await getPasta(id));
    })();

    return () => {
      setData(null);
    };
  }, [id]);

  return [data, setData] as const;
}

export function Preview() {
  const params = useParams();
  const [data] = useData(params?.id ?? "");

  const copy = (text: string) => async () => {
    await navigator.clipboard.writeText(text);
    
  };

  const downloadContent = () => {
    const url = URL.createObjectURL(new Blob([data!.content!]));

    const a = document.createElement("a");
    a.href = url;
    a.download = data?.id + ".txt";
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <Box>
      <Stack spacing={2}>
        {data ? (
          <>
            <Stack direction="row" spacing={1}>
              <Button onClick={copy(data.content)}>复制内容</Button>
              <Button onClick={copy(window.location.href)}>复制链接</Button>
              <Button onClick={downloadContent}>下载内容</Button>
              <Button component={RouterLink} to={`/?fork=${data.id}`}>Fork</Button>
            </Stack>
            <Box
              overflow={"auto"}
              height="70vh"
              sx={{
                scrollbarWidth: "thin",
              }}
            >
              <CodeViewer code={data.content} lang={data.syntax} />
            </Box>
          </>
        ) : (
          <Typography>加载中</Typography>
        )}
      </Stack>
    </Box>
  );
}
