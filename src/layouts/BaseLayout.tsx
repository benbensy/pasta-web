import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import { ErrorFallback } from "../components/ErrorFallback";
import { Box, Container, Stack } from "@chakra-ui/react";
import { AppMenu } from "../components/AppMenu";

export function BaseLayout() {
  return (
    <Stack>
      <Box bg="blue.500" p={1} w="100%" />
      <Container maxW="container.md">
        <Stack spacing={6} py={4}>
          <AppMenu />
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Outlet />
          </ErrorBoundary>
        </Stack>
      </Container>
    </Stack>
  );
}
