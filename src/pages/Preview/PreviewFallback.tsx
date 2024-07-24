interface Props {
  error: Error;
  resetErrorBoundary: () => void;
}

export function PreviewFallback({ error, resetErrorBoundary }: Props) {
    console.log(error, resetErrorBoundary);
    
  return <></>;
}
