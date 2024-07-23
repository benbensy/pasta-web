import { Box, Button, Stack, useToast } from "@chakra-ui/react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useGetPasta } from "../data/pasta";
import { ContentViewer } from "../components/ContentViewer";

export function Preview() {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const toast = useToast();

  const copy = (text: string) => async () => {
    await navigator.clipboard.writeText(text);
    toast({ title: "复制成功" });
  };

  const downloadContent = (content: string, id: string) => () => {
    const url = URL.createObjectURL(new Blob([content]));
    const a = document.createElement("a");
    a.download = `${id}.txt`;
    a.href = url;
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const fork = (id: string) => () => {
    navigate(`/?fork=${id}`);
  };

  const { data, error } = useGetPasta({
    id: params.id!,
    password: searchParams.get("password")!,
  });

  if (error) {
    throw error;
  }

  return data ? (
    <Stack spacing={6}>
      <Stack direction="row" spacing={4}>
        <Button size="sm" onClick={copy(data.content)}>
          复制内容
        </Button>
        <Button size="sm" onClick={copy(window.location.href)}>
          复制链接
        </Button>
        <Button size="sm" onClick={downloadContent(data.content, data.id)}>
          下载内容
        </Button>
        <Button size="sm" onClick={fork(data.id)}>
          Fork
        </Button>
      </Stack>
      <Stack>
        <ContentViewer lang={""} content={data.content} />
      </Stack>
    </Stack>
  ) : (
    <Box>加载内容中</Box>
  );
}
