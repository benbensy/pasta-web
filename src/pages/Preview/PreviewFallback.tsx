import { Button, FormLabel, Input, Stack } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorFallback } from "../../components/ErrorFallback";

interface Props {
  error: Error;
}

export function PreviewFallback({ error }: Props) {
  const params = useParams();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const submit = () => {
    navigate(`/preview/${params.id}?password=${inputRef.current?.value}`);
  };

  if (error instanceof AxiosError) {
    if (error.code === "1") {
      return (
        <Stack>
          <FormLabel>此 Pasta 已加密，请输入正确密码</FormLabel>
          <Stack direction="row" spacing={1}>
            <Input
              ref={inputRef}
              w={{ base: "100%", md: 165 }}
              placeholder="输入密码"
            />
            <Button onClick={submit}>解密</Button>
          </Stack>
        </Stack>
      );
    }
  }

  return <ErrorFallback error={error} />;
}
