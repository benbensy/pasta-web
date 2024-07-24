import { Stack, Text } from "@chakra-ui/react";

interface Props {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: Props) {
  console.error(error.stack, resetErrorBoundary);

  return <Stack>
    <Text>Something when wrong.</Text>
    <Text>{error.message}</Text>
  </Stack>;
}
