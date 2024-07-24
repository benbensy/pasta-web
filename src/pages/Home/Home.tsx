import { Stack } from "@chakra-ui/react";
import { uploadPasta, useGetPasta } from "../../data/pasta";
import { Fields, PastaForm } from "./PastaForm";
import { useNavigate, useSearchParams } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const forkId = searchParams.get("fork");
  const { data, error } = useGetPasta({ id: forkId });

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

    const { data } = await uploadPasta(formData);
    let url = `/preview/${data.id}`;
    if (fields.password) {
      url = `${url}?password=${encodeURI(fields.password)}`;
    }
    navigate(url);
  };

  if (error) throw error;

  return (
    <Stack spacing={6}>
      <PastaForm defaultContent={data?.content} onSubmit={onSubmit} />
    </Stack>
  );
}
