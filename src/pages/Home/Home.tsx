import { Stack } from "@chakra-ui/react";
import { useUploadPasta, useGetPasta } from "../../data/pasta";
import { Fields, PastaForm } from "./PastaForm";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ErrorFallback } from "../../components/ErrorFallback";

export function Home() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const forkId = searchParams.get("fork");
  const { trigger: uploadPasta } = useUploadPasta();
  const { data: forkData, error } = useGetPasta(forkId);

  if (error) return <ErrorFallback error={error} />;

  const onSubmit = async (fields: Fields) => {
    const formData = new FormData();
    formData.append("syntax", fields.syntax);
    formData.append("encrypted", fields.encrypted);
    if (fields.password) {
      formData.append("password", fields.password);
    }
    formData.append("content", fields.content);
    for (const file of fields.attachments) {
      formData.append("attachments[]", file);
    }
    if (forkId) {
      formData.append("reference", forkId);
    }

    const { data: uploadData } = await uploadPasta(formData);
    let url = `/preview/${uploadData.id}`;
    if (fields.password) {
      url = `${url}?password=${encodeURI(fields.password)}`;
    }
    navigate(url);
  };

  if (error) return <ErrorFallback error={error} />;

  return (
    <Stack spacing={6}>
      <PastaForm defaultContent={forkData?.data.content} onSubmit={onSubmit} />
    </Stack>
  );
}
