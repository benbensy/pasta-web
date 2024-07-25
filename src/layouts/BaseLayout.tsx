import { Outlet } from "react-router-dom";
import { Box, Container, Stack } from "@chakra-ui/react";
import { AppMenu } from "../components/AppMenu";

export function BaseLayout() {
  return (
    <Stack>
      <Box bg="blue.500" p={1} w="100%" />
      <Container maxW="container.md">
        <Stack spacing={6} py={4}>
          <AppMenu />
            <Outlet />
        </Stack>
      </Container>
    </Stack>
  );
}
