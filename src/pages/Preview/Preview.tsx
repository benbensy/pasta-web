import { Text, Box, Button, Stack, useToast } from "@chakra-ui/react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useGetPasta } from "../../data/pasta";
import { ContentViewer } from "../../components/ContentViewer";
import { PreviewFallback } from "./PreviewFallback";
import { download } from "../../utils/download";

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
    download(url, `${id}.txt`);
  };

  const donwloadAttachment = (id: string, name: string) => () => {
    download(`/api/attachment/${id}`, name);
  };

  const fork = (id: string) => () => {
    navigate(`/?fork=${id}`);
  };

  const { data, error } = useGetPasta(
    params.id!,
    searchParams.get("password")!
  );

  if (error) return <PreviewFallback error={error} />;

  return data ? (
    <Stack spacing={6}>
      <Stack direction="row" spacing={4}>
        <Button size="sm" onClick={copy(data.data.content)}>
          复制内容
        </Button>
        <Button size="sm" onClick={copy(window.location.href)}>
          复制链接
        </Button>
        <Button
          size="sm"
          onClick={downloadContent(data.data.content, data.data.id)}
        >
          下载内容
        </Button>
        <Button size="sm" onClick={fork(data.data.id)}>
          Fork
        </Button>
      </Stack>
      <Stack>
        <ContentViewer lang={data.data.syntax} content={data.data.content} />
      </Stack>
      <Stack spacing={1}>
        {data.data.attachments.map((file, index) => (
          <Stack key={index} direction="row" justifyContent="space-between">
            <Text>{file.fileName}</Text>
            <Button
              size="xs"
              onClick={donwloadAttachment(file.id, file.fileName)}
            >
              下载
            </Button>
          </Stack>
        ))}
      </Stack>
    </Stack>
  ) : (
    <Box>加载内容中</Box>
  );
}
