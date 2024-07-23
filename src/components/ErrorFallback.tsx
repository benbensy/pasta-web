interface Props {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: Props) {
  console.error(error.stack, resetErrorBoundary);

  return <>Something when wrong.</>;
}
