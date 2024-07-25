import { Button, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface Props {
  error: Error;
}

export function ErrorFallback({ error }: Props) {
  const navigate = useNavigate();
  const handle = () => {
    navigate('/');
  }

  return (
    <Stack>
      <Text>Something when wrong.</Text>
      <Text>{error.message}</Text>
      <Stack direction='row' spacing={1}>
        <Button onClick={handle}>返回首页</Button>
      </Stack>
    </Stack>
  );
}
