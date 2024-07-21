import { Box, Container, Link } from "@mui/material";
import { Outlet, Link as RouterLink } from "react-router-dom";

export function BaseLayout() {
  return (
    <>
      <Container maxWidth='md'>
        <Box py={2}>
        <Box display='flex' gap={2}>
            <Link component={RouterLink} to='/'>
                logo
            </Link>
          <Link component={RouterLink} to="/" underline="hover">
            新建
          </Link>
          <Link component={RouterLink} to="/list" underline="hover">
            列表
          </Link>
        </Box>
        </Box>
        <Outlet />
      </Container>
    </>
  );
}
